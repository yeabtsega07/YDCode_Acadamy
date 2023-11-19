import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import {CircleDollarSign, LayoutList, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategotyForm } from "./_components/category-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  const catagories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });


  if (!course) {
    return redirect("/");
  }
  const requiredFeilds = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ];

  const totalFeilds = requiredFeilds.length;
  const completedFeilds = requiredFeilds.filter(Boolean).length;

  const completedText = `(${completedFeilds}/${totalFeilds})`;
  return (
    <div className="p-6">
      <div className=" flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
              Course setup
          </h1>
            <span className=" text-sm text-slate-700">
              complete your course setup {completedText}
            </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
            <div className=" flex items-center gap-x-2">
              <IconBadge icon={LayoutList}/>
              <h2 className="text-xl">
              Customize your course 
              </h2>
              </div>
              <TitleForm
                initialData = {course}
                courseId = {course.id}
              />    
              <DescriptionForm
                initialData = {course}
                courseId = {course.id}
              />   
              <ImageForm
                initialData = {course}
                courseId = {course.id}
              />  
              
              <CategotyForm
                initialData = {course}
                courseId = {course.id}
                options={catagories.map((category) =>
                  ({
                    label: category.name,
                    value: category.id
                  }))
                  }
              />  
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h2 className="text-xl ">
                    Course chapters
                  </h2>
            </div>
          </div>
          <div>
            Todo: Chapters
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">
                Sell your course
              </h2>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
