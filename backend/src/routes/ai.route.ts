import expres from "express";
import { askAI } from "../controllers/ai.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const aiRouter = expres.Router();

aiRouter.post("/ask", authMiddleware, askAI);

export default aiRouter;
