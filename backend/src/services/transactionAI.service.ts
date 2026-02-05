import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const categoriseTransaction = async (description: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `
                You categorise financial transactions into one word categories like Food,Bills,
                Transport,Shopping,Entertainment,Health,Education and Others`,
      },
      {
        role: "user",
        content: `Categorise this transaction: ${description}`,
      },
    ],
  });
  return completion.choices[0]?.message.content?.trim();
};
