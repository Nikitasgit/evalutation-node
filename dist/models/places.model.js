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
exports.placeModel = void 0;
const pool_1 = require("../config/pool");
const logger_1 = __importDefault(require("../utils/logger"));
const schemas_1 = require("../schemas");
const drizzle_orm_1 = require("drizzle-orm");
exports.placeModel = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allPlaces = yield pool_1.db.query.places.findMany({
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
            return allPlaces;
        }
        catch (err) {
            logger_1.default.error("Impossible de récupérer les endroits: ", err.message);
            return [];
        }
    }),
    get: (id) => {
        try {
            return pool_1.db.query.places.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.places.id, id),
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
            logger_1.default.error("Impossible de récupérer l'endroit: +", err.message);
            throw new Error("L'endroit ne peut pas être récupéré");
        }
    },
    create: (place) => {
        try {
            return pool_1.db
                .insert(schemas_1.places)
                .values(place)
                .returning({
                id: schemas_1.places.id,
                name: schemas_1.places.name,
            })
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la création de l'endroit; ${err.message}`);
            throw new Error("Impossible de créer l'endroit");
        }
    },
    delete: (id, userId) => {
        try {
            return pool_1.db
                .delete(schemas_1.places)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.places.id, id), (0, drizzle_orm_1.eq)(schemas_1.places.createdById, userId)))
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la suppression de l'endroit; ${err.message}`);
            throw new Error("Impossible de supprimer l'endroit");
        }
    },
    update: (id, userId, place) => {
        try {
            return pool_1.db
                .update(schemas_1.places)
                .set(place)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.places.id, id), (0, drizzle_orm_1.eq)(schemas_1.places.createdById, userId)))
                .returning({
                id: schemas_1.places.id,
                name: schemas_1.places.name,
            })
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la mise à jour de l'endroit; ${err.message}`);
            throw new Error("Impossible de mettre à jour l'endroit");
        }
    },
    findByName: (name) => {
        try {
            return pool_1.db.query.places.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.places.name, name),
            });
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la recherche de l'endroit; ${err.message}`);
            throw new Error("Impossible de rechercher l'endroit");
        }
    },
};
