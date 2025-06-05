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
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../utils/logger"));
const models_1 = require("../models");
const validations_1 = require("../validations");
const usersController = {
    get: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            logger_1.default.info("[GET] Récupérer un utilisateur");
            const user = yield models_1.userModel.get(id);
            if (!user)
                return (0, response_1.APIResponse)(response, null, "Utilisateur inexistant", 404);
            (0, response_1.APIResponse)(response, user, "OK");
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la récupération de l'utilisateur: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la récupération de l'utilisateur: " + error.message, 500);
        }
    }),
    update: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email } = validations_1.userUpdateValidation.parse(request.body);
            const { user } = response.locals;
            logger_1.default.info("[UPDATE] Update d'un utilisateur");
            if (email) {
                const existingEmail = yield models_1.userModel.findByEmail(email);
                if (existingEmail && existingEmail.id !== user.id) {
                    return (0, response_1.APIResponse)(response, null, "Cette adresse email est déjà utilisée", 400);
                }
            }
            if (username) {
                const existingUsername = yield models_1.userModel.findByUsername(username);
                if (existingUsername && existingUsername.id !== user.id) {
                    return (0, response_1.APIResponse)(response, null, "Ce nom d'utilisateur est déjà utilisé", 400);
                }
            }
            const updatedUser = yield models_1.userModel.update(user.id, Object.assign(Object.assign({}, user), { username: username || user.username, email: email || user.email }));
            (0, response_1.APIResponse)(response, updatedUser[0], "OK", 201);
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la mise à jour de l'utilisateur: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
        }
    }),
    getAll: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.default.info("[GET] Récupérer tout les utilisateurs");
            const users = yield models_1.userModel.getAll();
            (0, response_1.APIResponse)(response, users, "OK");
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la récupération des utilisateurs: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la récupération des utilisateurs", 500);
        }
    }),
    delete: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = response.locals;
            logger_1.default.info("[DELETE] Supprimer un utilisateur");
            yield models_1.userModel.delete(user.id);
            (0, response_1.APIResponse)(response, null, "OK", 204);
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la suppression de l'utilisateur: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la suppression de l'utilisateur", 500);
        }
    }),
};
exports.default = usersController;
