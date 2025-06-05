"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/", users_controller_1.default.getAll);
router.get("/:id", users_controller_1.default.get);
router.put("/", middlewares_1.isAuthenticated, users_controller_1.default.update);
router.delete("/", middlewares_1.isAuthenticated, users_controller_1.default.delete);
exports.default = router;
