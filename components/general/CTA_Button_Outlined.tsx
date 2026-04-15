import React, { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

function CTA_Button_Outlined({
  title,
  disabled,
  className,
  action,
  Icon
}: {
  title: string;
  disabled?: boolean;
  className: string;
  action?: () => void;
  Icon?: ElementType
}) {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={`px-4 py-3 ${className}  hover:bg-[#281ED2] active:bg-[#1E169D] focus:border-dashed focus:border-[#DDDBFA] focus:border-2 focus:bg-[#1E169D] disabled:bg-[#ADADAD] disabled:cursor-auto focus:text-white focus: disabled:border disabled:text-[#8A8A8A] disabled:border-[#8A8A8A]  cursor-pointer hover:border-transparent hover:text-white gap-0.5 rounded-lg text-[#4F46E5] border-2 border-[#958FEF] transition-all duration-300 ease-out`}
    >
      <span className="align-middle w-fit h-fit">{title}</span>
    </button>
  );
}

export default CTA_Button_Outlined;
