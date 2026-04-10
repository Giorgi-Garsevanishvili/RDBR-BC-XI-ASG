import React, { useState } from "react";
import Input from "./Input";
import { SignUpData, SignUpError } from "./SignUpForm";

function StepProfile({
  data,
  updateData,
  errorData,
  setErrorData,
}: {
  data: SignUpData;
  updateData: (data: Partial<SignUpData>) => void;
  errorData: SignUpError;
  setErrorData: (value: React.SetStateAction<SignUpError>) => void;
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
        setErrorData={setErrorData}
        error={errorData.step3.avatarError || errorData.step3.signUpError}
        id="image"
        type="file"
        label="Upload Avatar"
        name="file"
        value={data.avatar}
        onChange={(e) => {
          updateData({ avatar: e.target.value });
        }}
      />
    </>
  );
}

export default StepProfile;
