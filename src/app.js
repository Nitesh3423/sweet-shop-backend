import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// global error handler
app.use(errorHandler);

export default app;
