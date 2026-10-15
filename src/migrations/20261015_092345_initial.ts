import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_faqs_category" AS ENUM('general', 'boarding', 'health', 'daycare');
  CREATE TYPE "public"."enum_homepage_philosophy_pillars_icon" AS ENUM('leaf', 'video', 'heartbeat');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"badge" varchar,
  	"feature_tag" varchar,
  	"description" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"price_unit" varchar DEFAULT '/ night',
  	"price_label" varchar DEFAULT 'Per Night Stay',
  	"image_id" integer,
  	"default_image_url" varchar,
  	"cta_text" varchar DEFAULT 'Select Suite',
  	"cta_link" varchar DEFAULT '#reserve-concierge',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"owner_name" varchar NOT NULL,
  	"pet_name" varchar NOT NULL,
  	"initials" varchar,
  	"rating" numeric DEFAULT 5,
  	"quote" varchar NOT NULL,
  	"avatar_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" "enum_faqs_category" DEFAULT 'general',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_philosophy_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_homepage_philosophy_pillars_icon" DEFAULT 'leaf'
  );
  
  CREATE TABLE "homepage_rhythm_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_purpose_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar DEFAULT 'Gurugram Sanctuary • 100% Cage-Free',
  	"hero_headline" varchar DEFAULT 'An Unhurried Sanctuary for Your Cherished Companion.' NOT NULL,
  	"hero_description" varchar DEFAULT 'Private climate-conditioned chalets, an expansive chemical-free agility park, and genuine 24/7 hospitality guided by certified animal rescue specialists. Luxury rooted in conscious devotion.' NOT NULL,
  	"hero_primary_cta_text" varchar DEFAULT 'Reserve Suite Stay',
  	"hero_primary_cta_link" varchar DEFAULT '#reserve-concierge',
  	"hero_secondary_cta_text" varchar DEFAULT 'Explore Sanctuary Life',
  	"hero_secondary_cta_link" varchar DEFAULT '#daily-rhythm',
  	"hero_image_id" integer,
  	"hero_default_image_url" varchar DEFAULT 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80',
  	"philosophy_overline" varchar DEFAULT 'The Svantaraa Philosophy',
  	"philosophy_quote" varchar DEFAULT '“Here, we do not warehouse pets in cages. We honor them as soulful travelers deserving of fresh morning dew, acoustic calm, and undivided devotion.”' NOT NULL,
  	"philosophy_description" varchar DEFAULT 'Every booking at Svantaraa directly sustains our in-house animal shelter, veterinary hospital, and nourishment programs for rescued street dogs across Delhi NCR.',
  	"services_overline" varchar DEFAULT 'Bespoke Offerings',
  	"services_heading" varchar DEFAULT 'Sanctuary Suites & Grounds',
  	"services_description" varchar DEFAULT 'Handcrafted spaces designed around canine behavioral wellbeing, spatial generosity, and serene comfort.',
  	"services_compare_text" varchar DEFAULT 'Compare All Privileges',
  	"services_compare_link" varchar DEFAULT '#reserve-concierge',
  	"rhythm_overline" varchar DEFAULT 'Circadian Harmony',
  	"rhythm_heading" varchar DEFAULT 'Daily Rhythm at the Sanctuary',
  	"rhythm_description" varchar DEFAULT 'Dogs thrive on predictable, calm structure. Our daily cadence balances energizing outdoor exploration with restorative sensory quietude.',
  	"rhythm_photo1_id" integer,
  	"rhythm_photo1_default_url" varchar DEFAULT 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
  	"rhythm_photo2_id" integer,
  	"rhythm_photo2_default_url" varchar DEFAULT 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
  	"purpose_badge" varchar DEFAULT 'Social Enterprise',
  	"purpose_heading" varchar DEFAULT 'Boarding With Purpose: Every Night Shelters a Soul.',
  	"purpose_narrative" varchar DEFAULT 'Svantaraa was founded on an unapologetic pledge: luxury pet parenting and compassion for forgotten street dogs must walk paw-in-paw. 100% of resort profits fuel emergency orthopedic surgeries, cancer rehabilitation, and peaceful lifelong shelter for over 150 community canines.',
  	"founder_title" varchar DEFAULT 'Founding Visionary',
  	"founder_name" varchar DEFAULT 'Vaishali Sharma',
  	"founder_role" varchar DEFAULT 'Canine Ethologist & Animal Rescue Advocate',
  	"founder_photo_id" integer,
  	"founder_default_photo_url" varchar DEFAULT 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  	"purpose_cta_text" varchar DEFAULT 'Read Rescue Journal',
  	"purpose_cta_link" varchar DEFAULT '#philosophy',
  	"purpose_footnote" varchar DEFAULT 'Visitor access to shelter sanctuary by prior request.',
  	"booking_badge" varchar DEFAULT 'Limited Daily Chalets',
  	"booking_heading" varchar DEFAULT 'Give Your Companion the Retreat They Deserve.',
  	"booking_description" varchar DEFAULT 'Due to our strict cage-free ratio and 1:3 dedicated staff care, chalets book quickly during weekends and holiday seasons. Schedule your introductory walk-through or reserve dates today.',
  	"booking_primary_cta_text" varchar DEFAULT 'Reserve Suite Online',
  	"booking_primary_cta_link" varchar DEFAULT '#reserve-concierge',
  	"booking_secondary_cta_text" varchar DEFAULT 'Schedule Physical Walk-Through',
  	"booking_secondary_cta_link" varchar DEFAULT 'tel:+919599908677',
  	"concierge_contact" varchar DEFAULT 'Concierge Line: +91 95999 08677 • Alahawas, Sector 59, Gurugram',
  	"brand_tagline" varchar DEFAULT 'Sanctuary of Conscious Care',
  	"brand_bio" varchar DEFAULT 'Where luxury meets heartfelt rescue care. Thoughtfully designed stays and authentic hospitality for every furry family member.',
  	"address" varchar DEFAULT 'Alahawas, Sector 59, Gurugram, Haryana 122005',
  	"phone" varchar DEFAULT '+91 95999 08677',
  	"hours_boarding" varchar DEFAULT '08:00 AM – 11:00 AM
  04:00 PM – 07:00 PM',
  	"hours_daycare" varchar DEFAULT '08:00 AM – 08:00 PM (Daily)',
  	"hours_dog_park" varchar DEFAULT 'Exclusive Access by Prior Appointment',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_philosophy_pillars" ADD CONSTRAINT "homepage_philosophy_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rhythm_schedule" ADD CONSTRAINT "homepage_rhythm_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_purpose_metrics" ADD CONSTRAINT "homepage_purpose_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_rhythm_photo1_id_media_id_fk" FOREIGN KEY ("rhythm_photo1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_rhythm_photo2_id_media_id_fk" FOREIGN KEY ("rhythm_photo2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_founder_photo_id_media_id_fk" FOREIGN KEY ("founder_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_philosophy_pillars_order_idx" ON "homepage_philosophy_pillars" USING btree ("_order");
  CREATE INDEX "homepage_philosophy_pillars_parent_id_idx" ON "homepage_philosophy_pillars" USING btree ("_parent_id");
  CREATE INDEX "homepage_rhythm_schedule_order_idx" ON "homepage_rhythm_schedule" USING btree ("_order");
  CREATE INDEX "homepage_rhythm_schedule_parent_id_idx" ON "homepage_rhythm_schedule" USING btree ("_parent_id");
  CREATE INDEX "homepage_purpose_metrics_order_idx" ON "homepage_purpose_metrics" USING btree ("_order");
  CREATE INDEX "homepage_purpose_metrics_parent_id_idx" ON "homepage_purpose_metrics" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage_rhythm_photo1_idx" ON "homepage" USING btree ("rhythm_photo1_id");
  CREATE INDEX "homepage_rhythm_photo2_idx" ON "homepage" USING btree ("rhythm_photo2_id");
  CREATE INDEX "homepage_founder_photo_idx" ON "homepage" USING btree ("founder_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_philosophy_pillars" CASCADE;
  DROP TABLE "homepage_rhythm_schedule" CASCADE;
  DROP TABLE "homepage_purpose_metrics" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_homepage_philosophy_pillars_icon";`)
}
