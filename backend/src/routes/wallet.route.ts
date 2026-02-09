import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addMoney } from "../controllers/wallet.controller";

const walletRouter = express.Router();

walletRouter.post("/fund", authMiddleware, addMoney);

export default walletRouter;
