import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN "purpose_metric_value" varchar;
  ALTER TABLE "homepage" ADD COLUMN "purpose_metric_description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" DROP COLUMN "purpose_metric_value";
  ALTER TABLE "homepage" DROP COLUMN "purpose_metric_description";`)
}
