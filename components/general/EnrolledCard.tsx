import Image from "next/image";
import courseDefaultImage from "../../public/CourseImageDefault.svg";
import RatingFullStar from "../ui/RatingFullStar";
import CTA_Button_Outlined from "./CTA_Button_Outlined";
import CalendarIcon from "../ui/CalendarIcon";
import ClockIcon from "../ui/ClockIcon";
import PersonsIcon from "../ui/PersonsIcon";
import LocationPinIcon from "../ui/LocationPinIcon";
import HybridIcon from "../ui/HybridIcon";
import { EnrolledCoursesDataType } from "./EnrolledCoursesSidebar";
import OnlineDesktopIcon from "../ui/OnlineDesktopIcon";

function EnrolledCard({ course }: { course: EnrolledCoursesDataType }) {
  return (
    <div className="flex flex-col w-155.75 border-[0.5px] border-transparent hover:border-[#B7B3F4] hover:shadow-[0px_0px_10px_0px_#8A82D440] active:border active:border-[#958FEF] active:shadow-[0px_0px_35px_0px_#8A82D440] bg-grayscale-50 transition-all ease-out duration-300 rounded-xl p-5 gap-4.5">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex w-full gap-4.5">
          <div className="w-[269px] h-[191px]  shrink-0 relative gap-2.5">
            <Image
              src={course.course.image}
              alt="Course Image"
              fill
              className="object-cover rounded-[10px] "
            />
          </div>
          <div className="flex w-full flex-col h-fit gap-2">
            <div className="flex w-full justify-between">
              <h4 className="w-fit h-4.25 text-grayscale-500 text-body-xs">
                {course.course.instructor.name}
              </h4>

              <div className="flex justify-center items-center gap-1">
                <RatingFullStar className="" />
                <h5 className="w-5.5 h-4.25 text-body-xs text-grayscale-600">
                  {course.course.avgRating > 0 ? course.course.avgRating : 0}
                </h5>
              </div>
            </div>
            <h4 className="text-h4 w-64.25 leading-6 h-12 text-grayscale-900">
              {course.course.title}{" "}
            </h4>
            <div className="flex flex-col w-full h-fit">
              <div className="flex w-full justify-start items-center h-fit gap-2">
                <CalendarIcon className="w-4 h-4" />
                <p className="w-fit h-6.5 leading-6.5 text-grayscale-500 text-helper-md-regular">
                  {course.schedule.weeklySchedule.label}
                </p>
              </div>
              <div className="flex w-full justify-start items-center h-fit gap-2">
                <ClockIcon className="w-4 h-4" />
                <p className="w-fit h-6.5 leading-6.5 text-grayscale-500 text-helper-md-regular">
                  {course.schedule.timeSlot.label}
                </p>
              </div>
              <div className="flex w-full justify-start items-center h-fit gap-2">
                {course.schedule.sessionType.name === "online" ? (
                  <OnlineDesktopIcon className="w-4 h-4" />
                ) : course.schedule.sessionType.name === "hybrid" ? (
                  <HybridIcon className="w-4 h-4" />
                ) : (
                  <PersonsIcon className="w-4 h-4" />
                )}

                <p className="w-fit h-6.5 leading-6.5 text-grayscale-500 text-helper-md-regular">
                  {course.schedule.sessionType.name}
                </p>
              </div>
              <div className="flex w-full justify-start items-center h-fit gap-2">
                <LocationPinIcon className="w-4 h-4" />
                <p className="w-fit h-6.5 leading-6.5 text-grayscale-500 text-helper-md-regular">
                  {course.schedule.location}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/** Progress Section */}
        <div className="flex w-full gap-5">
          <div className="flex w-full h-full items-center justify-between">
            <div className="flex flex-col w-full pl-1 gap-2">
              <h4 className="w-[442px] h-4 text-body-sm flex items-center leading-6 text-gray-900">
                {course.progress}% Completed
              </h4>
              <div className="w-[442px] relative rounded-[30px] h-[15px]">
                <div className="flex w-[283.33px] absolute  z-2 h-[15.13px] rounded-[30px] bg-[#4F46E5]"></div>
                <div className="w-full rounded-[30px]  z-1 h-[15.13px] absolute gap-2.5 bg-[#DDDBFA]"></div>
              </div>
            </div>
            <CTA_Button_Outlined
              title="View"
              className="w-[117px] shrink-0 h-[48px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCard;
