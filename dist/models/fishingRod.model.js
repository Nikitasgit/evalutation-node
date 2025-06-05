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
exports.fishingRodModel = void 0;
const pool_1 = require("../config/pool");
const logger_1 = __importDefault(require("../utils/logger"));
const schemas_1 = require("../schemas");
const drizzle_orm_1 = require("drizzle-orm");
exports.fishingRodModel = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allFishingRods = yield pool_1.db.query.fishingRods.findMany({
                with: {
                    createdBy: {
                        columns: {
                            id: true,
                            username: true,
                            email: true,
                            level: true,
                        },
                    },
                },
            });
            return allFishingRods;
        }
        catch (err) {
            logger_1.default.error("Impossible de récupérer les cannes à pêche: ", err.message);
            return [];
        }
    }),
    get: (id) => {
        try {
            return pool_1.db.query.fishingRods.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.fishingRods.id, id),
                columns: {
                    id: true,
                    name: true,
                },
                with: {
                    createdBy: {
                        columns: {
                            id: true,
                            username: true,
                            email: true,
                            level: true,
                        },
                    },
                },
            });
        }
        catch (err) {
            logger_1.default.error("Impossible de récupérer la canne à pêche: ", err.message);
            throw new Error("La canne à pêche ne peut pas être récupérée");
        }
    },
    create: (fishingRod) => {
        try {
            return pool_1.db
                .insert(schemas_1.fishingRods)
                .values(fishingRod)
                .returning({
                id: schemas_1.fishingRods.id,
                name: schemas_1.fishingRods.name,
            })
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la création de la canne à pêche: ${err.message}`);
            throw new Error("Impossible de créer la canne à pêche");
        }
    },
    delete: (id, createdById) => {
        try {
            return pool_1.db
                .delete(schemas_1.fishingRods)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.fishingRods.id, id), (0, drizzle_orm_1.eq)(schemas_1.fishingRods.createdById, createdById)))
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la suppression de la canne à pêche: ${err.message}`);
            throw new Error("Impossible de supprimer la canne à pêche");
        }
    },
    update: (id, fishingRod) => {
        try {
            return pool_1.db
                .update(schemas_1.fishingRods)
                .set(fishingRod)
                .where((0, drizzle_orm_1.eq)(schemas_1.fishingRods.id, id))
                .returning({
                id: schemas_1.fishingRods.id,
                name: schemas_1.fishingRods.name,
            })
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la mise à jour de la canne à pêche: ${err.message}`);
            throw new Error("Impossible de mettre à jour la canne à pêche");
        }
    },
    findByName: (name) => {
        try {
            return pool_1.db.query.fishingRods.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.fishingRods.name, name),
            });
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la recherche de la canne à pêche: ${err.message}`);
            throw new Error("Impossible de rechercher la canne à pêche");
        }
    },
};
