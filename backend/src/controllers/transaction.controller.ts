import type { Response } from "express";
import prisma from "../config/prisma";
import { categoriseTransaction } from "../services/transactionAI.service";
import type { AuthRequest } from "../middlewares/auth.middleware";

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, description } = req.body;

    const userId = req.userId as string;

    const category = (await categoriseTransaction(description)) as string;

    await prisma.transaction.create({
      data: {
        amount,
        description,
        category,
        userId,
      },
    });
    res.status(201).json({ category });
  } catch (err) {
    res.status(500).json({
      message: "Transaction creation failed",
    });
  }
};
