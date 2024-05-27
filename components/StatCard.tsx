import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
type StatCardProps = {
  title: string;
  value: number;
};

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex items-center justify-between flex-row capitalize">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-4xl text-primary font-semibold mt-[0px!important]">{value}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export const StatLoadingCard = () => {
    return (
      <Card>
        <CardHeader className="flex items-center justify-between flex-row">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full"/>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]"/>
                <Skeleton className="h-4 w-[100px]"/>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  };

export default StatCard;
