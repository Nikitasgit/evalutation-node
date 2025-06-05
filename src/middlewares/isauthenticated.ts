import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { APIResponse } from "../utils";

const { JWT_SECRET } = env;

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.cookies;
  if (!accessToken)
    return APIResponse(response, null, "Vous devez être connecté", 401);

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    response.locals.user = decoded;
    next();
  } catch (err: any) {
    return APIResponse(response, null, "Token invalide", 401);
  }
};
