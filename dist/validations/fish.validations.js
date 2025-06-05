"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fishValidation = void 0;
const zod_1 = require("zod");
exports.fishValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(4, {
        message: "Le nom du poisson doit contenir au moins 4 caractères ",
    })
        .max(20, {
        message: "Le nom du poisson doit contenir maximum 20 caractères",
    })
        .regex(/^[a-zA-ZÀ-ÿ0-9\s'-]+$/, {
        message: "Le nom du poisson ne doit pas contenir de caractères spéciaux",
    }),
    placeId: zod_1.z.string().uuid({ message: "L'id de l'endroit est invalide" }),
});
