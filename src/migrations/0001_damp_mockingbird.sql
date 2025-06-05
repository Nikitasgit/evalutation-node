ALTER TABLE "users" DROP CONSTRAINT "users_place_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_place_id_places_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "place_id";