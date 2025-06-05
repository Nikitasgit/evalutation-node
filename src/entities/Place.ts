import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { places } from "../schemas";

export type Place = InferSelectModel<typeof places>;
export type NewPlace = InferInsertModel<typeof places>;
