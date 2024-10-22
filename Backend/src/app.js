import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as signupRoute } from "./routes/signup.route.js";
import { router as signinRoute } from "./routes/signin.route.js";
// import { router as createAccountRoute } from "./routes/createAccount.route.js";
import { router as addWalletRoute } from "./routes/addwallet.route.js";
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    preflightContinue: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
// app.use("/createAccount", createAccountRoute);
app.use("/addWallet", addWalletRoute);

export { app };
