import OpenAI from 'openai';

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const hasApiKey = typeof apiKey === 'string' && apiKey.trim().length > 0;

if (!hasApiKey) {
  console.warn('[OpenAI] EXPO_PUBLIC_OPENAI_API_KEY is not set. Falling back to mock behavior.');
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export async function runMiniChat(prompt: string, maxTokens = 200, targetLanguage: string = 'English') {
  if (!hasApiKey) {
    return '';
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: `You are a motivational morning coach. Always respond in ${targetLanguage}.` },
      { role: 'user', content: prompt },
    ],
    max_tokens: maxTokens,
  });

  return response.choices[0].message?.content ?? '';
}
