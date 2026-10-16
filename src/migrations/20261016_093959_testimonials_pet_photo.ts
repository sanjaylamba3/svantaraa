import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonials" ADD COLUMN "photo_id" integer;
  ALTER TABLE "testimonials" ADD COLUMN "default_photo_url" varchar;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonials" DROP CONSTRAINT "testimonials_photo_id_media_id_fk";
  
  DROP INDEX "testimonials_photo_idx";
  ALTER TABLE "testimonials" DROP COLUMN "photo_id";
  ALTER TABLE "testimonials" DROP COLUMN "default_photo_url";`)
}
