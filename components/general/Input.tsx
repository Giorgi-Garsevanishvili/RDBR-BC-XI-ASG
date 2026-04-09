"use client";
import React, { useState } from "react";
import EyeIcon from "../ui/EyeIcon";
import EyeClosedIcon from "../ui/EyeClosedIcon";
import UploadIcon from "../ui/UploadIcon";

function Input({
  label,
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        <label className="text-body-xs text-grayscale-700">{label}</label>

        <label
          htmlFor={id}
          className="border border-[#D1D1D1] rounded-lg h-35 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
        >
          <input
            type="file"
            id={id}
            name={name}
            className="hidden"
            onChange={onChange}
          />

          <div className="flex flex-col items-center gap-1.5">
            <UploadIcon />
            <p className="w-90 h-4.25 flex items-center gap-1 justify-center text-grayscale-500 text-body-xs">
              Drag and drop or{" "}
              <span className="text-[#281ED2] underline">Upload file</span>
            </p>
            <p className="text-helper-s-regular text-grayscale-300">JPG, PNG or WebP</p>
          </div>
        </label>
      </div>
    );
  } else {
    return (
      <div className="gap-0.5 flex flex-col">
        <div className="gap-1.25 flex flex-col">
          <div className="gap-2 flex flex-col">
            <label htmlFor={id}>
              <p className="text-body-xs text-[#3D3D3D] w-90 h-4.25">{label}</p>
            </label>
            <div className="h-12 cursor-auto flex-col flex text-body-xs rounded-lg border-[1.5px] py-3 border-[#D1D1D1] pr-3.75 pl-3.25 gap-2.5">
              <div className="flex w-full justify-between">
                <input
                  className="gap-1 outline-none bg-transparent w-full"
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
                    className="cursor-pointer"
                  >
                    {typeDef === "password" ? <EyeIcon /> : <EyeClosedIcon />}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
