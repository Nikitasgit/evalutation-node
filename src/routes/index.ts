import { Router } from "express";
import authRouter from "./auth.routes";
import fishesRouter from "./fishes.routes";
import placesRouter from "./places.routes";
import fishingRodsRouter from "./fishingRods.routes";
import usersRouter from "./users.routes";
const router = Router();

router.get("/", (req, res) => {
  res.send("Bienvenue sur l'API des pécheurs (j'avais pas d'idée) !");
});

router.use("/auth", authRouter);
router.use("/fishes", fishesRouter);
router.use("/places", placesRouter);
router.use("/fishingRods", fishingRodsRouter);
router.use("/users", usersRouter);

export default router;
