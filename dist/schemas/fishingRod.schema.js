"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fishingRods = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_schema_1 = require("./user.schema");
exports.fishingRods = (0, pg_core_1.pgTable)("fishing_rods", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    catchRate: (0, pg_core_1.integer)("catch_rate").notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    createdById: (0, pg_core_1.uuid)("created_by_id")
        .notNull()
        .references(() => user_schema_1.users.id, { onDelete: "cascade" }),
});
