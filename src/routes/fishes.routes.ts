import { Router } from "express";
import controller from "../controllers/fishes.controller";
import { isAuthenticated } from "../middlewares";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.get);

router.post("/", isAuthenticated, controller.create);

router.put("/:id", isAuthenticated, controller.update);

router.delete("/:id", isAuthenticated, controller.delete);

router.post("/:id/catch", isAuthenticated, controller.catch);

export default router;
