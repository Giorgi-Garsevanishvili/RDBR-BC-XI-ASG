import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import PaginationArrowIcon from "../ui/PaginationArrowIcon";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

function Pagination({
  pagination,
  onPageChange,
}: {
  pagination: PaginationProps;
  onPageChange: (key: string, value: string) => void;
}) {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (pagination.lastPage <= maxVisible) {
      for (let i = 1; i <= pagination.lastPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, pagination.currentPage - 1);
      let end = Math.min(pagination.lastPage - 1, pagination.currentPage + 1);

      if (pagination.currentPage <= 3) {
        end = 4;
      }

      if (pagination.currentPage >= pagination.lastPage - 2) {
        start = pagination.lastPage - 3;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < pagination.lastPage - 1) {
        pages.push("...");
      }

      pages.push(pagination.lastPage);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex gap-2 h-fit w-fit items-center justify-center">
      <button
        onClick={() => onPageChange("page", `${pagination.currentPage - 1}`)}
        className={`${!(pagination.currentPage > 1) ? "text-[#DDDBFA] border-grayscale-200 bg-grayscale-50 stroke-[#DDDBFA]" : " active:border-[#4F46E5] active:bg-[#281ED2] active:text-grayscale-50 active:stroke-grayscale-50 hover:border-[#B7B3F4] hover:bg-[#DDDBFA] hover:text-[#4F46E5] hover:stroke-[#4F46E5] stroke-[#4F46E5] text-[#4F46E5] "} w-10 h-10 rounded-sm  border items-center justify-center  border-grayscale-200 bg-grayscale-50 flex rotate-180  cursor-pointer transition-colors`}
        disabled={!(pagination.currentPage > 1)}
      >
        <PaginationArrowIcon />
      </button>
      <div className="flex gap-2">
        {pageNumbers.map((page, index) => (
          <button
            className={`w-10 h-10 items-center text-button-sm justify-center flex rounded-sm border cursor-pointer transition-colors ${
              page === pagination.currentPage
                ? " border-[#4F46E5] bg-[#281ED2] stroke-grayscale-50 text-grayscale-50"
                : page === "..."
                  ? " active:border-[#4F46E5] active:bg-[#281ED2] active:stroke-grayscale-50 active:text-grayscale-50 border-grayscale-200  hover:border-[#B7B3F4] hover:bg-[#DDDBFA]  bg-grayscale-50 stroke-[#4F46E5] text-[#4F46E5]"
                  : " active:border-[#4F46E5] active:bg-[#281ED2] active:stroke-grayscale-50 active:text-grayscale-50 border-grayscale-200  hover:border-[#B7B3F4] hover:bg-[#DDDBFA]  bg-grayscale-50 stroke-[#4F46E5] text-[#4F46E5]"
            }`}
            disabled={page === "..."}
            onClick={() =>
              typeof page === "number" && onPageChange("page", `${page}`)
            }
            key={index}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange("page", `${pagination.currentPage + 1}`)}
        className={`${!(pagination.currentPage < pagination.lastPage) ? "text-[#DDDBFA] border-grayscale-200 bg-grayscale-50 stroke-[#DDDBFA]" : " active:border-[#4F46E5] active:bg-[#281ED2] active:text-grayscale-50 active:stroke-grayscale-50 hover:border-[#B7B3F4] hover:bg-[#DDDBFA] hover:text-[#4F46E5] hover:stroke-[#4F46E5] stroke-[#4F46E5] text-[#4F46E5] "} w-10 h-10 rounded-sm  border items-center justify-center  border-grayscale-200 bg-grayscale-50 flex   cursor-pointer transition-colors`}
        disabled={!(pagination.currentPage < pagination.lastPage)}
      >
        <PaginationArrowIcon />
      </button>
    </div>
  );
}

export default Pagination;
