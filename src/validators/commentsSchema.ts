import { z } from "zod"; 

export const commentSchema = z.object({
    userId: z.number().positive("User ID must be a positive integer.").int(),
  courseId: z.number().positive().int().optional(),   // Optional if communityId exists
  content: z.string().min(4, "Content cannot be empty."), // At least 1 character
})
