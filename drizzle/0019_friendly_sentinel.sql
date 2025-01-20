ALTER TABLE "comments" DROP CONSTRAINT "comments_community_Id_community_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_course_Id_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "course_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN IF EXISTS "community_Id";--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN IF EXISTS "course_Id";