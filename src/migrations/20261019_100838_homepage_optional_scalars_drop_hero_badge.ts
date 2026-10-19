import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ALTER COLUMN "hero_headline" DROP NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "hero_description" DROP NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "philosophy_quote" DROP NOT NULL;
  ALTER TABLE "homepage" DROP COLUMN "hero_badge";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ALTER COLUMN "hero_headline" SET NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "hero_description" SET NOT NULL;
  ALTER TABLE "homepage" ALTER COLUMN "philosophy_quote" SET NOT NULL;
  ALTER TABLE "homepage" ADD COLUMN "hero_badge" varchar;`)
}
