import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongosse from "mongoose";

import UserRoutes from "./routes/users";

mongosse.connect(process.env.MONGODB_URL as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", UserRoutes);

app.listen(5678, () => {
  console.log("Server running on port 5678");
});
