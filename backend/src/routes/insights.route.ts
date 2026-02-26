import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getInsights } from "../controllers/insight.controller";

const insightsRouter = Router();

insightsRouter.get("/", authMiddleware, getInsights);

export default insightsRouter;
