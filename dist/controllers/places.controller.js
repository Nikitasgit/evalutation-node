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
const place_validations_1 = require("../validations/place.validations");
const placesController = {
    get: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            logger_1.default.info("[GET] Récupérer un endroit");
            const place = yield models_1.placeModel.get(id);
            if (!place)
                return (0, response_1.APIResponse)(response, null, "Endroit inexistant", 404);
            (0, response_1.APIResponse)(response, place, "OK");
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la récupération de l'endroit: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la récupération de l'endroit", 500);
        }
    }),
    create: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name } = place_validations_1.placeValidation.parse(request.body);
            const { user } = response.locals;
            logger_1.default.info("[POST] Créer un endroit");
            const existingPlace = yield models_1.placeModel.findByName(name);
            if (existingPlace) {
                return (0, response_1.APIResponse)(response, null, "Endroit déjà existant", 400);
            }
            const place = yield models_1.placeModel.create({
                name,
                createdById: user.id,
            });
            (0, response_1.APIResponse)(response, place, "OK", 201);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return (0, response_1.APIResponse)(response, error.errors, "Le nom de l'endroit ou la catégorie est invalide", 400);
            }
            logger_1.default.error("Erreur lors de la création de l'endroit: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la création de l'endroit", 500);
        }
    }),
    delete: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { user } = response.locals;
            logger_1.default.info("[DELETE] Supprimer un endroit");
            yield models_1.placeModel.delete(id, user.id);
            (0, response_1.APIResponse)(response, null, "OK", 201);
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la suppression de l'endroit: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la suppression de l'endroit", 500);
        }
    }),
    update: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { name } = place_validations_1.placeValidation.parse(request.body);
            const { user } = response.locals;
            logger_1.default.info("[UPDATE] Update d'un endroit");
            const existingPlace = yield models_1.placeModel.findByName(name);
            if (existingPlace && existingPlace.id !== id) {
                return (0, response_1.APIResponse)(response, null, "Endroit déjà existant", 400);
            }
            const place = yield models_1.placeModel.update(id, user.id, {
                name,
                createdById: user.id,
            });
            if (!place)
                return (0, response_1.APIResponse)(response, null, "Endroit inexistant", 404);
            (0, response_1.APIResponse)(response, place, "OK", 201);
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la màj de l'endroit: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la màj de l'endroit", 500);
        }
    }),
    getAll: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_1.default.info("[GET] Récupérer tout les endroits");
            const places = yield models_1.placeModel.getAll();
            (0, response_1.APIResponse)(response, places, "OK");
        }
        catch (error) {
            logger_1.default.error("Erreur lors de la récupération des endroits: " + error.message);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la récupération des endroits", 500);
        }
    }),
};
exports.default = placesController;
