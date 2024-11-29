import { db } from "@/lib/db/db"
import { community } from "@/lib/db/schema"
import { eq } from "drizzle-orm"



export async function GET(request: Request,  {params}: {params: {id: string} }) {
    const id = params.id
    try {
        const communityId = await db.select().from(community).where(eq(community.id, Number(id)))
        if (!communityId.length) {
            return Response.json({ message: "community not found." }, { status: 400 });
        }

        return Response.json(communityId[0]);

    } catch (error) {
        return Response.json({ message: "Failed to fetch a course" }, { status: 500 });
    }
}