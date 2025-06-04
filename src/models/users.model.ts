import { db } from "../config/pool";
import logger from "../utils/logger";
import { users } from "../schemas";
import { NewUser } from "../entities/User";
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
};
