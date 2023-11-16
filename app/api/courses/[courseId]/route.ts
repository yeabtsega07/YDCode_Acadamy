import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params} : {params: {courseId: string}}
) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized access", { status: 401});
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(course, { status: 200});

    } catch (error) {
        console.log("[COURSES] [PATCH] Error: ", error)
        return new NextResponse("Internal Server Error", { status: 500});
    }
}