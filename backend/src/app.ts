import express from "express";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.routes";
import cors from "cors";
import aiRouter from "./routes/ai.route";
import transactionRouter from "./routes/transaction.route";
import walletRouter from "./routes/wallet.route";

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // frontend URL (Next.js default)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you want to send cookies
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fintech API is running");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/wallet", walletRouter);

export default app;
