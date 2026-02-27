import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import prisma from "../config/prisma";
import { generateForecast } from "../services/forecast.generator";


export const getForecast = async(req:AuthRequest,res:Response)=>{
    const userId = req.userId as string

    const existingForecast = await prisma.forecast.findFirst({
        where:{
            userId
        }
    })
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if(existingForecast && ((Date.now() - new Date(existingForecast.createdAt).getTime()) < ONE_DAY)){
        return res.json(existingForecast)
    }

    const forecast = await generateForecast(userId)

    const savedForecast = await prisma.forecast.create({
        data:{
            userId,predictedBalance:forecast?.predictedBalance || 0,
            predictedExpense: forecast?.predictedExpense || 0,
            chartData: forecast?.chartData || [],
            spendingTrend: forecast?.spendingTrend || ""
        }
    })

    res.json(savedForecast)
}