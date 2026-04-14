import React, { ButtonHTMLAttributes, ReactNode } from "react";

function EnrollButton({
  title,
  disabled,
  className,
  action,
  type,
}: {
  type: "button" | "submit" | "reset";
  title: string;
  disabled?: boolean;
  className: string;
  action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type={type}
      onClick={action}
      disabled={disabled}
      className={`px-6.25 ${className} transition-all ease-out duration-300 disabled:bg-[#EEEDFC] disabled:text-[#B7B3F4] disabled:cursor-auto active:bg-[#4F46E5] hover:bg-[#281ED2] cursor-pointer py-4.25 gap-2.5 bg-[#4F46E5] text-grayscale-50 rounded-lg`}
    >
      <span className="align-middle w-fit h-fit">{title}</span>
    </button>
  );
}

export default EnrollButton;
