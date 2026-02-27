import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getForecast } from "../controllers/forecast.controller";

const forecastRouter = Router();

forecastRouter.get("/", authMiddleware, getForecast);

export default forecastRouter;
