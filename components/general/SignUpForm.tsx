import React, { useEffect, useState } from "react";
import CloseIcon from "../ui/CloseIcon";
import CTA_Button from "./CTA_Button";
import { useModal } from "@/context/ModalContext";
import LogIn from "./LogInForm";
import StepEmail from "./StepEmail";
import StepPassword from "./StepPassword";
import StepProfile from "./StepProfile";
import BackIcon from "../ui/BackIcon";
import z from "zod";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export type SignUpData = {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
};

export type SignUpError = {
  step1: { emailError: string };
  step2: { passwordError: string; password_confirmation: string };
  step3: { usernameError: string; avatarError: string; signUpError: string };
};

const ClearFormData = {
  email: "",
  password: "",
  password_confirmation: "",
  username: "",
};

const ClearErrorData = {
  step1: { emailError: "" },
  step2: { passwordError: "", password_confirmation: "" },
  step3: { usernameError: "", avatarError: "", signUpError: "" },
};

function SignUpForm() {
  const { closeModal, openModal } = useModal();
  const [step, setStep] = useState(1);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [errorData, setErrorData] = useState<SignUpError>(ClearErrorData);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const { AfterRegisterAuth } = useAuth();

  const [formData, setFormData] = useState<SignUpData>(ClearFormData);

  const emailSchema = z.string().email("Invalid email format");

  const next = (e: React.SubmitEvent) => {
    e.preventDefault();
    const errorCheck = updateErrorState();

    if (errorCheck) {
      return;
    }

    setStep((prev) => prev + 1);
  };
  const back = () => setStep((prev) => prev - 1);

  const updateData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const updateErrorState = () => {
    if (step === 1 && !formData.email) {
      setErrorData((prev) => ({
        ...prev,
        step1: { emailError: "Email Must Be Provided" },
      }));
      return true;
    }
    if (step === 2 && !formData.password && !formData.password_confirmation) {
      setErrorData((prev) => ({
        ...prev,
        step2: {
          passwordError: "Password Must Be Provided",
          password_confirmation: "Confirm Password Must Be provided",
        },
      }));
      return true;
    }
    if (step === 3 && !formData.username) {
      setErrorData((prev) => ({
        ...prev,
        step3: {
          usernameError: "Username Must Be Provided",
          avatarError: "",
          signUpError: "",
        },
      }));
      return true;
    }

    if (step === 1 && formData.email.length < 3) {
      setErrorData((prev) => ({
        ...prev,
        step1: { emailError: "Email Must Be At Least 3 Symbols" },
      }));
      return true;
    } else if (step === 1 && formData.email) {
      const result = emailSchema.safeParse(formData.email);
      if (!result.success) {
        setErrorData((prev) => ({
          ...prev,
          step1: { emailError: result.error.issues[0].message },
        }));
        return true;
      } else {
        setErrorData((prev) => ({
          ...prev,
          step1: { emailError: "" },
        }));
        return false;
      }
    }

    if (step === 2 && formData.password.length < 3) {
      setErrorData((prev) => ({
        ...prev,
        step2: {
          passwordError: "Password Must Be At Least 3 Symbols",
          password_confirmation: "",
        },
      }));
      return true;
    } else if (step === 2 && formData.password) {
      if (!formData.password_confirmation) {
        setErrorData((prev) => ({
          ...prev,
          step2: {
            passwordError: "",
            password_confirmation: "Please Confirm Password",
          },
        }));
        return true;
      } else if (
        formData.password.trim() !== formData.password_confirmation.trim()
      ) {
        setErrorData((prev) => ({
          ...prev,
          step2: {
            passwordError: "",
            password_confirmation: "Password Doesn`t match",
          },
        }));
        return true;
      } else {
        setErrorData((prev) => ({
          ...prev,
          step2: { passwordError: "", password_confirmation: "" },
        }));
        return false;
      }
    }
  };

  const handleModalSwitch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAvatarFile(undefined);
    setFormData(ClearFormData);
    setErrorData(ClearErrorData);
    setPreview(null);
    closeModal();
    openModal(<LogIn />);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    // File Type Validation
    if (setErrorData) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorData((prev) => ({
          ...prev,
          step3: {
            ...prev.step3,
            avatarError: "Only JPG, PNG or WebP allowed ",
          },
        }));
        return;
      }

      // SIZE VALIDATION
      if (selectedFile.size > maxSize) {
        setErrorData?.((prev) => ({
          ...prev,
          step3: {
            ...prev.step3,
            avatarError: "Max size is 2MB",
          },
        }));
        return;
      }
      const previewUrl = URL.createObjectURL(selectedFile);

      setFile(selectedFile);
      setPreview(previewUrl);
      if (selectedFile) {
        setAvatarFile?.(selectedFile);
      }

      setErrorData?.((prev) => ({
        ...prev,
        step3: {
          ...prev.step3,
          avatarError: "",
        },
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const errorCheck = updateErrorState();

      if (errorCheck) {
        return;
      }
      const form = new FormData();
      form.append("username", formData.username.trim());
      form.append("email", formData.email.trim());
      form.append("password", formData.password.trim());
      form.append(
        "password_confirmation",
        formData.password_confirmation.trim(),
      );
      if (avatarFile) {
        form.append("avatar", avatarFile);
      }

      const response = await axios.post(
        "https://api.redclass.redberryinternship.ge/api/register",
        form,
      );

      if (response.data.data.token) {
        const registered = AfterRegisterAuth(response.data.data);
        if (registered) {
          setAvatarFile(undefined);
          setFormData(ClearFormData);
          setErrorData(ClearErrorData);
          setPreview(null);
          closeModal();
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        setErrorData((prev) => ({
          ...prev,
          step3: {
            ...prev.step3,
            signUpError: data?.message || "Something went wrong",
          },
        }));
      } else {
        console.log(error); // unknown error
      }
    }
  };

  return (
    <form
      onSubmit={(e) => (step === 3 ? handleSubmit(e) : next(e))}
      className="w-115 flex items-end relative justify-start flex-col rounded-xl p-12.5 bg-[#FFFFFF] gap-3"
    >
      <div className="flex absolute top-5 right-3.5 left-3.5">
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
                <h2 className="text-h2 w-full h-9.75 flex items-center justify-center text-grayscale-900">
                  Create Account
                </h2>
                <h2 className="text-body-xs w-full h-4.25 flex items-center justify-center text-grayscale-500">
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

              {step === 1 && (
                <StepEmail
                  errorData={errorData}
                  data={formData}
                  updateData={updateData}
                />
              )}
              {step === 2 && (
                <StepPassword
                  errorData={errorData}
                  data={formData}
                  updateData={updateData}
                />
              )}
              {step === 3 && (
                <StepProfile
                  file={file}
                  preview={preview}
                  handleFileChange={handleFileChange}
                  errorData={errorData}
                  data={formData}
                  updateData={updateData}
                />
              )}
            </div>
            <CTA_Button
              type="submit"
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
                type="button"
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
