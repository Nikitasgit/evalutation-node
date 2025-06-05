import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { fishingRods } from "../schemas";

export type FishingRod = InferSelectModel<typeof fishingRods>;
export type NewFishingRod = InferInsertModel<typeof fishingRods>;
