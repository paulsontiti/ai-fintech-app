import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { getUserAnalytics } from "../services/analytics.service";
import { predictNextMont } from "../utils/prediction";
import { generateHealthScore } from "../utils/healthScore";
import { generateAIInsight } from "../services/ai.service";


export const getInsights = async(req:AuthRequest,res:Response)=>{
    const userId = req.userId as string

    const analytics = await getUserAnalytics(userId);
    const monthlyTotals = analytics.transactions.map((t) => t.amount)

    const prediction = predictNextMont(monthlyTotals);
    const healthScore = generateHealthScore(500000,analytics.totalExpenses,200000,analytics.totalExpenses);

    const aiInsight = await generateAIInsight({
        total:analytics.totalExpenses,topCategory:analytics.topCategory,prediction,healthScore
    });

    res.json({
        healthScore,prediction,aiInsight,topCategory:analytics.topCategory
    })
}