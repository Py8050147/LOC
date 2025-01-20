import { z } from "zod";

export const isServer = typeof window === "undefined";

export const communitySchema = z.object({
  content: z.string({ message: "Content should be a string" }).min(4),
  userId: z.preprocess(
    (value) => (value ? parseInt(value as string, 10) : undefined),
    z.number({ message: "UserId should be a number" })
  ),
  courseId: z.preprocess(
    (value) => (value ? parseInt(value as string, 10) : undefined),
    z.number({ message: "CourseId should be a number" })
  ),
  image: z
    .preprocess(
      (value) => (value instanceof File || value instanceof FileList ? value : undefined),
      isServer
        ? z.instanceof(File, { message: "Image should be a file on the server" }).optional()
        : z.instanceof(FileList, { message: "Image should be a FileList on the client" }).optional()
    ).optional().default("default-image.jpg"), // Set a default image filename
});


// import { z } from "zod";

// export const isServer = typeof window === 'undefined'

// export const communitySchema = z.object({
//     content: z.string({ message: 'Content should be string' }).min(4),
//     userId: z.preprocess(
//         (value) => (value ? parseInt(value as string, 10) : undefined),
//         z.number({ message: "UserId should be a number" })
//       ),
//       courseId: z.preprocess(
//         (value) => (value ? parseInt(value as string, 10) : undefined),
//         z.number({ message: "CourseId should be a number" })
//       ),
//     image: z.instanceof(isServer ? File : FileList, {
//         message: 'Image should be a file'
//     })
// })
    