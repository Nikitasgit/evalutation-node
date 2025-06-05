"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fishes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.fishes = (0, pg_core_1.pgTable)("fishes", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull().unique(),
    level: (0, pg_core_1.integer)("level").default(1).notNull(),
    userId: (0, pg_core_1.uuid)("user_id")
        .references(() => _1.users.id, { onDelete: "cascade" })
        .notNull(),
    placeId: (0, pg_core_1.uuid)("place_id")
        .references(() => _1.places.id, { onDelete: "cascade" })
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
