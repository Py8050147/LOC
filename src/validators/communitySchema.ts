import { z } from "zod";

export const isServer = typeof window === 'undefined'

export const communitySchema = z.object({
    content: z.string({ message: 'Content should be string' }).min(4),
    userId: z.preprocess(
        (value) => (value ? parseInt(value as string, 10) : undefined),
        z.number({ message: "UserId should be a number" })
      ),
      courseId: z.preprocess(
        (value) => (value ? parseInt(value as string, 10) : undefined),
        z.number({ message: "CourseId should be a number" })
      ),
    image: z.instanceof(isServer ? File : FileList, {
        message: 'Image should be a file'
    }).optional()
})