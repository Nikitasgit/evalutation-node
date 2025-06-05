"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fishes_controller_1 = __importDefault(require("../controllers/fishes.controller"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/", fishes_controller_1.default.getAll);
router.get("/:id", fishes_controller_1.default.get);
router.post("/", middlewares_1.isAuthenticated, fishes_controller_1.default.create);
router.put("/:id", middlewares_1.isAuthenticated, fishes_controller_1.default.update);
router.delete("/:id", middlewares_1.isAuthenticated, fishes_controller_1.default.delete);
router.post("/:id/catch", middlewares_1.isAuthenticated, fishes_controller_1.default.catch);
exports.default = router;
