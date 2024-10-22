import express from "express";
import { config } from "dotenv";
import { app } from "./app.js";
import connectDb from "./db/connectDb.js";
config({
  path: "./.env",
});

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`App is listening on http://localhost:${process.env.PORT}`);
});
