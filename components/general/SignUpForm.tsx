import React, { useState } from "react";
import CloseIcon from "../ui/CloseIcon";
import CTA_Button from "./CTA_Button";
import Input from "./Input";
import { useModal } from "@/context/ModalContext";
import LogIn from "./LogInForm";
import StepEmail from "./StepEmail";
import StepPassword from "./StepPassword";
import StepProfile from "./StepProfile";
import BackIcon from "../ui/BackIcon";

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  avatar: string;
};

function SignUpForm() {
  const { closeModal, openModal } = useModal();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    avatar: "",
  });

  const next = () => {
    if (step === 1 && !formData.email) return;
    if (step === 2 && !formData.password && !formData.confirmPassword) return;
    if (step === 3 && !formData.username) return;
    setStep((prev) => prev + 1);
  };
  const back = () => setStep((prev) => prev - 1);

  const updateData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleModalSwitch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
    openModal(<LogIn />);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 3 && !formData.username) return;
        console.log(formData);
      }}
      className="w-115 flex items-end relative justify-start flex-col rounded-xl p-12.5 bg-[#FFFFFF] gap-3"
    >
      <div className="flex absolute top-0 right-0 left-0">
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="cursor-pointer absolute flex top-0 left-0-0"
          >
            <BackIcon />
          </button>
        )}

        <button
          type="button"
          onClick={closeModal}
          className="cursor-pointer absolute flex top-0 right-0"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className=" flex flex-col w-full gap-4">
          <div className=" flex flex-col w-full gap-4">
            <div className=" flex flex-col gap-6">
              <div className="flex cursor-default flex-col gap-1.5">
                <h2 className="text-h2 w-90 h-9.75 flex items-center justify-center text-grayscale-900">
                  Create Account
                </h2>
                <h2 className="text-body-xs w-90 h-4.25 flex items-center justify-center text-grayscale-500">
                  Join and start learning today
                </h2>
              </div>
              <div className="flex gap-2">
                <p
                  className={`w-[144.67px] gap-0 m-0 p-0 h-2 rounded-[30px] ${step === 1 ? "bg-[#B7B3F4]" : step > 1 ? "bg-[#4F46E5]" : "bg-[#EEEDFC]"} `}
                ></p>
                <p
                  className={`w-[144.67px] gap-0 m-0 p-0 h-2 rounded-[30px] ${step === 2 ? "bg-[#B7B3F4]" : step > 2 ? "bg-[#4F46E5]" : "bg-[#EEEDFC]"} `}
                ></p>
                <p
                  className={`w-[144.67px] gap-0 m-0 p-0 h-2 rounded-[30px] ${step === 3 ? "bg-[#B7B3F4]" : step > 3 ? "bg-[#4F46E5]" : "bg-[#EEEDFC]"} `}
                ></p>
              </div>
              {/**This is Place for steps */}
              {/* <StepEmail /> */}
              {/* <StepPassword /> */}
              {/* <StepProfile /> */}
              {step === 1 && (
                <StepEmail data={formData} updateData={updateData} />
              )}
              {step === 2 && (
                <StepPassword data={formData} updateData={updateData} />
              )}
              {step === 3 && (
                <StepProfile data={formData} updateData={updateData} />
              )}
            </div>
            <CTA_Button
              action={() => {
                step === 3 ? null : next();
              }}
              type={step === 3 ? "submit" : "button"}
              className="p-2.5 gap-2.5 flex items-center justify-center text-button-sm leading-6 h-11.75"
              title={step === 3 ? "Sign Up" : "Next"}
            />
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-2">
            <div className="w-[320px] h-5.25 flex items-center justify-center relative bg-[#FFFFFF]">
              <div className="w-7 h-5.25 cursor-default flex items-center bg-[#FFFFFF]  text-grayscale-400 absolute justify-center p-2.5 gap-2.5">
                <p className="w-3.5 h-6 flex items-start justify-center text-body-xs ">
                  or
                </p>
              </div>
              <div className="w-[320px] h-[0.52px] border-t flex  border-[#D1D1D1]  border"></div>
            </div>
            <div className="px-15 flex items-center justify-center gap-2">
              <p className="w-36.75 h-3.75 cursor-default justify-center items-center flex text-grayscale-500 text-helper-s-regular">
                Already have an account?{" "}
              </p>
              <button
                onClick={(e) => handleModalSwitch(e)}
                className="w-10.25 h-4.25 cursor-pointer justify-center items-center text-underlined-sm  text-grayscale-900 text-body-xs"
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
