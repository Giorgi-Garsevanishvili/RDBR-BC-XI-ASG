import React, { ReactElement, ReactNode } from "react";
import PersonsIcon from "../ui/PersonsIcon";
import CTA_Button_Outlined from "./CTA_Button_Outlined";
import CTA_Button from "./CTA_Button";
import { useModal } from "@/context/ModalContext";
import MyProfileComponent from "./MyProfileComponent";
import ModalUserIcon from "../ui/ModalUserIcon";

function CompleteProfileWarningComponent({
  title,
  info,
  Icon,
  Buttons,
}: {
  title: string;
  info?: string;
  Icon: React.ComponentType;
  Buttons?: ReactNode;
}) {
  return (
    <div className="flex w-[476px] max-h-[486px] rounded-2xl p-15 gap-2.5 bg-grayscale-50">
      <div className="flex flex-col w-full h-fit gap-10.5">
        <div className="flex flex-col justify-between items-center w-full h-fit gap-10">
          <div className="flex flex-col items-center justify-between w-full h-fit gap-6">
            <Icon />
            <div className="flex flex-col justify-center text-center items-center w-full h-fit text-grayscale-700 gap-6">
              <p className="w-[356px] h-[78px]  text-h2 ">{title}</p>
              {info && (
                <p className="w-[356px] h-[48px]  text-body-lg ">{info}</p>
              )}
            </div>
          </div>
          <div className="flex w-full h-fit gap-2">{Buttons}</div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfileWarningComponent;
