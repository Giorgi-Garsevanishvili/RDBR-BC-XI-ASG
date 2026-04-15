"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Image from "next/image";
import ClockIcon from "../ui/ClockIndividual";
import CalendarEmptyIcon from "../ui/CalendarEmptyIcon";
import RatingFullStar from "../ui/RatingFullStar";
import Chips from "./Chips";
import EnrollComponent from "./EnrollComponent";
import { useAuth } from "@/context/AuthContext";

type FeaturedCoursesData = {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: true;
  reviews: [
    {
      userId: number;
      rating: number;
    },
  ];
  isRated: true;
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
  enrollment: {
    id: number;
    quantity: number;
    totalPrice: number;
    progress: number;
    completedAt: string;
    course: {
      id: number;
      title: string;
      description: string;
      image: string;
      basePrice: number;
      durationWeeks: number;
      isFeatured: boolean;
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
    schedule: {
      weeklySchedule: {
        id: number;
        label: string;
        days: [string, string];
      };
      timeSlot: {
        id: number;
        label: string;
        startTime: string;
        endTime: string;
      };
      sessionType: {
        id: number;
        courseScheduleId: number;
        name: string;
        priceModifier: number;
        availableSeats: number;
        location: string;
      };
      location: string;
    };
  };
};

function CourseInfo({ id }: { id: string }) {
  const [course, setCourse] = useState<FeaturedCoursesData>();
  const {token, loggedIn} = useAuth() 
  

  const getFeaturedCourses = async () => {
    try {
      const data = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCourse(data.data.data);

      console.log(data.data.data);
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
  }, [loggedIn]);
  return (
    <>
      <div className="flex flex-col sticky w-225.75 shrink-0 h-fit gap-6 ">
        <div className="flex flex-col justify-between w-full h-fit gap-8">
          <Breadcrumb categoryName={course?.category.name} />
          <div className="flex w-full items-center h-fit gap-4">
            <h1 className="w-fit h-fit text-center text-h1 text-grayscale-900">
              {course?.title}
            </h1>
          </div>
        </div>
        <div className="flex flex-col relative w-full h-fit gap-4.5">
          <div className="flex flex-col shrink-0 w-full h-fit gap-4.5">
            <div className="w-full overflow-hidden relative bg-gray-500 h-118.5 rounded-[10px] gap-2.5">
              {course?.image && (
                <Image
                  src={course?.image}
                  alt="Course Image"
                  fill
                  className="object-cover flex w-full h-full"
                />
              )}
            </div>
            <div className="flex w-full h-fit items-center gap-4 ">
              <div className="flex w-full items-center h-fit gap-3">
                <div className="flex w-full h-fit justify-between">
                  <div className="flex items-center justify-between w-fit h-fit gap-3">
                    <div className="flex h-fit justify-between items-center w-fit gap-1">
                      <CalendarEmptyIcon />
                      <p className="text-center text-grayscale-600 text-body-sm">
                        {course?.durationWeeks} Weeks
                      </p>
                    </div>
                    <div className="flex h-fit justify-between items-center w-fit gap-1">
                      <ClockIcon />
                      <p className="text-center text-grayscale-600 text-body-sm">
                        {course?.durationWeeks ? course?.durationWeeks * 24 : 0}{" "}
                        Hours
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <RatingFullStar className="w-6.5 h-6.5" />
                    <h5 className="w-5.5 h-4.25 text-body-xs text-grayscale-600">
                      {course?.reviews?.length
                        ? (
                            course.reviews.reduce(
                              (acc, cur) => acc + cur.rating,
                              0,
                            ) / course.reviews.length
                          ).toFixed(1)
                        : "0.0"}
                    </h5>
                  </div>
                </div>
                <Chips
                  filterId={course?.category.id}
                  disabled
                  Icon={course?.category.icon}
                  title={course?.category.name ? course?.category.name : ""}
                  isActive={false}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col w-full h-fit gap-4.5">
            <Chips
              disabled
              type="instructor"
              filterId={course?.instructor.id}
              avatar={course?.instructor.avatar}
              title={course?.instructor.name ? course.instructor.name : ""}
            />
            <div className="flex flex-col w-full h-fit gap-4.5">
              <div className="flex flex-col w-full h-fit gap-6 justify-between">
                <p className="w-fit text-grayscale-400 h-fit  leading-6 text-h4 ">
                  Course Description
                </p>
                <p className="w-fit text-grayscale-600 h-fit leading-6 text-body-sm ">
                  {course?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {course && course.enrollment === null ? (
        <EnrollComponent priceData={course.basePrice} courseId={course.id} />
      ) : (
        course?.enrollment && "You already Enrolled"
      )}
    </>
  );
}

export default CourseInfo;
