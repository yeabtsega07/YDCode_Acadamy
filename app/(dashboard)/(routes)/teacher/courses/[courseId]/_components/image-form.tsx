"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  imageUrl: z.string().min(5, {
    message: "Image is required ",
  }),
});

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();

  const [isediting, setEditing] = useState(false);

  const toggleEditing = () => setEditing((current) => !current);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("editing imageUrl");
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, data);
      toast.success("Course updated successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-center">
        Course Image
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isediting && <>Cancel</>}
          {!isediting && !initialData.imageUrl && (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add image
            </>
          )}

          {!isediting && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isediting &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.imageUrl}
              fill
              className="rounded-md object-cover"
              alt="course image"
            />
          </div>
        ))}

      {isediting && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onUpload={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
