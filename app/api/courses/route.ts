import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request) {

    try {

        const authObject = auth();
        let userId;
        if ('userId' in authObject) {
            userId = authObject.userId;
        }
        const title = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized access", { status: 401 });
        }
        console.log("title: ", title);
        const course = await db.course.create(
            
            {
                data: {
                    userId,
                    title: title.title,
                }
            }
        )

        return new NextResponse(JSON.stringify(course), { status: 201 });


    } catch (error) {
        console.log("[Courses] Error: ", error);
        return new NextResponse("Internal Server Error", { status: 500});
    }
    
}