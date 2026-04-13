"use client";
import React, { useEffect, useState } from "react";
import ArrowDownIcon from "../ui/ArrowDownIcon";
import BrowseCoursesCards from "./BrowseCoursesCards";
import axios from "axios";

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

function CoursesBoard() {
  const [courses, setCourses] = useState<CourseDataType[]>();

  const getCourses = async () => {
    try {
      const response = await axios.get(
        "https://api.redclass.redberryinternship.ge/api/courses",
      );
      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="flex  flex-col w-291.75 h-fit  gap-8">
      <div className="flex w-full items-center h-fit justify-between">
        <p className="w-233.25 flex h-6 text-body-sm text-grayscale-500 text-center">
          Showing 9 o ut of 90
        </p>
        <label
          className="h-[49px] w-fit items-center text-center bg-grayscale-50 border-grayscale-100 flex rounded-[10px] border py-1.75 px-5 gap-2"
          htmlFor="sort"
        >
          <label
            htmlFor="sort"
            className=" text-body-sm text-center text-grayscale-500 w-15.25 h-6 shrink-0"
          >
            Sort By:
          </label>
          <select
            className="text-body-sm w-fit h-6 text-[#4F46E5]"
            name="sort"
            id="sort"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="title_asc">Title: A-Z</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-3 grid-rows-4 gap-6">
        {courses?.map((course) => (
          <BrowseCoursesCards key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CoursesBoard;
