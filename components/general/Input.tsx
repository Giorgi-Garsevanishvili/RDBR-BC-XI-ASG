"use client";
import React, { useState } from "react";
import EyeIcon from "../ui/EyeIcon";
import EyeClosedIcon from "../ui/EyeClosedIcon";

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

  return (
    <div className="gap-0.5 flex flex-col">
      <div className="gap-1.25 flex flex-col">
        <div className="gap-2 flex flex-col">
          <label htmlFor={id}>
            <p className="text-body-xs text-[#3D3D3D] w-90 h-4.25">
              {label}
            </p>
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

export default Input;
