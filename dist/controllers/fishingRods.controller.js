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
const logger_1 = __importDefault(require("../utils/logger"));
const response_1 = require("../utils/response");
const fishingRod_model_1 = require("../models/fishingRod.model");
const validations_1 = require("../validations");
const fishingRodController = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const fishingRods = yield fishingRod_model_1.fishingRodModel.getAll();
            (0, response_1.APIResponse)(res, fishingRods, "OK");
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération des cannes à pêche:", err);
            (0, response_1.APIResponse)(res, null, "Erreur lors de la récupération des cannes à pêche", 500);
        }
    }),
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const fishingRod = yield fishingRod_model_1.fishingRodModel.get(id);
            if (!fishingRod) {
                return (0, response_1.APIResponse)(res, null, "Canne à pêche non trouvée", 404);
            }
            (0, response_1.APIResponse)(res, fishingRod, "OK");
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération de la canne à pêche:", err);
            (0, response_1.APIResponse)(res, null, "Erreur lors de la récupération de la canne à pêche", 500);
        }
    }),
    create: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name } = validations_1.fishingRodValidation.parse(request.body);
            const { user } = response.locals;
            if (!name) {
                return (0, response_1.APIResponse)(response, null, "Le nom de la canne à pêche est requis", 400);
            }
            const existingFishingRod = yield fishingRod_model_1.fishingRodModel.findByName(name);
            if (existingFishingRod) {
                return (0, response_1.APIResponse)(response, null, "Une canne à pêche avec ce nom existe déjà", 409);
            }
            const userFishingRod = yield fishingRod_model_1.fishingRodModel.getByUserId(user.id);
            if (userFishingRod) {
                return (0, response_1.APIResponse)(response, null, "Vous possédez déjà une canne à pêche", 409);
            }
            const newFishingRod = yield fishingRod_model_1.fishingRodModel.create({
                name,
                catchRate: Math.floor(Math.random() * 100),
                createdById: user.id,
            });
            (0, response_1.APIResponse)(response, newFishingRod[0], "OK", 201);
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la création de la canne à pêche:", err);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la création de la canne à pêche", 500);
        }
    }),
    update: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { name } = validations_1.fishingRodValidation.parse(request.body);
            const { user } = response.locals;
            if (!name) {
                return (0, response_1.APIResponse)(response, null, "Le nom de la canne à pêche est requis", 400);
            }
            const existingFishingRod = yield fishingRod_model_1.fishingRodModel.get(id);
            if (!existingFishingRod) {
                return (0, response_1.APIResponse)(response, null, "Canne à pêche non trouvée", 404);
            }
            const fishingRodWithSameName = yield fishingRod_model_1.fishingRodModel.findByName(name);
            if (fishingRodWithSameName && fishingRodWithSameName.id !== id) {
                return (0, response_1.APIResponse)(response, null, "Une canne à pêche avec ce nom existe déjà", 409);
            }
            const updatedFishingRod = yield fishingRod_model_1.fishingRodModel.update(id, {
                name,
                catchRate: existingFishingRod.catchRate,
                createdById: user.id,
            });
            (0, response_1.APIResponse)(response, updatedFishingRod[0], "OK");
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la mise à jour de la canne à pêche:", err);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la mise à jour de la canne à pêche", 500);
        }
    }),
    delete: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { user } = response.locals;
            const existingFishingRod = yield fishingRod_model_1.fishingRodModel.get(id);
            if (!existingFishingRod) {
                return (0, response_1.APIResponse)(response, null, "Canne à pêche non trouvée", 404);
            }
            yield fishingRod_model_1.fishingRodModel.delete(id, user.id);
            (0, response_1.APIResponse)(response, null, "OK", 204);
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la suppression de la canne à pêche:", err);
            (0, response_1.APIResponse)(response, null, "Erreur lors de la suppression de la canne à pêche", 500);
        }
    }),
};
exports.default = fishingRodController;
