import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    {params} : {params: {courseId: string}}
){

    try{

        const {courseId} = params;
        const {userId} = auth()
        const {title} = await req.json();

        if (!userId){
            return new NextResponse("Unauthorized access", {status: 401})
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            }
        });

        if (!courseOwner){
            return new NextResponse("Unauthorized access", {status: 401})
        }

        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId,
            },
            orderBy: {
                posotion: "desc",
            },
        });

        const newPosition = lastChapter ? lastChapter.posotion + 1 : 1;

        console.log(`this is the title ${title}`);
        const newChapter = await db.chapter.create({
            data: {
                title: title,
                courseId: courseId,
                posotion: newPosition,
            },
        });
        
        return NextResponse.json(newChapter);

    }
    catch(error){
        console.log(`Course Chapter POST Error: ${error} `)
        return new NextResponse("Internal Server Error", { status: 500});
    }



}