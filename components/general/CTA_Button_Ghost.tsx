import React, { ButtonHTMLAttributes } from "react";

function CTA_Button_Ghost({
  title,
  disabled,
  className,
}: {
  title: string;
  disabled?: boolean;
  className: string;
}) {
  return (
    <button
      disabled={disabled}
      className={`border-b cursor-pointer hover:border-[#281ED2] hover:text-[#281ED2] active:border-[#1E169D] active:text-[#1E169D] focus:border-b-2 focus:border-dashed focus:border-[#1E169D]  focus:text-[#1E169D] disabled:border-[#ADADAD] disabled:text-[#707070] text-[#4F46E5] disabled:cursor-auto border-[#4F46E5] transition-all ease-out duration-400 p-3 gap-2.5 ${className} `}
    >
      <span className="h-6 w-12.75 text-button-sm">{title}</span>
    </button>
  );
}

export default CTA_Button_Ghost;
