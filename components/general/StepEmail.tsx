import React, { useState } from "react";
import Input from "./Input";
import { SignUpData, SignUpError } from "./SignUpForm";

function StepEmail({
  data,
  updateData,
  errorData,
}: {
  data: SignUpData;
  updateData: (data: Partial<SignUpData>) => void;
  errorData: SignUpError;
}) {
  return (
    <Input
      value={data.email}
      onChange={(e) => {
        updateData({ email: e.target.value });
      }}
      error={errorData.step1.emailError}
      name="email"
      id="email"
      type="email"
      label="Email*"
      placeholder="you@example.com"
    />
  );
}

export default StepEmail;
