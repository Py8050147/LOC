import { db } from "@/lib/db/db"
import { community, courses, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"



export async function GET(request: Request,  {params}: {params: {id: string} }) {
    const id = params.id
    try {
        const communityId = await db
        .select({
          id: community.id,
          user: users.fname,
          course: courses.title,
          content: community.content,
          image: community.image,
        })
        .from(community)
        .leftJoin(users, eq(community.userId, users.id))
        .leftJoin(courses, eq(community.courseId, courses.id))
        .where(eq(community.id, Number(id))); // Filter by id
        if (!communityId.length) {
            return Response.json({ message: "community not found." }, { status: 400 });
        }

        return Response.json(communityId);

    } catch (error) {
        return Response.json({ message: "Failed to fetch a course" }, { status: 500 });
    }
}