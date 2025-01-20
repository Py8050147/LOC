// Import necessary libraries
import { db } from "@/lib/db/db";
import { courses } from "@/lib/db/schema";
import { courseSchema, isServer } from "@/validators/coursesSchema";
import s3Client from "@/lib/s3Client";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { desc } from "drizzle-orm";



export async function POST(request: Request) {
  const data = await request.formData();
  let validatedData;
  console.log('validatedData', validatedData)

  try {
    // Validate incoming data
     validatedData = await courseSchema.parse({
      title: data.get("title") as string,
      description: data.get("description") as string,
      image: data.get("image"),
      videoFile: data.get("videoFile"),
     });
    
    console.log('validatedData', validatedData)

    // Get files from FormData
    const inputImage = isServer ? validatedData.image as File : (validatedData.image as FileList)[0];
    const inputVideoFile = isServer ? validatedData.videoFile as File : (validatedData.videoFile as FileList)[0];
    // const inputVideoFile = data.get("videoFile") as File;

    if (!inputImage || !inputVideoFile) {
      throw new Error("Image or video file is missing");
    }

    const imageFilename = `uploads/images/${Date.now()}_${inputImage.name}`;
    const videoFilename = `uploads/videos/${Date.now()}_${inputVideoFile.name}`;

    // Prepare S3 upload parameters
    const imageParams = {
      Bucket: "coderspankaj",
      Key: imageFilename,
      Body: Buffer.from(await inputImage.arrayBuffer()),
      ContentType: inputImage.type,
    };

    const videoParams = {
      Bucket: "coderspankaj",
      Key: videoFilename,
      Body: Buffer.from(await inputVideoFile.arrayBuffer()),
      ContentType: inputVideoFile.type,
    };
    console.log('videoParams', videoParams)

    // Upload files to S3
    await s3Client.send(new PutObjectCommand(imageParams));
    await s3Client.send(new PutObjectCommand(videoParams));

    // Generate signed URLs
    const imageSignedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({ Bucket: "coderspankaj", Key: imageFilename }),
      { expiresIn: 3600 } // 1-hour expiry
    );

    const videoSignedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({ Bucket: "coderspankaj", Key: videoFilename }),
      { expiresIn: 3600 }
    );

    // Save metadata to database
   const result =   await db.insert(courses).values({
      ...validatedData,
      image: imageFilename,
      videoFile: videoFilename,
   }); 
    console.log("result",result);

    return new Response(
      JSON.stringify({
        message: "Files uploaded successfully and metadata saved",
        result,
        imageSignedUrl,
        videoSignedUrl,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error uploading files to S3 or saving to DB:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Failed to upload files" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch all courses from the database
    const allCourses = await db.select().from(courses).orderBy(desc(courses.id));
    console.log("allCourses",allCourses);

    // Generate signed URLs for each course
    const coursesWithUrls = await Promise.all(
        allCourses.map(async (course) => {
        const imageSignedUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: "coderspankaj",
            Key: course.image || "",
          }),
          { expiresIn: 3600 }
        );

        const videoSignedUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: "coderspankaj",
            Key: course.videoFile || "",
          }),
          { expiresIn: 3600 }
        );

        return {
          ...course,
          image: imageSignedUrl,
          videoFile: videoSignedUrl,
        };
      })
    );

    return new Response(JSON.stringify(coursesWithUrls), { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch courses:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Failed to fetch courses" }),
      { status: 500 }
    );
  }
}
