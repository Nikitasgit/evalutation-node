import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { fishModel, placeModel } from "../models";
import { z } from "zod";
import { fishValidation } from "../validations";
import { fishingRodModel } from "../models/fishingRod.model";
import { userModel } from "../models/users.model";
import { UpdateUser } from "../entities/User";

const fishesController = {
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[GET] Récupérer un poisson");
      const fish = await fishModel.get(id);
      if (!fish) return APIResponse(response, null, "Poisson inexistant", 404);
      APIResponse(response, fish, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération du poisson: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du post",
        500
      );
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      const { name, placeId } = fishValidation.parse(request.body);
      const { user } = response.locals;
      logger.info("[POST] Créer un poisson");

      const place = await placeModel.get(placeId);
      if (!place) {
        return APIResponse(response, null, "Lieu inexistant", 404);
      }
      if (place.createdBy.id !== user.id) {
        return APIResponse(
          response,
          null,
          "Vous n'êtes pas autorisé à ajouter un poisson à ce lieu",
          403
        );
      }

      const existingFish = await fishModel.findByName(name);
      if (existingFish) {
        return APIResponse(response, null, "Poisson déjà existant", 400);
      }

      const fish = await fishModel.create({
        name,
        placeId,
        userId: user.id,
      });

      APIResponse(response, fish, "OK", 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return APIResponse(
          response,
          error.errors,
          "Le nom du poisson ou l'id de l'endroit est invalide",
          400
        );
      }
      logger.error("Erreur lors de la création du poisson: " + error.message);
      APIResponse(response, null, "Erreur lors de la création du poisson", 500);
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { user } = response.locals;

      logger.info("[DELETE] Supprimer un poisson");
      await fishModel.delete(id, user.id);
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la suppression du poisson: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression du poisson",
        500
      );
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { name, placeId } = fishValidation.parse(request.body);
      const { user } = response.locals;
      logger.info("[UPDATE] Update d'un poisson");
      const place = await placeModel.get(placeId);
      if (!place) {
        return APIResponse(response, null, "Lieu inexistant", 404);
      }
      if (place.createdBy.id !== user.id) {
        return APIResponse(
          response,
          null,
          "Vous n'êtes pas autorisé à modifier un poisson de ce lieu",
          403
        );
      }
      const existingFish = await fishModel.findByName(name);
      if (existingFish && existingFish.id !== id) {
        return APIResponse(response, null, "Poisson déjà existant", 400);
      }
      const fish = await fishModel.update(id, user.id, {
        name,
        placeId,
        userId: user.id,
      });
      APIResponse(response, fish, "OK", 201);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la mise à jour du poisson: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la mise à jour du poisson",
        500
      );
    }
  },
  getAll: async (request: Request, response: Response) => {
    try {
      logger.info("[GET] Récupérer tout les poissons");
      const fishes = await fishModel.getAll();
      APIResponse(response, fishes, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération des poissons: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des poissons",
        500
      );
    }
  },
  catch: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { user } = response.locals;
      logger.info("[POST] Capture d'un poisson");
      const fish = await fishModel.get(id);
      if (!fish) return APIResponse(response, null, "Poisson introuvable", 404);
      const fishingRod = await fishingRodModel.getByUserId(user.id);
      if (!fishingRod) {
        return APIResponse(
          response,
          null,
          "Vous n'avez pas de canne à pêche",
          403
        );
      }
      const place = await placeModel.get(fish.placeId);
      if (place?.createdBy.id !== user.id) {
        return APIResponse(
          response,
          null,
          "Vous n'êtes pas autorisé à capturer ce poisson",
          403
        );
      }
      const updateData: UpdateUser = {
        level: Number(user.level) + 1,
      };
      const updatedUser = await userModel.update(user.id, updateData);
      await fishModel.delete(id, user.id);
      APIResponse(response, updatedUser[0], "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la capture du poisson: " + error.message);
      APIResponse(response, null, "Erreur lors de la capture du poisson", 500);
    }
  },
};

export default fishesController;
