"use client";
import Image from "next/image";
import UserIcon from "../../public/User.svg";
import { useAuth } from "@/context/AuthContext";

function ProfileComponent({
  profileComplete,
}: {
  profileComplete: boolean | undefined;
}) {
  const { user } = useAuth();
  return (
    <div className=" w-14 h-14 relative">
      <div className="flex cursor-pointer transition-colors ease-out duration-300 relative hover:border-[#B7B3F4]  border-[1.5]  border-solid  border-transparent shrink-0 items-center justify-center h-full w-full rounded-[16777200px] bg-[#EEEDFC]">
        {user?.avatar ? (
          <Image
            src={user?.avatar ? user.avatar : UserIcon}
            alt="preview"
            width={56}
            height={56}
            className="object-cover rounded-[40px] "
          />
        ) : (
          <Image
            src={user?.avatar ? user.avatar : UserIcon}
            alt="preview"
            className="object-cover rounded-[40px] "
          />
        )}
      </div>
      <div
        className={`absolute bottom-0 right-0 w-3.75 h-3.75 border-2 border-grayscale-50 ${profileComplete ? "bg-success" : profileComplete === undefined ? "bg-error" : !profileComplete ? "bg-warning" : "bg-error"} rounded-full`}
      ></div>
    </div>
  );
}

export default ProfileComponent;
