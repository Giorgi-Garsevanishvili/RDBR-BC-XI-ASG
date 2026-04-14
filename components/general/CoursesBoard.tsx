"use client";
import  { useCallback, useEffect, useMemo, useState } from "react";
import BrowseCoursesCards from "./BrowseCoursesCards";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import SortDropdown from "./SortDropDown";

type CourseDataType = {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: true;
  avgRating: number;
  reviewCount: number;
  category: {
    id: number;
    name: string;
    icon: string;
  };
  topic: {
    id: number;
    name: string;
    categoryId: number;
  };
  instructor: {
    id: number;
    name: string;
    avatar: string;
  };
};

type MetaDataType = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

function CoursesBoard() {
  const [courses, setCourses] = useState<CourseDataType[]>();
  const [meta, setMeta] = useState<MetaDataType | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page") || 1);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // reset to page 1 on filter/sort change
    if (key !== "page") params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const getCourses = useCallback(async () => {
    try {
      const params = new URLSearchParams();

      const search = searchParams.get("search");
      const categories = searchParams.getAll("categories[]");
      const topics = searchParams.getAll("topics[]");
      const instructors = searchParams.getAll("instructors[]");

      if (search) params.set("search", search);
      categories.forEach((id) => params.append("categories[]", id));
      topics.forEach((id) => params.append("topics[]", id));
      instructors.forEach((id) => params.append("instructors[]", id));
      if (sort) params.set("sort", sort);
      params.set("page", String(page));

      const response = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses?${params.toString()}`,
      );

      setCourses(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <div className="flex justify-between items-center  flex-col w-291.75 h-fit  gap-8">
      <div className="flex w-full items-center h-fit justify-between">
        <p className="w-233.25 flex h-6 text-body-sm text-grayscale-500 text-center">
          Showing {(meta && courses && courses.length) || 0} out of{" "}
          {meta?.total || 0}
        </p>
        <SortDropdown
          value={sort}
          onChange={(val) => updateParam("sort", val)}
        />
      </div>
      <div className="grid grid-cols-3 grid-rows-4 gap-6">
        {courses?.map((course) => (
          <BrowseCoursesCards key={course.id} course={course} />
        ))}
      </div>
      {meta && <Pagination onPageChange={updateParam} pagination={meta} />}
    </div>
  );
}

export default CoursesBoard;
