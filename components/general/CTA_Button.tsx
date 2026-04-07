import React, { ButtonHTMLAttributes, ReactNode } from "react";

function CTA_Button({
  title,
  disabled,
  className,
  action,
  type
}: {
  type?: string
  title: string;
  disabled?: boolean;
  className: string;
  action?: () => void;
}) {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={`px-6.25 ${className} transition-all ease-out duration-300 disabled:bg-[#ADADAD] disabled:text-[#8A8A8A] focus:bg-[#281ED2]  border-2 border-transparent disabled:cursor-auto focus:border-[#1E169D] active:bg-[#1E169D] hover:bg-[#281ED2] cursor-pointer py-4.25 gap-2.5 bg-[#4F46E5] text-white rounded-lg`}
    >
      <span className="h-6 w-16">{title}</span>
    </button>
  );
}

export default CTA_Button;
