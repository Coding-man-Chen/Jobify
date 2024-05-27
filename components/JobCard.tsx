import { JobType } from "@/utils/types";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteJobBtn from "./DeleteJobBtn";
import JobInfo from "./JobInfo";
import { Briefcase, MapPin, CalendarDays, RadioTower } from "lucide-react";
import { Badge } from "./ui/badge";
import {badgeVariants} from "./ui/badge"
import {type VariantProps } from "class-variance-authority"

type JobCardProps = {
  job: JobType;
};

type BadgeVariantProps = {
  pending: VariantType["variant"],
  interview: VariantType["variant"],
  declined: VariantType["variant"],
}
const badgeVariant:BadgeVariantProps= {
  pending : "default",
  interview : "default",
  declined : "destructive",
}

type VariantType = VariantProps<typeof badgeVariants>


const JobCard = ({ job }: JobCardProps) => {
  const jobStatus = job.status as keyof BadgeVariantProps
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2 gap-4 my-4 capitalize">
        <JobInfo icon={<Briefcase className="w-4 h-4" />} text={job.mode} />
        <JobInfo icon={<MapPin className="w-4 h-4" />} text={job.location} />
        <JobInfo
          icon={<CalendarDays className="w-4 h-4" />}
          text={job.createdAt.toLocaleDateString()}
        />
        <Badge className="flex justify-center max-w-32 capitalize" variant={badgeVariant[job.status as keyof BadgeVariantProps]}>
          <JobInfo
            icon={<RadioTower className="w-4 h-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4 md:gap-8 flex-col md:flex-row">
        <Button asChild size="sm" className="md:w-24 w-full capitalize">
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobBtn id={job.id} />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
