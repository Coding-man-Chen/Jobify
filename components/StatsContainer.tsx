"use client";
import { getStatsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import StatCard from "./StatCard";

const StatsContainer = () => {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard title="pending jobs" value={data?.pending || 0}/>
      <StatCard title="interviews jobs" value={data?.interview || 0}/>
      <StatCard title="jobs declined" value={data?.declined || 0}/>
    </div>
  );
};

export default StatsContainer;
