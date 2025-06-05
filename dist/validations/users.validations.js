"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidation = exports.userRegisterValidation = void 0;
const zod_1 = require("zod");
exports.userRegisterValidation = zod_1.z.object({
    username: zod_1.z
        .string()
        .trim()
        .min(6, { message: "L'username doit contenir au moins 6 caractères " })
        .max(13, { message: "L'username doit contenir maximum 13 caractères" }),
    email: zod_1.z.string().trim().email({ message: "Adresse email invalide" }),
    password: zod_1.z
        .string()
        .trim()
        .min(12, {
        message: "Votre mot de passe doit contenir au moins 12 caractères",
    })
        .regex(/[A-Z]/, {
        message: "Votre mot de passe doit contenir au moins une lettre majuscule",
    })
        .regex(/[0-9]/, {
        message: "Votre mot de passe doit contenir au moins un chiffre",
    })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Votre mot de passe doit contenir au moins un caractère spécial",
    }),
});
exports.userUpdateValidation = zod_1.z.object({
    username: zod_1.z
        .string()
        .trim()
        .min(6, { message: "L'username doit contenir au moins 6 caractères " })
        .max(13, { message: "L'username doit contenir maximum 13 caractères" }),
    email: zod_1.z.string().trim().email({ message: "Adresse email invalide" }),
});
