import { env } from "./config/env";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const { PORT, ORIGIN } = env;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log("Le serveur est en écoute sur: http://localhost:" + PORT);
});
