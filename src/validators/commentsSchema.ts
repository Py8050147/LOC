import { z } from "zod"; 

export const commentSchema = z.object({
    content: z.string({ message: 'content should be string' }),
    userId: z.number({ message: 'userId should be number' }),
    tweetId: z.number({ message: 'tweetId should be number' }),
    communityId: z.number({ message: 'communityId should be number' })
})