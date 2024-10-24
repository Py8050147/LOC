import { z } from "zod"

export const ideSessionSchema = z.object({
    sessionData: z.string({ message: 'sessionData should be a sting' }),
    userId: z.string({ message: 'userId should be a string' })
})