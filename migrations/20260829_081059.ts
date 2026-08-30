import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_dossier_submissions_need_type" AS ENUM('Capital', 'Structuration', 'Accès au marché', 'Autre');
  CREATE TYPE "public"."enum_dossier_submissions_amount_range" AS ENUM('lt-10m', '10m-50m', '50m-200m', 'gt-200m', 'non-determine');
  CREATE TYPE "public"."enum_job_openings_contract_type" AS ENUM('CDI', 'CDD', 'Stage', 'Freelance');
  CREATE TABLE "dossier_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  
  CREATE TABLE "dossier_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar,
  	"company_name" varchar NOT NULL,
  	"industry" varchar NOT NULL,
  	"founded_year" numeric NOT NULL,
  	"headcount" varchar NOT NULL,
  	"city_country" varchar NOT NULL,
  	"website_url" varchar,
  	"need_type" "enum_dossier_submissions_need_type",
  	"amount_range" "enum_dossier_submissions_amount_range",
  	"project_description" varchar NOT NULL,
  	"consent_accepted" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dossier_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dossier_documents_id" integer
  );
  
  CREATE TABLE "job_openings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"related_subsidiary_id" integer,
  	"contract_type" "enum_job_openings_contract_type",
  	"location" varchar,
  	"published_at" timestamp(3) with time zone,
  	"application_deadline" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_openings_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "job_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"target_entity_or_sector" varchar NOT NULL,
  	"desired_role" varchar NOT NULL,
  	"target_city" varchar NOT NULL,
  	"consent_accepted" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_applications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dossier_documents_id" integer
  );
  
  CREATE TABLE "actualites_page_content_press_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "actualites_page_content_press_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "actualites_page_content_newsletter_info_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "actualites_page_content_newsletter_info_lines_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "actualites_page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"press_cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "actualites_page_content_locales" (
  	"portfolio_kicker" varchar,
  	"press_heading" varchar,
  	"press_cta_label" varchar,
  	"newsletter_form_label" varchar,
  	"newsletter_placeholder" varchar,
  	"newsletter_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "impact_page_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "impact_page_content_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impact_page_content_jobs_chart_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL
  );
  
  CREATE TABLE "impact_page_content_jobs_chart_data_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impact_page_content_jobs_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "impact_page_content_jobs_info_cards_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impact_page_content_esg_engagement_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "impact_page_content_esg_engagement_items_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impact_page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"story_cta_primary_url" varchar,
  	"story_cta_secondary_url" varchar,
  	"esg_cert1_scope" varchar,
  	"esg_cert2_scope" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "impact_page_content_locales" (
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"stats_kicker" varchar,
  	"stats_heading" varchar,
  	"stats_intro" varchar,
  	"jobs_kicker" varchar,
  	"jobs_chart_heading" varchar,
  	"story_kicker" varchar,
  	"story_heading" varchar,
  	"story_intro" varchar,
  	"story_situation_title" varchar,
  	"story_situation_body" varchar,
  	"story_action_title" varchar,
  	"story_action_body" varchar,
  	"story_result_title" varchar,
  	"story_result_body" varchar,
  	"story_cta_title" varchar,
  	"story_cta_body" varchar,
  	"story_cta_primary_label" varchar,
  	"story_cta_secondary_label" varchar,
  	"esg_kicker" varchar,
  	"esg_heading" varchar,
  	"esg_cert1_title" varchar,
  	"esg_cert2_title" varchar,
  	"esg_engagement_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_jobs_chart_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_jobs_chart_data_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_jobs_skill_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_jobs_skill_tags_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_jobs_location_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_jobs_location_tags_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_why_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_why_cards_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content_process_steps_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "carrieres_page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "carrieres_page_content_locales" (
  	"hero_heading" varchar,
  	"jobs_kicker" varchar,
  	"jobs_chart_heading" varchar,
  	"why_kicker" varchar,
  	"why_heading" varchar,
  	"offers_kicker" varchar,
  	"offers_intro" varchar,
  	"offers_heading" varchar,
  	"process_kicker" varchar,
  	"process_intro" varchar,
  	"process_heading" varchar,
  	"spontaneous_kicker" varchar,
  	"spontaneous_heading_line1" varchar,
  	"spontaneous_heading_line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "dossier_documents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "dossier_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "job_openings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "job_applications_id" integer;
  ALTER TABLE "dossier_submissions_rels" ADD CONSTRAINT "dossier_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dossier_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dossier_submissions_rels" ADD CONSTRAINT "dossier_submissions_rels_dossier_documents_fk" FOREIGN KEY ("dossier_documents_id") REFERENCES "public"."dossier_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings" ADD CONSTRAINT "job_openings_related_subsidiary_id_subsidiaries_id_fk" FOREIGN KEY ("related_subsidiary_id") REFERENCES "public"."subsidiaries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_openings_locales" ADD CONSTRAINT "job_openings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_applications_rels" ADD CONSTRAINT "job_applications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."job_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_applications_rels" ADD CONSTRAINT "job_applications_rels_dossier_documents_fk" FOREIGN KEY ("dossier_documents_id") REFERENCES "public"."dossier_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_page_content_press_links" ADD CONSTRAINT "actualites_page_content_press_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_page_content_press_links_locales" ADD CONSTRAINT "actualites_page_content_press_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites_page_content_press_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_page_content_newsletter_info_lines" ADD CONSTRAINT "actualites_page_content_newsletter_info_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_page_content_newsletter_info_lines_locales" ADD CONSTRAINT "actualites_page_content_newsletter_info_lines_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites_page_content_newsletter_info_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_page_content_locales" ADD CONSTRAINT "actualites_page_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_stats" ADD CONSTRAINT "impact_page_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_stats_locales" ADD CONSTRAINT "impact_page_content_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_jobs_chart_data" ADD CONSTRAINT "impact_page_content_jobs_chart_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_jobs_chart_data_locales" ADD CONSTRAINT "impact_page_content_jobs_chart_data_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content_jobs_chart_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_jobs_info_cards" ADD CONSTRAINT "impact_page_content_jobs_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_jobs_info_cards_locales" ADD CONSTRAINT "impact_page_content_jobs_info_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content_jobs_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_esg_engagement_items" ADD CONSTRAINT "impact_page_content_esg_engagement_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_esg_engagement_items_locales" ADD CONSTRAINT "impact_page_content_esg_engagement_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content_esg_engagement_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_content_locales" ADD CONSTRAINT "impact_page_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_jobs_chart_data" ADD CONSTRAINT "carrieres_page_content_jobs_chart_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_jobs_chart_data_locales" ADD CONSTRAINT "carrieres_page_content_jobs_chart_data_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content_jobs_chart_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_jobs_skill_tags" ADD CONSTRAINT "carrieres_page_content_jobs_skill_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_jobs_skill_tags_locales" ADD CONSTRAINT "carrieres_page_content_jobs_skill_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content_jobs_skill_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_jobs_location_tags" ADD CONSTRAINT "carrieres_page_content_jobs_location_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_jobs_location_tags_locales" ADD CONSTRAINT "carrieres_page_content_jobs_location_tags_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content_jobs_location_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_why_cards" ADD CONSTRAINT "carrieres_page_content_why_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_why_cards_locales" ADD CONSTRAINT "carrieres_page_content_why_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content_why_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_process_steps" ADD CONSTRAINT "carrieres_page_content_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_process_steps_locales" ADD CONSTRAINT "carrieres_page_content_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carrieres_page_content_locales" ADD CONSTRAINT "carrieres_page_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carrieres_page_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dossier_documents_updated_at_idx" ON "dossier_documents" USING btree ("updated_at");
  CREATE INDEX "dossier_documents_created_at_idx" ON "dossier_documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "dossier_documents_filename_idx" ON "dossier_documents" USING btree ("filename");
  CREATE UNIQUE INDEX "dossier_submissions_reference_idx" ON "dossier_submissions" USING btree ("reference");
  CREATE INDEX "dossier_submissions_updated_at_idx" ON "dossier_submissions" USING btree ("updated_at");
  CREATE INDEX "dossier_submissions_created_at_idx" ON "dossier_submissions" USING btree ("created_at");
  CREATE INDEX "dossier_submissions_rels_order_idx" ON "dossier_submissions_rels" USING btree ("order");
  CREATE INDEX "dossier_submissions_rels_parent_idx" ON "dossier_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "dossier_submissions_rels_path_idx" ON "dossier_submissions_rels" USING btree ("path");
  CREATE INDEX "dossier_submissions_rels_dossier_documents_id_idx" ON "dossier_submissions_rels" USING btree ("dossier_documents_id");
  CREATE INDEX "job_openings_related_subsidiary_idx" ON "job_openings" USING btree ("related_subsidiary_id");
  CREATE INDEX "job_openings_updated_at_idx" ON "job_openings" USING btree ("updated_at");
  CREATE INDEX "job_openings_created_at_idx" ON "job_openings" USING btree ("created_at");
  CREATE UNIQUE INDEX "job_openings_locales_locale_parent_id_unique" ON "job_openings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_applications_updated_at_idx" ON "job_applications" USING btree ("updated_at");
  CREATE INDEX "job_applications_created_at_idx" ON "job_applications" USING btree ("created_at");
  CREATE INDEX "job_applications_rels_order_idx" ON "job_applications_rels" USING btree ("order");
  CREATE INDEX "job_applications_rels_parent_idx" ON "job_applications_rels" USING btree ("parent_id");
  CREATE INDEX "job_applications_rels_path_idx" ON "job_applications_rels" USING btree ("path");
  CREATE INDEX "job_applications_rels_dossier_documents_id_idx" ON "job_applications_rels" USING btree ("dossier_documents_id");
  CREATE INDEX "actualites_page_content_press_links_order_idx" ON "actualites_page_content_press_links" USING btree ("_order");
  CREATE INDEX "actualites_page_content_press_links_parent_id_idx" ON "actualites_page_content_press_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "actualites_page_content_press_links_locales_locale_parent_id" ON "actualites_page_content_press_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "actualites_page_content_newsletter_info_lines_order_idx" ON "actualites_page_content_newsletter_info_lines" USING btree ("_order");
  CREATE INDEX "actualites_page_content_newsletter_info_lines_parent_id_idx" ON "actualites_page_content_newsletter_info_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "actualites_page_content_newsletter_info_lines_locales_locale" ON "actualites_page_content_newsletter_info_lines_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "actualites_page_content_locales_locale_parent_id_unique" ON "actualites_page_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_page_content_stats_order_idx" ON "impact_page_content_stats" USING btree ("_order");
  CREATE INDEX "impact_page_content_stats_parent_id_idx" ON "impact_page_content_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impact_page_content_stats_locales_locale_parent_id_unique" ON "impact_page_content_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_page_content_jobs_chart_data_order_idx" ON "impact_page_content_jobs_chart_data" USING btree ("_order");
  CREATE INDEX "impact_page_content_jobs_chart_data_parent_id_idx" ON "impact_page_content_jobs_chart_data" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impact_page_content_jobs_chart_data_locales_locale_parent_id" ON "impact_page_content_jobs_chart_data_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_page_content_jobs_info_cards_order_idx" ON "impact_page_content_jobs_info_cards" USING btree ("_order");
  CREATE INDEX "impact_page_content_jobs_info_cards_parent_id_idx" ON "impact_page_content_jobs_info_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impact_page_content_jobs_info_cards_locales_locale_parent_id" ON "impact_page_content_jobs_info_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_page_content_esg_engagement_items_order_idx" ON "impact_page_content_esg_engagement_items" USING btree ("_order");
  CREATE INDEX "impact_page_content_esg_engagement_items_parent_id_idx" ON "impact_page_content_esg_engagement_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impact_page_content_esg_engagement_items_locales_locale_pare" ON "impact_page_content_esg_engagement_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "impact_page_content_locales_locale_parent_id_unique" ON "impact_page_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "carrieres_page_content_jobs_chart_data_order_idx" ON "carrieres_page_content_jobs_chart_data" USING btree ("_order");
  CREATE INDEX "carrieres_page_content_jobs_chart_data_parent_id_idx" ON "carrieres_page_content_jobs_chart_data" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "carrieres_page_content_jobs_chart_data_locales_locale_parent" ON "carrieres_page_content_jobs_chart_data_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "carrieres_page_content_jobs_skill_tags_order_idx" ON "carrieres_page_content_jobs_skill_tags" USING btree ("_order");
  CREATE INDEX "carrieres_page_content_jobs_skill_tags_parent_id_idx" ON "carrieres_page_content_jobs_skill_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "carrieres_page_content_jobs_skill_tags_locales_locale_parent" ON "carrieres_page_content_jobs_skill_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "carrieres_page_content_jobs_location_tags_order_idx" ON "carrieres_page_content_jobs_location_tags" USING btree ("_order");
  CREATE INDEX "carrieres_page_content_jobs_location_tags_parent_id_idx" ON "carrieres_page_content_jobs_location_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "carrieres_page_content_jobs_location_tags_locales_locale_par" ON "carrieres_page_content_jobs_location_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "carrieres_page_content_why_cards_order_idx" ON "carrieres_page_content_why_cards" USING btree ("_order");
  CREATE INDEX "carrieres_page_content_why_cards_parent_id_idx" ON "carrieres_page_content_why_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "carrieres_page_content_why_cards_locales_locale_parent_id_un" ON "carrieres_page_content_why_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "carrieres_page_content_process_steps_order_idx" ON "carrieres_page_content_process_steps" USING btree ("_order");
  CREATE INDEX "carrieres_page_content_process_steps_parent_id_idx" ON "carrieres_page_content_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "carrieres_page_content_process_steps_locales_locale_parent_i" ON "carrieres_page_content_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "carrieres_page_content_locales_locale_parent_id_unique" ON "carrieres_page_content_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dossier_documents_fk" FOREIGN KEY ("dossier_documents_id") REFERENCES "public"."dossier_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dossier_submissions_fk" FOREIGN KEY ("dossier_submissions_id") REFERENCES "public"."dossier_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_applications_fk" FOREIGN KEY ("job_applications_id") REFERENCES "public"."job_applications"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_dossier_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("dossier_documents_id");
  CREATE INDEX "payload_locked_documents_rels_dossier_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("dossier_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_job_openings_id_idx" ON "payload_locked_documents_rels" USING btree ("job_openings_id");
  CREATE INDEX "payload_locked_documents_rels_job_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("job_applications_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dossier_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dossier_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dossier_submissions_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_openings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_openings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_applications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_page_content_press_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_page_content_press_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_page_content_newsletter_info_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_page_content_newsletter_info_lines_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_page_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_page_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_jobs_chart_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_jobs_chart_data_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_jobs_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_jobs_info_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_esg_engagement_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_esg_engagement_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_page_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_jobs_chart_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_jobs_chart_data_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_jobs_skill_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_jobs_skill_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_jobs_location_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_jobs_location_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_why_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_why_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carrieres_page_content_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "dossier_documents" CASCADE;
  DROP TABLE "dossier_submissions" CASCADE;
  DROP TABLE "dossier_submissions_rels" CASCADE;
  DROP TABLE "job_openings" CASCADE;
  DROP TABLE "job_openings_locales" CASCADE;
  DROP TABLE "job_applications" CASCADE;
  DROP TABLE "job_applications_rels" CASCADE;
  DROP TABLE "actualites_page_content_press_links" CASCADE;
  DROP TABLE "actualites_page_content_press_links_locales" CASCADE;
  DROP TABLE "actualites_page_content_newsletter_info_lines" CASCADE;
  DROP TABLE "actualites_page_content_newsletter_info_lines_locales" CASCADE;
  DROP TABLE "actualites_page_content" CASCADE;
  DROP TABLE "actualites_page_content_locales" CASCADE;
  DROP TABLE "impact_page_content_stats" CASCADE;
  DROP TABLE "impact_page_content_stats_locales" CASCADE;
  DROP TABLE "impact_page_content_jobs_chart_data" CASCADE;
  DROP TABLE "impact_page_content_jobs_chart_data_locales" CASCADE;
  DROP TABLE "impact_page_content_jobs_info_cards" CASCADE;
  DROP TABLE "impact_page_content_jobs_info_cards_locales" CASCADE;
  DROP TABLE "impact_page_content_esg_engagement_items" CASCADE;
  DROP TABLE "impact_page_content_esg_engagement_items_locales" CASCADE;
  DROP TABLE "impact_page_content" CASCADE;
  DROP TABLE "impact_page_content_locales" CASCADE;
  DROP TABLE "carrieres_page_content_jobs_chart_data" CASCADE;
  DROP TABLE "carrieres_page_content_jobs_chart_data_locales" CASCADE;
  DROP TABLE "carrieres_page_content_jobs_skill_tags" CASCADE;
  DROP TABLE "carrieres_page_content_jobs_skill_tags_locales" CASCADE;
  DROP TABLE "carrieres_page_content_jobs_location_tags" CASCADE;
  DROP TABLE "carrieres_page_content_jobs_location_tags_locales" CASCADE;
  DROP TABLE "carrieres_page_content_why_cards" CASCADE;
  DROP TABLE "carrieres_page_content_why_cards_locales" CASCADE;
  DROP TABLE "carrieres_page_content_process_steps" CASCADE;
  DROP TABLE "carrieres_page_content_process_steps_locales" CASCADE;
  DROP TABLE "carrieres_page_content" CASCADE;
  DROP TABLE "carrieres_page_content_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_dossier_documents_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_dossier_submissions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_job_openings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_job_applications_fk";
  
  DROP INDEX "payload_locked_documents_rels_dossier_documents_id_idx";
  DROP INDEX "payload_locked_documents_rels_dossier_submissions_id_idx";
  DROP INDEX "payload_locked_documents_rels_job_openings_id_idx";
  DROP INDEX "payload_locked_documents_rels_job_applications_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "dossier_documents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "dossier_submissions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "job_openings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "job_applications_id";
  DROP TYPE "public"."enum_dossier_submissions_need_type";
  DROP TYPE "public"."enum_dossier_submissions_amount_range";
  DROP TYPE "public"."enum_job_openings_contract_type";`)
}
