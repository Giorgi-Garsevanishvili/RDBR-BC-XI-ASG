import React from "react";
import Input from "./Input";
import { SignUpData } from "./SignUpForm";

function StepProfile({
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
