import { db } from "../config/pool";
import logger from "../utils/logger";
import { fishes } from "../schemas";
import { NewFish } from "../entities/Fish";
import { and, eq } from "drizzle-orm";

export const fishModel = {
  getAll: () => {
    try {
      return db
        .select({
          id: fishes.id,
          name: fishes.name,
          level: fishes.level,
          createdAt: fishes.createdAt,
          updatedAt: fishes.updatedAt,
        })
        .from(fishes);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des poissons; ${err.message}`
      );
      throw new Error("Impossible de récupérer les poissons");
    }
  },
  get: (id: string) => {
    try {
      return db.query.fishes.findFirst({
        where: eq(fishes.id, id),
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
    } catch (err: any) {
      logger.error(`Erreur lors de la récupération du poisson; ${err.message}`);
      throw new Error("Impossible de récupérer le poisson");
    }
  },
  create: (fish: NewFish) => {
    try {
      return db
        .insert(fishes)
        .values(fish)
        .returning({
          id: fishes.id,
          name: fishes.name,
        })
        .execute();
    } catch (err: any) {
      logger.error(`Erreur lors de la création du poisson; ${err.message}`);
      throw new Error("Impossible de créer le poisson");
    }
  },
  delete: (id: string, userId: string) => {
    try {
      return db
        .delete(fishes)
        .where(and(eq(fishes.id, id), eq(fishes.userId, userId)))
        .execute();
    } catch (err: any) {
      logger.error(`Erreur lors de la suppression du poisson; ${err.message}`);
      throw new Error("Impossible de supprimer le poisson");
    }
  },
  update: (id: string, userId: string, fish: NewFish) => {
    try {
      return db
        .update(fishes)
        .set({
          ...fish,
          updatedAt: new Date(),
        })
        .where(and(eq(fishes.id, id), eq(fishes.userId, userId)))
        .returning({
          id: fishes.id,
          name: fishes.name,
        })
        .execute();
    } catch (err: any) {
      logger.error(`Erreur lors de la mise à jour du poisson; ${err.message}`);
    }
  },
  findByName: (name: string) => {
    try {
      return db.query.fishes.findFirst({
        where: eq(fishes.name, name),
      });
    } catch (err: any) {
      logger.error(`Erreur lors de la recherche du poisson; ${err.message}`);
      throw new Error("Impossible de rechercher le poisson");
    }
  },
};
