import { db } from "@/lib/db/db";
import { courses, notes, users } from "@/lib/db/schema";
import { noteSchema } from "@/validators/notesSchema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
   const data = await request.json();
   let validatedData;
   try {
      validatedData = await noteSchema.parse(data)
   } catch (error) {
      return Response.json({ message: error }, { status: 400 });
   }

   try {
      await db.insert(notes).values(validatedData) 
      return Response.json({ message: "OK" }, { status: 201 });
   } catch (error) {
      return Response.json(
         { message: "Failed to store the notes into the database" },
         { status: 500 }
       );
   }
}

export async function GET() {
   try {
      const allNotes = await db.select({
         id: notes.id,
         course: courses.title,
         user:(users.fname, users.lname),
      })
         .from(notes)
         .leftJoin(courses, eq(notes.courseId, courses.id))
         .leftJoin(users, eq(notes.userId, users.id))
      
         return Response.json(allNotes);
   } catch (error) {
      return Response.json(
         { message: "Failed to fetch notes" },
         { status: 500 }
       );
   }
}