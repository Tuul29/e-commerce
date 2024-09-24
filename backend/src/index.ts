import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

import authRoute from "./routes/auth-route";
import { connectDB } from "./config/db";
import { generateHtmlTemplate } from "./utils/generateHtmlTemplate";

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";
// express application object uusgeh
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

//middlewares
app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.get("/", async (req: Request, res: Response) => {
  const rndOtp = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const { data, error } = await resend.emails.send({
    from: "E-Commerce <onboarding@resend.dev>",
    to: ["tuul.tsegmed0329@gmail.com"],
    subject: "hello world",
    html: generateHtmlTemplate(rndOtp),
  });
  if (error) {
    console.error("EMAIL_ERR", { error });
  }
  res.send("Welcome E-Commerce API Server");
});

connectDB(MONGO_URI);
// server asaah
app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа.`);
});
