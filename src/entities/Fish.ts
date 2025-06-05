import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { fishes } from "../schemas";

export type Fish = InferSelectModel<typeof fishes>;
export type NewFish = InferInsertModel<typeof fishes>;
