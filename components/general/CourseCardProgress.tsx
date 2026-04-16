import Image from "next/image";
import React from "react";
import courseDefaultImage from "../../public/CourseImageDefault.svg";
import RatingFullStar from "../ui/RatingFullStar";
import CTA_Button_Outlined from "./CTA_Button_Outlined";
import { CourseDataType } from "./ContinueLearningSection";
import { useModal } from "@/context/ModalContext";
import { redirect } from "next/navigation";

function CourseCardProgress({
  locked,
  course,
}: {
  locked: boolean;
  course?: CourseDataType;
}) {
  const { closeModal } = useModal();

  const handleViewCourse = (id: number) => {
    closeModal();
    redirect(`/browse/${id}`);
  };

  return (
    <div
      className={`flex relative flex-col active:border active:border-[#958FEF] active:shadow-[0px_0px_35px_0px_#8A82D440] transition-all duration-300 ${locked ? "blur-[10px] opacity-75" : null}  ease-out hover:border-[0.5px] hover:border-[#B7B3F4] hover:shadow-[0px_0px_25px_0px_#8A82D41A]  w-126.5 rounded-xl shadow-[0px_0px_11.7px_0px_#0000000A] border-[0.5px] border-gray-100 p-5 gap-2 bg-gray-50`}
    >
      <div className="flex w-full gap-4">
        <div className="flex w-full h-full justify-between">
          <div className="w-35 relative overflow-hidden h-30.75 rounded-xl">
            <Image
              src={course?.course.image || courseDefaultImage}
              alt="Course Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex w-fit flex-col h-fit pl-4 pr-1 gap-2.25">
            <div className="flex w-full justify-between">
              <div className="flex gap-2">
                <h4 className="w-39.75 h-4.25 text-grayscale-400 text-body-xs">
                  {course?.course.instructor.name}
                </h4>
              </div>
              <div className="flex justify-center items-center gap-1">
                <RatingFullStar className="w-4.5 h-4.5" />
                <h5 className="w-5.5 h-4.25 text-body-xs text-grayscale-600">
                  {course?.course.avgRating}
                </h5>
              </div>
            </div>
            <h4 className="text-h4 w-76.5 leading-6 h-12 text-grayscale-900">
              {course?.course.title}
            </h4>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full items-end justify-between">
        <div className="flex flex-col w-full pb-1 gap-1">
          <h4 className="w-84 h-4 text-helper-md text-gray-900">
            {course?.progress} Completed
          </h4>
          <div className="w-full relative h-[15.31px]">
            <div className="flex w-[202.56px] absolute  z-2 h-[15.13px] rounded-[30px] bg-[#4F46E5]"></div>
            <div className="w-84 rounded-[30px] z-1 h-[15.13px] absolute gap-2.5 bg-[#DDDBFA]"></div>
          </div>
        </div>
        {course?.course.id && (
          <CTA_Button_Outlined
            action={() => handleViewCourse(course.course.id)}
            title="View"
            className="w-22.5 flex items-center justify-center"
          />
        )}
      </div>
    </div>
  );
}

export default CourseCardProgress;
