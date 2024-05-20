import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import router from "./routes/router";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cors({ origin: true, credentials: true }));
app.use(cors());

app.use("/api", router);

// app.listen(process.env.SERVER_PORT,  () => {
//   console.log("Server Running");
// });
app.listen(8080, "0.0.0.0", () => {
  console.log("Server is running on port 8080");
});
