import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/router";

const app = express();
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://localhost:4200",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json("Application work!");
});

app.use("/api", router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Running on PORT: ${process.env.SERVER_PORT}`);
});
