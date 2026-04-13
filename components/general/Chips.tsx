import Image from "next/image";
import React from "react";

function ChipsCategories({
  Icon,
  title,
  type,
  avatar,
}: {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  avatar?: string;
  type?: "instructor";
}) {
  {
    return type === "instructor" ? (
      <div className="flex cursor-pointer  h-9.75 w-fit items-center  rounded-xl px-3 py-2.5 gap-2.5 bg-gray-50">
        {avatar && (
          <div className="w-7.5 h-7.5 shrink-0 flex">
            <Image
              src={avatar}
              alt="preview"
              width={54}
              height={54}
              className="object-cover rounded-sm "
            />
          </div>
        )}

        <p className="w-fit h-fit shrink-0 text-body-sm text-center text-grayscale-500 leading-6">
          {title}
        </p>
      </div>
    ) : (
      <div className="flex cursor-pointer h-9.75 w-fit items-center justify-center rounded-xl px-3 py-2.5 gap-2.5 bg-gray-50">
        {Icon && <Icon height={24} width={24} />}
        <p className="w-fit h-fit text-body-sm text-center text-grayscale-500 leading-6">
          {title}
        </p>
      </div>
    );
  }
}

export default ChipsCategories;
