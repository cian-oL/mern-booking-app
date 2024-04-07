import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongosse from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import myHotelRoutes from "./routes/myHotels";

mongosse.connect(process.env.MONGODB_URL as string);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

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

// have one server for frontend and backend (small project)
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

// Protected routes (e.g. add-hotel) are behind conditional logic
// They cannot be accessed by the static files deployed
// Resolve by directing all non-API requests to the index.html in dist
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(5678, () => {
  console.log("Server running on port 5678");
});
