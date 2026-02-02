import type { Request, Response } from "express";
import prisma from "../config/prisma";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, middleName, lastName, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        firstName,
        middleName,
        lastName,
        email,
        password: hashedPassword,
        wallets: {
          create: { balance: 0 },
        },
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({
      token,
      user: {
        email,
        firstName,
        middleName,
        lastName,
      },
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.status(201).json({
      token,
      user: {
        email,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
      },
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
