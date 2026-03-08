import type { Transaction } from "../../generated/prisma/client";
import { openai } from "./ai.service";

export async function analyseTransaction(
  transaction: Transaction & {
    currency: string;
    location: string;
    accountAge: string;
  },
) {
  const prompt = `
Analyze this financial transaction and determine if it is fraudulent.

  Transaction details:
  Amount: ${transaction.amount}  Currency:${transaction.currency}
  Location:${transaction.location}  AccountAge:${transaction.accountAge}
  Category: ${transaction.category}  Description: ${transaction.description}
  Transaction Time: ${transaction.createdAt}

Return JSON:

{
"risk":"low | medium | high",
"reason":"short explanation"
}
`;

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const text = response.output_text;

  return JSON.parse(text);
}
