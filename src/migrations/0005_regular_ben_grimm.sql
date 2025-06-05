ALTER TABLE "fishing_rods" DROP CONSTRAINT "fishing_rods_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "places" DROP CONSTRAINT "places_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "fishing_rods" ADD CONSTRAINT "fishing_rods_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "places" ADD CONSTRAINT "places_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;