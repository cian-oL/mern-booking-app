import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { log } from "console";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "test message" });
});

app.listen(5678, () => {
  console.log("Server running on port 5678");
});
