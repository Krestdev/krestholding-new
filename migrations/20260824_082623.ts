import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr', 'it');
  CREATE TYPE "public"."enum_subsidiaries_poles_active" AS ENUM('Growth, Marketing & Brand', 'Développement informatique', 'Comptabilité & Fiscalité', 'Procurement', 'Ressources Humaines');
  CREATE TYPE "public"."enum_subsidiaries_category" AS ENUM('Solutions Digitales', 'Restauration', 'Architecture & Design', 'Géotechnique & Génie Civil', 'Loisirs & Bien-Être', 'Gestion Fourrière');
  CREATE TYPE "public"."enum_subsidiaries_accent_color" AS ENUM('teal', 'red', 'orange', 'gray');
  CREATE TYPE "public"."enum_contact_submissions_motif" AS ENUM('parcours-prioritaire', 'investisseur-partenaire', 'presse', 'candidat', 'autre');
  CREATE TYPE "public"."enum_participations_page_content_ownership_breakdown_rank_color" AS ENUM('orange', 'teal');
  CREATE TYPE "public"."enum_participations_page_content_ownership_breakdown_bar_color" AS ENUM('orange', 'gray');
  CREATE TABLE "media" (
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
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "subsidiaries_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "subsidiaries_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "subsidiaries_motivation_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "subsidiaries_motivation_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "subsidiaries_entry_situation_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "subsidiaries_entry_situation_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "subsidiaries_poles_active" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_subsidiaries_poles_active",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "subsidiaries_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "subsidiaries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_subsidiaries_category" NOT NULL,
  	"logo_id" integer,
  	"featured_image_id" integer,
  	"website_url" varchar,
  	"featured_in_home" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"participation_label" varchar,
  	"entry_year" numeric,
  	"accent_color" "enum_subsidiaries_accent_color" DEFAULT 'teal',
  	"detail_url" varchar,
  	"city" varchar,
  	"country" varchar DEFAULT 'Cameroun',
  	"legal_name" varchar,
  	"headcount" varchar,
  	"founded_year" numeric,
  	"certification_label" varchar,
  	"participation_type" varchar,
  	"board_representation" varchar,
  	"reporting_frequency" varchar,
  	"engagement_duration" varchar,
  	"operational_direction" varchar,
  	"participation_status" varchar DEFAULT 'Participation active',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "subsidiaries_locales" (
  	"name" varchar NOT NULL,
  	"short_description" varchar,
  	"full_description" jsonb,
  	"company_overview_intro" varchar,
  	"activity_label" varchar,
  	"starting_situation_body" varchar,
  	"what_krest_did_body" varchar,
  	"result_body" varchar,
  	"governance_intro" varchar,
  	"synergies_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "company_values" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "company_values_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"featured_image_id" integer,
  	"author" varchar DEFAULT 'Équipe Krest',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar NOT NULL,
  	"excerpt" varchar,
  	"category" varchar DEFAULT 'Actualité',
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"subsidiaries_id" integer
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar NOT NULL,
  	"avatar_id" integer,
  	"company_logo_id" integer,
  	"rating" numeric DEFAULT 5,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"author_title" varchar,
  	"quote" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" varchar DEFAULT 'Général',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"badge_icon_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "certifications_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"icon_id" integer,
  	"header_image_id" integer,
  	"video_url" varchar,
  	"featured_in_hero" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"preview_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"example" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"motif" "enum_contact_submissions_motif" NOT NULL,
  	"email" varchar NOT NULL,
  	"phone_country_code" varchar DEFAULT '237',
  	"phone_number" varchar NOT NULL,
  	"organization" varchar NOT NULL,
  	"country" varchar DEFAULT 'Cameroun' NOT NULL,
  	"project_description" varchar NOT NULL,
  	"consent_accepted" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
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
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
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
  	"media_id" integer,
  	"subsidiaries_id" integer,
  	"company_values_id" integer,
  	"news_id" integer,
  	"pages_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"certifications_id" integer,
  	"services_id" integer,
  	"contact_submissions_id" integer,
  	"users_id" integer
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
  
  CREATE TABLE "header_nav_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"cta_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"cta_label" varchar DEFAULT 'Soumettre',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"column_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"description" jsonb,
  	"participations_column_title" varchar DEFAULT 'Participations',
  	"copyright_notice" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_info_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phone" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"physical_address" varchar,
  	"postal_box" varchar,
  	"map_iframe_url" varchar,
  	"legal_name" varchar DEFAULT 'KREST HOLDING',
  	"linkedin_url" varchar,
  	"twitter_url" varchar,
  	"opening_hours" varchar DEFAULT 'Lun — Ven, 8h — 17h (WAT)',
  	"directions_url" varchar,
  	"rccm_number" varchar,
  	"taxpayer_number" varchar,
  	"legal_notice_url" varchar DEFAULT '/mentions-legales',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_content_about_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_content_about_tags_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_content_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_content_about_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_content_model_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_content_model_steps_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_content_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_content_process_steps_locales" (
  	"title" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_content_synergies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entity_a_id" integer NOT NULL,
  	"entity_b_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_content_synergies_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_content_contact_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_content_contact_checklist_locales" (
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_cta_url" varchar,
  	"hero_secondary_cta_url" varchar,
  	"hero_bg_media_id" integer,
  	"about_quote_avatar_id" integer,
  	"about_quote_author_name" varchar,
  	"about_cta_url" varchar,
  	"process_cta_url" varchar,
  	"faq_image_id" integer,
  	"testimonials_cta_url" varchar,
  	"contact_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_content_locales" (
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"hero_cta_label" varchar,
  	"hero_secondary_cta_label" varchar,
  	"about_kicker" varchar,
  	"about_intro_heading" varchar,
  	"about_intro_body" varchar,
  	"about_quote_author_title" varchar,
  	"about_quote_text" varchar,
  	"about_second_kicker" varchar,
  	"about_stats_heading" varchar,
  	"about_stats_body" varchar,
  	"about_cta_label" varchar,
  	"poles_kicker" varchar,
  	"poles_heading" varchar,
  	"model_kicker" varchar,
  	"model_heading" varchar,
  	"model_body" varchar,
  	"process_heading" varchar,
  	"process_note_title" varchar,
  	"process_note_body" varchar,
  	"process_cta_label" varchar,
  	"subsidiaries_kicker" varchar,
  	"subsidiaries_heading" varchar,
  	"subsidiaries_subheading" varchar,
  	"synergies_heading" varchar,
  	"certifications_kicker" varchar,
  	"certifications_heading" varchar,
  	"certifications_body" varchar,
  	"testimonials_kicker" varchar,
  	"testimonials_heading" varchar,
  	"testimonials_cta_label" varchar,
  	"news_kicker" varchar,
  	"news_heading" varchar,
  	"contact_kicker" varchar,
  	"contact_heading" varchar,
  	"contact_confidentiality_title" varchar,
  	"contact_confidentiality_body" varchar,
  	"contact_address" varchar,
  	"newsletter_kicker" varchar,
  	"newsletter_heading" varchar,
  	"newsletter_placeholder" varchar,
  	"newsletter_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"history_image_id" integer,
  	"perspectives_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_content_locales" (
  	"page_title" varchar,
  	"history_title" varchar,
  	"history_body" jsonb,
  	"perspectives_title" varchar,
  	"perspectives_body" jsonb,
  	"vision_title" varchar,
  	"vision_body" jsonb,
  	"mission_title" varchar,
  	"mission_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_sector_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_sector_cards_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_intervention_zones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_intervention_zones_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_pole_cards_examples" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_pole_cards_examples_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_pole_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_pole_cards_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_impact_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "notre_modele_content_impact_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "notre_modele_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intervention_zones_image_id" integer,
  	"case_study_cta_primary_url" varchar,
  	"case_study_cta_secondary_url" varchar,
  	"impact_cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "notre_modele_content_locales" (
  	"hero_heading" varchar,
  	"thesis_kicker" varchar,
  	"thesis_intro" varchar,
  	"thesis_body" varchar,
  	"thesis_quote" varchar,
  	"sectors_kicker" varchar,
  	"sectors_intro" varchar,
  	"poles_kicker" varchar,
  	"poles_heading" varchar,
  	"poles_intro" varchar,
  	"case_study_kicker" varchar,
  	"case_study_heading" varchar,
  	"case_study_intro" varchar,
  	"case_study_situation_title" varchar,
  	"case_study_situation_body" varchar,
  	"case_study_action_title" varchar,
  	"case_study_action_body" varchar,
  	"case_study_result_title" varchar,
  	"case_study_result_body" varchar,
  	"case_study_cta_title" varchar,
  	"case_study_cta_body" varchar,
  	"case_study_cta_primary_label" varchar,
  	"case_study_cta_secondary_label" varchar,
  	"impact_kicker" varchar,
  	"impact_heading" varchar,
  	"impact_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "participations_page_content_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "participations_page_content_hero_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "participations_page_content_synergies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entity_a_id" integer NOT NULL,
  	"entity_b_id" integer NOT NULL
  );
  
  CREATE TABLE "participations_page_content_synergies_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "participations_page_content_sector_breakdown" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"percentage" numeric NOT NULL
  );
  
  CREATE TABLE "participations_page_content_sector_breakdown_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "participations_page_content_ownership_breakdown" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rank" varchar NOT NULL,
  	"rank_color" "enum_participations_page_content_ownership_breakdown_rank_color" DEFAULT 'orange',
  	"percentage" numeric NOT NULL,
  	"bar_color" "enum_participations_page_content_ownership_breakdown_bar_color" DEFAULT 'orange'
  );
  
  CREATE TABLE "participations_page_content_ownership_breakdown_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "participations_page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"founding_year" numeric DEFAULT 2018,
  	"cta_left_primary_url" varchar,
  	"cta_left_secondary_url" varchar,
  	"cta_right_primary_url" varchar,
  	"cta_right_secondary_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "participations_page_content_locales" (
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"portfolio_kicker" varchar,
  	"portfolio_heading" varchar,
  	"portfolio_subheading" varchar,
  	"synergies_kicker" varchar,
  	"synergies_heading" varchar,
  	"synergies_subheading" varchar,
  	"composition_kicker" varchar,
  	"composition_subheading" varchar,
  	"timeline_kicker" varchar,
  	"timeline_subheading" varchar,
  	"founding_label" varchar,
  	"cta_left_heading" varchar,
  	"cta_left_body" varchar,
  	"cta_left_primary_label" varchar,
  	"cta_left_secondary_label" varchar,
  	"cta_right_heading" varchar,
  	"cta_right_body" varchar,
  	"cta_right_primary_label" varchar,
  	"cta_right_secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries_stats" ADD CONSTRAINT "subsidiaries_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subsidiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries_stats_locales" ADD CONSTRAINT "subsidiaries_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subsidiaries_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries_motivation_points" ADD CONSTRAINT "subsidiaries_motivation_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subsidiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries_motivation_points_locales" ADD CONSTRAINT "subsidiaries_motivation_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subsidiaries_motivation_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries_entry_situation_points" ADD CONSTRAINT "subsidiaries_entry_situation_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subsidiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries_entry_situation_points_locales" ADD CONSTRAINT "subsidiaries_entry_situation_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subsidiaries_entry_situation_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries_poles_active" ADD CONSTRAINT "subsidiaries_poles_active_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."subsidiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries_gallery" ADD CONSTRAINT "subsidiaries_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "subsidiaries_gallery" ADD CONSTRAINT "subsidiaries_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subsidiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsidiaries" ADD CONSTRAINT "subsidiaries_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "subsidiaries" ADD CONSTRAINT "subsidiaries_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "subsidiaries_locales" ADD CONSTRAINT "subsidiaries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subsidiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_values_locales" ADD CONSTRAINT "company_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_subsidiaries_fk" FOREIGN KEY ("subsidiaries_id") REFERENCES "public"."subsidiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_badge_icon_id_media_id_fk" FOREIGN KEY ("badge_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_locales" ADD CONSTRAINT "certifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_header_image_id_media_id_fk" FOREIGN KEY ("header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_preview_id_media_id_fk" FOREIGN KEY ("preview_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subsidiaries_fk" FOREIGN KEY ("subsidiaries_id") REFERENCES "public"."subsidiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_company_values_fk" FOREIGN KEY ("company_values_id") REFERENCES "public"."company_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items_locales" ADD CONSTRAINT "header_nav_items_sub_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_sub_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_emails" ADD CONSTRAINT "contact_info_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_phones" ADD CONSTRAINT "contact_info_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_about_tags" ADD CONSTRAINT "home_page_content_about_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_about_tags_locales" ADD CONSTRAINT "home_page_content_about_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content_about_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_about_stats" ADD CONSTRAINT "home_page_content_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_about_stats_locales" ADD CONSTRAINT "home_page_content_about_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content_about_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_model_steps" ADD CONSTRAINT "home_page_content_model_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_model_steps_locales" ADD CONSTRAINT "home_page_content_model_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content_model_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_process_steps" ADD CONSTRAINT "home_page_content_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_process_steps_locales" ADD CONSTRAINT "home_page_content_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_synergies" ADD CONSTRAINT "home_page_content_synergies_entity_a_id_subsidiaries_id_fk" FOREIGN KEY ("entity_a_id") REFERENCES "public"."subsidiaries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_content_synergies" ADD CONSTRAINT "home_page_content_synergies_entity_b_id_subsidiaries_id_fk" FOREIGN KEY ("entity_b_id") REFERENCES "public"."subsidiaries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_content_synergies" ADD CONSTRAINT "home_page_content_synergies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_synergies_locales" ADD CONSTRAINT "home_page_content_synergies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content_synergies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_contact_checklist" ADD CONSTRAINT "home_page_content_contact_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content_contact_checklist_locales" ADD CONSTRAINT "home_page_content_contact_checklist_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content_contact_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_content" ADD CONSTRAINT "home_page_content_hero_bg_media_id_media_id_fk" FOREIGN KEY ("hero_bg_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_content" ADD CONSTRAINT "home_page_content_about_quote_avatar_id_media_id_fk" FOREIGN KEY ("about_quote_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_content" ADD CONSTRAINT "home_page_content_faq_image_id_media_id_fk" FOREIGN KEY ("faq_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_content_locales" ADD CONSTRAINT "home_page_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_content" ADD CONSTRAINT "about_page_content_history_image_id_media_id_fk" FOREIGN KEY ("history_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content" ADD CONSTRAINT "about_page_content_perspectives_image_id_media_id_fk" FOREIGN KEY ("perspectives_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_content_locales" ADD CONSTRAINT "about_page_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_sector_cards" ADD CONSTRAINT "notre_modele_content_sector_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_sector_cards_locales" ADD CONSTRAINT "notre_modele_content_sector_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content_sector_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_intervention_zones" ADD CONSTRAINT "notre_modele_content_intervention_zones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_intervention_zones_locales" ADD CONSTRAINT "notre_modele_content_intervention_zones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content_intervention_zones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_pole_cards_examples" ADD CONSTRAINT "notre_modele_content_pole_cards_examples_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content_pole_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_pole_cards_examples_locales" ADD CONSTRAINT "notre_modele_content_pole_cards_examples_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content_pole_cards_examples"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_pole_cards" ADD CONSTRAINT "notre_modele_content_pole_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_pole_cards_locales" ADD CONSTRAINT "notre_modele_content_pole_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content_pole_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_impact_stats" ADD CONSTRAINT "notre_modele_content_impact_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content_impact_stats_locales" ADD CONSTRAINT "notre_modele_content_impact_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content_impact_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notre_modele_content" ADD CONSTRAINT "notre_modele_content_intervention_zones_image_id_media_id_fk" FOREIGN KEY ("intervention_zones_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notre_modele_content_locales" ADD CONSTRAINT "notre_modele_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notre_modele_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_hero_stats" ADD CONSTRAINT "participations_page_content_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_hero_stats_locales" ADD CONSTRAINT "participations_page_content_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_synergies" ADD CONSTRAINT "participations_page_content_synergies_entity_a_id_subsidiaries_id_fk" FOREIGN KEY ("entity_a_id") REFERENCES "public"."subsidiaries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "participations_page_content_synergies" ADD CONSTRAINT "participations_page_content_synergies_entity_b_id_subsidiaries_id_fk" FOREIGN KEY ("entity_b_id") REFERENCES "public"."subsidiaries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "participations_page_content_synergies" ADD CONSTRAINT "participations_page_content_synergies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_synergies_locales" ADD CONSTRAINT "participations_page_content_synergies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content_synergies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_sector_breakdown" ADD CONSTRAINT "participations_page_content_sector_breakdown_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_sector_breakdown_locales" ADD CONSTRAINT "participations_page_content_sector_breakdown_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content_sector_breakdown"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_ownership_breakdown" ADD CONSTRAINT "participations_page_content_ownership_breakdown_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_ownership_breakdown_locales" ADD CONSTRAINT "participations_page_content_ownership_breakdown_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content_ownership_breakdown"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "participations_page_content_locales" ADD CONSTRAINT "participations_page_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."participations_page_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "subsidiaries_stats_order_idx" ON "subsidiaries_stats" USING btree ("_order");
  CREATE INDEX "subsidiaries_stats_parent_id_idx" ON "subsidiaries_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "subsidiaries_stats_locales_locale_parent_id_unique" ON "subsidiaries_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "subsidiaries_motivation_points_order_idx" ON "subsidiaries_motivation_points" USING btree ("_order");
  CREATE INDEX "subsidiaries_motivation_points_parent_id_idx" ON "subsidiaries_motivation_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "subsidiaries_motivation_points_locales_locale_parent_id_uniq" ON "subsidiaries_motivation_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "subsidiaries_entry_situation_points_order_idx" ON "subsidiaries_entry_situation_points" USING btree ("_order");
  CREATE INDEX "subsidiaries_entry_situation_points_parent_id_idx" ON "subsidiaries_entry_situation_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "subsidiaries_entry_situation_points_locales_locale_parent_id" ON "subsidiaries_entry_situation_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "subsidiaries_poles_active_order_idx" ON "subsidiaries_poles_active" USING btree ("order");
  CREATE INDEX "subsidiaries_poles_active_parent_idx" ON "subsidiaries_poles_active" USING btree ("parent_id");
  CREATE INDEX "subsidiaries_gallery_order_idx" ON "subsidiaries_gallery" USING btree ("_order");
  CREATE INDEX "subsidiaries_gallery_parent_id_idx" ON "subsidiaries_gallery" USING btree ("_parent_id");
  CREATE INDEX "subsidiaries_gallery_image_idx" ON "subsidiaries_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "subsidiaries_slug_idx" ON "subsidiaries" USING btree ("slug");
  CREATE INDEX "subsidiaries_logo_idx" ON "subsidiaries" USING btree ("logo_id");
  CREATE INDEX "subsidiaries_featured_image_idx" ON "subsidiaries" USING btree ("featured_image_id");
  CREATE INDEX "subsidiaries_updated_at_idx" ON "subsidiaries" USING btree ("updated_at");
  CREATE INDEX "subsidiaries_created_at_idx" ON "subsidiaries" USING btree ("created_at");
  CREATE UNIQUE INDEX "subsidiaries_locales_locale_parent_id_unique" ON "subsidiaries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "company_values_updated_at_idx" ON "company_values" USING btree ("updated_at");
  CREATE INDEX "company_values_created_at_idx" ON "company_values" USING btree ("created_at");
  CREATE UNIQUE INDEX "company_values_locales_locale_parent_id_unique" ON "company_values_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_featured_image_idx" ON "news" USING btree ("featured_image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_subsidiaries_id_idx" ON "news_rels" USING btree ("subsidiaries_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_company_logo_idx" ON "testimonials" USING btree ("company_logo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "certifications_badge_icon_idx" ON "certifications" USING btree ("badge_icon_id");
  CREATE INDEX "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  CREATE UNIQUE INDEX "certifications_locales_locale_parent_id_unique" ON "certifications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_icon_idx" ON "services" USING btree ("icon_id");
  CREATE INDEX "services_header_image_idx" ON "services" USING btree ("header_image_id");
  CREATE INDEX "services_preview_idx" ON "services" USING btree ("preview_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_subsidiaries_id_idx" ON "payload_locked_documents_rels" USING btree ("subsidiaries_id");
  CREATE INDEX "payload_locked_documents_rels_company_values_id_idx" ON "payload_locked_documents_rels" USING btree ("company_values_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_certifications_id_idx" ON "payload_locked_documents_rels" USING btree ("certifications_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_sub_items_order_idx" ON "header_nav_items_sub_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_items_parent_id_idx" ON "header_nav_items_sub_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_sub_items_locales_locale_parent_id_unique" ON "header_nav_items_sub_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_icon_idx" ON "footer_social_links" USING btree ("icon_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_info_emails_order_idx" ON "contact_info_emails" USING btree ("_order");
  CREATE INDEX "contact_info_emails_parent_id_idx" ON "contact_info_emails" USING btree ("_parent_id");
  CREATE INDEX "contact_info_phones_order_idx" ON "contact_info_phones" USING btree ("_order");
  CREATE INDEX "contact_info_phones_parent_id_idx" ON "contact_info_phones" USING btree ("_parent_id");
  CREATE INDEX "home_page_content_about_tags_order_idx" ON "home_page_content_about_tags" USING btree ("_order");
  CREATE INDEX "home_page_content_about_tags_parent_id_idx" ON "home_page_content_about_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_content_about_tags_locales_locale_parent_id_unique" ON "home_page_content_about_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_content_about_stats_order_idx" ON "home_page_content_about_stats" USING btree ("_order");
  CREATE INDEX "home_page_content_about_stats_parent_id_idx" ON "home_page_content_about_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_content_about_stats_locales_locale_parent_id_uniqu" ON "home_page_content_about_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_content_model_steps_order_idx" ON "home_page_content_model_steps" USING btree ("_order");
  CREATE INDEX "home_page_content_model_steps_parent_id_idx" ON "home_page_content_model_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_content_model_steps_locales_locale_parent_id_uniqu" ON "home_page_content_model_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_content_process_steps_order_idx" ON "home_page_content_process_steps" USING btree ("_order");
  CREATE INDEX "home_page_content_process_steps_parent_id_idx" ON "home_page_content_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_content_process_steps_locales_locale_parent_id_uni" ON "home_page_content_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_content_synergies_order_idx" ON "home_page_content_synergies" USING btree ("_order");
  CREATE INDEX "home_page_content_synergies_parent_id_idx" ON "home_page_content_synergies" USING btree ("_parent_id");
  CREATE INDEX "home_page_content_synergies_entity_a_idx" ON "home_page_content_synergies" USING btree ("entity_a_id");
  CREATE INDEX "home_page_content_synergies_entity_b_idx" ON "home_page_content_synergies" USING btree ("entity_b_id");
  CREATE UNIQUE INDEX "home_page_content_synergies_locales_locale_parent_id_unique" ON "home_page_content_synergies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_content_contact_checklist_order_idx" ON "home_page_content_contact_checklist" USING btree ("_order");
  CREATE INDEX "home_page_content_contact_checklist_parent_id_idx" ON "home_page_content_contact_checklist" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_content_contact_checklist_locales_locale_parent_id" ON "home_page_content_contact_checklist_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_content_hero_bg_media_idx" ON "home_page_content" USING btree ("hero_bg_media_id");
  CREATE INDEX "home_page_content_about_quote_avatar_idx" ON "home_page_content" USING btree ("about_quote_avatar_id");
  CREATE INDEX "home_page_content_faq_image_idx" ON "home_page_content" USING btree ("faq_image_id");
  CREATE UNIQUE INDEX "home_page_content_locales_locale_parent_id_unique" ON "home_page_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_content_history_image_idx" ON "about_page_content" USING btree ("history_image_id");
  CREATE INDEX "about_page_content_perspectives_image_idx" ON "about_page_content" USING btree ("perspectives_image_id");
  CREATE UNIQUE INDEX "about_page_content_locales_locale_parent_id_unique" ON "about_page_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notre_modele_content_sector_cards_order_idx" ON "notre_modele_content_sector_cards" USING btree ("_order");
  CREATE INDEX "notre_modele_content_sector_cards_parent_id_idx" ON "notre_modele_content_sector_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "notre_modele_content_sector_cards_locales_locale_parent_id_u" ON "notre_modele_content_sector_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notre_modele_content_intervention_zones_order_idx" ON "notre_modele_content_intervention_zones" USING btree ("_order");
  CREATE INDEX "notre_modele_content_intervention_zones_parent_id_idx" ON "notre_modele_content_intervention_zones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "notre_modele_content_intervention_zones_locales_locale_paren" ON "notre_modele_content_intervention_zones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notre_modele_content_pole_cards_examples_order_idx" ON "notre_modele_content_pole_cards_examples" USING btree ("_order");
  CREATE INDEX "notre_modele_content_pole_cards_examples_parent_id_idx" ON "notre_modele_content_pole_cards_examples" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "notre_modele_content_pole_cards_examples_locales_locale_pare" ON "notre_modele_content_pole_cards_examples_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notre_modele_content_pole_cards_order_idx" ON "notre_modele_content_pole_cards" USING btree ("_order");
  CREATE INDEX "notre_modele_content_pole_cards_parent_id_idx" ON "notre_modele_content_pole_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "notre_modele_content_pole_cards_locales_locale_parent_id_uni" ON "notre_modele_content_pole_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notre_modele_content_impact_stats_order_idx" ON "notre_modele_content_impact_stats" USING btree ("_order");
  CREATE INDEX "notre_modele_content_impact_stats_parent_id_idx" ON "notre_modele_content_impact_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "notre_modele_content_impact_stats_locales_locale_parent_id_u" ON "notre_modele_content_impact_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notre_modele_content_intervention_zones_image_idx" ON "notre_modele_content" USING btree ("intervention_zones_image_id");
  CREATE UNIQUE INDEX "notre_modele_content_locales_locale_parent_id_unique" ON "notre_modele_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "participations_page_content_hero_stats_order_idx" ON "participations_page_content_hero_stats" USING btree ("_order");
  CREATE INDEX "participations_page_content_hero_stats_parent_id_idx" ON "participations_page_content_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "participations_page_content_hero_stats_locales_locale_parent" ON "participations_page_content_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "participations_page_content_synergies_order_idx" ON "participations_page_content_synergies" USING btree ("_order");
  CREATE INDEX "participations_page_content_synergies_parent_id_idx" ON "participations_page_content_synergies" USING btree ("_parent_id");
  CREATE INDEX "participations_page_content_synergies_entity_a_idx" ON "participations_page_content_synergies" USING btree ("entity_a_id");
  CREATE INDEX "participations_page_content_synergies_entity_b_idx" ON "participations_page_content_synergies" USING btree ("entity_b_id");
  CREATE UNIQUE INDEX "participations_page_content_synergies_locales_locale_parent_" ON "participations_page_content_synergies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "participations_page_content_sector_breakdown_order_idx" ON "participations_page_content_sector_breakdown" USING btree ("_order");
  CREATE INDEX "participations_page_content_sector_breakdown_parent_id_idx" ON "participations_page_content_sector_breakdown" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "participations_page_content_sector_breakdown_locales_locale_" ON "participations_page_content_sector_breakdown_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "participations_page_content_ownership_breakdown_order_idx" ON "participations_page_content_ownership_breakdown" USING btree ("_order");
  CREATE INDEX "participations_page_content_ownership_breakdown_parent_id_idx" ON "participations_page_content_ownership_breakdown" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "participations_page_content_ownership_breakdown_locales_loca" ON "participations_page_content_ownership_breakdown_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "participations_page_content_locales_locale_parent_id_unique" ON "participations_page_content_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "subsidiaries_stats" CASCADE;
  DROP TABLE "subsidiaries_stats_locales" CASCADE;
  DROP TABLE "subsidiaries_motivation_points" CASCADE;
  DROP TABLE "subsidiaries_motivation_points_locales" CASCADE;
  DROP TABLE "subsidiaries_entry_situation_points" CASCADE;
  DROP TABLE "subsidiaries_entry_situation_points_locales" CASCADE;
  DROP TABLE "subsidiaries_poles_active" CASCADE;
  DROP TABLE "subsidiaries_gallery" CASCADE;
  DROP TABLE "subsidiaries" CASCADE;
  DROP TABLE "subsidiaries_locales" CASCADE;
  DROP TABLE "company_values" CASCADE;
  DROP TABLE "company_values_locales" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "certifications" CASCADE;
  DROP TABLE "certifications_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_sub_items" CASCADE;
  DROP TABLE "header_nav_items_sub_items_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "contact_info_emails" CASCADE;
  DROP TABLE "contact_info_phones" CASCADE;
  DROP TABLE "contact_info" CASCADE;
  DROP TABLE "home_page_content_about_tags" CASCADE;
  DROP TABLE "home_page_content_about_tags_locales" CASCADE;
  DROP TABLE "home_page_content_about_stats" CASCADE;
  DROP TABLE "home_page_content_about_stats_locales" CASCADE;
  DROP TABLE "home_page_content_model_steps" CASCADE;
  DROP TABLE "home_page_content_model_steps_locales" CASCADE;
  DROP TABLE "home_page_content_process_steps" CASCADE;
  DROP TABLE "home_page_content_process_steps_locales" CASCADE;
  DROP TABLE "home_page_content_synergies" CASCADE;
  DROP TABLE "home_page_content_synergies_locales" CASCADE;
  DROP TABLE "home_page_content_contact_checklist" CASCADE;
  DROP TABLE "home_page_content_contact_checklist_locales" CASCADE;
  DROP TABLE "home_page_content" CASCADE;
  DROP TABLE "home_page_content_locales" CASCADE;
  DROP TABLE "about_page_content" CASCADE;
  DROP TABLE "about_page_content_locales" CASCADE;
  DROP TABLE "notre_modele_content_sector_cards" CASCADE;
  DROP TABLE "notre_modele_content_sector_cards_locales" CASCADE;
  DROP TABLE "notre_modele_content_intervention_zones" CASCADE;
  DROP TABLE "notre_modele_content_intervention_zones_locales" CASCADE;
  DROP TABLE "notre_modele_content_pole_cards_examples" CASCADE;
  DROP TABLE "notre_modele_content_pole_cards_examples_locales" CASCADE;
  DROP TABLE "notre_modele_content_pole_cards" CASCADE;
  DROP TABLE "notre_modele_content_pole_cards_locales" CASCADE;
  DROP TABLE "notre_modele_content_impact_stats" CASCADE;
  DROP TABLE "notre_modele_content_impact_stats_locales" CASCADE;
  DROP TABLE "notre_modele_content" CASCADE;
  DROP TABLE "notre_modele_content_locales" CASCADE;
  DROP TABLE "participations_page_content_hero_stats" CASCADE;
  DROP TABLE "participations_page_content_hero_stats_locales" CASCADE;
  DROP TABLE "participations_page_content_synergies" CASCADE;
  DROP TABLE "participations_page_content_synergies_locales" CASCADE;
  DROP TABLE "participations_page_content_sector_breakdown" CASCADE;
  DROP TABLE "participations_page_content_sector_breakdown_locales" CASCADE;
  DROP TABLE "participations_page_content_ownership_breakdown" CASCADE;
  DROP TABLE "participations_page_content_ownership_breakdown_locales" CASCADE;
  DROP TABLE "participations_page_content" CASCADE;
  DROP TABLE "participations_page_content_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_subsidiaries_poles_active";
  DROP TYPE "public"."enum_subsidiaries_category";
  DROP TYPE "public"."enum_subsidiaries_accent_color";
  DROP TYPE "public"."enum_contact_submissions_motif";
  DROP TYPE "public"."enum_participations_page_content_ownership_breakdown_rank_color";
  DROP TYPE "public"."enum_participations_page_content_ownership_breakdown_bar_color";`)
}
