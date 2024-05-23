'use server'

import { auth } from "@clerk/nextjs/dist/types/server"
import prisma from "./db"
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types"

export const createJobAction = async (values: CreateAndEditJobType):Promise<JobType| null> => {
    const {userId} = auth()
    try {
        createAndEditJobSchema.parse(values)
        const job:JobType = await prisma.job.create({
            data:{
                ...values,
                clerkId:userId!
            }
        })
        return job
    } catch (error) {
        return null
    }
}   