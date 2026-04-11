import React, { useState } from "react";
import Input from "./Input";
import { SignUpData, SignUpError } from "./SignUpForm";

function StepProfile({
  data,
  updateData,
  errorData,
  file,
  preview,
  handleFileChange,
}: {
  data: SignUpData;
  updateData: (data: Partial<SignUpData>) => void;
  errorData: SignUpError;
  file: File | undefined;
  preview: string | null;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement, Element>,
  ) => Promise<void>;
}) {
  return (
    <>
      <Input
        error={errorData.step3.usernameError}
        id="password"
        type="text"
        placeholder="Username"
        label="Username*"
        name="password"
        value={data.username}
        onChange={(e) => {
          updateData({ username: e.target.value });
        }}
      />
      <Input
        file={file}
        preview={preview}
        error={errorData.step3.avatarError || errorData.step3.signUpError}
        id="image"
        type="file"
        label="Upload Avatar"
        name="file"
        handleFileChange={handleFileChange}
      />
    </>
  );
}

export default StepProfile;
