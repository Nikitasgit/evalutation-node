"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeValidation = void 0;
const zod_1 = require("zod");
exports.placeValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(4, {
        message: "Le nom de l'endroit doit contenir au moins 4 caractères ",
    })
        .max(20, {
        message: "Le nom de l'endroit doit contenir maximum 20 caractères",
    })
        .regex(/^[a-zA-ZÀ-ÿ0-9\s'-]+$/, {
        message: "Le nom de l'endroit ne doit pas contenir de caractères spéciaux",
    }),
});
