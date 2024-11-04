import { db } from "@/lib/db/db";
import { courses } from "@/lib/db/schema";
import { courseSchema, isServer } from "@/validators/coursesSchema";
import { MakeDirectoryOptions } from "node:fs";
import { writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
    const data = await request.formData()
    let validatedData;

    try {
        validatedData = courseSchema.parse({
            title: data.get('title'),
            description: data.get('description'),
            image: data.get('image'),
            videoFile: data.get('videoFile')
        })

    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }

    const inputImage = isServer ? (validatedData.image as File) : (validatedData.image as FileList)[0]
    const inputVideoFile = isServer ? (validatedData.videoFile as File) : (validatedData.videoFile as FileList)[0]

    // const imageFilename = `${Date.now()}.${inputImage.name.split('.').slice(-1)}`;
    // const videoFilename = `${Date.now()}.${inputVideoFile.name.split('.').slice(-1)}`; 
    const imageExtension = inputImage.name.split('.').pop();
    const videoExtension = inputVideoFile.name.split('.').pop();
    const imageFilename = `${Date.now()}_image.${imageExtension}`;
    const videoFilename = `${Date.now()}_video.${videoExtension}`;

    const assetsDir = path.join(process.cwd(), 'public/assets');


    try {

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        await mkdir(assetsDir, { recursive: true }as MakeDirectoryOptions);

        const imageBuffer = Buffer.from(await inputImage.arrayBuffer());
        const videoBuffer = Buffer.from(await inputVideoFile.arrayBuffer());

        await writeFile(path.join(assetsDir, imageFilename), imageBuffer)
        await writeFile(path.join(assetsDir, videoFilename), videoBuffer)

    } catch (error) {
        return Response.json({ message: 'Failed to save the file to fs' }, { status: 500 });
    }
    

    try {
        await db.insert(courses).values({
            ...validatedData,
            image: imageFilename,
            videoFile: videoFilename
        });

        await unlink(path.join(assetsDir, imageFilename));
        await unlink(path.join(assetsDir, videoFilename));

    } catch (error) {
        return Response.json(
            { message: 'Failed to store product into the database' },
            { status: 500 }
        );
    }

    return Response.json({message: 'ok'}, {status: 200})
}

// return Response.json(
//     { message: 'Failed to store courses into the database' },
//     { status: 500 }
// );