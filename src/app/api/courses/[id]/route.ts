/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db/db"
import { courses } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request, {params}: {params: {id: string} }) {
    const id = params.id

    try {
        const course = await db.select().from(courses).where(eq(courses.id, Number(id)))

        if (!course.length) {
            return Response.json({ message: 'Course not found.' }, { status: 400 });
        }

        return Response.json(course[0]);
    } catch (error) {
        return Response.json({ message: 'Failed to fetch a course' }, { status: 500 });
    }
}