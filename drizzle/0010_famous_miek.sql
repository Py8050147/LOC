ALTER TABLE "ideSessions" DROP CONSTRAINT "ideSessions_courseId_id_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "ideSessions" ALTER COLUMN "courseId_id" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ideSessions" ADD CONSTRAINT "ideSessions_courseId_id_courses_id_fk" FOREIGN KEY ("courseId_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
