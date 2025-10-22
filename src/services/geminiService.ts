// Gemini AI Service for Atlas Chatbot
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function callGeminiAPI(
  messages: GeminiMessage[],
  systemPrompt: string
): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.error('Gemini API key not found');
    return getFallbackResponse();
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || getFallbackResponse();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getFallbackResponse();
  }
}

function getFallbackResponse(): string {
  return "I'm here to help you find the perfect contractor for your project! Could you tell me what type of work you need done?";
}

// System prompt for contractor acquisition focus
export const CONTRACTOR_ACQUISITION_PROMPT = `You are Atlas from Elite Service Hub. We help contractors grow with professional websites and lead generation.

IMPORTANT: 
- ALWAYS respond directly to what the user just said
- Elite Service Hub builds contractor websites and generates leads
- We work with kitchen/bathroom remodeling contractors
- Keep responses 2-3 sentences max
- Ask one question at a time to learn about their business`;
