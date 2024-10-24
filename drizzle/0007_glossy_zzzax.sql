ALTER TABLE "ideSessions" ADD COLUMN "courseId_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ideSessions" ADD CONSTRAINT "ideSessions_courseId_id_courses_id_fk" FOREIGN KEY ("courseId_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
