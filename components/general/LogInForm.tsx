import React, { ButtonHTMLAttributes, useState } from "react";
import CloseIcon from "../ui/CloseIcon";
import CTA_Button from "./CTA_Button";
import Input from "./Input";
import { useModal } from "@/context/ModalContext";
import z from "zod";
import { LoginDataType, useAuth } from "@/context/AuthContext";

function LogIn() {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState<LoginDataType>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { signIn, signOut } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signIn(formData);

    if (success) {
      closeModal();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-115 flex items-end relative justify-start flex-col rounded-xl p-12.5 bg-[#FFFFFF] gap-3"
    >
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
              <div className="flex flex-col gap-1.5">
                <h2 className="text-h2 w-[360px] h-[39px] flex items-center justify-center text-[#141414]">
                  Welcome Back
                </h2>
                <h2 className="text-body-xs w-[360px] h-[17px] flex items-center justify-center text-[#666666]">
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
            <CTA_Button
              type="submit"
              className="p-2.5 gap-2.5 flex items-center justify-center text-button-sm h-11.75"
              title="Log In"
            />
          </div>
          <div className="flex flex-col items-center w-full justify-center gap-2">
            <div className="w-[320px] h-[21px] flex items-center justify-center relative bg-[#FFFFFF]">
              <div className="w-[28px] h-[21px] flex items-center bg-[#FFFFFF]  text-grayscale-400 absolute justify-center p-2.5 gap-2.5">
                <p className="w-[14px] h-[24px] flex items-start justify-center text-body-xs ">
                  or
                </p>
              </div>
              <div className="w-[320px] h-[0.52px] border-t flex  border-[#D1D1D1]  border"></div>
            </div>
            <div className="px-[60px] flex items-center justify-center gap-2">
              <p className="w-[133px] h-[15px] justify-center items-center flex text-grayscale-500 text-helper-s-regular">
                Don’t have an account?{" "}
              </p>
              <p className="w-[53px] h-[17px] justify-center items-center text-underlined-sm  text-grayscale-900 text-body-xs">
                Sign Up{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LogIn;
