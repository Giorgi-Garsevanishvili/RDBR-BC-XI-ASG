"use client";
import React, { useState } from "react";
import EyeIcon from "../ui/EyeIcon";
import EyeClosedIcon from "../ui/EyeClosedIcon";
import UploadIcon from "../ui/UploadIcon";
import { SignUpError } from "./SignUpForm";
import { toBase64 } from "@/lib/toBase64";

function Input({
  label,
  id,
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  setErrorData,
}: {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setErrorData?: (value: React.SetStateAction<SignUpError>) => void;
}) {
  const [typeDef, setTypeDef] = useState(type);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File>();

  const toggleEye = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeDef === "password") {
      setTypeDef("text");
    } else {
      setTypeDef("password");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (setErrorData) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorData((prev) => ({
          ...prev,
          step3: {
            usernameError: "",
            signUpError: "",
            avatarError: "Only JPG, PNG or WebP allowed ",
          },
        }));
        return;
      }

      try {
        const base64 = await toBase64(selectedFile);
        const trimmedBase64 = base64.split(",")[1]
        const previewUrl = URL.createObjectURL(selectedFile);

        // ✅ update local UI
        setFile(selectedFile);
        setPreview(previewUrl);

        // ✅ send base64 to parent (IMPORTANT)
        onChange({
          target: {
            name,
            value: trimmedBase64,
          },
        } as React.ChangeEvent<HTMLInputElement>);

        // ✅ clear only avatar error
        setErrorData?.((prev) => ({
          ...prev,
          step3: {
            ...prev.step3,
            avatarError: "",
          },
        }));
      } catch (err) {
        setErrorData?.((prev) => ({
          ...prev,
          step3: {
            ...prev.step3,
            avatarError: "Failed to process file",
          },
        }));
      }
    }
  };

  if (type === "file") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-body-xs text-grayscale-700">{label}</label>

        <label
          htmlFor={id}
          className="border-[1.5px] hover:bg-[#EEEDFC] hover:border-[#DDDBFA] active:bg-[#DDDBFA] active:border-[#B7B3F4]  border-gray-200 bg-grayscale-50  rounded-lg h-35 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out"
        >
          <input
            type="file"
            id={id}
            name={name}
            className="hidden"
            onChange={handleFileChange}
          />

          {preview && file ? (
            <div className="flex items-center gap-3">
              <img
                src={preview}
                alt="preview"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p>{file?.name}</p>
                <p className="text-sm text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <UploadIcon />
              <p className="w-[320px] h-4.25 flex items-center gap-1 justify-center text-grayscale-500 text-body-xs">
                Drag and drop or{" "}
                <span className="text-[#281ED2] underline">Upload file</span>
              </p>
              <p className="text-helper-s-regular text-grayscale-300">
                JPG, PNG or WebP
              </p>
            </div>
          )}
        </label>
        {error ? (
          <h3 className="text-helper-s-regular flex items-center justify-start w-[320px] h-3.75 text-error ">
            {error}
          </h3>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="gap-0.5 flex flex-col">
        <div className="gap-1.25 flex flex-col">
          <div className="gap-2 flex flex-col">
            <label htmlFor={id}>
              <p
                className={`text-body-xs ${error ? "text-error" : "text-grayscale-700"}  w-[320px] h-4.25`}
              >
                {label}
              </p>
            </label>
            <div
              className={`h-12 ${error ? "border-error" : value !== "" ? "border-grayscale-400" : "border-grayscale-200  hover:border-grayscale-300"} cursor-auto flex-col flex text-body-xs  rounded-lg border-[1.5px] py-3  pr-3.75  pl-3.25 gap-2.5`}
            >
              <div className="flex w-full gap-1.25  justify-between">
                <input
                  className={` ${error ? "text-error" : " hover:placeholder:text-grayscale-200 focus:placeholder:text-grayscale-100 placeholder:text-grayscale-400"} gap-1 outline-none bg-transparent w-full`}
                  type={typeDef}
                  name={name}
                  id={id}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                />
                {type === "password" ? (
                  <button
                    type="button"
                    onClick={(e) => toggleEye(e)}
                    className={`cursor-pointer ${error ? "stroke-error" : " active:stroke-grayscale-400  stroke-grayscale-300"}`}
                  >
                    {typeDef === "password" ? <EyeIcon /> : <EyeClosedIcon />}
                  </button>
                ) : null}
              </div>
            </div>

            {error ? (
              <h3 className="text-helper-s-regular flex items-center justify-start w-[320px] h-3.75 text-error ">
                {error}
              </h3>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
