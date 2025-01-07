import { db } from "@/lib/db/db";
import { tweets } from "@/lib/db/schema";
import { tweetSchema } from "@/validators/tweetsSchema";
// import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    const data = await request.json()
    let validatedData;
    try {
        validatedData = tweetSchema.parse({
            content: data.get('content'),
            image?: data.get('image'),
            userId: data.get("userId"), // Ensure these fields are included in the formData
            // communityId: data.get("communityId"),
        })
    } catch (error) {
        return Response.json(
            { message: error || "Validation failed" },
            { status: 400 }
          );
    }

    try {
        await db.insert(tweets).values(validatedData)
        return Response.json({ message: "Tweet created successfully" }, { status: 201 });
    } catch (error) {
        return Response.json(
            { message: "Failed to store community into the database" },
            { status: 500 }
          );
    }
}