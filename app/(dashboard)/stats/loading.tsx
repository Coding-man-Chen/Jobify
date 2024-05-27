import { StatLoadingCard } from "@/components/StatCard";

const loading = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatLoadingCard/>
      <StatLoadingCard/>
      <StatLoadingCard/>
    </div>
  );
};

export default loading;
