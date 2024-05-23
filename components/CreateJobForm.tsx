"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  JobMode,
  JobStatus,
  createAndEditJobSchema,
  type CreateAndEditJobType,
} from "../utils/types";
import { CustomFormField, CustomFormSelect } from "./FormComponent";

export function CreateJobForm() {
  const form = useForm<z.infer<typeof createAndEditJobSchema>>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });
  function onSubmit(values: z.infer<typeof createAndEditJobSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted rounded-xl p-8"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />
          <CustomFormSelect name="status" control={form.control} items={Object.values(JobStatus)} />
          <CustomFormSelect name="mode" control={form.control} items={Object.values(JobMode)} />
          <Button type="submit" className="capitalize self-end">create job</Button>
        </div>
      </form>
    </Form>
  );
}
