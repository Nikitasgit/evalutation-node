import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { userModel } from "../models";
import { userUpdateValidation } from "../validations";

const usersController = {
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[GET] Récupérer un utilisateur");
      const user = await userModel.get(id);
      if (!user)
        return APIResponse(response, null, "Utilisateur inexistant", 404);
      APIResponse(response, user, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération de l'utilisateur: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération de l'utilisateur: " + error.message,
        500
      );
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { username, email } = userUpdateValidation.parse(request.body);
      const { user } = response.locals;
      logger.info("[UPDATE] Update d'un utilisateur");

      if (email) {
        const existingEmail = await userModel.findByEmail(email);
        if (existingEmail && existingEmail.id !== user.id) {
          return APIResponse(
            response,
            null,
            "Cette adresse email est déjà utilisée",
            400
          );
        }
      }

      if (username) {
        const existingUsername = await userModel.findByUsername(username);
        if (existingUsername && existingUsername.id !== user.id) {
          return APIResponse(
            response,
            null,
            "Ce nom d'utilisateur est déjà utilisé",
            400
          );
        }
      }

      const updatedUser = await userModel.update(user.id, {
        ...user,
        username: username || user.username,
        email: email || user.email,
      });

      APIResponse(response, updatedUser[0], "OK", 201);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la mise à jour de l'utilisateur: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la mise à jour de l'utilisateur",
        500
      );
    }
  },
  getAll: async (request: Request, response: Response) => {
    try {
      logger.info("[GET] Récupérer tout les utilisateurs");
      const users = await userModel.getAll();
      APIResponse(response, users, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération des utilisateurs: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des utilisateurs",
        500
      );
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { user } = response.locals;
      logger.info("[DELETE] Supprimer un utilisateur");
      await userModel.delete(user.id);
      APIResponse(response, null, "OK", 204);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la suppression de l'utilisateur: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression de l'utilisateur",
        500
      );
    }
  },
};

export default usersController;
