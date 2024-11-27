import { z } from "zod"

export const ideSessionSchema = z.object({
    sessionData: z.string({ message: 'sessionData should be a sting' }),
    userId: z.number({ message: 'userId should be a number' }),
    courseId: z.number({ message: 'courseId should be a number' })
})