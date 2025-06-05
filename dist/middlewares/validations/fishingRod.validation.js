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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fishingRodValidation = void 0;
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("./validateRequest");
const fishingRod_model_1 = require("../../models/fishingRod.model");
exports.fishingRodValidation = {
    create: [
        (0, express_validator_1.body)("name")
            .trim()
            .notEmpty()
            .withMessage("Le nom de la canne à pêche est requis")
            .isLength({ min: 2, max: 255 })
            .withMessage("Le nom doit contenir entre 2 et 255 caractères")
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            const existingFishingRod = yield fishingRod_model_1.fishingRodModel.findByName(value);
            if (existingFishingRod) {
                throw new Error("Une canne à pêche avec ce nom existe déjà");
            }
            return true;
        })),
        validateRequest_1.validateRequest,
    ],
    update: [
        (0, express_validator_1.param)("id")
            .isUUID()
            .withMessage("ID de canne à pêche invalide")
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            const existingFishingRod = yield fishingRod_model_1.fishingRodModel.get(value);
            if (!existingFishingRod) {
                throw new Error("Canne à pêche non trouvée");
            }
            return true;
        })),
        (0, express_validator_1.body)("name")
            .trim()
            .notEmpty()
            .withMessage("Le nom de la canne à pêche est requis")
            .isLength({ min: 2, max: 255 })
            .withMessage("Le nom doit contenir entre 2 et 255 caractères")
            .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
            const fishingRodWithSameName = yield fishingRod_model_1.fishingRodModel.findByName(value);
            if (fishingRodWithSameName &&
                fishingRodWithSameName.id !== req.params.id) {
                throw new Error("Une canne à pêche avec ce nom existe déjà");
            }
            return true;
        })),
        validateRequest_1.validateRequest,
    ],
    get: [
        (0, express_validator_1.param)("id").isUUID().withMessage("ID de canne à pêche invalide"),
        validateRequest_1.validateRequest,
    ],
    delete: [
        (0, express_validator_1.param)("id")
            .isUUID()
            .withMessage("ID de canne à pêche invalide")
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            const existingFishingRod = yield fishingRod_model_1.fishingRodModel.get(value);
            if (!existingFishingRod) {
                throw new Error("Canne à pêche non trouvée");
            }
            return true;
        })),
        validateRequest_1.validateRequest,
    ],
};
