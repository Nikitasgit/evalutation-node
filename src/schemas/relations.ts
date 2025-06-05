import { relations } from "drizzle-orm";
import { users, fishes, fishingRods, places } from "../schemas";

export const userRelations = relations(users, ({ many }) => ({
  fishingRods: many(fishingRods),
  places: many(places),
}));

export const fishRelations = relations(fishes, ({ one }) => ({
  place: one(places, {
    fields: [fishes.placeId],
    references: [places.id],
  }),
}));

export const placeRelations = relations(places, ({ one }) => ({
  createdBy: one(users, {
    fields: [places.createdById],
    references: [users.id],
  }),
}));

export const fishingRodRelations = relations(fishingRods, ({ one }) => ({
  createdBy: one(users, {
    fields: [fishingRods.createdById],
    references: [users.id],
  }),
}));
