import Image from "next/image";
import UserIcon from "../../public/User.svg";

import NavIconSparkles from "../ui/NavIconSparkles";
import NavIconBook from "../ui/NavIconBook";
import NavIconLogo from "../ui/NavIconLogo";

function NavbarComp() {
  return (
    <header className="flex w-480 gap-2.5 bg-grayscale-100 border-b border-grayscale-200 px-44.25 py-6 shadow-[0px_0px_11.7px_0px_#0000000A]">
      <div className="flex w-full h-15 justify-between items-center">
        <NavIconLogo position="header" />
        <div className=" h-14 gap-9 flex">
          <div className="flex text-grayscale-600  gap-2">
            <div className="flex rounded-lg p-3.75 gap-2">
              <div className="flex cursor-pointer transition-all ease-out duration-600 stroke-grayscale-600 hover:text-[#4F46E5] hover:stroke-[#4F46E5] items-center justify-center gap-2">
                <NavIconSparkles />
                <p className="flex items-center text-body-lg w-39 h-6">
                  Browse Courses
                </p>
              </div>
            </div>
            <div className="flex  rounded-lg p-3.75 gap-2">
              <div className="flex cursor-pointer transition-all ease-out duration-600 stroke-grayscale-600 hover:text-[#4F46E5] hover:stroke-[#4F46E5] items-center justify-center  gap-2">
                <NavIconBook />
                <p className="flex items-center text-body-lg text w-40.75 h-6">
                  Enrolled Courses
                </p>
              </div>
            </div>
          </div>
          <div className=" w-14 h-14 relative">
            <div className="flex cursor-pointer transition-colors ease-out duration-300 relative hover:border-[#B7B3F4]  border-[1.5]  border-solid  border-transparent  items-center justify-center h-full w-full rounded-[16777200px] bg-[#EEEDFC]">
              <Image src={UserIcon} alt="UserIcon" />
            </div>
            <div className="absolute bottom-0 right-0 w-3.75 h-3.75 border-2 border-grayscale-50 bg-warning rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavbarComp;
