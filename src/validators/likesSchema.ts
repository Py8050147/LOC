import { z } from "zod";

export const likeSchema = z.object({
    userId: z.string({ message: 'userId should be string' }),
    tweetId: z.string({ message: 'tweetId should be string' }),
    communityId: z.string({ message: 'communityId should be string' }),
    courseId: z.string({ message: 'courseId should be a string' })
})