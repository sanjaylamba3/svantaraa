import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_purpose_metrics" CASCADE;
  ALTER TABLE "homepage" DROP COLUMN "founder_title";
  ALTER TABLE "homepage" DROP COLUMN "founder_name";
  ALTER TABLE "homepage" DROP COLUMN "founder_role";
  ALTER TABLE "homepage" DROP COLUMN "purpose_footnote";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_purpose_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar,
  	"description" varchar NOT NULL
  );
  
  ALTER TABLE "homepage" ADD COLUMN "founder_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "founder_name" varchar;
  ALTER TABLE "homepage" ADD COLUMN "founder_role" varchar;
  ALTER TABLE "homepage" ADD COLUMN "purpose_footnote" varchar;
  ALTER TABLE "homepage_purpose_metrics" ADD CONSTRAINT "homepage_purpose_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_purpose_metrics_order_idx" ON "homepage_purpose_metrics" USING btree ("_order");
  CREATE INDEX "homepage_purpose_metrics_parent_id_idx" ON "homepage_purpose_metrics" USING btree ("_parent_id");`)
}
