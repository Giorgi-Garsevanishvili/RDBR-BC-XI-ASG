import { useEffect, useState } from "react";
import EmptyEnrollment from "./EmptyEnrollment";
import EnrolledCard from "./EnrolledCard";
import axios from "axios";
import HybridIcon from "../ui/HybridIcon";
import { useAuth } from "@/context/AuthContext";

export type EnrolledCoursesDataType = {
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
      id: 0;
      courseScheduleId: number;
      name: string;
      priceModifier: number;
      availableSeats: number;
      location: string;
    };
    location: string;
  };
};

function EnrolledCoursesSidebar() {
  const [enrolledCourses, setEnrolledCourses] = useState<
    EnrolledCoursesDataType[]
  >([]);

  const {token} = useAuth()

  const getEnrolledCourses = async () => {
    try {
      const data = await axios.get(
        "https://api.redclass.redberryinternship.ge/api/enrollments", {headers: {Authorization: `Bearer ${token}`}}
      );

      setEnrolledCourses(data.data.data);
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

  return (
    <div className="w-198.5 right-0  absolute flex top-0 overflow-hidden h-313.5 bg-grayscale-100 flex-col  overflow-y-auto transition-all ease-out duration-300">
      <div className="w-198.5 fixed z-4 h-21.5 flex gap-50.5 items-end justify-center bg-grayscale-100">
        <p className="w-81.75 h-11 text-grayscale-950 font-semibold text-[40px] tracking-[-0.005em] leading-11 font-[inter]">
          Enrolled Courses
        </p>
        <p className="w-37.75 h-6.25 flex  text-grayscale-950 font-medium text-[16px] leading-6 font-[inter]">
          Total Enrollments
          <span className="font-semibold pl-1 flex leading-6.25">0</span>
        </p>
      </div>
      {enrolledCourses?.length > 0 ? (
        <div className="flex absolute top-30.75 left-[73.5] pb-16 flex-col items-center justify-center w-fit h-fit gap-3">
          {enrolledCourses.map((course) => (
            <EnrolledCard course={course} key={course.id} />
          ))}
        </div>
      ) : (
        <EmptyEnrollment />
      )}
    </div>
  );
}

export default EnrolledCoursesSidebar;
