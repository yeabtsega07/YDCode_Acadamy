"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(1),
});

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[]};
  courseId: string;
}

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
    const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [ isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("editing description");
    try {
      console.log("this is the data",data);
        const response = await axios.post(`/api/courses/${courseId}/chapters`, data);
        toast.success("Chapter Created successfully");
        toggleCreating();
        router.refresh();
    } catch (error) {
        toast.error("Something went wrong")
    }
  };

  return (
    <div className="mt-6 border bg-slate-100  dark:bg-slate-800  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Chapter
        <Button onClick={toggleCreating} variant={"ghost"}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title" 
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. ''Introduction to DSA'"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-x-2">
                <Button 
                disabled={!isValid || isSubmitting}
                type="submit"
                >
                    Create
                </Button>
            </div>
          </form>
        </Form>
      )}
      {
        !isCreating && (
            <div className={cn(
                "text-sm mt-2",
                !initialData.chapters.length && "text-slate-500 italic"
            )}>
                { !initialData.chapters.length && "No chapters"}
                {/* Todo: ADD a list of chapters */}
            </div>
        )
      }
      { !isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder chapters
        </p>
      )}
    </div>
  );
};
