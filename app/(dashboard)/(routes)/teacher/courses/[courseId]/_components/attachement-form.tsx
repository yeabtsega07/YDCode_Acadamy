"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import {
  File,
  ImageIcon,
  Loader,
  Loader2,
  Pencil,
  PlusCircleIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  url: z.string().min(1),
});

interface AttachmentFormProps {
  initialData: Course & { attachment: Attachment[] };
  courseId: string;
}

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const router = useRouter();

  const [isediting, setEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEditing = () => setEditing((current) => !current);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("editing imageUrl");
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/attachments`,
        data
      );
      toast.success("Course updated successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await axios.delete(
        `/api/courses/${courseId}/attachments/${id}`
      );
      toast.success("Attachment Deleted successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border  bg-slate-100  dark:bg-slate-800  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Attachements
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isediting && <>Cancel</>}
          {!isediting && (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isediting && (
        <>
          {initialData.attachment.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments were found
            </p>
          )}
          {initialData.attachment.length > 0 && (
            <div className="space-y-2">
              {initialData.attachment.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 dark:bg-slate-700 border-sky-200 dark:border-sky-700 border text-sky-700 dark:text-sky-100 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button className=" ml-auto hover:opacity-75 transition"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isediting && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onUpload={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything that will help your students to complete the course
          </div>
        </div>
      )}
    </div>
  );
};
