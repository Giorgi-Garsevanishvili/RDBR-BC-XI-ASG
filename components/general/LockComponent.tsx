"use client";

import LockIcon from "../ui/LockIcon";
import CTA_Button from "./CTA_Button";
import { useModal } from "@/context/ModalContext";
import LogIn from "./LogInForm";

function LockComponent() {
  const { openModal } = useModal();
  return (
    <div className="flex flex-col justify-center items-center w-104.5 h-58.25 rounded-xl border bg-grayscale-50 border-grayscale-200  px-14 py-8 gap-2.5">
      <div className="gap-6 flex justify-start items-center flex-col w-full">
        <div className="flex items-center justify-center flex-col gap-3 w-full">
          <div className="flex w-fit rounded-[50px] p-5 gap-2.5 bg-[#DDDBFA]">
            <LockIcon />
          </div>
          <h4 className="w-76.5 leading-6 h-6 text-body-sm text-[#0A0836]">
            Sign in to track your learning progress
          </h4>
        </div>
        <CTA_Button
          type="button"
          action={() => openModal(<LogIn />)}
          title="Log In"
          className="w-fit cursor-pointer"
        />
      </div>
    </div>
  );
}

export default LockComponent;
