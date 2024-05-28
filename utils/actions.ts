"use server";

import { auth } from "@clerk/nextjs/server";
import { Job, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "./db";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import dayjs from "dayjs";

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
    const skip = (page - 1) * limit;
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const count: number = await prisma.job.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(count / limit);
    return {
      jobs,
      count,
      page,
      totalPages,
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
      data: {
        ...values,
      },
    });
  } catch (error) {
    job = null;
  }
  return job;
};

export const getStatsAction = async (): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> => {
  try {
    const { userId } = auth();
    const stats = await prisma.job.groupBy({
      where: {
        clerkId: userId!,
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });
    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);
    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
      ...statsObject,
    };
    return defaultStats;
  } catch (error) {
    redirect("/jobs");
  }
};

export const getChartsDataAction = async (): Promise<
  Array<{ date: string; count: number }>
> => {
  try {
    const { userId } = auth();
    const sixMounthAgo = dayjs().subtract(6, "month").toDate();
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId!,
        createdAt: {
          gte: sixMounthAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format("MMM YY");
      const existingEntry = acc.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({
          date,
          count: 1,
        });
      }
      return acc;
    }, [] as Array<{ date: string; count: number }>);
    return applicationsPerMonth;
  } catch (error) {
    redirect("/jobs");
  }
};
