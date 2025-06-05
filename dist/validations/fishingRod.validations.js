"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fishingRodValidation = void 0;
const zod_1 = require("zod");
exports.fishingRodValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(4, {
        message: "Le nom de la canne à pêche doit contenir au moins 4 caractères ",
    })
        .max(20, {
        message: "Le nom de la canne à pêche doit contenir maximum 20 caractères",
    })
        .regex(/^[a-zA-ZÀ-ÿ0-9\s'-]+$/, {
        message: "Le nom de la canne à pêche ne doit pas contenir de caractères spéciaux",
    }),
});
