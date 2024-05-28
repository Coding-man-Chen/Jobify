"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};
const ButtonContainer = ({ currentPage, totalPages }: ButtonContainerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "all",
      page: String(page),
    };
    let params = new URLSearchParams(defaultParams);
    router.push(`${pathname}?${params.toString()}`);
  };
  const renderPageButtons = () => {
    const pageButtons = [];
    // left
    pageButtons.push(
      <Button
        size="icon"
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </Button>
    );
    // first-page
    if (currentPage >= 2) {
      pageButtons.push(
        <Button
          size="icon"
          variant="outline"
          onClick={() => handlePageChange(1)}
        >
          {1}
        </Button>
      );
    }
    // dot-left page
    if (currentPage > 2) {
      pageButtons.push(
        <Button size="icon" variant="outline">
          ...
        </Button>
      );
    }
    // currentPage
    pageButtons.push(
      <Button
        size="icon"
        variant="default"
        onClick={() => handlePageChange(currentPage)}
      >
        {currentPage}
      </Button>
    );
    // dot-right page
    if (totalPages - currentPage > 1) {
      pageButtons.push(
        <Button size="icon" variant="outline">
          ...
        </Button>
      );
    }
    // last page
    if (totalPages > currentPage) {
      pageButtons.push(
        <Button
          size="icon"
          variant="outline"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }
    //   right
    pageButtons.push(
      <Button
        size="icon"
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </Button>
    );
    return pageButtons;
  };
  return <div className="flex gap-2">{renderPageButtons()}</div>;
};

export default ButtonContainer;
