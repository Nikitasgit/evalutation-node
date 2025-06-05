import { z } from "zod";

export const fishingRodValidation = z.object({
  name: z
    .string()
    .trim()
    .min(4, {
      message:
        "Le nom de la canne à pêche doit contenir au moins 4 caractères ",
    })
    .max(20, {
      message: "Le nom de la canne à pêche doit contenir maximum 20 caractères",
    })
    .regex(/^[a-zA-ZÀ-ÿ0-9\s'-]+$/, {
      message:
        "Le nom de la canne à pêche ne doit pas contenir de caractères spéciaux",
    }),
});
