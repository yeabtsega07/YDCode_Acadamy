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
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

const formSchema = z.object({
    categoryId: z.string().min(1),
});

interface CategotyFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string; }[];
}

export const CategotyForm = ({ initialData, courseId, options }: CategotyFormProps) => {
    const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });

  const [isediting, setEditing] = useState(false);

  const toggleEditing = () => setEditing((current) => !current);

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("editing description");
    try {
        const response = await axios.patch(`/api/courses/${courseId}`, data);
        toast.success("Course updated successfully");
        toggleEditing();
        router.refresh();
    } catch (error) {
        toast.error("Something went wrong")
    }
  };

  const selectedOption = options.find((option) => option.value === initialData.categoryId);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-center">
        Course Category
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isediting ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isediting ? (
        <p className={
            cn("text-sm mt-2", !initialData.categoryId && "text-slate-500 italic")
        }>
            {selectedOption?.label || "No category"}
            </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId" 
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                   <Combobox
                    {...field}
                    options={options}
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
