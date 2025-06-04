import { Router } from "express";
import authRouter from "./auth.routes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Bienvenue sur l'API des pécheurs (j'avais pas d'idée) !");
});

router.use("/auth", authRouter);

export default router;
