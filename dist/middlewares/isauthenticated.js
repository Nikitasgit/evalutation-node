"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const utils_1 = require("../utils");
const users_model_1 = require("../models/users.model");
const { JWT_SECRET } = env_1.env;
const isAuthenticated = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = request.cookies;
    if (!accessToken)
        return (0, utils_1.APIResponse)(response, null, "Vous devez être connecté", 401);
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
        const user = yield users_model_1.userModel.get(decoded.id);
        if (!user) {
            return (0, utils_1.APIResponse)(response, null, "Utilisateur introuvable", 401);
        }
        response.locals.user = user;
        next();
    }
    catch (err) {
        return (0, utils_1.APIResponse)(response, null, "Token invalide", 401);
    }
});
exports.isAuthenticated = isAuthenticated;
