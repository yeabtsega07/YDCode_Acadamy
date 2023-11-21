import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: {params: {courseId: string, attachmentId: string}}
) {
    const {userId} = auth();
    const {courseId, attachmentId} = params;
    
    if(!userId){
        return new NextResponse("Unauthorized", { status: 401 });
    
    }

    const courseOwner = await db.course.findUnique({
        where: {
            id: courseId,
            userId,
        }
    });

    if(!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try{
        const attachment = await db.attachment.delete({
            where: {
                courseId: courseId,
                id: attachmentId,
            }
        });
        return NextResponse.json(attachment);

    }
    catch(error) {
        console.log("COURSE_ID_ATTACHMENTS_ATTACHMENT_ID", error );
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}