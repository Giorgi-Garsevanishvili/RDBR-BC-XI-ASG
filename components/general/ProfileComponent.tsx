import Image from "next/image";
import UserIcon from "../../public/User.svg";

function ProfileComponent() {
  return (
    <div className=" w-14 h-14 relative">
      <div className="flex cursor-pointer transition-colors ease-out duration-300 relative hover:border-[#B7B3F4]  border-[1.5]  border-solid  border-transparent  items-center justify-center h-full w-full rounded-[16777200px] bg-[#EEEDFC]">
        <Image src={UserIcon} alt="UserIcon" />
      </div>
      <div className="absolute bottom-0 right-0 w-3.75 h-3.75 border-2 border-grayscale-50 bg-warning rounded-full"></div>
    </div>
  );
}

export default ProfileComponent;
