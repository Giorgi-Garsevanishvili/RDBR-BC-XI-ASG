import React from "react";
import Input from "./Input";
import { SignUpData, SignUpError } from "./SignUpForm";

function StepPassword({
  data,
  updateData,
  errorData,
}: {
  data: SignUpData;
  updateData: (data: Partial<SignUpData>) => void;
  errorData: SignUpError;
}) {
  return (
    <>
      <Input
        error={errorData.step2.passwordError}
        id="password"
        type="password"
        placeholder="Password"
        label="Password*"
        name="password"
        value={data.password}
        onChange={(e) => {
          updateData({ password: e.target.value });
        }}
      />
      <Input
        error={errorData.step2.password_confirmation}
        id="confirm-password"
        type="password"
        placeholder="••••••••"
        label="Confirm Password*"
        name="password"
        value={data.password_confirmation}
        onChange={(e) => {
          updateData({ password_confirmation: e.target.value });
        }}
      />
    </>
  );
}

export default StepPassword;
