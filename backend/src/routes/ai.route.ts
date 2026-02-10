import expres from "express";
import {
  askAI,
  chatWithAI,
  getChatHistory,
} from "../controllers/ai.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const aiRouter = expres.Router();

aiRouter.post("/ask", authMiddleware, askAI);
aiRouter.post("/chat", authMiddleware, chatWithAI);
aiRouter.get("/chat/history", authMiddleware, getChatHistory);

export default aiRouter;
