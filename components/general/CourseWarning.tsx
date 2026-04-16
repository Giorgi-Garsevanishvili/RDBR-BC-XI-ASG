"use client";
import CTA_Button_Outlined from "./CTA_Button_Outlined";
import PaginationArrowIcon from "../ui/PaginationArrowIcon";
import WarningIconSmall from "../ui/WarningIconSmall";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import LogIn from "./LogInForm";
import MyProfileComponent from "./MyProfileComponent";

function CourseWarning() {
  const { loggedIn, user } = useAuth();
  const { openModal } = useModal();

  const handleButtonAction = () => {
    if (!loggedIn) {
      return openModal(<LogIn />);
    }

    if (!user?.profileComplete) {
      return openModal(<MyProfileComponent />);
    }
  };
  return !user?.profileComplete || !loggedIn ? (
    <div className="flex w-full h-fit rounded-xl border justify-center items-center p-5 bg-[#F8FAFC] border-[#E5E7EB]">
      <div className="flex w-87.75 h-fit gap-2.25 ">
        <div className="flex flex-col w-full h-fit gap-2">
          <div className="flex w-full justify-between h-fit gap-1.5">
            <WarningIconSmall className="h-6 w-6 text-warning" />
            <h2 className="w-full h-6 text-body-sm leading-6 text-grayscale-600">
              {!loggedIn && "Authentication Required"}
              {loggedIn && !user?.profileComplete && "Complete Your Profile"}
            </h2>
          </div>
          <h5 className="w-70.75 h-7.5 text-helper-s-regular text-grayscale-400">
            {!loggedIn &&
              "You need sign in to your profile before enrolling in this course."}
            {loggedIn &&
              !user?.profileComplete &&
              "You need to fill in your profile details before enrolling in this course."}
          </h5>
        </div>
      </div>
      <CTA_Button_Outlined
        Icon={<PaginationArrowIcon />}
        action={() => handleButtonAction()}
        className="bg-[#EEEDFC] flex w-fit text-[#281ED2 items-center justify-between hover:text-[#281ED2] border-[#B7B3F4]  "
        title={`${loggedIn && !user?.profileComplete ? "Complete" : !loggedIn ? "Sign In" : null}`}
      />
    </div>
  ) : null;
}

export default CourseWarning;
