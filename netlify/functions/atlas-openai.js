const DEFAULT_OPENAI_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-5.0-nano';

const resolveOpenAIUrl = () => {
  const direct = (process.env.OPENAI_API_URL || '').trim();
  if (direct) return direct;

  const base = (process.env.OPENAI_BASE_URL || '').trim();
  if (!base) return DEFAULT_OPENAI_URL;

  const normalized = base.replace(/\/+$/, '');
  if (/\/(v\d+|responses)/i.test(normalized)) {
    return normalized;
  }

  return `${normalized}/v1/responses`;
};

const getAuthHeader = (apiKey) => {
  const headerName = (process.env.OPENAI_API_KEY_HEADER || 'Authorization').trim();
  const prefix = process.env.OPENAI_API_KEY_PREFIX;
  const effectivePrefix = prefix === undefined ? 'Bearer ' : prefix;
  return { name: headerName, value: `${effectivePrefix || ''}${apiKey}` };
};

const buildResponseInput = (messages = [], systemPrompt = '') => {
  const input = [];

  if (systemPrompt && systemPrompt.trim()) {
    input.push({
      role: 'system',
      content: [{ type: 'text', text: systemPrompt.trim() }]
    });
  }

  messages.forEach((msg) => {
    if (!msg || !msg.content || !msg.content.trim()) return;
    const role = msg.role === 'assistant' ? 'assistant' : 'user';
    input.push({
      role,
      content: [{ type: 'text', text: msg.content }]
    });
  });

  return input;
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing OPENAI_API_KEY' }) };
    }

    const {
      systemPrompt = '',
      messages = [],
      temperature = 0.6,
      maxTokens = 400
    } = JSON.parse(event.body || '{}');

    if (!Array.isArray(messages)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'messages must be an array' }) };
    }

    const responseInput = buildResponseInput(messages, systemPrompt);
    if (responseInput.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ text: 'Hi there! Tell me a bit about your project so we can dive in.' })
      };
    }

    const url = resolveOpenAIUrl();
    const modelPreference = (process.env.OPENAI_MODEL || DEFAULT_MODEL).trim() || DEFAULT_MODEL;
    const fallbackModels = (process.env.OPENAI_FALLBACK_MODELS || '')
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);
    const authHeader = getAuthHeader(apiKey);

    const callModel = async (model) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [authHeader.name]: authHeader.value
        },
        body: JSON.stringify({
          model,
          input: responseInput,
          temperature,
          reasoning: { effort: process.env.OPENAI_REASONING_EFFORT || 'medium' },
          max_output_tokens: maxTokens,
          response_format: { type: 'text' }
        })
      });
    };

    let modelUsed = modelPreference;
    let response = await callModel(modelUsed);
    let errorText = '';

    if (!response.ok) {
      errorText = await response.text();
      const retriable = /model|does not exist|not found|invalid model/i.test(errorText) || [400, 404].includes(response.status);
      if (retriable) {
        for (const fallback of fallbackModels) {
          if (!fallback || fallback === modelUsed) continue;
          modelUsed = fallback;
          response = await callModel(modelUsed);
          if (response.ok) break;
          errorText = await response.text();
        }
      }
    }

    if (!response.ok) {
      console.error('[Atlas OpenAI] Upstream error:', response.status, errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'OpenAI request failed', details: errorText })
      };
    }

    const data = await response.json();
    let text = '';
    if (typeof data.output_text === 'string') {
      text = data.output_text.trim();
    } else if (Array.isArray(data.output)) {
      for (const item of data.output) {
        if (Array.isArray(item.content)) {
          const part = item.content.find((entry) => typeof entry.text === 'string');
          if (part) {
            text = part.text.trim();
            break;
          }
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ text, model: modelUsed })
    };
  } catch (error) {
    console.error('[Atlas OpenAI] Error handling request:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to generate response' }) };
  }
};
