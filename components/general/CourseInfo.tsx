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
import CourseTakenCard from "./CourseTakenCard";
import CompleteProfileWarningComponent from "./CompleteProfileWarningComponent";
import CTA_Button from "./CTA_Button";
import RoundSuccessIcon from "../ui/RoundSuccessIcon";
import { useModal } from "@/context/ModalContext";
import CTA_Button_Outlined from "./CTA_Button_Outlined";
import WarningIconSmall from "../ui/WarningIconSmall";
import { ImSpinner7 } from "react-icons/im";
import SuccessIcon from "../ui/SuccessIcon";
import RatingComponent from "./RatingComponent";

export type CourseData = {
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
  } | null;
};

type ConflictType = {
  conflictingCourseName: string;
  conflictingEnrollmentId: number;
  requestedCourseId: number;
  schedule: string;
};

function CourseInfo({ id }: { id: string }) {
  const [course, setCourse] = useState<CourseData>();
  const { token, loggedIn } = useAuth();
  const { openModal, closeModal } = useModal();
  const [trigger, setTrigger] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openRating, setOpenRating] = useState(true);

  const formatDays = (dayPart: string) =>
    dayPart
      .split(" - ")
      .map((d) => d.trim().slice(0, 3)) // Tue, Wed, Thu
      .join(" - ");

  const parseSchedule = (schedule: string) => {
    const [dayPart, timePart] = schedule.split(" at ");

    const match = timePart.match(/(.+)\((.+)\)/);

    return {
      days: formatDays(dayPart),
      label: match?.[1]?.trim(),
      time: match?.[2],
    };
  };

  const handleEnrollForce = () => {
    handleRetake({ force: true });
    setTrigger((prev) => prev + 1);
  };

  const handleConflict = (data: ConflictType) => {
    const date = parseSchedule(data.schedule);
    openModal(
      <CompleteProfileWarningComponent
        Buttons={
          <>
            <CTA_Button_Outlined
              action={() => handleEnrollForce()}
              title="Continue Anyway"
              className="w-fit h-14.5  items-center justify-center flex text-button-sm"
            />
            <CTA_Button
              title="Cancel"
              className="w-fit grow h-14.5  items-center justify-center flex text-button-sm"
              type="button"
              action={() => closeModal()}
            />
          </>
        }
        Icon={<WarningIconSmall className="w-23.5 h-23.5 text-warning" />}
        title="Enrollment Conflict"
        info={`You are already enrolled in ${data.conflictingCourseName} with the same schedule: ${date.days} at ${date.time}`}
      />,
    );
  };

  const handleSuccess = ({ name }: { name: string }) => {
    openModal(
      <CompleteProfileWarningComponent
        Buttons={
          <>
            <CTA_Button
              title="Done"
              className="w-full grow h-14.5  items-center justify-center flex text-button-sm"
              type="button"
              action={() => closeModal()}
            />
          </>
        }
        Icon={<RoundSuccessIcon className="w-23.5 23.5 text-[#4F46E5]" />}
        title="Enrollment Confirmed! "
        info={`You've successfully enrolled to the “${name}” Course!`}
      />,
    );
  };

  const handleComplete = ({ name }: { name: string }) => {
    openModal(
      <CompleteProfileWarningComponent
        Buttons={
          <>
            <CTA_Button
              title="Done"
              className="w-full grow h-14.5  items-center justify-center flex text-button-sm"
              type="button"
              action={() => closeModal()}
            />
          </>
        }
        extra={
          
          course?.id &&
          !course.isRated && (
            <RatingComponent
              setOpenRating={setOpenRating}
              openRating={openRating}
              courseId={course?.id}
              className="text-[#736BEA]"
            />
          )
        }
        Icon={<SuccessIcon />}
        title="Congratulations"
        info={`You've completed “${name}” Course!`}
      />,
    );
  };

  const getFeaturedCourses = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCourse(data.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log("ERROR:", error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  const handelCompleteCourse = async () => {
    try {
      setLoading(true);
      const data = await axios.patch(
        `https://api.redclass.redberryinternship.ge/api/enrollments/${course?.enrollment?.id}/complete`,
        null,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCourse(data.data.data);
      setTrigger((prev) => prev + 1);
      setLoading(false);
      console.log(data);

      if (data.status === 200) {
        handleComplete({ name: data.data.data.course.title });
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log("ERROR:", error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  const handleRetake = async ({ force }: { force: boolean }) => {
    try {
      setLoading(true);
      const scheduleIdData = await axios.get(
        `https://api.redclass.redberryinternship.ge/api/courses/${course?.id}/session-types?weekly_schedule_id=${course?.enrollment?.schedule.weeklySchedule.id}&time_slot_id=${course?.enrollment?.schedule.sessionType.id}`,
      );

      const scheduleId = scheduleIdData.data.data[0].courseScheduleId;

      if (!scheduleId) return;

      await axios.delete(
        `https://api.redclass.redberryinternship.ge/api/enrollments/${course?.enrollment?.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const payload = {
        courseId: course?.id,
        courseScheduleId: scheduleId,
        force: true,
      };

      const response = await axios.post(
        "https://api.redclass.redberryinternship.ge/api/enrollments",
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 201) {
        handleSuccess({ name: response.data.data.course.title });
      }

      setCourse(response.data.data);
      setTrigger((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        console.log(error);
        console.log(data || error); // unknown error

        if (data.conflicts) {
          handleConflict(data.conflicts[0]);
        }
      }
    }
  };

  useEffect(() => {
    getFeaturedCourses();
  }, [loggedIn, trigger]);

  return !loading && course?.category ? (
    <>
      <div className="flex flex-col sticky w-225.75 shrink-0 h-fit gap-6 ">
        <div className="flex flex-col justify-between w-full h-fit gap-8">
          <Breadcrumb
            categoryName={
              (course?.category && course?.category.name) || "Course"
            }
          />
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
                    <RatingFullStar className="w-6.5 text-warning h-6.5" />
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
        <EnrollComponent
          setTrigger={setTrigger}
          priceData={course.basePrice}
          courseId={course.id}
        />
      ) : (
        course?.enrollment && (
          <CourseTakenCard
            handleCourseAction={
              !course.enrollment.completedAt
                ? handelCompleteCourse
                : () => handleRetake({ force: false })
            }
            course={course}
          />
        )
      )}
    </>
  ) : (
    <div className="flex animate-spin text-blue-800 items-center justify-center w-full h-full">
      <ImSpinner7 size={50} />
    </div>
  );
}

export default CourseInfo;
