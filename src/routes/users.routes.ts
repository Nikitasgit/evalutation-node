import { Router } from "express";
import controller from "../controllers/users.controller";
import { isAuthenticated } from "../middlewares";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.get);

router.put("/", isAuthenticated, controller.update);

router.delete("/", isAuthenticated, controller.delete);

export default router;
