import { db } from "../config/pool";
import logger from "../utils/logger";
import { fishingRods, places } from "../schemas";
import { and, eq } from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";

type NewFishingRod = InferInsertModel<typeof fishingRods>;

export const fishingRodModel = {
  getAll: async () => {
    try {
      const allFishingRods = await db.query.fishingRods.findMany({
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
      return allFishingRods;
    } catch (err: any) {
      logger.error("Impossible de récupérer les cannes à pêche: ", err.message);
      return [];
    }
  },

  get: (id: string) => {
    try {
      return db.query.fishingRods.findFirst({
        where: eq(fishingRods.id, id),
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
    } catch (err: any) {
      logger.error("Impossible de récupérer la canne à pêche: ", err.message);
      throw new Error("La canne à pêche ne peut pas être récupérée");
    }
  },

  create: (fishingRod: NewFishingRod) => {
    try {
      return db
        .insert(fishingRods)
        .values(fishingRod)
        .returning({
          id: fishingRods.id,
          name: fishingRods.name,
        })
        .execute();
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de la canne à pêche: ${err.message}`
      );
      throw new Error("Impossible de créer la canne à pêche");
    }
  },

  delete: (id: string, createdById: string) => {
    try {
      return db
        .delete(fishingRods)
        .where(
          and(eq(fishingRods.id, id), eq(fishingRods.createdById, createdById))
        )
        .execute();
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de la canne à pêche: ${err.message}`
      );
      throw new Error("Impossible de supprimer la canne à pêche");
    }
  },

  update: (id: string, fishingRod: NewFishingRod) => {
    try {
      return db
        .update(fishingRods)
        .set(fishingRod)
        .where(eq(fishingRods.id, id))
        .returning({
          id: fishingRods.id,
          name: fishingRods.name,
        })
        .execute();
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de la canne à pêche: ${err.message}`
      );
      throw new Error("Impossible de mettre à jour la canne à pêche");
    }
  },

  findByName: (name: string) => {
    try {
      return db.query.fishingRods.findFirst({
        where: eq(fishingRods.name, name),
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la recherche de la canne à pêche: ${err.message}`
      );
      throw new Error("Impossible de rechercher la canne à pêche");
    }
  },

  getByUserId: (userId: string) => {
    try {
      return db.query.fishingRods.findFirst({
        where: eq(fishingRods.createdById, userId),
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de la canne à pêche: ${err.message}`
      );
      throw new Error("Impossible de récupérer la canne à pêche");
    }
  },
};
