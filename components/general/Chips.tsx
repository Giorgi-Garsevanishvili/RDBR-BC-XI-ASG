import Image from "next/image";
import React from "react";

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

function Chips({
  Icon,
  title,
  type,
  avatar,
  isActive,
  disabled,
  filterId,
}: {
  Icon?: string;
  title: string;
  avatar?: string;
  type?: "instructor";
  isActive?: boolean;
  disabled?: boolean;
  filterId?: number;
}) {
  const IconComponent = Icon ? (ImgDataValues[Icon] ?? DevelopmentIcon) : null;
  {
    return type === "instructor" ? (
      <div
        onClick={() =>
          filterId
            ? redirect(`/browse/?instructors%5B%5D=${filterId}&page=1`)
            : null
        }
        className={`flex shrink-0 border cursor-pointer h-9.75 w-fit transition-all duration-300 ease-out items-center justify-center rounded-xl px-3 py-2 gap-2.5 ${disabled && isActive ? "bg-[#EEEDFC]" : disabled ? "bg-grayscale-50" : "bg-grayscale-100"} ${isActive ? "border-[#281ED2] text-[#281ED2]  stroke-[#281ED2]" : "border-transparent"} hover:bg-[#DDDBFA] hover:text-[#281ED2] hover:stroke-[#281ED2] active:border-[#281ED2] active:text-[#281ED2] active:bg-[#EEEDFC]  active:stroke-[#281ED2]`}
      >
        {avatar && (
          <div
            className={`w-7.5 h-7.5 ${avatar && "bg-[#D9D9D9]"} rounded-sm shrink-0 flex`}
          >
            {avatar && (
              <Image
                src={avatar}
                alt="preview"
                width={30}
                height={30}
                className="object-cover rounded-sm "
              />
            )}
          </div>
        )}

        <p className={`w-fit h-fit   text-body-sm text-center leading-6`}>
          {title}
        </p>
      </div>
    ) : (
      <div
        onClick={() =>
          filterId
            ? redirect(`/browse/?categories%5B%5D=${filterId}&page=1`)
            : null
        }
        className={`flex border cursor-pointer h-9.75 w-fit transition-all duration-300 ease-out items-center justify-center rounded-xl px-3 py-2.5 gap-2.5 ${disabled && isActive ? "bg-[#EEEDFC]" : disabled ? "bg-grayscale-50" : "bg-grayscale-100"} ${isActive ? "border-[#281ED2] text-[#281ED2]  stroke-[#281ED2]" : "border-transparent"} hover:bg-[#DDDBFA] hover:text-[#281ED2] hover:stroke-[#281ED2] active:border-[#281ED2] active:text-[#281ED2] active:bg-[#EEEDFC] shrink-0 active:stroke-[#281ED2]`}
      >
        {IconComponent && <IconComponent height={24} width={24} />}
        <p className="w-fit h-fit text-body-sm text-center leading-6">
          {title}
        </p>
      </div>
    );
  }
}

export default Chips;
