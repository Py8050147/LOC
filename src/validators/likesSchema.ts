import { z } from "zod";

export const likeSchema = z.object({
    userId: z.number({ message: 'userId should be number' }),
    tweetId: z.number({ message: 'tweetId should be number' }),
    communityId: z.number({ message: 'communityId should be number' }),
    courseId: z.number({ message: 'courseId should be a number' })
})