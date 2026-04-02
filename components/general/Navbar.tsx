import Image from "next/image";
import Logo from "../../public/Logo.svg";
import NavSpark from "../../public/NavIconSparkles.svg";
import UserIcon from "../../public/User.svg";

import NavIconSparkles from "../ui/NavIconSparkles";
import NavIconBook from "../ui/NavIconBook";
import NavIconLogo from "../ui/NavIconLogo";

function NavbarComp() {
  return (
    <nav className="flex fixed  w-[1920px] gap-[10px] bg-grayscale-100 border-b border-grayscale-200 px-[177px] py-[24px] shadow-[0px_0px_11.7px_0px_#0000000A]">
      <div className="flex w-full h-[60px] justify-between items-center">
        <NavIconLogo />
        <div className=" h-[56px] gap-[36px] flex">
          <div className="flex text-grayscale-600  gap-[8px]">
            <div className="flex rounded-[8px] p-[15px] gap-[8px]">
              <div className="flex cursor-pointer transition-all ease-out duration-[600ms] stroke-grayscale-600 hover:text-[#4F46E5] hover:stroke-[#4F46E5] items-center justify-center gap-[8px]">
                <NavIconSparkles />
                <p className="flex items-center text-body-lg w-[156px] h-[24px]">
                  Browse Courses
                </p>
              </div>
            </div>
            <div className="flex  rounded-[8px] p-[15px] gap-[8px]">
              <div className="flex cursor-pointer transition-all ease-out duration-[600ms] stroke-grayscale-600 hover:text-[#4F46E5] hover:stroke-[#4F46E5] items-center justify-center  gap-[8px]">
                <NavIconBook />
                <p className="flex items-center text-body-lg text w-[163px] h-[24px]">
                  Enrolled Courses
                </p>
              </div>
            </div>
          </div>
          <div className=" w-[56px] h-[56px] relative">
            <div className="flex cursor-pointer transition-colors ease-out duration-[300ms] relative hover:border-[#B7B3F4]  border-[1.5]  border-solid  border-transparent  items-center justify-center h-full w-full rounded-[16777200px] bg-[#EEEDFC]">
              <Image src={UserIcon} alt="UserIcon" />
            </div>
            <div className="absolute bottom-0 right-0 w-[15px] h-[15px] border-[2px] border-grayscale-50 bg-warning rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComp;
