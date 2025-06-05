import { db } from "../config/pool";
import logger from "../utils/logger";
import { fishes, places } from "../schemas";
import { and, eq } from "drizzle-orm";
import { NewPlace } from "../entities/Place";

export const placeModel = {
  getAll: async () => {
    try {
      const allPlaces = await db.query.places.findMany({
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
      return allPlaces;
    } catch (err: any) {
      logger.error("Impossible de récupérer les endroits: ", err.message);
      return [];
    }
  },
  get: (id: string) => {
    try {
      return db.query.places.findFirst({
        where: eq(places.id, id),
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
      logger.error("Impossible de récupérer l'endroit: +", err.message);
      throw new Error("L'endroit ne peut pas être récupéré");
    }
  },
  create: (place: NewPlace) => {
    try {
      return db
        .insert(places)
        .values(place)
        .returning({
          id: places.id,
          name: places.name,
        })
        .execute();
    } catch (err: any) {
      logger.error(`Erreur lors de la création de l'endroit; ${err.message}`);
      throw new Error("Impossible de créer l'endroit");
    }
  },
  delete: (id: string, userId: string) => {
    try {
      return db
        .delete(places)
        .where(and(eq(places.id, id), eq(places.createdById, userId)))
        .execute();
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de l'endroit; ${err.message}`
      );
      throw new Error("Impossible de supprimer l'endroit");
    }
  },
  update: (id: string, userId: string, place: NewPlace) => {
    try {
      return db
        .update(places)
        .set(place)
        .where(and(eq(places.id, id), eq(places.createdById, userId)))
        .returning({
          id: places.id,
          name: places.name,
        })
        .execute();
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de l'endroit; ${err.message}`
      );
      throw new Error("Impossible de mettre à jour l'endroit");
    }
  },
  findByName: (name: string) => {
    try {
      return db.query.places.findFirst({
        where: eq(places.name, name),
      });
    } catch (err: any) {
      logger.error(`Erreur lors de la recherche de l'endroit; ${err.message}`);
      throw new Error("Impossible de rechercher l'endroit");
    }
  },
};
