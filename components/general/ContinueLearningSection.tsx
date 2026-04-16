"use client";
import React, { useEffect, useState } from "react";
import CourseCardProgress from "./CourseCardProgress";
import { useAuth } from "@/context/AuthContext";
import LockComponent from "./LockComponent";
import { useModal } from "@/context/ModalContext";
import EnrolledCoursesSidebar from "./EnrolledCoursesSidebar";
import LogIn from "./LogInForm";
import axios from "axios";

export type CourseDataType = {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt: "2026-04-16T10:07:01.827Z";
  course: {
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
  schedule: {
    weeklySchedule: {
      id: number;
      label: string;
      days: string[];
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

function ContinueLearningSection() {
  const { loggedIn } = useAuth();
  const { openModal } = useModal();

  const handleSeeAll = (e: React.MouseEvent) => {
    e.preventDefault();
    loggedIn ? openModal(<EnrolledCoursesSidebar />) : openModal(<LogIn />);
  };
  const [courses, setCourses] = useState<CourseDataType[]>();
  const { token } = useAuth();

  const getEnrolledCourses = async () => {
    try {
      const data = await axios.get(
        "https://api.redclass.redberryinternship.ge/api/courses/in-progress",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCourses(data.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("ERROR:", error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return loggedIn && !courses ? null : (
    <section className="h-92.25 w-391.5 items-center flex flex-col gap-8">
      <div className="flex flex-col w-full pl-px gap-2.5">
        <div className="flex relative w-full">
          <div className="flex grow flex-col gap-1.5">
            <h1 className=" text-grayscale-950  w-full h-12 text-h1">
              Continue Learning
            </h1>
            <div className="w-full pl-0.5 gap-2.5">
              <h4 className="text-body-md w-374.5 h-5.5  text-grayscale-700">
                Pick up where you left
              </h4>
            </div>
          </div>
          <div className="content-end items-end flex grow text-[#4F46E5] text-underlined-md ">
            <button
              type="button"
              className="w-16.5 cursor-pointer h-6"
              onClick={(e) => handleSeeAll(e)}
            >
              See All
            </button>
          </div>
        </div>
      </div>
      {loggedIn ? (
        <div className="flex w-full overflow-y-visible  overflow-x-scroll gap-6 no-scrollbar justify-between">
          {courses?.map((course) => (
            <CourseCardProgress
              key={course.id}
              course={course}
              locked={false}
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full gap-6">
          <div className="flex w-fit h-fit gap-6 relative">
            <CourseCardProgress locked />
            <CourseCardProgress locked />
            <CourseCardProgress locked />
            <div className="absolute flex justify-center inset-0">
              <LockComponent />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ContinueLearningSection;
