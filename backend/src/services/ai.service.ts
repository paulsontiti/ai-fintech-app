import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIResponse = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0]?.message.content;
};

export async function generateAIInsight(data:any) {

  const prompt =  `User Financial Summary:
  Total Spending: ${data.total}
  Top Category : ${data.topCategory}
  Predicted Spending: ${data.healthScore}/100

  Give financial advice and budgeting tips.
  `
  const response = openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages:[
      {
        role:"system",content:"You are a professional fintech financial advisor"
      },
      {
        role:"user",content:prompt
      }
    ]
  })

  return (await response).choices[0]?.message.content
}