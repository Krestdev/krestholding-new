import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_job_openings_work_time" AS ENUM('Temps plein', 'Temps partiel');
  CREATE TABLE "job_openings_missions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "job_openings_missions_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings_profile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "job_openings_profile_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings_what_we_offer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "job_openings_what_we_offer_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "job_openings" ADD COLUMN "slug" varchar;
  ALTER TABLE "job_openings" ADD COLUMN "work_time" "enum_job_openings_work_time";
  ALTER TABLE "job_openings" ADD COLUMN "experience_level" varchar;
  ALTER TABLE "job_openings" ADD COLUMN "compensation" varchar;
  ALTER TABLE "job_openings_locales" ADD COLUMN "work_environment" varchar;
  ALTER TABLE "job_openings_locales" ADD COLUMN "recruitment_steps_text" varchar;
  ALTER TABLE "job_applications" ADD COLUMN "related_job_opening_id" integer;
  ALTER TABLE "job_openings_missions" ADD CONSTRAINT "job_openings_missions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_missions_locales" ADD CONSTRAINT "job_openings_missions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings_missions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_profile" ADD CONSTRAINT "job_openings_profile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_profile_locales" ADD CONSTRAINT "job_openings_profile_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_what_we_offer" ADD CONSTRAINT "job_openings_what_we_offer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_what_we_offer_locales" ADD CONSTRAINT "job_openings_what_we_offer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings_what_we_offer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "job_openings_missions_order_idx" ON "job_openings_missions" USING btree ("_order");
  CREATE INDEX "job_openings_missions_parent_id_idx" ON "job_openings_missions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "job_openings_missions_locales_locale_parent_id_unique" ON "job_openings_missions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_openings_profile_order_idx" ON "job_openings_profile" USING btree ("_order");
  CREATE INDEX "job_openings_profile_parent_id_idx" ON "job_openings_profile" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "job_openings_profile_locales_locale_parent_id_unique" ON "job_openings_profile_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_openings_what_we_offer_order_idx" ON "job_openings_what_we_offer" USING btree ("_order");
  CREATE INDEX "job_openings_what_we_offer_parent_id_idx" ON "job_openings_what_we_offer" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "job_openings_what_we_offer_locales_locale_parent_id_unique" ON "job_openings_what_we_offer_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_related_job_opening_id_job_openings_id_fk" FOREIGN KEY ("related_job_opening_id") REFERENCES "public"."job_openings"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "job_openings_slug_idx" ON "job_openings" USING btree ("slug");
  CREATE INDEX "job_applications_related_job_opening_idx" ON "job_applications" USING btree ("related_job_opening_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "job_openings_missions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_openings_missions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_openings_profile" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_openings_profile_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_openings_what_we_offer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_openings_what_we_offer_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "job_openings_missions" CASCADE;
  DROP TABLE "job_openings_missions_locales" CASCADE;
  DROP TABLE "job_openings_profile" CASCADE;
  DROP TABLE "job_openings_profile_locales" CASCADE;
  DROP TABLE "job_openings_what_we_offer" CASCADE;
  DROP TABLE "job_openings_what_we_offer_locales" CASCADE;
  ALTER TABLE "job_applications" DROP CONSTRAINT "job_applications_related_job_opening_id_job_openings_id_fk";
  
  DROP INDEX "job_openings_slug_idx";
  DROP INDEX "job_applications_related_job_opening_idx";
  ALTER TABLE "job_openings" DROP COLUMN "slug";
  ALTER TABLE "job_openings" DROP COLUMN "work_time";
  ALTER TABLE "job_openings" DROP COLUMN "experience_level";
  ALTER TABLE "job_openings" DROP COLUMN "compensation";
  ALTER TABLE "job_openings_locales" DROP COLUMN "work_environment";
  ALTER TABLE "job_openings_locales" DROP COLUMN "recruitment_steps_text";
  ALTER TABLE "job_applications" DROP COLUMN "related_job_opening_id";
  DROP TYPE "public"."enum_job_openings_work_time";`)
}
