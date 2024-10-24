import { z } from "zod";

export const isServer = typeof window === 'undefined'

export const communitySchema = z.object({
    content: z.string({ message: 'Content should be string' }),
    userId: z.string({ message: 'UserId should be string' }),
    courseId: z.string({ message: 'CourseId should be string' }),
    image: z.instanceof(isServer ? File : FileList, {
        message: 'Image should be a file'
    }).optional()

})