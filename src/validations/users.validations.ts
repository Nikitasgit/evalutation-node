import { z } from "zod";

export const userRegisterValidation = z.object({
  username: z
    .string()
    .trim()
    .min(6, { message: "L'username doit contenir au moins 6 caractères " })
    .max(13, { message: "L'username doit contenir maximum 13 caractères" }),

  email: z.string().trim().email({ message: "Adresse email invalide" }),

  password: z
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
