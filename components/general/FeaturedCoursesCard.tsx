import Image from "next/image";
import React from "react";
import bannerImage3 from "../../public/banner-3.png";
import RatingFullStar from "../ui/RatingFullStar";
import CTA_Button from "./CTA_Button";
import { redirect } from "next/navigation";

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

function FeaturedCoursesCard({ course }: { course: FeaturedCoursesData }) {
  const pageRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    redirect(`/browse/${course.id}`);
  };
  return (
    <div className="w-126.5 flex flex-col rounded-xl hover:border-[0.5px] cursor-pointer active:border active:border-[#958FEF] active:[0px_0px_35px_0px_#8A82D41A] hover:border-[#B7B3F4] hover:shadow-[0px_0px_25px_0px_#8A82D41A] transition-all duration-300 ease-out  border bg-grayscale-50 border-grayscale-100 p-5 gap-6">
      {/**Card Info Section */}
      <div className="gap-4 w-116.5 flex flex-col">
        <div className="w-full h-65.5 flex overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            width={466}
            height={262}
            className="rounded-[10px]  gap-2.5 object-cover "
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full gap-3">
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <h5 className="text-body-xs text-grayscale-500 w-fit flex h-4.25">
                  Lecturer {course.instructor.name}
                </h5>
              </div>
              <div className="flex justify-center items-center gap-1">
                <RatingFullStar className="w-4.5 text-warning h-4.5" />
                <h5 className="w-5.5 h-4.25 text-body-xs text-grayscale-600">
                  {course.avgRating ? course.avgRating : 0}
                </h5>
              </div>
            </div>
            <div className="gap-4 w-full flex">
              <h1 className="w-116.5 text-h3 text-grayscale-900 h-fit">
                {course.title.trim()}
              </h1>
            </div>
          </div>
        </div>
        <h4 className="w-103 h-18 text-body-sm leading-6 line-clamp-3 text-grayscale-500">
          {course.description.trim()}
        </h4>
      </div>
      <div className="flex items-center w-full justify-between">
        <div className="flex justify-start items-center gap-2">
          <h5 className="w-19 h-3.75 text-helper-md text-grayscale-400">
            Starting from
          </h5>
          <h2 className="w-20.70 h-9.75 text-h2 text-grayscale-900">
            ${parseInt(course.basePrice).toFixed()}
          </h2>
        </div>
        <CTA_Button
          type="button"
          action={(e) => pageRedirect(e)}
          className="text-button-md"
          title="Details"
        />
      </div>
    </div>
  );
}

export default FeaturedCoursesCard;
