import React from "react";
import CTA_Button from "./CTA_Button";
import CTA_Button_Outlined from "./CTA_Button_Outlined";
import CTA_Button_Ghost from "./CTA_Button_Ghost";
import { useModal } from "@/context/ModalContext";
import SignUpForm from "./SignUpForm";
import LogIn from "./LogInForm";

function NavAuthorizeComponent() {
  const { openModal } = useModal();

  return (
    <div className="flex gap-10.75">
      <div className="flex items-center justify-center gap-3.75">
        <CTA_Button_Outlined
          action={() => openModal(<LogIn />)}
          className="h-[60px] w-[114px]"
          title="Log In"
        />
        <CTA_Button
          action={() => openModal(<SignUpForm />)}
          className="h-[60px] text-button-md"
          title="Sign Up"
        />
      </div>
    </div>
  );
}

export default NavAuthorizeComponent;
