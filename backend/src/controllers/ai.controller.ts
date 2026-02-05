import { generateAIResponse } from "../services/ai.service";
import type { Request, Response } from "express";

export const askAI = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const response = await generateAIResponse(prompt);

    res.json({ response });
  } catch (err: any) {
    res.status(500).json({
      message: "AI request failed",
    });
  }
};
