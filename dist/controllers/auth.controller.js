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
const env_1 = require("../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const logger_1 = __importDefault(require("../utils/logger"));
const password_1 = require("../utils/password");
const validations_1 = require("../validations");
const zod_1 = require("zod");
const users_model_1 = require("../models/users.model");
const { JWT_SECRET, NODE_ENV } = env_1.env;
const authController = {
    login: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, username, password } = request.body;
            const user = email
                ? yield users_model_1.userModel.findByEmail(email)
                : yield users_model_1.userModel.findByUsername(username);
            if (!user) {
                return (0, utils_1.APIResponse)(response, null, "Les identifiants saisits sont incorrects", 400);
            }
            const validPassword = yield (0, password_1.verifyPassword)(user.password, password);
            if (!validPassword)
                return (0, utils_1.APIResponse)(response, null, "Les identifiants saisits sont incorrects", 400);
            const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, {
                expiresIn: "2h",
            });
            response.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: NODE_ENV === "production",
            });
            (0, utils_1.APIResponse)(response, null, "Vous êtes bien connecté", 200);
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la connexion de l'utilisateur: ${err.message}`);
            (0, utils_1.APIResponse)(response, null, "Erreur serveur", 500);
        }
    }),
    register: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = validations_1.userRegisterValidation.parse(request.body);
            const existingEmail = yield users_model_1.userModel.findByEmail(email);
            if (existingEmail) {
                return (0, utils_1.APIResponse)(response, null, "Cette adresse email est déjà utilisée", 400);
            }
            const existingUsername = yield users_model_1.userModel.findByUsername(username);
            if (existingUsername) {
                return (0, utils_1.APIResponse)(response, null, "Ce nom d'utilisateur est déjà utilisé", 400);
            }
            const hash = yield (0, password_1.hashPassword)(password);
            if (!hash) {
                return (0, utils_1.APIResponse)(response, null, "Un problème est survenu lors du hash", 500);
            }
            const [newUser] = yield users_model_1.userModel.create({
                username,
                email,
                password: hash,
            });
            if (!newUser)
                return (0, utils_1.APIResponse)(response, null, "Un problème est survenu lors de l'inscription", 500);
            (0, utils_1.APIResponse)(response, newUser, "Vous êtes inscrit", 201);
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`);
            if (err instanceof zod_1.z.ZodError) {
                return (0, utils_1.APIResponse)(response, err.errors, "Le formulaire est invalide", 400);
            }
            (0, utils_1.APIResponse)(response, null, "Erreur serveur", 500);
        }
    }),
    logout: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        response.clearCookie("accessToken");
        (0, utils_1.APIResponse)(response, null, "Vous êtes déconnecté", 200);
    }),
};
exports.default = authController;
