import React, { ButtonHTMLAttributes, useState } from "react";
import CloseIcon from "../ui/CloseIcon";
import CTA_Button from "./CTA_Button";
import Input from "./Input";
import { useModal } from "@/context/ModalContext";
import { LoginDataType, useAuth } from "@/context/AuthContext";
import SignUpForm from "./SignUpForm";
import EnrolledCoursesSidebar from "./EnrolledCoursesSidebar";
import { usePathname } from "next/navigation";

function LogIn() {
  const { closeModal, openModal } = useModal();
  const path = usePathname();
  const [formData, setFormData] = useState<LoginDataType>({
    email: "",
    password: "",
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { signIn, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await signIn(formData);

    if (success) {
      closeModal();
      if (path === "/") {
        openModal(<EnrolledCoursesSidebar />);
      }
    }
  };

  const handleModalSwitch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
    openModal(<SignUpForm />);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-115 flex items-end relative justify-start flex-col rounded-xl p-12.5 bg-[#FFFFFF] gap-3"
    >
      <div className="flex absolute top-5 right-3.5 left-3.5">
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
                  Welcome Back
                </h2>
                <h2 className="text-body-xs w-90 h-4.25 flex items-center justify-center text-grayscale-500">
                  Log in to continue your learning
                </h2>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {error ? (
              <h3 className="text-helper-s-regular flex items-center justify-start w-[320px] h-3.75 text-error ">
                {error}
              </h3>
            ) : null}
            <CTA_Button
              type="submit"
              className="p-2.5 gap-2.5 flex items-center justify-center text-button-sm h-11.75"
              title="Log In"
            />
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-2">
            <div className="w-[320px] h-5.25 flex items-center justify-center relative bg-[#FFFFFF]">
              <div className="w-7 h-5.25 flex cursor-default items-center bg-[#FFFFFF]  text-grayscale-400 absolute justify-center p-2.5 gap-2.5">
                <p className="w-3.5 h-6 flex items-start justify-center text-body-xs ">
                  or
                </p>
              </div>
              <div className="w-[320px] h-[0.52px] border-t flex  border-[#D1D1D1]  border"></div>
            </div>
            <div className="px-15 flex items-center justify-center gap-2">
              <p className="w-33.25 h-3.75 cursor-default justify-center items-center flex text-grayscale-500 text-helper-s-regular">
                Don’t have an account?{" "}
              </p>
              <button
                type="button"
                onClick={(e) => handleModalSwitch(e)}
                className="w-13.25 h-4.25 cursor-pointer justify-center items-center text-underlined-sm  text-grayscale-900 text-body-xs"
              >
                Sign Up{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LogIn;
