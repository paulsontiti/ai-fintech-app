import type { Response } from "express";
import prisma from "../config/prisma";
import { categoriseTransaction } from "../services/transactionAI.service";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { analyseTransaction } from "../services/fraudDetection.service";
import { io } from "../server";

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, description } = req.body;

    const userId = req.userId as string;

    const category = (await categoriseTransaction(description)) as string;

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        category,
        userId,
      },
    });

    const fraudCheck = await analyseTransaction({
      ...transaction,
      currency: "NGN",
      location: "Nigeria",
      accountAge: "2 years",
    });

    if (fraudCheck.risk === "high") {
      io.emit("fraud-alert", fraudCheck);
    }

    res.status(201).json({ category });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Transaction creation failed",
    });
  }
};
