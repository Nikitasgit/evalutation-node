import { db } from "../config/pool";
import logger from "../utils/logger";
import { users } from "../schemas";
import { NewUser, UpdateUser } from "../entities/User";
import { eq } from "drizzle-orm";

export const userModel = {
  getAll: () => {
    try {
      return db
        .select({
          id: users.id,
          username: users.username,
          email: users.email,
          level: users.level,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .from(users);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des utilisateurs; ${err.message}`
      );
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  },
  get: (id: string) => {
    try {
      return db.query.users.findFirst({
        where: eq(users.id, id),
        columns: {
          id: true,
          username: true,
          email: true,
          level: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de l'utilisateur; ${err.message}`
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  findByEmail: async (email: string) => {
    return db
      .select({
        id: users.id,
        password: users.password,
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(eq(users.email, email))
      .then((rows) => rows[0]);
  },
  findByUsername: async (username: string) => {
    return db
      .select({
        id: users.id,
        password: users.password,
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(eq(users.username, username))
      .then((rows) => rows[0]);
  },
  create: (user: NewUser) => {
    try {
      return db.insert(users).values(user).returning({
        id: users.id,
        username: users.username,
        email: users.email,
        level: users.level,
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de l'utilisateur; ${err.message}`
      );
      throw new Error("Impossible de créer l'utilisateur");
    }
  },
  update: (id: string, user: UpdateUser) => {
    try {
      return db.update(users).set(user).where(eq(users.id, id)).returning({
        id: users.id,
        username: users.username,
        email: users.email,
        level: users.level,
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la mise à jour de l'utilisateur; ${err.message}`
      );
      throw new Error("Impossible de mettre à jour l'utilisateur");
    }
  },
  delete: async (id: string) => {
    try {
      return db.delete(users).where(eq(users.id, id));
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de l'utilisateur; ${err.message}`
      );
      throw new Error("Impossible de supprimer l'utilisateur");
    }
  },
};
