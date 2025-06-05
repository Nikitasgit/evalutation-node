"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.places = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_schema_1 = require("./user.schema");
exports.places = (0, pg_core_1.pgTable)("places", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull().unique(),
    createdById: (0, pg_core_1.uuid)("created_by_id")
        .notNull()
        .references(() => user_schema_1.users.id, { onDelete: "cascade" }),
});
