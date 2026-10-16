import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_rhythm_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );

  INSERT INTO "homepage_rhythm_photos" ("_order", "_parent_id", "id", "image_id")
  SELECT 1, "id", gen_random_uuid()::text, "rhythm_photo1_id"
  FROM "homepage"
  WHERE "rhythm_photo1_id" IS NOT NULL;

  INSERT INTO "homepage_rhythm_photos" ("_order", "_parent_id", "id", "image_id")
  SELECT 2, "id", gen_random_uuid()::text, "rhythm_photo2_id"
  FROM "homepage"
  WHERE "rhythm_photo2_id" IS NOT NULL;
  
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_rhythm_photo1_id_media_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_rhythm_photo2_id_media_id_fk";
  
  DROP INDEX "homepage_rhythm_photo1_idx";
  DROP INDEX "homepage_rhythm_photo2_idx";
  ALTER TABLE "homepage_philosophy_pillars" ALTER COLUMN "icon" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_badge" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_headline" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_description" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_primary_cta_text" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_primary_cta_link" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_secondary_cta_text" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_secondary_cta_link" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hero_default_image_url" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "philosophy_overline" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "philosophy_quote" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "philosophy_description" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "services_overline" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "services_heading" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "services_description" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "services_compare_text" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "services_compare_link" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "rhythm_overline" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "rhythm_heading" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "rhythm_description" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "purpose_badge" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "purpose_heading" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "purpose_narrative" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "founder_title" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "founder_name" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "founder_role" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "founder_default_photo_url" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "purpose_cta_text" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "purpose_cta_link" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "purpose_footnote" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "booking_badge" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "booking_heading" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "booking_description" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "booking_primary_cta_text" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "booking_primary_cta_link" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "booking_secondary_cta_text" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "booking_secondary_cta_link" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "concierge_contact" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "brand_tagline" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "brand_bio" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "address" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "phone" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hours_boarding" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hours_daycare" DROP DEFAULT;
  ALTER TABLE "homepage" ALTER COLUMN "hours_dog_park" DROP DEFAULT;
  ALTER TABLE "homepage_rhythm_photos" ADD CONSTRAINT "homepage_rhythm_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rhythm_photos" ADD CONSTRAINT "homepage_rhythm_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_rhythm_photos_order_idx" ON "homepage_rhythm_photos" USING btree ("_order");
  CREATE INDEX "homepage_rhythm_photos_parent_id_idx" ON "homepage_rhythm_photos" USING btree ("_parent_id");
  CREATE INDEX "homepage_rhythm_photos_image_idx" ON "homepage_rhythm_photos" USING btree ("image_id");
  ALTER TABLE "homepage" DROP COLUMN "rhythm_photo1_id";
  ALTER TABLE "homepage" DROP COLUMN "rhythm_photo1_default_url";
  ALTER TABLE "homepage" DROP COLUMN "rhythm_photo2_id";
  ALTER TABLE "homepage" DROP COLUMN "rhythm_photo2_default_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN "rhythm_photo1_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "rhythm_photo1_default_url" varchar DEFAULT 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
  ALTER TABLE "homepage" ADD COLUMN "rhythm_photo2_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "rhythm_photo2_default_url" varchar DEFAULT 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80';

  UPDATE "homepage" AS "homepage"
  SET "rhythm_photo1_id" = "photos"."image_id"
  FROM "homepage_rhythm_photos" AS "photos"
  WHERE "photos"."_parent_id" = "homepage"."id" AND "photos"."_order" = 1;

  UPDATE "homepage" AS "homepage"
  SET "rhythm_photo2_id" = "photos"."image_id"
  FROM "homepage_rhythm_photos" AS "photos"
  WHERE "photos"."_parent_id" = "homepage"."id" AND "photos"."_order" = 2;

  DROP TABLE "homepage_rhythm_photos" CASCADE;
  ALTER TABLE "homepage_philosophy_pillars" ALTER COLUMN "icon" SET DEFAULT 'leaf';
  ALTER TABLE "homepage" ALTER COLUMN "hero_badge" SET DEFAULT 'Gurugram Sanctuary • 100% Cage-Free';
  ALTER TABLE "homepage" ALTER COLUMN "hero_headline" SET DEFAULT 'An Unhurried Sanctuary for Your Cherished Companion.';
  ALTER TABLE "homepage" ALTER COLUMN "hero_description" SET DEFAULT 'Private climate-conditioned chalets, an expansive chemical-free agility park, and genuine 24/7 hospitality guided by certified animal rescue specialists. Luxury rooted in conscious devotion.';
  ALTER TABLE "homepage" ALTER COLUMN "hero_primary_cta_text" SET DEFAULT 'Reserve Suite Stay';
  ALTER TABLE "homepage" ALTER COLUMN "hero_primary_cta_link" SET DEFAULT '#reserve-concierge';
  ALTER TABLE "homepage" ALTER COLUMN "hero_secondary_cta_text" SET DEFAULT 'Explore Sanctuary Life';
  ALTER TABLE "homepage" ALTER COLUMN "hero_secondary_cta_link" SET DEFAULT '#daily-rhythm';
  ALTER TABLE "homepage" ALTER COLUMN "hero_default_image_url" SET DEFAULT 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80';
  ALTER TABLE "homepage" ALTER COLUMN "philosophy_overline" SET DEFAULT 'The Svantaraa Philosophy';
  ALTER TABLE "homepage" ALTER COLUMN "philosophy_quote" SET DEFAULT '“Here, we do not warehouse pets in cages. We honor them as soulful travelers deserving of fresh morning dew, acoustic calm, and undivided devotion.”';
  ALTER TABLE "homepage" ALTER COLUMN "philosophy_description" SET DEFAULT 'Every booking at Svantaraa directly sustains our in-house animal shelter, veterinary hospital, and nourishment programs for rescued street dogs across Delhi NCR.';
  ALTER TABLE "homepage" ALTER COLUMN "services_overline" SET DEFAULT 'Bespoke Offerings';
  ALTER TABLE "homepage" ALTER COLUMN "services_heading" SET DEFAULT 'Sanctuary Suites & Grounds';
  ALTER TABLE "homepage" ALTER COLUMN "services_description" SET DEFAULT 'Handcrafted spaces designed around canine behavioral wellbeing, spatial generosity, and serene comfort.';
  ALTER TABLE "homepage" ALTER COLUMN "services_compare_text" SET DEFAULT 'Compare All Privileges';
  ALTER TABLE "homepage" ALTER COLUMN "services_compare_link" SET DEFAULT '#reserve-concierge';
  ALTER TABLE "homepage" ALTER COLUMN "rhythm_overline" SET DEFAULT 'Circadian Harmony';
  ALTER TABLE "homepage" ALTER COLUMN "rhythm_heading" SET DEFAULT 'Daily Rhythm at the Sanctuary';
  ALTER TABLE "homepage" ALTER COLUMN "rhythm_description" SET DEFAULT 'Dogs thrive on predictable, calm structure. Our daily cadence balances energizing outdoor exploration with restorative sensory quietude.';
  ALTER TABLE "homepage" ALTER COLUMN "purpose_badge" SET DEFAULT 'Social Enterprise';
  ALTER TABLE "homepage" ALTER COLUMN "purpose_heading" SET DEFAULT 'Boarding With Purpose: Every Night Shelters a Soul.';
  ALTER TABLE "homepage" ALTER COLUMN "purpose_narrative" SET DEFAULT 'Svantaraa was founded on an unapologetic pledge: luxury pet parenting and compassion for forgotten street dogs must walk paw-in-paw. 100% of resort profits fuel emergency orthopedic surgeries, cancer rehabilitation, and peaceful lifelong shelter for over 150 community canines.';
  ALTER TABLE "homepage" ALTER COLUMN "founder_title" SET DEFAULT 'Founding Visionary';
  ALTER TABLE "homepage" ALTER COLUMN "founder_name" SET DEFAULT 'Vaishali Sharma';
  ALTER TABLE "homepage" ALTER COLUMN "founder_role" SET DEFAULT 'Canine Ethologist & Animal Rescue Advocate';
  ALTER TABLE "homepage" ALTER COLUMN "founder_default_photo_url" SET DEFAULT 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80';
  ALTER TABLE "homepage" ALTER COLUMN "purpose_cta_text" SET DEFAULT 'Read Rescue Journal';
  ALTER TABLE "homepage" ALTER COLUMN "purpose_cta_link" SET DEFAULT '#philosophy';
  ALTER TABLE "homepage" ALTER COLUMN "purpose_footnote" SET DEFAULT 'Visitor access to shelter sanctuary by prior request.';
  ALTER TABLE "homepage" ALTER COLUMN "booking_badge" SET DEFAULT 'Limited Daily Chalets';
  ALTER TABLE "homepage" ALTER COLUMN "booking_heading" SET DEFAULT 'Give Your Companion the Retreat They Deserve.';
  ALTER TABLE "homepage" ALTER COLUMN "booking_description" SET DEFAULT 'Due to our strict cage-free ratio and 1:3 dedicated staff care, chalets book quickly during weekends and holiday seasons. Schedule your introductory walk-through or reserve dates today.';
  ALTER TABLE "homepage" ALTER COLUMN "booking_primary_cta_text" SET DEFAULT 'Reserve Suite Online';
  ALTER TABLE "homepage" ALTER COLUMN "booking_primary_cta_link" SET DEFAULT '#reserve-concierge';
  ALTER TABLE "homepage" ALTER COLUMN "booking_secondary_cta_text" SET DEFAULT 'Schedule Physical Walk-Through';
  ALTER TABLE "homepage" ALTER COLUMN "booking_secondary_cta_link" SET DEFAULT 'tel:+919599908677';
  ALTER TABLE "homepage" ALTER COLUMN "concierge_contact" SET DEFAULT 'Concierge Line: +91 95999 08677 • Alahawas, Sector 59, Gurugram';
  ALTER TABLE "homepage" ALTER COLUMN "brand_tagline" SET DEFAULT 'Sanctuary of Conscious Care';
  ALTER TABLE "homepage" ALTER COLUMN "brand_bio" SET DEFAULT 'Where luxury meets heartfelt rescue care. Thoughtfully designed stays and authentic hospitality for every furry family member.';
  ALTER TABLE "homepage" ALTER COLUMN "address" SET DEFAULT 'Alahawas, Sector 59, Gurugram, Haryana 122005';
  ALTER TABLE "homepage" ALTER COLUMN "phone" SET DEFAULT '+91 95999 08677';
  ALTER TABLE "homepage" ALTER COLUMN "hours_boarding" SET DEFAULT '08:00 AM – 11:00 AM
  04:00 PM – 07:00 PM';
  ALTER TABLE "homepage" ALTER COLUMN "hours_daycare" SET DEFAULT '08:00 AM – 08:00 PM (Daily)';
  ALTER TABLE "homepage" ALTER COLUMN "hours_dog_park" SET DEFAULT 'Exclusive Access by Prior Appointment';
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_rhythm_photo1_id_media_id_fk" FOREIGN KEY ("rhythm_photo1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_rhythm_photo2_id_media_id_fk" FOREIGN KEY ("rhythm_photo2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_rhythm_photo1_idx" ON "homepage" USING btree ("rhythm_photo1_id");
  CREATE INDEX "homepage_rhythm_photo2_idx" ON "homepage" USING btree ("rhythm_photo2_id");`)
}
