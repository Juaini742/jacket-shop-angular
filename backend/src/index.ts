import dotenv from "dotenv";
dotenv.config();
// import express, { Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/router";
// import path from "path";

const app = express();
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// const distDir = path.join(__dirname, "../../frontend/dist/frontend/browser");
// app.use(express.static(path.join(__dirname, "../../frontend/dist/frontend")));
// app.use(express.static(distDir));

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use("/api", router);

// app.use("*", (_req: Request, res: Response) => {
//   res.sendFile(
//     path.join(__dirname, "../../frontend/dist/frontend/browser/index.html")
//   );
// });

// app.use("*", (_req: Request, res: Response) => {
//   res.sendFile(path.join(distDir, "index.html"));
// });

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Running on PORT: ${process.env.SERVER_PORT}`);
});
