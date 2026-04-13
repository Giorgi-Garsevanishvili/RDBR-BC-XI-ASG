"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";

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

function CourseInfo({ id }: { id: string }) {
  const [featuredCourses, setFeaturedCourse] = useState<FeaturedCoursesData>();

  const getFeaturedCourses = async () => {
    try {
      const data = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${id}`,
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
    <div>
      <Breadcrumb categoryName={featuredCourses?.category.name} />
      {featuredCourses ? (
        <div className="flex flex-col justify-center items-center">
          {Object.entries(featuredCourses).map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-bold">{key}:</span>{" "}
              {typeof value === "object" && value !== null ? (
                <div className="pl-4">
                  {Object.entries(value).map(([nestedKey, nestedValue]) => (
                    <div key={nestedKey}>
                      <span className="font-semibold">{nestedKey}:</span>{" "}
                      {String(nestedValue)}
                    </div>
                  ))}
                </div>
              ) : (
                String(value)
              )}
            </div>
          ))}
        </div>
      ) : (
        "nothingFound"
      )}
    </div>
  );
}

export default CourseInfo;
