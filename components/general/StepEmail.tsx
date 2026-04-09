import React from "react";
import Input from "./Input";
import { SignUpData } from "./SignUpForm";

function StepEmail({
  data,
  updateData,
}: {
  data: SignUpData;
  updateData: (data: Partial<SignUpData>) => void;
}) {
  return (
    <Input
      value={data.email}
      onChange={(e) => {
        updateData({ email: e.target.value });
      }}
      name="email"
      id="email"
      type="email"
      label="Email*"
      placeholder="you@example.com"
    />
  );
}

export default StepEmail;
