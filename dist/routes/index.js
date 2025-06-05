"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const fishes_routes_1 = __importDefault(require("./fishes.routes"));
const places_routes_1 = __importDefault(require("./places.routes"));
const fishingRods_routes_1 = __importDefault(require("./fishingRods.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Bienvenue sur l'API des pécheurs (j'avais pas d'idée) !");
});
router.use("/auth", auth_routes_1.default);
router.use("/fishes", fishes_routes_1.default);
router.use("/places", places_routes_1.default);
router.use("/fishingRods", fishingRods_routes_1.default);
router.use("/users", users_routes_1.default);
exports.default = router;
