import prisma from "../config/prisma";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { generateAIResponse, openai } from "../services/ai.service";
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

export const chatWithAI = async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;
    const userId = req.userId as string;

    await prisma.chatMessage.create({
      data: {
        userId,
        role: "user",
        content: message,
      },
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a financial assistant helping users manage spending, saving and budgeting",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiReply = completion.choices[0]?.message.content;

    await prisma.chatMessage.create({
      data: {
        userId,
        role: "assistant",
        content: aiReply || "AI has no reply",
      },
    });

    res.json({ reply: aiReply });
  } catch (err: any) {
    res.status(500).json({ message: "A server internal error occured" });
  }
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId as string;
    const chats = await prisma.chatMessage.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json({chats});
  } catch (err: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};
