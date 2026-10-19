import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_instagram_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  ALTER TABLE "homepage" ADD COLUMN "instagram_overline" varchar;
  ALTER TABLE "homepage" ADD COLUMN "instagram_heading" varchar;
  ALTER TABLE "homepage" ADD COLUMN "instagram_cta_label" varchar;
  ALTER TABLE "homepage" ADD COLUMN "instagram_url" varchar;
  ALTER TABLE "homepage_instagram_photos" ADD CONSTRAINT "homepage_instagram_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_instagram_photos" ADD CONSTRAINT "homepage_instagram_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_instagram_photos_order_idx" ON "homepage_instagram_photos" USING btree ("_order");
  CREATE INDEX "homepage_instagram_photos_parent_id_idx" ON "homepage_instagram_photos" USING btree ("_parent_id");
  CREATE INDEX "homepage_instagram_photos_image_idx" ON "homepage_instagram_photos" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_instagram_photos" CASCADE;
  ALTER TABLE "homepage" DROP COLUMN "instagram_overline";
  ALTER TABLE "homepage" DROP COLUMN "instagram_heading";
  ALTER TABLE "homepage" DROP COLUMN "instagram_cta_label";
  ALTER TABLE "homepage" DROP COLUMN "instagram_url";`)
}
