"use server";

import { auth } from "@clerk/nextjs/server";
import { Job, Prisma } from "@prisma/client";
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
      orderBy:{
        createdAt:'desc'
      }
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
