import { z } from "zod"; 

export const commentSchema = z.object({
    content: z.string({ message: 'content should be string' }),
    userId: z.string({ message: 'userId should be string' }),
    tweetId: z.string({ message: 'tweetId should be string' }),
    communityId: z.string({ message: 'communityId should be string' })
})