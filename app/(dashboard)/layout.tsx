import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const layout = ({ children }: LayoutProps) => {
  return (
    <main className="grid grid-cols-5">
      <div className="col-span-1 hidden lg:block lg:min-h-screen">
        <Sidebar />
      </div>
      <div className="lg:col-span-4 col-span-5">
        <Navbar />
        <div className="px-4 sm:px-8 lg:px-16 py-16">{children}</div>
      </div>
    </main>
  );
};

export default layout;
