"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  JobMode,
  JobStatus,
  createAndEditJobSchema,
  type CreateAndEditJobType,
} from "../utils/types";
import { CustomFormField, CustomFormSelect } from "./FormComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { createJobAction, getSingleJobAction, updateSingleJobAction } from "@/utils/actions";

type EditJobFormProps = {
    jobId:string
}

const EditJobForm = ({jobId}:EditJobFormProps) => {
    const {data} = useQuery({
        queryKey:['job',jobId],
        queryFn: () => getSingleJobAction(jobId)
    })
    const form = useForm<z.infer<typeof createAndEditJobSchema>>({
        resolver: zodResolver(createAndEditJobSchema),
        defaultValues: {
          position: data?.position || "",
          company: data?.company||"",
          location: data?.location||"",
          status: data?.status as JobStatus || JobStatus.Pending,
          mode: data?.mode as JobMode || JobMode.FullTime,
        },
      });
      const queryClient = useQueryClient();
      const { toast } = useToast();
      const router = useRouter();
      const { mutate, isPending } = useMutation({
        mutationFn: (values: z.infer<typeof createAndEditJobSchema>) =>
          updateSingleJobAction(jobId,values),
        onSuccess: (data) => {
          if (!data) {
            toast({
              description: "there was an error",
            });
            return;
          }
          toast({
            description: "job updated",
          });
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
          queryClient.invalidateQueries({ queryKey: ["stats"] });
          queryClient.invalidateQueries({ queryKey: ['job',jobId] });
          router.push("/jobs");
        },
      });
      function onSubmit(values: z.infer<typeof createAndEditJobSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        mutate(values);
      }
      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-muted rounded-xl p-8"
          >
            <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              <CustomFormField name="position" control={form.control} />
              <CustomFormField name="company" control={form.control} />
              <CustomFormField name="location" control={form.control} />
              <CustomFormSelect
                name="status"
                control={form.control}
                items={Object.values(JobStatus)}
              />
              <CustomFormSelect
                name="mode"
                control={form.control}
                items={Object.values(JobMode)}
              />
              <Button type="submit" className="capitalize self-end">
                {isPending ? "loading" : "edit job"}
              </Button>
            </div>
          </form>
        </Form>
      );
}

export default EditJobForm