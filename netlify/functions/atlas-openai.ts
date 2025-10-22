interface AtlasChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AtlasOpenAIRequest {
  systemPrompt?: string;
  messages?: AtlasChatMessage[];
  temperature?: number;
  maxTokens?: number;
}

const DEFAULT_OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-5-nano';

const resolveOpenAIUrl = (): string => {
  const direct = (process.env.OPENAI_API_URL || '').trim();
  if (direct) return direct;

  const base = (process.env.OPENAI_BASE_URL || '').trim();
  if (!base) return DEFAULT_OPENAI_URL;

  const normalized = base.replace(/\/+$/, '');
  if (/\/(v\d+|chat|responses)/i.test(normalized)) {
    return normalized;
  }

  return `${normalized}/v1/chat/completions`;
};

const getAuthHeader = (apiKey: string) => {
  const headerName = (process.env.OPENAI_API_KEY_HEADER || 'Authorization').trim();
  const prefix = process.env.OPENAI_API_KEY_PREFIX;
  const effectivePrefix = prefix === undefined ? 'Bearer ' : prefix;

  return { name: headerName, value: `${effectivePrefix || ''}${apiKey}` };
};

const buildOpenAIMessages = (messages: AtlasChatMessage[] = [], systemPrompt: string) => {
  const openaiMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [];
  if (systemPrompt?.trim()) {
    openaiMessages.push({ role: 'system', content: systemPrompt.trim() });
  }

  messages.forEach((msg) => {
    if (!msg?.content?.trim()) return;
    const role = msg.role === 'assistant' ? 'assistant' : 'user';
    openaiMessages.push({ role, content: msg.content });
  });

  return openaiMessages;
};

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing OPENAI_API_KEY' }) };
    }

    const OPENAI_API_URL = resolveOpenAIUrl();
    const authHeader = getAuthHeader(apiKey);

    const {
      systemPrompt = '',
      messages = [],
      temperature = 0.6,
      maxTokens = 400
    }: AtlasOpenAIRequest = JSON.parse(event.body || '{}');

    if (!Array.isArray(messages)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'messages must be an array' }) };
    }

    const openaiMessages = buildOpenAIMessages(messages, systemPrompt);

    if (openaiMessages.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ text: 'Hi there! Tell me a bit about your project so we can dive in.' })
      };
    }

    const preferredModel = (process.env.OPENAI_MODEL || DEFAULT_MODEL).trim() || DEFAULT_MODEL;
    const fallbackModels = (process.env.OPENAI_FALLBACK_MODELS || '')
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    const callModel = async (model: string) => {
      return fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [authHeader.name]: authHeader.value
        },
        body: JSON.stringify({
          model,
          messages: openaiMessages,
          temperature,
          max_tokens: maxTokens,
          presence_penalty: 0.3,
          frequency_penalty: 0.1
        })
      });
    };

    let modelUsed = preferredModel;
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
        body: JSON.stringify({
          error: 'OpenAI request failed',
          details: errorText,
          modelTried: modelUsed,
          fallbackTried: fallbackModels
        })
      };
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim() || '';

    return {
      statusCode: 200,
      body: JSON.stringify({ text, model: modelUsed })
    };
  } catch (error) {
    console.error('[Atlas OpenAI] Error handling request:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to generate response' }) };
  }
};
