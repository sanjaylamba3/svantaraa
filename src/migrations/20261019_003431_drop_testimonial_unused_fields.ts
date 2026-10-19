import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonials" DROP CONSTRAINT "testimonials_avatar_id_media_id_fk";
  
  DROP INDEX "testimonials_avatar_idx";
  ALTER TABLE "testimonials" DROP COLUMN "initials";
  ALTER TABLE "testimonials" DROP COLUMN "rating";
  ALTER TABLE "testimonials" DROP COLUMN "avatar_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonials" ADD COLUMN "initials" varchar;
  ALTER TABLE "testimonials" ADD COLUMN "rating" numeric DEFAULT 5;
  ALTER TABLE "testimonials" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");`)
}
