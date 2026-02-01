import express from "express";
import userRoutes from "./routes/user.routes";




const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fintech API is running");
});

app.use("/api", userRoutes);

export default app;
