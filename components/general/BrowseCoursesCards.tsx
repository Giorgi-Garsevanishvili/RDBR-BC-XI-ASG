import React from "react";
import CTA_Button from "./CTA_Button";
import RatingFullStar from "../ui/RatingFullStar";
import Image from "next/image";
import Chips from "./Chips";

import DevelopmentIcon from "../ui/DevelopmentIcon";
import DesignIcon from "../ui/DesignIcon";
import BusinessIcon from "../ui/BusinessIcon";
import MarketingIcon from "../ui/MarketingIcon";
import DataScienceIcon from "../ui/DataScienceIcon";
import { redirect } from "next/navigation";

const ImgDataValues: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  development: DevelopmentIcon,
  design: DesignIcon,
  business: BusinessIcon,
  marketing: MarketingIcon,
  "data-science": DataScienceIcon,
};

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

function BrowseCoursesCards({ course }: { course: CourseDataType }) {
  const pageRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    redirect(`/browse/${course.id}`);
  };
  return (
    <div className="flex flex-col rounded-xl p-5 gap-6 bg-grayscale-50 border border-grayscale-100 w-93.25 h-fit hover:border-[#B7B3F4] transition-all duration-300 ease-out hover:shadow-[0px_0px_15px_0px_#8A82D433] active:border-[#958FEF] active:shadow-[0px_0px_15px_0px_#8A82D440]">
      <div className="flex flex-col w-full h-fit gap-4.5">
        <div className="flex flex-col w-full h-fit gap-4.5">
          <div className="w-full relative h-45.25 flex overflow-hidden">
            <Image
              src={course.image}
              alt="/"
              fill
              className="rounded-[10px]  gap-2.5 object-cover "
            />
          </div>
          <div className="flex flex-col w-full h-fit gap-4">
            <div className="flex flex-col w-full gap-3">
              <div className="flex justify-between w-full">
                <div className="flex items-center w-full justify-start gap-2">
                  <h5 className="text-body-xs shrink-0 text-grayscale-400 w-fit flex h-4.25">
                    {course.instructor.name}
                  </h5>
                  <div className="flex w-0.5 h-3.5 rounded-[100px] bg-grayscale-200"></div>
                  <h5 className="text-body-xs  shrink-0 text-grayscale-400 w-fit flex h-4.25">
                    {course.durationWeeks} Weeks
                  </h5>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <RatingFullStar className="w-4.5 text-warning h-4.5" />
                  <h5 className="w-5.5 h-4.25 text-body-xs text-grayscale-600">
                    {course.avgRating}
                  </h5>
                </div>
              </div>
              <div className="gap-4 w-full h-fit flex">
                <h1 className="w-83.25 h-14.5 text-h3 text-grayscale-900 ">
                  {course.title}
                </h1>
              </div>
              <div className="flex gap-2 w-full h-fit">
                <Chips
                  filterId={course.category.id}
                  isActive={false}
                  title={course.category.name}
                  Icon={course.category.icon}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full h-12 justify-between">
          <div className="flex flex-col justify-between items-start gap-2">
            <h5 className="w-19 h-3.75  text-helper-md text-grayscale-400">
              Starting from
            </h5>
            <h3 className="w-15.5 h-7.25 text-h3 text-grayscale-900">
              ${Number(course.basePrice)}
            </h3>
          </div>
          <CTA_Button
            type="button"
            action={(e) => pageRedirect(e)}
            className="text-button-md flex items-center justify-center text-center w-fit h-full"
            title="Details"
          />
        </div>
      </div>
    </div>
  );
}

export default BrowseCoursesCards;
