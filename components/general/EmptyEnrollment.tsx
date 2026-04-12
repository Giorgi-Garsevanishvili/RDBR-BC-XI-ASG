import React from "react";
import PackageOpenIcon from "../ui/PackageOpenIcon";
import CTA_Button from "./CTA_Button";

function EmptyEnrollment() {
  return (
    <div className="flex justify-center items-center flex-col h-219 gap-8 w-full">
      <div className="w-md h-fit gap-1 items-center justify-center">
        <div className="flex items-center justify-center h-42.5 rounded-[2000px] p-7.5 gap-2.5">
          <PackageOpenIcon />
        </div>
        <div className="w-full flex-col items-center justify-center flex h-fit gap-3">
          <div className="flex flex-col items-center justify-center w-full h-fit gap-6">
            <div className="flex flex-col items-center justify-center w-full h-fit gap-2">
              <p className="w-[448px] h-[29px] items-center justify-center flex text-h3 text-[#130E67]">
                No Enrolled Courses Yet
              </p>
              <div className="flex relative items-center justify-center w-[448px] h-[48px]">
                <p className="w-[274px] text-center text-body-xs text-[#130E67] flex absolute -top-[1] left-[87px] h-[48px]">
                  Your learning journey starts here! Browse courses to get
                  started.
                </p>
              </div>
            </div>
          </div>
          <CTA_Button type="button" className="" title="Browse Courses" />
        </div>
      </div>
    </div>
  );
}

export default EmptyEnrollment;
