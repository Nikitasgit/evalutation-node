ALTER TABLE "users" DROP CONSTRAINT "users_fishing_rod_fishing_rods_id_fk";
--> statement-breakpoint
ALTER TABLE "fishing_rods" ADD COLUMN "created_by_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "fishing_rods" ADD CONSTRAINT "fishing_rods_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "fishing_rod";