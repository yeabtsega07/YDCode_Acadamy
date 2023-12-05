"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import MuxPlayer from "@mux/mux-player-react"; 

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircleIcon, Video } from "lucide-react";
import { useState } from "react";
import { Chapter, Course, MuxData } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  videoUrl: z.string().min(5, {
    message: "Image is required ",
  }),
});

interface ChapterVideoFormProps {
  initialData: Chapter & {muxData?: MuxData | null};
  courseId: string;
  chapterId: string;
}

export const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
  const router = useRouter();

  const [isediting, setEditing] = useState(false);

  const toggleEditing = () => setEditing((current) => !current);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("editing imageUrl");
    try {
      const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data);
      toast.success("Chapter updated successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border  bg-slate-100  dark:bg-slate-800  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isediting && <>Cancel</>}
          {!isediting && !initialData.videoUrl && (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add video
            </>
          )}

          {!isediting && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isediting &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center  h-60 bg-slate-200  dark:bg-slate-600  rounded-md">
            <Video className="h-10 w-10 text-slate-500  dark:text-slate-200 " />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        ))}

      {isediting && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onUpload={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isediting && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video does not appear.
        </div>
      )}
    </div>
  );
};
