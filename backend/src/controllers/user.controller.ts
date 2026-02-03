import type { Response } from "express";
import prisma from "../config/prisma";
import type { AuthRequest } from "../middlewares/auth.middleware";

export const profile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId as string },
    });

    res.json(user);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
