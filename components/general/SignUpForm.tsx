import React from "react";
import CloseIcon from "../ui/CloseIcon";
import CTA_Button from "./CTA_Button";
import Input from "./Input";
import { useModal } from "@/context/ModalContext";
import LogIn from "./LogInForm";

function SignUpForm() {
  const { closeModal, openModal } = useModal();

  const handleModalSwitch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
    openModal(<LogIn />);
  };
  return (
    <form className="w-115 flex items-end relative justify-start flex-col rounded-xl p-12.5 bg-[#FFFFFF] gap-3">
      <button
        onClick={closeModal}
        className="cursor-pointer absolute flex top-0 right-0"
      >
        <CloseIcon />
      </button>
      <div className="flex flex-col w-full gap-6">
        <div className=" flex flex-col w-full gap-4">
          <div className=" flex flex-col w-full gap-4">
            <div className=" flex flex-col gap-6">
              <div className="flex cursor-default flex-col gap-1.5">
                <h2 className="text-h2 w-[360px] h-[39px] flex items-center justify-center text-[#141414]">
                  Create Account
                </h2>
                <h2 className="text-body-xs w-[360px] h-[17px] flex items-center justify-center text-[#666666]">
                  Join and start learning today
                </h2>
              </div>
              <div className="flex gap-2">
                <p className="w-[144.67px] gap-0 m-0 p-0 h-[8px] rounded-[30px] bg-[#B7B3F4]"></p>
                <p className="w-[144.67px] h-[8px] rounded-[30px] bg-[#B7B3F4]"></p>
                <p className="w-[144.67px] object-cover h-[8px] rounded-[30px] bg-[#B7B3F4]"></p>
              </div>
              <Input
                value=""
                onChange={() => {}}
                name="email"
                id="email"
                type="email"
                label="Email*"
                placeholder="you@example.com"
              />
            </div>
            <CTA_Button
              type="submit"
              className="p-2.5 gap-2.5 flex items-center justify-center text-button-sm h-11.75"
              title="Next"
            />
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-2">
            <div className="w-[320px] h-[21px] flex items-center justify-center relative bg-[#FFFFFF]">
              <div className="w-[28px] h-[21px] cursor-default flex items-center bg-[#FFFFFF]  text-grayscale-400 absolute justify-center p-2.5 gap-2.5">
                <p className="w-[14px] h-[24px] flex items-start justify-center text-body-xs ">
                  or
                </p>
              </div>
              <div className="w-[320px] h-[0.52px] border-t flex  border-[#D1D1D1]  border"></div>
            </div>
            <div className="px-[60px] flex items-center justify-center gap-2">
              <p className="w-[147px] h-[15px] cursor-default justify-center items-center flex text-grayscale-500 text-helper-s-regular">
                Already have an account?{" "}
              </p>
              <button
                onClick={(e) => handleModalSwitch(e)}
                className="w-[41px] h-[17px] cursor-pointer justify-center items-center text-underlined-sm  text-grayscale-900 text-body-xs"
              >
                Log In{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
