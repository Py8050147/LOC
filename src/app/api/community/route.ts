import { db } from "@/lib/db/db";
import { community, courses, users } from "@/lib/db/schema";
import { communitySchema, isServer } from "@/validators/communitySchema";
import { eq } from "drizzle-orm";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  const data = await request.formData();
  console.log("FormData:", data);

  let validatedData;
  try {
    validatedData = await communitySchema.parse({
      content: data.get("content"),
      image: data.get("image"), // This can be null or undefined
      userId: data.get("userId"),
      courseId: data.get("courseId"),
    });
  } catch (error) {
    return Response.json(
      { message: error || "Validation failed" },
      { status: 400 }
    );
  }

  const inputImage = isServer
    ? (validatedData.image as File)
    : (validatedData.image as FileList)?.[0];

  let fileName = null; // Default to null if no image is provided

  if (inputImage) {
    fileName = `${Date.now()}.${inputImage.name.split(".").pop()}`;
    const assetsDir = path.join(process.cwd(), "public/assets");
    const imagePath = path.join(assetsDir, fileName);

    console.log("Image Path:", imagePath);

    try {
      await mkdir(assetsDir, { recursive: true });
      const buffer = Buffer.from(await inputImage.arrayBuffer());
      await writeFile(imagePath, buffer);
      console.log("Image saved successfully");
    } catch (error) {
      return Response.json(
        { message: "Failed to save the file to the filesystem" },
        { status: 500 }
      );
    }
  }

  try {
    await db.insert(community).values({
      ...validatedData,
      image: fileName || "default-image.jpg" , // Store the file name or null
    });
    return Response.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return Response.json(
      { message: "Failed to store community into the database" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const allCommunity = await db
      .select({
        id: community.id,
        user: users.fname,
        course: courses.title,
        content: community.content,
        image: community.image,
      })
      .from(community)
      .leftJoin(users, eq(community.userId, users.id))
      .leftJoin(courses, eq(community.courseId, courses.id));
    return Response.json(allCommunity);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch community" },
      { status: 500 }
    );
  }
}
