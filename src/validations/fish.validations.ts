import { z } from "zod";

export const fishValidation = z.object({
  name: z
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
  placeId: z.string().uuid({ message: "L'id de l'endroit est invalide" }),
});
