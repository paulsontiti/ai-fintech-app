import express from "express";
import { createTransaction } from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const transactionRouter = express.Router();

transactionRouter.post("/", authMiddleware, createTransaction);

export default transactionRouter;
