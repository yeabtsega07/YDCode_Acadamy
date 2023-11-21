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
import { Pencil } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title should be at least 3 characters long",
  }),
});

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
    const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
    },
  });

  const [isediting, setEditing] = useState(false);

  const toggleEditing = () => setEditing((current) => !current);

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("editing title");
    try {
        const response = await axios.patch(`/api/courses/${courseId}`, data);
        toast.success("Course updated successfully");
        toggleEditing();
        router.refresh();
    } catch (error) {
        toast.error("Something went wrong")
    }
  };

  return (
    <div className="mt-6 border bg-slate-100  dark:bg-slate-800  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isediting ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>
      {!isediting ? (
        <p className="text-sm mt-2">{initialData.title}</p>
      ) : (
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
                      placeholder="e.g. 'Introduction to Data Structures and Algorithms'"
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
                    Save
                </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
