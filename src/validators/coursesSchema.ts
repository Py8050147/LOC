import { z } from 'zod';

// Check if the code is running on the server or the client
 export const isServer = typeof window === 'undefined';

// Schema definition
export const courseSchema = z.object({
    title: z.string({ message: 'Title name should be string' }).min(4, { message: 'Title must be at least 4 characters' }),
    description: z.string({ message: 'Description name should be string' }).min(4, { message: 'Description must be at least 4 characters' }),
    image: z.instanceof(isServer ? File : FileList, {
        message: 'Image should be a file',
    }).optional(),
    videoFile: z.instanceof(isServer ? File : FileList, {
        message: 'video should be a file' 
    }).optional()
});
