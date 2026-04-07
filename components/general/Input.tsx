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
    e.preventDefault();

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
          <label
            className="text-body-xs text-[#3D3D3D] w-[360px] h-[17px]"
            htmlFor={id}
          >
            {label}
          </label>
          <div className="h-[48px] flex text-body-xs rounded-lg border-[1.5px] py-[12px] border-[#D1D1D1] pr-[15px] pl-[13px] gap-[10px]">
            <div className="flex w-full justify-between">
              <input
                className="gap-1"
                type={typeDef}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
              {type === "password" ? (
                <button
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
