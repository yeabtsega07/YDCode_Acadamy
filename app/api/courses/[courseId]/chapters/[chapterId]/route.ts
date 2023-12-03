import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: {params: {courseId: string, chapterId: string}}
) {
    try{

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId, chapterId } = params;

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId,
            }
        });

        if (!courseOwner){
            return new NextResponse("Unauthorized access", {status: 401})
        }
        const { isPublished, ...values} = await req.json();

        const chapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(chapter, { status: 200});

    }
    catch(error){
        console.log("[COURSES_CHAPTER_ID] Error: " + error)
        return new NextResponse("Internal Error", { status: 500});
    }
}