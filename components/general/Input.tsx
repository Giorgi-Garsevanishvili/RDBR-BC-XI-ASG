"use client";
import React, { useState } from "react";
import EyeIcon from "../ui/EyeIcon";
import EyeClosedIcon from "../ui/EyeClosedIcon";
import UploadIcon from "../ui/UploadIcon";
import Image from "next/image";

function Input({
  label,
  id,
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  file,
  preview,
  handleFileChange,
}: {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file?: File | undefined;
  preview?: string | null;
  handleFileChange?: (
    e: React.ChangeEvent<HTMLInputElement, Element>,
  ) => Promise<void>;
}) {
  const [typeDef, setTypeDef] = useState(type);

  const toggleEye = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeDef === "password") {
      setTypeDef("text");
    } else {
      setTypeDef("password");
    }
  };

  if (type === "file") {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-body-xs text-grayscale-700">
          {label}
        </label>

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
            <div className="flex pr-10 pl-10 w-full gap-2">
              <div className="flex justify-center items-center gap-2.5">
                <div className="w-13.5 h-13.5 shrink-0 flex">
                  <Image
                    src={preview}
                    alt="preview"
                    width={54}
                    height={54}
                    className="object-cover rounded-[40px] "
                  />
                </div>
                <div className="flex flex-col gap-0.5 w-full">
                  <div>
                    <p className="w-44 h-3.75 text-helper-s-regular text-grayscale-600 truncate">
                      {file?.name}
                    </p>
                    <p className="w-44 h-3 text-helper-xs-regular text-grayscale-300">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <p className="w-44 h-3 underline font-medium text-[10px] align-middle text-[#4F46E5]">
                    Change
                  </p>
                </div>
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
