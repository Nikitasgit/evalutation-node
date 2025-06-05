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
const zod_1 = require("zod");
const fish_validations_1 = require("../validations/fish.validations");
const fishesController = {
    get: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            logger_1.default.info("[GET] Récupérer un poisson");
            const fish = yield models_1.fishModel.get(id);
            if (!fish)
                return (0, response_1.APIResponse)(response, null, "Poisson inexistant", 404);
            (0, response_1.APIResponse)(response, fish, "OK");
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la récupération du poisson: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la récupération du post", 500);
        }
    }),
    create: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, placeId } = fish_validations_1.fishValidation.parse(request.body);
            const { user } = response.locals;
            logger_1.default.info("[POST] Créer un poisson");
            const place = yield models_1.placeModel.get(placeId);
            if (!place) {
                return (0, response_1.APIResponse)(response, null, "Lieu inexistant", 404);
            }
            if (place.createdBy.id !== user.id) {
                return (0, response_1.APIResponse)(response, null, "Vous n'êtes pas autorisé à ajouter un poisson à ce lieu", 403);
            }
            const existingFish = yield models_1.fishModel.findByName(name);
            if (existingFish) {
                return (0, response_1.APIResponse)(response, null, "Poisson déjà existant", 400);
            }
            const fish = yield models_1.fishModel.create({
                name,
                placeId,
                userId: user.id,
            });
            (0, response_1.APIResponse)(response, fish, "OK", 201);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return (0, response_1.APIResponse)(response, error.errors, "Le nom du poisson ou l'id de l'endroit est invalide", 400);
            }
            logger_1.default.error("Erreur lors de la création du poisson: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la création du poisson", 500);
        }
    }),
    delete: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { user } = response.locals;
            logger_1.default.info("[DELETE] Supprimer un poisson");
            yield models_1.fishModel.delete(id, user.id);
            (0, response_1.APIResponse)(response, null, "OK", 201);
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la suppression du poisson: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la suppression du poisson", 500);
        }
    }),
    update: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { name, placeId } = fish_validations_1.fishValidation.parse(request.body);
            const { user } = response.locals;
            logger_1.default.info("[UPDATE] Update d'un poisson");
            const place = yield models_1.placeModel.get(placeId);
            if (!place) {
                return (0, response_1.APIResponse)(response, null, "Lieu inexistant", 404);
            }
            if (place.createdBy.id !== user.id) {
                return (0, response_1.APIResponse)(response, null, "Vous n'êtes pas autorisé à modifier un poisson de ce lieu", 403);
            }
            const existingFish = yield models_1.fishModel.findByName(name);
            if (existingFish && existingFish.id !== id) {
                return (0, response_1.APIResponse)(response, null, "Poisson déjà existant", 400);
            }
            const fish = yield models_1.fishModel.update(id, user.id, {
                name,
                placeId,
                userId: user.id,
            });
            (0, response_1.APIResponse)(response, fish, "OK", 201);
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la mise à jour du poisson: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la mise à jour du poisson", 500);
        }
    }),
    getAll: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.default.info("[GET] Récupérer tout les poissons");
            const fishes = yield models_1.fishModel.getAll();
            (0, response_1.APIResponse)(response, fishes, "OK");
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la récupération des poissons: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la récupération des poissons", 500);
        }
    }),
};
exports.default = fishesController;
