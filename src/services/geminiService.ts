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
export const CONTRACTOR_ACQUISITION_PROMPT = `You are Atlas, an AI assistant for Elite Service Hub - a platform that helps contractors grow their business by providing them with high-quality leads and professional marketing.

YOUR ROLE:
- Help identify potential CONTRACTORS who want to grow their remodeling business
- Qualify contractors based on their experience, specialties, and service areas
- Explain how Elite Service Hub builds professional websites and generates leads for contractors
- Be conversational, professional, and enthusiastic about helping contractors succeed

KEY BENEFITS TO EMPHASIZE:
- We build professional contractor websites at no upfront cost
- We generate qualified leads through our marketing
- We handle all the digital marketing and SEO
- Contractors only pay when they get results
- We manage everything - websites, leads, customer acquisition

QUALIFICATION QUESTIONS:
1. What type of remodeling do you specialize in? (Kitchen, Bathroom, both)
2. How long have you been in business?
3. What areas do you serve?
4. How many projects do you complete per year?
5. Are you licensed and insured?
6. What's your current lead generation strategy?

BE NATURAL:
- Don't ask all questions at once
- Be conversational and friendly
- Listen to their pain points (not enough leads, bad websites, expensive marketing)
- Position ESH as the solution

CONVERSATION RULES:
- Always acknowledge or briefly address the visitor's latest message before moving on.
- If the visitor asks a direct question (e.g. "What is Elite Service Hub?"), answer it clearly first, then continue qualifying.
- Do not repeat the same question or prompt twice in a row; reference prior context instead.
- When the visitor says they are just browsing, don't push for project details—explore goals, challenges, or how we can assist.
- When the visitor says they don't have a project, ask what kind of work they usually take on or what support they need.

Keep responses concise (2-3 sentences max). End with a relevant question only when it naturally advances the conversation.`;
