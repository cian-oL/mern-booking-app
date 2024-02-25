import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongosse from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import UserRoutes from "./routes/users";

mongosse.connect(process.env.MONGODB_URL as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", UserRoutes);

app.listen(5678, () => {
  console.log("Server running on port 5678");
});
