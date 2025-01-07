import { z } from "zod";
export const isServer = typeof window === 'undefined';
export const tweetSchema = z.object({
    userId: z.preprocess(
        (value) => (value ? parseInt(value as string, 10) : undefined),
        z.number({ message: 'User Id should be number' })
    ),
    communityId: z.preprocess(
        (value) => (value ? parseInt(value as string, 10) : undefined),
        z.number({ message: 'Community Id should be number' })
    ),
    content: z.string({ message: 'Content should be string' }),
    image: z.instanceof(isServer ? File : FileList, {
        message: 'Image should be a file',
    }),
})