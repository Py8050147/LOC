/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db/db";
import { courses } from "@/lib/db/schema";
import s3Client from "@/lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from "drizzle-orm";

export async function GET(request: Request, {params}: {params: {id: string} }) {
    const id = params.id;

    try {
        // Fetch the course by ID from the database
        const course = await db.select().from(courses).where(eq(courses.id, Number(id)));
    
        if (!course.length) {
          return new Response(JSON.stringify({ message: "Course not found." }), { status: 404 });
        }
    
        const courseData = course[0]; // Extract the first (and only) result
    
        // Generate signed URLs for the image and video file
        const imageSignedUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: "coderspankaj",
            Key: courseData.image || "",
          }),
          { expiresIn: 3600 }
        );
    
        const videoSignedUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: "coderspankaj",
            Key: courseData.videoFile || "",
          }),
          { expiresIn: 3600 }
        );
    
        // Return the course with signed URLs
        return new Response(
          JSON.stringify({
            ...courseData,
            image: imageSignedUrl,
            videoFile: videoSignedUrl,
          }),
          { status: 200 }
        );
      } catch (error) {
        return Response.json({ message: "Failed to fetch a course" }, { status: 500 });
    }
}