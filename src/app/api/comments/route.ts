import { comments, courses, users } from "@/lib/db/schema";
import { commentSchema } from "@/validators/commentsSchema";
// import { Comment } from "../../../../types";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";


export async function POST(request: Request) {
    try {
      const body = await request.json();
      const validatedData = commentSchema.parse(body); // Validate input
      console.log("Validated Data:", validatedData);
  
      // Insert into database
      await db.insert(comments).values(validatedData);
      return new Response(JSON.stringify({ message: "Comment created successfully!" }), {
        status: 201,
      });
    } catch (error: any) {
      console.error("Validation Error:", error);
      return new Response(JSON.stringify({ message: "Validation failed", errors: error.errors }), {
        status: 400,
      });
    }
  }
export async function GET(request: Request) {
    const url = new URL(request.url);
    const courseId = url.searchParams.get("courseId");
    if (!courseId) {
        return new Response(JSON.stringify({ message: "courseId is required" }), { status: 400 });
      }
    try {
        const allComments = await db.select({
            id: comments.id,
            content: comments.content,
            username: users.fname,
            userimage: users.image,
            courseId: comments.courseId,
        }).from(comments).leftJoin(users, eq(comments.userId, users.id)).where(eq(comments.courseId, parseInt(courseId)));
        return Response.json(allComments, { status: 200 });
    } catch (error) {
        return Response.json({ message: error }, { status: 500 });
    }
}
