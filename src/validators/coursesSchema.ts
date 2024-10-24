import { z } from 'zod'

export const isServer = typeof window === 'undefined'

export const courseSchema = z.object({
    title: z.string({ message: 'Title name should be string' }).min(4),
    description: z.string({ message: 'Description name should be string' }).min(4),
    image: z.instanceof(isServer ? File : FileList, {
        message: 'Image should be a file',
    }).optional(),
    videoFile: z.instanceof(isServer ? File : FileList, {
        message: 'video should be a file' 
    }).optional()
})

