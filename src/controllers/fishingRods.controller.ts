import { Request, Response } from "express";
import logger from "../utils/logger";
import { APIResponse } from "../utils/response";
import { fishingRodModel } from "../models/fishingRod.model";
import { fishingRodValidation } from "../validations";

const fishingRodController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const fishingRods = await fishingRodModel.getAll();
      APIResponse(res, fishingRods, "OK");
    } catch (err: any) {
      logger.error("Erreur lors de la récupération des cannes à pêche:", err);
      APIResponse(
        res,
        null,
        "Erreur lors de la récupération des cannes à pêche",
        500
      );
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const fishingRod = await fishingRodModel.get(id);

      if (!fishingRod) {
        return APIResponse(res, null, "Canne à pêche non trouvée", 404);
      }

      APIResponse(res, fishingRod, "OK");
    } catch (err: any) {
      logger.error("Erreur lors de la récupération de la canne à pêche:", err);
      APIResponse(
        res,
        null,
        "Erreur lors de la récupération de la canne à pêche",
        500
      );
    }
  },

  create: async (request: Request, response: Response) => {
    try {
      const { name } = fishingRodValidation.parse(request.body);
      const { user } = response.locals;
      if (!name) {
        return APIResponse(
          response,
          null,
          "Le nom de la canne à pêche est requis",
          400
        );
      }

      const existingFishingRod = await fishingRodModel.findByName(name);
      if (existingFishingRod) {
        return APIResponse(
          response,
          null,
          "Une canne à pêche avec ce nom existe déjà",
          409
        );
      }

      const newFishingRod = await fishingRodModel.create({
        name,
        createdById: user.id,
      });
      APIResponse(response, newFishingRod[0], "OK", 201);
    } catch (err: any) {
      logger.error("Erreur lors de la création de la canne à pêche:", err);
      APIResponse(
        response,
        null,
        "Erreur lors de la création de la canne à pêche",
        500
      );
    }
  },

  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { name } = fishingRodValidation.parse(request.body);
      const { user } = response.locals;

      if (!name) {
        return APIResponse(
          response,
          null,
          "Le nom de la canne à pêche est requis",
          400
        );
      }

      const existingFishingRod = await fishingRodModel.get(id);
      if (!existingFishingRod) {
        return APIResponse(response, null, "Canne à pêche non trouvée", 404);
      }

      const fishingRodWithSameName = await fishingRodModel.findByName(name);
      if (fishingRodWithSameName && fishingRodWithSameName.id !== id) {
        return APIResponse(
          response,
          null,
          "Une canne à pêche avec ce nom existe déjà",
          409
        );
      }

      const updatedFishingRod = await fishingRodModel.update(id, {
        name,
        createdById: user.id,
      });
      APIResponse(response, updatedFishingRod[0], "OK");
    } catch (err: any) {
      logger.error("Erreur lors de la mise à jour de la canne à pêche:", err);
      APIResponse(
        response,
        null,
        "Erreur lors de la mise à jour de la canne à pêche",
        500
      );
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { user } = response.locals;
      const existingFishingRod = await fishingRodModel.get(id);
      if (!existingFishingRod) {
        return APIResponse(response, null, "Canne à pêche non trouvée", 404);
      }
      await fishingRodModel.delete(id, user.id);
      APIResponse(response, null, "OK", 204);
    } catch (err: any) {
      logger.error("Erreur lors de la suppression de la canne à pêche:", err);
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression de la canne à pêche",
        500
      );
    }
  },
};

export default fishingRodController;
