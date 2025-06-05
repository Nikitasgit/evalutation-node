"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fishModel = void 0;
const pool_1 = require("../config/pool");
const logger_1 = __importDefault(require("../utils/logger"));
const schemas_1 = require("../schemas");
const drizzle_orm_1 = require("drizzle-orm");
exports.fishModel = {
    getAll: () => {
        try {
            return pool_1.db
                .select({
                id: schemas_1.fishes.id,
                name: schemas_1.fishes.name,
                level: schemas_1.fishes.level,
                createdAt: schemas_1.fishes.createdAt,
                updatedAt: schemas_1.fishes.updatedAt,
            })
                .from(schemas_1.fishes);
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la récupération des poissons; ${err.message}`);
            throw new Error("Impossible de récupérer les poissons");
        }
    },
    get: (id) => {
        try {
            return pool_1.db.query.fishes.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.fishes.id, id),
                columns: {
                    id: true,
                    name: true,
                    level: true,
                    placeId: true,
                },
                with: {
                    place: {
                        columns: {
                            name: true,
                        },
                    },
                },
            });
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la récupération du poisson; ${err.message}`);
            throw new Error("Impossible de récupérer le poisson");
        }
    },
    create: (fish) => {
        try {
            return pool_1.db
                .insert(schemas_1.fishes)
                .values(fish)
                .returning({
                id: schemas_1.fishes.id,
                name: schemas_1.fishes.name,
            })
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la création du poisson; ${err.message}`);
            throw new Error("Impossible de créer le poisson");
        }
    },
    delete: (id, userId) => {
        try {
            return pool_1.db
                .delete(schemas_1.fishes)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.fishes.id, id), (0, drizzle_orm_1.eq)(schemas_1.fishes.userId, userId)))
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la suppression du poisson; ${err.message}`);
            throw new Error("Impossible de supprimer le poisson");
        }
    },
    update: (id, userId, fish) => {
        try {
            return pool_1.db
                .update(schemas_1.fishes)
                .set(Object.assign(Object.assign({}, fish), { updatedAt: new Date() }))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.fishes.id, id), (0, drizzle_orm_1.eq)(schemas_1.fishes.userId, userId)))
                .returning({
                id: schemas_1.fishes.id,
                name: schemas_1.fishes.name,
            })
                .execute();
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la mise à jour du poisson; ${err.message}`);
        }
    },
    findByName: (name) => {
        try {
            return pool_1.db.query.fishes.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.fishes.name, name),
            });
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la recherche du poisson; ${err.message}`);
            throw new Error("Impossible de rechercher le poisson");
        }
    },
};
