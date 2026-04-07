"use client";
import Image from "next/image";
import UserIcon from "../../public/User.svg";
import NavIconLogo from "../ui/NavIconLogo";
import NavBrowseCoursesButton from "./NavBrowseCoursesButton";
import NavEnrolledCourses from "./NavEnrolledCoursesButton";
import ProfileComponent from "./ProfileComponent";
import NavAuthorizeComponent from "./NavAuthorizeComponent";
import GeneralModal from "./GeneralModal";
import { useEffect, useState } from "react";
import { checkAuth } from "@/lib/checkAuth";
import { useAuth } from "@/context/AuthContext";

type Status = {
  logged: boolean;
  data: {};
};

function NavbarComp() {
  const { loggedIn, signOut } = useAuth();

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  console.log(loggedIn);

  return (
    <header className="flex gap-2.5 bg-grayscale-100 border-b border-grayscale-200 px-44.25 py-6 shadow-[0px_0px_11.7px_0px_#0000000A]">
      <div className="flex w-full h-15 justify-between items-center">
        <NavIconLogo position="header" />
        <div className=" h-14 gap-9 flex">
          <div className="flex text-grayscale-600  gap-2">
            <NavBrowseCoursesButton />
            {loggedIn ? <NavEnrolledCourses /> : null}
          </div>
          {loggedIn ? (
            <button onClick={handleSignOut}>
              <ProfileComponent />
            </button>
          ) : (
            <NavAuthorizeComponent />
          )}
        </div>
      </div>
    </header>
  );
}

export default NavbarComp;
