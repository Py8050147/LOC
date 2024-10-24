import { z } from "zod";

export const tweetSchema = z.object({
    userId: z.number({ message: 'User Id should be number' }),
    communityId: z.number({ message: 'Community Id should be number' }),
    content: z.string({ message: 'Content should be string' }),
})