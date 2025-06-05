import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";
import { placeModel } from "../models";
import { z } from "zod";
import { placeValidation } from "../validations";

const placesController = {
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[GET] Récupérer un endroit");
      const place = await placeModel.get(id);
      if (!place) return APIResponse(response, null, "Endroit inexistant", 404);
      APIResponse(response, place, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération de l'endroit: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération de l'endroit",
        500
      );
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      const { name } = placeValidation.parse(request.body);
      const { user } = response.locals;
      logger.info("[POST] Créer un endroit");
      const existingPlace = await placeModel.findByName(name);
      if (existingPlace) {
        return APIResponse(response, null, "Endroit déjà existant", 400);
      }
      const place = await placeModel.create({
        name,
        createdById: user.id,
      });
      APIResponse(response, place, "OK", 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return APIResponse(
          response,
          error.errors,
          "Le nom de l'endroit ou la catégorie est invalide",
          400
        );
      }
      logger.error("Erreur lors de la création de l'endroit: " + error.message);
      APIResponse(
        response,
        null,
        "Erreur lors de la création de l'endroit",
        500
      );
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { user } = response.locals;
      logger.info("[DELETE] Supprimer un endroit");
      await placeModel.delete(id, user.id);
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la suppression de l'endroit: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression de l'endroit",
        500
      );
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { name } = placeValidation.parse(request.body);
      const { user } = response.locals;
      logger.info("[UPDATE] Update d'un endroit");
      const existingPlace = await placeModel.findByName(name);
      if (existingPlace && existingPlace.id !== id) {
        return APIResponse(response, null, "Endroit déjà existant", 400);
      }

      const place = await placeModel.update(id, user.id, {
        name,
        createdById: user.id,
      });
      if (!place) return APIResponse(response, null, "Endroit inexistant", 404);
      APIResponse(response, place, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la màj de l'endroit: " + error.message);
      APIResponse(response, null, "Erreur lors de la màj de l'endroit", 500);
    }
  },
  getAll: async (request: Request, response: Response) => {
    try {
      logger.info("[GET] Récupérer tout les endroits");
      const places = await placeModel.getAll();
      APIResponse(response, places, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération des endroits: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des endroits",
        500
      );
    }
  },
};

export default placesController;
