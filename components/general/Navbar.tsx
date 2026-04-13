"use client";
import NavIconLogo from "../ui/NavIconLogo";
import NavBrowseCoursesButton from "./NavBrowseCoursesButton";
import NavEnrolledCourses from "./NavEnrolledCoursesButton";
import ProfileComponent from "./ProfileComponent";
import NavAuthorizeComponent from "./NavAuthorizeComponent";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { checkAuth } from "@/lib/checkAuth";
import { useModal } from "@/context/ModalContext";
import MyProfileComponent from "./MyProfileComponent";

function NavbarComp() {
  const { loggedIn, user } = useAuth();
  const {openModal} = useModal()


  return (
    <header className="flex gap-2.5 bg-grayscale-100 border-b border-grayscale-200 px-44.25 py-6 shadow-[0px_0px_11.7px_0px_#0000000A]">
      <div className="flex w-full h-15 justify-between items-center">
        <Link href={"/"} className="cursor-pointer">
          <NavIconLogo position="header" />
        </Link>
        <div className=" h-14 gap-9 flex">
          <div className="flex text-grayscale-600  gap-2">
            <NavBrowseCoursesButton />
            {loggedIn ? <NavEnrolledCourses /> : null}
          </div>
          {loggedIn ? (
            <button onClick={() => openModal(<MyProfileComponent />)}>
              <ProfileComponent profileComplete={user?.profileComplete} />
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
