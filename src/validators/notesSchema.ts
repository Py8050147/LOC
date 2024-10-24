import { z } from "zod";

export const noteSchema = z.object({
    content: z.string({ message: 'content should be string ' }).min(4),
    courseId: z.number({ message: 'Course is should be a number' }),
    userId: z.number({ message: 'User id should be a number' })
})