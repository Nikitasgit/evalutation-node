import dotenv from "dotenv";
import { EnvConfig } from "../types/env";

dotenv.config();

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT as string),
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  ORIGIN: process.env.ORIGIN as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
