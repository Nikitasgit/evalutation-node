"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fishingRodRelations = exports.placeRelations = exports.fishRelations = exports.userRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schemas_1 = require("../schemas");
exports.userRelations = (0, drizzle_orm_1.relations)(schemas_1.users, ({ many }) => ({
    fishingRods: many(schemas_1.fishingRods),
    places: many(schemas_1.places),
}));
exports.fishRelations = (0, drizzle_orm_1.relations)(schemas_1.fishes, ({ one }) => ({
    place: one(schemas_1.places, {
        fields: [schemas_1.fishes.placeId],
        references: [schemas_1.places.id],
    }),
}));
exports.placeRelations = (0, drizzle_orm_1.relations)(schemas_1.places, ({ one }) => ({
    createdBy: one(schemas_1.users, {
        fields: [schemas_1.places.createdById],
        references: [schemas_1.users.id],
    }),
}));
exports.fishingRodRelations = (0, drizzle_orm_1.relations)(schemas_1.fishingRods, ({ one }) => ({
    createdBy: one(schemas_1.users, {
        fields: [schemas_1.fishingRods.createdById],
        references: [schemas_1.users.id],
    }),
}));
