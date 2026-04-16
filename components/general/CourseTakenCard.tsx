"use client";
import CalendarIcon from "../ui/CalendarIcon";
import ClockIcon from "../ui/ClockIcon";
import PersonsIcon from "../ui/PersonsIcon";
import LocationPinIcon from "../ui/LocationPinIcon";
import { CourseData } from "./CourseInfo";
import OnlineDesktopIcon from "../ui/OnlineDesktopIcon";
import HybridIcon from "../ui/HybridIcon";
import CTA_Button from "./CTA_Button";
import CheckIcon from "../ui/CheckIcon";
import RetakeIcon from "../ui/RetakeIcon";
import axios from "axios";
import { useState } from "react";
import RatingComponent from "./RatingComponent";
import CloseIcon from "../ui/CloseIcon";

function CourseTakenCard({
  course,
  handleCourseAction,
}: {
  course: CourseData;
  handleCourseAction?: () => void | Promise<void>;
}) {
  const [openRating, setOpenRating] = useState(true);
  return (
    course.enrollment && (
      <div className="flex w-118.25 sticky left-303 mt-30 shrink-0 h-fit gap-5">
        <div className="flex flex-col w-full h-fit gap-24.25">
          <div className="flex flex-col w-full h-fit gap-12">
            <div className="flex flex-col w-full h-fit gap-5.5">
              <div
                className={`flex w-fit h-fit rounded-[100px] p-4 gap-2.5 ${course.enrollment.progress < 100 ? "bg-[#736BEA1A]" : "bg-[#1DC31D1A]"} `}
              >
                <h4
                  className={`text-h4 leading-6 h-6 w-fit ${course.enrollment.progress < 100 ? "text-[#736BEA] " : " text-[#1DC31D]"} `}
                >
                  {course.enrollment.progress < 100 ? "Enrolled" : "Completed"}
                </h4>
              </div>
              <div className="flex w-full justify-start text-center items-center h-fit gap-3">
                <CalendarIcon className="w-6 flex items-center  justify-center h-6" />
                <p className="w-fit h-6.5  text-grayscale-600 text-body-lg">
                  {course.enrollment.schedule.weeklySchedule.label}
                </p>
              </div>
              <div className="flex w-full justify-start text-center items-center h-fit gap-3">
                <ClockIcon className="w-6 flex items-center  justify-center h-6" />
                <p className="w-fit h-6.5  text-grayscale-600 text-body-lg">
                  {course.enrollment.schedule.timeSlot.label}
                </p>
              </div>
              <div className="flex w-full justify-start text-center items-center h-fit gap-3">
                {course.enrollment.schedule.sessionType.name === "online" ? (
                  <OnlineDesktopIcon className="w-6 flex items-center  justify-center h-6" />
                ) : course.enrollment.schedule.sessionType.name === "hybrid" ? (
                  <HybridIcon className="w-6 flex items-center  justify-center h-6" />
                ) : (
                  <PersonsIcon className="w-6 flex items-center  justify-center h-6" />
                )}
                <p className="w-fit h-6.5 capitalize  text-grayscale-600 text-body-lg">
                  {course.enrollment.schedule.sessionType.name.replace(
                    "_",
                    " ",
                  ) || "-"}
                </p>
              </div>
              <div className="flex w-full justify-start text-center items-center h-fit gap-3">
                <LocationPinIcon className="w-6 flex items-center  justify-center h-6" />
                <p className="w-fit h-6.5  text-grayscale-600 text-body-lg">
                  {course.enrollment.schedule.location || "-"}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-118.25 gap-10">
              <div className="flex flex-col w-full h-fit gap-3">
                <h4 className="w-118 h-7.5 text-h4 flex items-center leading-6 text-grayscale-500">
                  {course.enrollment.progress}% Completed
                </h4>
                <div className="w-118.25 relative rounded-[30px] h-5.75">
                  <div
                    className={`flex ${course.enrollment.progress < 100 ? " w-75.75" : "w-full"} absolute  z-2 h-[23.45px] rounded-[30px] bg-[#4F46E5]`}
                  ></div>
                  <div className="w-full rounded-[30px]  z-1 h-[23.45px] absolute bg-[#DDDBFA]"></div>
                </div>
              </div>

              <CTA_Button
                Icon={
                  course.enrollment.progress < 100 ? (
                    <CheckIcon className="h-6 w-6" />
                  ) : (
                    <RetakeIcon className="h-6 w-6" />
                  )
                }
                action={handleCourseAction && (() => handleCourseAction())}
                type="button"
                title={
                  course.enrollment.progress < 100
                    ? "Complete Course"
                    : "Retake Course"
                }
                className="w-full  shrink-0 h-12 text-button-md items-center justify-center flex"
              />
            </div>
            {course.enrollment.progress === 100 &&
            !course.isRated &&
            openRating ? (
              <div className="flex relative flex-col items-center justify-center w-full h-fit rounded-lg px-12.5 py-10 bg-grayscale-50 gap-4.5">
                <div
                  onClick={() => setOpenRating(false)}
                  className="absolute cursor-pointer top-3 right-3"
                >
                  <CloseIcon />
                </div>
                <RatingComponent
                  openRating={openRating}
                  setOpenRating={setOpenRating}
                  courseId={course.id}
                  className=""
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  );
}

export default CourseTakenCard;
