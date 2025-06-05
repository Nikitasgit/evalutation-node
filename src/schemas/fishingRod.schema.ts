import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const fishingRods = pgTable("fishing_rods", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});
