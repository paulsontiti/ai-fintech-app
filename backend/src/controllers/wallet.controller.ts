import type { Response } from "express";
import prisma from "../config/prisma";
import type { AuthRequest } from "../middlewares/auth.middleware";

export const addMoney = async(req:AuthRequest,res:Response)=>{
    try{
        const userId = req.userId as string
        const {amount} = req.body

        if(!amount || amount <= 0){
            return res.status(400).json({
                message:"Invalid amount"
            })
        }

        const wallet = await prisma.wallet.findFirst({
            where:{userId}
        })

        if(!wallet){
             return res.status(400).json({
                message:"Wallet not found"
            })
        }

       const [updatedWallet] = await prisma.$transaction([
            prisma.wallet.update({
                where:{
                    id: wallet.id
                },
                data:{
                    balance: wallet.balance + Number(amount)
                }
            }),
            prisma.transaction.create({
                data:{
                    userId,amount:Number(amount),
                    description:"Wallet funding",
                    category: "Funding"
                }
            })
        ])

        res.json(updatedWallet)
    }catch(err:any){
        res.status(500).json({message: "Internal server error"})
    }
}