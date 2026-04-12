"use client";
import { useEffect, useState } from "react";
import FeaturedCoursesCard from "./FeaturedCoursesCard";
import axios from "axios";

type FeaturedCoursesData = {
  id: 1;
  title: string;
  description: string;
  image: string;
  basePrice: string;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  category: {
    id: number;
    name: string;
  };
  topic: {
    id: number;
    name: string;
  };
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
};

function FeaturedCoursesSection() {
  const [featuredCoursed, setFeaturedCourse] = useState<FeaturedCoursesData[]>(
    [],
  );

  const getFeaturedCourses = async () => {
    try {
      const data = await axios.get(
        "https://api.redclass.redberryinternship.ge/api/courses/featured",
      );

      setFeaturedCourse(data.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("ERROR:", error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getFeaturedCourses();
  }, []);

  return (
    <section className="h-184.75 w-full flex flex-col gap-8">
      {/* Title Section*/}
      <div className="flex flex-col w-full pl-px gap-2.5">
        <div className="flex flex-col gap-1.5">
          <h1 className=" text-grayscale-950  w-134.5 h-12 text-h1">
            Start Learning Today
          </h1>
          <h4 className="text-body-md w-134.5 h-5.5 text-grayscale-700">
            Choose from our most popular courses and begin your journey
          </h4>
        </div>
      </div>
      {/** Cards Section  */}
      <div className="gap-6 items-center flex">
        {featuredCoursed.slice(0, 3).map((course) => (
          <FeaturedCoursesCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCoursesSection;
