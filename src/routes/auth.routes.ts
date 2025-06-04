import { Router } from "express";
import controller from "../controllers/auth.controller";

const router = Router();

router.post("/login", controller.login);

router.post("/register", controller.register);

router.get("/logout", controller.logout);

export default router;
