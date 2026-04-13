"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RightArrowIcon from "../ui/RightArrowIcon";

export default function Breadcrumb({ categoryName }: { categoryName?: string }) {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="flex  items-center gap-2 text-sm text-gray-500">
      <Link href="/" className="text-grayscale-500 text-body-md">
        Home
      </Link>

      {paths.map((segment, index) => {
        const href = "/" + paths.slice(0, index + 1).join("/");
        const isLast = index === paths.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            <span>
              <RightArrowIcon />
            </span>

            {isLast ? (
              <Link
                href={href}
                className="text-[#736BEA] text-body-md capitalize"
              >
                {categoryName || segment}
              </Link>
            ) : (
              <Link
                href={href}
                className="text-grayscale-500 text-body-md capitalize"
              >
                {segment}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
