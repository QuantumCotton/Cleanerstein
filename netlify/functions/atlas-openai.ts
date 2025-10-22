interface GeminiLikeMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface AtlasOpenAIRequest {
  messages: GeminiLikeMessage[];
  systemPrompt?: string;
}

const OPENAI_URL = 'https://api.openai.com/v1/responses';
const MODEL_NAME = 'gpt-5.0-nano';

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OPENAI_API_KEY is not configured' })
    };
  }

  try {
    const body: AtlasOpenAIRequest = event.body ? JSON.parse(event.body) : { messages: [] };
    const { messages = [], systemPrompt = '' } = body;

    const openAiMessages = [
      {
        role: 'system',
        content: [{ type: 'text', text: systemPrompt }]
      },
      ...messages.map((msg) => ({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.parts.map((part) => ({ type: 'text', text: part.text }))
      }))
    ];

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        input: openAiMessages,
        reasoning: { effort: 'medium' },
        max_output_tokens: 400
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'OpenAI request failed', details: errorText })
      };
    }

    const data = await response.json();

    const textOutput = extractText(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ text: textOutput })
    };
  } catch (error) {
    console.error('[Atlas OpenAI] Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate response' })
    };
  }
};

function extractText(openAiResponse: any): string {
  if (!openAiResponse) return '';

  if (typeof openAiResponse.output_text === 'string') {
    return openAiResponse.output_text;
  }

  const outputs = openAiResponse.output ?? openAiResponse.outputs;
  if (Array.isArray(outputs)) {
    const textChunks: string[] = [];
    for (const item of outputs) {
      const content = item.content || item.contents;
      if (Array.isArray(content)) {
        for (const part of content) {
          if (typeof part.text === 'string') {
            textChunks.push(part.text);
          }
        }
      }
    }
    if (textChunks.length > 0) {
      return textChunks.join('\n');
    }
  }

  if (Array.isArray(openAiResponse.results)) {
    const textChunks = openAiResponse.results
      .map((result: any) => result.output_text)
      .filter(Boolean);
    if (textChunks.length > 0) {
      return textChunks.join('\n');
    }
  }

  return '';
}

