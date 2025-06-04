"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
const env_1 = require("./env");
const { DATABASE_URL } = env_1.env;
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    out: "src/migrations",
    schema: "src/schemas/index.ts",
    dbCredentials: {
        url: DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
