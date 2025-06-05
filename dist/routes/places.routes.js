"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const places_controller_1 = __importDefault(require("../controllers/places.controller"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/", places_controller_1.default.getAll);
router.get("/:id", places_controller_1.default.get);
router.post("/", middlewares_1.isAuthenticated, places_controller_1.default.create);
router.put("/:id", middlewares_1.isAuthenticated, places_controller_1.default.update);
router.delete("/:id", middlewares_1.isAuthenticated, places_controller_1.default.delete);
exports.default = router;
