"use client";
import { getChartsDataAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
} from "recharts";
const ChartsContainer = () => {
  const { data } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });
  if (!data || data.length < 1) {
    return null;
  }
  return (
    <section className="mt-16 flex flex-col items-center gap-8 justify-center">
      <h1 className="capitalize text-4xl font-semibold text-center">
        monthly applications
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default ChartsContainer;
