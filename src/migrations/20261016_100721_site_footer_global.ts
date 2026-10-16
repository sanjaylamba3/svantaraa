import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_tagline" varchar,
  	"brand_bio" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"hours_boarding" varchar,
  	"hours_daycare" varchar,
  	"hours_dog_park" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  INSERT INTO "site_footer" (
    "brand_tagline",
    "brand_bio",
    "address",
    "phone",
    "hours_boarding",
    "hours_daycare",
    "hours_dog_park",
    "updated_at",
    "created_at"
  )
  SELECT
    "brand_tagline",
    "brand_bio",
    "address",
    "phone",
    "hours_boarding",
    "hours_daycare",
    "hours_dog_park",
    NOW(),
    NOW()
  FROM "homepage"
  LIMIT 1;
  
  ALTER TABLE "homepage" DROP COLUMN "brand_tagline";
  ALTER TABLE "homepage" DROP COLUMN "brand_bio";
  ALTER TABLE "homepage" DROP COLUMN "address";
  ALTER TABLE "homepage" DROP COLUMN "phone";
  ALTER TABLE "homepage" DROP COLUMN "hours_boarding";
  ALTER TABLE "homepage" DROP COLUMN "hours_daycare";
  ALTER TABLE "homepage" DROP COLUMN "hours_dog_park";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_footer" CASCADE;
  ALTER TABLE "homepage" ADD COLUMN "brand_tagline" varchar;
  ALTER TABLE "homepage" ADD COLUMN "brand_bio" varchar;
  ALTER TABLE "homepage" ADD COLUMN "address" varchar;
  ALTER TABLE "homepage" ADD COLUMN "phone" varchar;
  ALTER TABLE "homepage" ADD COLUMN "hours_boarding" varchar;
  ALTER TABLE "homepage" ADD COLUMN "hours_daycare" varchar;
  ALTER TABLE "homepage" ADD COLUMN "hours_dog_park" varchar;`)
}
