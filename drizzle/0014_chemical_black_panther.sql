ALTER TABLE "comments" ADD COLUMN "course_Id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_course_Id_courses_id_fk" FOREIGN KEY ("course_Id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
