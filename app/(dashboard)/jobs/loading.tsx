import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg border">
      <Skeleton className="h-10"/>
      <Skeleton className="h-10"/>
      <Skeleton className="h-10"/>
    </div>
  );
};

export default loading;
