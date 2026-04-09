import React from "react";
import Input from "./Input";
import { SignUpData } from "./SignUpForm";

function StepPassword({
  data,
  updateData,
}: {
  data: SignUpData;
  updateData: (data: Partial<SignUpData>) => void;
}) {
  return (
    <>
      <Input
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
        id="password"
        type="password"
        placeholder="••••••••"
        label="Confirm Password*"
        name="password"
        value={data.confirmPassword}
        onChange={(e) => {
          updateData({ confirmPassword: e.target.value });
        }}
      />
    </>
  );
}

export default StepPassword;
