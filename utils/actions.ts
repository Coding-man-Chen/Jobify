"use server";

import { auth } from "@clerk/nextjs/server";
import { Job, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "./db";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";

type GetAllJobsActionsProps = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export const createJobAction = async (
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const { userId } = auth();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId!,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
};

export const getAllJobsAction = async ({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionsProps): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> => {
  try {
    const { userId } = auth();
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId!,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      jobs,
      count: 0,
      page: 1,
      totalPages: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      jobs: [],
      count: 0,
      page: 1,
      totalPages: 0,
    };
  }
};

export const deleteJobAction = async (id: string): Promise<JobType | null> => {
  const { userId } = auth();
  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id: id,
        clerkId: userId!,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
};

export const getSingleJobAction = async (
  id: string
): Promise<JobType | null> => {
  let job: JobType | null;
  try {
    const { userId } = auth();
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId!,
      },
    });
  } catch (error) {
    job = null;
  }
  if (!job) {
    redirect("/jobs");
  }
  return job;
};

export const updateSingleJobAction = async (
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  let job: JobType | null;
  try {
    const { userId } = auth();
    job = await prisma.job.update({
      where: {
        id,
        clerkId: userId!,
      },
      data:{
        ...values
      }
    });
  } catch (error) {
    job = null;
  }
  return job;
};
