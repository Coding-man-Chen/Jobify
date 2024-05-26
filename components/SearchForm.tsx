"use client";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { JobStatus } from "@/utils/types";
import { FormEvent } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const SearchForm = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    const jobStatus = formData.get('jobStatus') as string
    let params = new URLSearchParams()
    params.set('search',search)
    params.set('jobStatus',jobStatus)
    router.push(`${pathname}?${params.toString()}`)
  }
  return (
    <form onSubmit={handleSubmit} className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg">
      <Input type="text" placeholder="Search Jobs" name="search" defaultValue={search} />
      <Select name="jobStatus" defaultValue={jobStatus}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((jobStatus) => (
            <SelectItem key={jobStatus} value={jobStatus}>
              {jobStatus}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchForm;
