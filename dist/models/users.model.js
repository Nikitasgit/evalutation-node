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
exports.userModel = void 0;
const pool_1 = require("../config/pool");
const logger_1 = __importDefault(require("../utils/logger"));
const schemas_1 = require("../schemas");
const drizzle_orm_1 = require("drizzle-orm");
exports.userModel = {
    getAll: () => {
        try {
            return pool_1.db
                .select({
                id: schemas_1.users.id,
                username: schemas_1.users.username,
                email: schemas_1.users.email,
                level: schemas_1.users.level,
                createdAt: schemas_1.users.createdAt,
                updatedAt: schemas_1.users.updatedAt,
            })
                .from(schemas_1.users);
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la récupération des utilisateurs; ${err.message}`);
            throw new Error("Impossible de récupérer les utilisateurs");
        }
    },
    get: (id) => {
        try {
            return pool_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.users.id, id),
                columns: {
                    id: true,
                    username: true,
                    email: true,
                    level: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    },
    findByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return pool_1.db
            .select({
            id: schemas_1.users.id,
            password: schemas_1.users.password,
            username: schemas_1.users.username,
            email: schemas_1.users.email,
        })
            .from(schemas_1.users)
            .where((0, drizzle_orm_1.eq)(schemas_1.users.email, email))
            .then((rows) => rows[0]);
    }),
    findByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () {
        return pool_1.db
            .select({
            id: schemas_1.users.id,
            password: schemas_1.users.password,
            username: schemas_1.users.username,
            email: schemas_1.users.email,
        })
            .from(schemas_1.users)
            .where((0, drizzle_orm_1.eq)(schemas_1.users.username, username))
            .then((rows) => rows[0]);
    }),
    create: (user) => {
        try {
            return pool_1.db.insert(schemas_1.users).values(user).returning({
                id: schemas_1.users.id,
                username: schemas_1.users.username,
                email: schemas_1.users.email,
                level: schemas_1.users.level,
            });
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
            throw new Error("Impossible de créer l'utilisateur");
        }
    },
    update: (id, user) => {
        try {
            return pool_1.db.update(schemas_1.users).set(user).where((0, drizzle_orm_1.eq)(schemas_1.users.id, id)).returning({
                id: schemas_1.users.id,
                username: schemas_1.users.username,
                email: schemas_1.users.email,
            });
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la mise à jour de l'utilisateur; ${err.message}`);
            throw new Error("Impossible de mettre à jour l'utilisateur");
        }
    },
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return pool_1.db.delete(schemas_1.users).where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
        }
        catch (err) {
            logger_1.default.error(`Erreur lors de la suppression de l'utilisateur; ${err.message}`);
            throw new Error("Impossible de supprimer l'utilisateur");
        }
    }),
};
