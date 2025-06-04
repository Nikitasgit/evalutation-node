import { Request, Response } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { APIResponse } from "../utils";
import logger from "../utils/logger";
import { hashPassword, verifyPassword } from "../utils/password";
import { userRegisterValidation } from "../validations";
import { z } from "zod";
import { userModel } from "../models/users.model";

const { JWT_SECRET, NODE_ENV } = env;

const authController = {
  login: async (request: Request, response: Response) => {
    try {
      const { email, username, password } = request.body;
      const user = email
        ? await userModel.findByEmail(email)
        : await userModel.findByUsername(username);

      if (!user) {
        return APIResponse(
          response,
          null,
          "Les identifiants saisits sont incorrects",
          400
        );
      }

      const validPassword = await verifyPassword(user.password, password);
      if (!validPassword)
        return APIResponse(
          response,
          null,
          "Les identifiants saisits sont incorrects",
          400
        );

      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: "2h",
      });

      response.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV === "production",
      });

      APIResponse(response, null, "Vous êtes bien connecté", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la connexion de l'utilisateur: ${err.message}`
      );
      APIResponse(response, null, "Erreur serveur", 500);
    }
  },
  register: async (request: Request, response: Response) => {
    try {
      const { username, email, password } = userRegisterValidation.parse(
        request.body
      );

      const existingEmail = await userModel.findByEmail(email);
      if (existingEmail) {
        return APIResponse(
          response,
          null,
          "Cette adresse email est déjà utilisée",
          400
        );
      }
      const existingUsername = await userModel.findByUsername(username);
      if (existingUsername) {
        return APIResponse(
          response,
          null,
          "Ce nom d'utilisateur est déjà utilisé",
          400
        );
      }

      const hash = await hashPassword(password);
      if (!hash) {
        return APIResponse(
          response,
          null,
          "Un problème est survenu lors du hash",
          500
        );
      }

      const [newUser] = await userModel.create({
        username,
        email,
        password: hash,
      });
      if (!newUser)
        return APIResponse(
          response,
          null,
          "Un problème est survenu lors de l'inscription",
          500
        );

      APIResponse(response, newUser, "Vous êtes inscrit", 201);
    } catch (err: any) {
      logger.error(
        `Erreur lors de l'inscription de l'utilisateur: ${err.message}`
      );
      if (err instanceof z.ZodError) {
        return APIResponse(
          response,
          err.errors,
          "Le formulaire est invalide",
          400
        );
      }
      APIResponse(response, null, "Erreur serveur", 500);
    }
  },
  logout: async (request: Request, response: Response) => {
    response.clearCookie("accessToken");
    APIResponse(response, null, "Vous êtes déconnecté", 200);
  },
};

export default authController;
