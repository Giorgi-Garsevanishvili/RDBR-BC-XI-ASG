"use client";
import Image from "next/image";
import NavIconLogo from "../ui/NavIconLogo";
import FacebookIcon from "../../public/Facebook.svg";
import TwitterIcon from "../../public/Twitter.svg";
import InstagramIcon from "../../public/Instagram.svg";
import LinkedinIcon from "../../public/LinkedIn.svg";
import YoutubeIcon from "../../public/YouTube.svg";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import SignUpForm from "./SignUpForm";
import LogIn from "./LogInForm";

function Footer() {
  const { loggedIn } = useAuth();
  const { openModal } = useModal();
  return (
    <footer className="w-full  border-t flex justify-center items-center flex-col border-grayscale-200">
      <div className=" w-391.5  border-t border-[#F5F5F5]" />
      <div className="pb-5 pt-20 gap-18.5 w-391.5 flex flex-col">
        <div className="flex justify-between">
          <div className="gap-6 flex flex-col  w-77.5">
            <div className="flex flex-col gap-4">
              <div className="gap-3 flex items-center">
                <NavIconLogo position="footer" />
                <h3 className="text-body-xl leading-7.25 text-[#130E67]">
                  Bootcamp
                </h3>
              </div>
              <div className="text-body-xs leading-4.25  text-[#130E67] ">
                Your learning journey starts here!
                <br />
                Browse courses to get started.
              </div>
            </div>
            <div className="flex items-center gap-5.5 w-44.25 h-4.75">
              <Image src={FacebookIcon} alt="FacebookIcon" />
              <Image src={TwitterIcon} alt="TwitterIcon" />
              <Image src={InstagramIcon} alt="InstagramIcon" />
              <Image src={LinkedinIcon} alt="LinkedinIcon" />
              <Image src={YoutubeIcon} alt="YoutubeIcon" />
            </div>
          </div>
          <div className="flex justify-between w-175">
            <div className="gap-4 flex justify-between h-fit flex-col">
              <h4 className="text-[#130E67] leading-6 w-18.25 h-6 text-h4 ">
                Explore
              </h4>
              <ul className="flex gap-2 flex-col">
                {loggedIn && (
                  <li className="text-body-md-regular leading-6 gap-1.5 h-fit w-fit text-grayscale-500">
                    Enrolled Courses
                  </li>
                )}
                <li className="text-body-md-regular leading-6 gap-1.5 h-fit w-fit  text-grayscale-500">
                  Browse Courses
                </li>
              </ul>
            </div>
            <div className="gap-4 flex h-fit flex-col">
              <h4 className="text-[#130E67]  text-h4 w-fit">Account</h4>
              {loggedIn ? (
                <ul className="flex flex-col">
                  <li
                    onClick={() => openModal(<SignUpForm />)}
                    className="text-body-md-regular cursor-pointer leading-6  text-grayscale-500"
                  >
                    My Account
                  </li>
                </ul>
              ) : (
                <ul className="flex gap-2 flex-col">
                  <li
                    onClick={() => openModal(<SignUpForm />)}
                    className="text-body-md-regular cursor-pointer leading-6 text-grayscale-500"
                  >
                    Sign Up
                  </li>
                  <li
                    onClick={() => openModal(<LogIn />)}
                    className="text-body-md-regular cursor-pointer leading-6  text-grayscale-500"
                  >
                    Log In
                  </li>
                </ul>
              )}
            </div>
            <div className="gap-4 flex h-fit flex-col">
              <h4 className="text-[#130E67] leading-6  text-h4 w-fit">
                Contact
              </h4>
              <ul className="flex flex-col justify-center gap-2.5 items-start">
                <li className="text-body-md-regular leading-5.5 flex justify-center gap-x-1.5 items-center text-grayscale-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V5.25C21.75 5.05109 21.671 4.86032 21.5303 4.71967C21.3897 4.57902 21.1989 4.5 21 4.5ZM19.0716 6L12 12.4828L4.92844 6H19.0716ZM20.25 18H3.75V6.95531L11.4928 14.0531C11.6312 14.1801 11.8122 14.2506 12 14.2506C12.1878 14.2506 12.3688 14.1801 12.5072 14.0531L20.25 6.95531V18Z"
                      fill="#666666"
                    />
                  </svg>
                  contact@company.com
                </li>
                <li className="text-body-md-regular leading-5.5 flex justify-center gap-x-1.5 items-center text-grayscale-500">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1099 13.6175L15.0614 11.8033L15.0502 11.7982C14.8401 11.7083 14.6108 11.6722 14.3832 11.6932C14.1555 11.7142 13.9367 11.7917 13.7466 11.9185C13.7242 11.9333 13.7027 11.9494 13.6821 11.9666L11.5904 13.7498C10.2652 13.1062 8.89712 11.7483 8.25345 10.4404L10.0392 8.31686C10.0564 8.29537 10.0727 8.27389 10.0882 8.25069C10.2123 8.06102 10.2876 7.84362 10.3074 7.61782C10.3272 7.39202 10.2909 7.16483 10.2016 6.95647V6.94615L8.38235 2.89076C8.26439 2.61857 8.06157 2.39182 7.80415 2.24437C7.54674 2.09693 7.24854 2.03668 6.95407 2.07264C5.78959 2.22587 4.72071 2.79775 3.94706 3.68147C3.17341 4.56519 2.7479 5.70031 2.75001 6.87483C2.75001 13.6983 8.30157 19.2498 15.125 19.2498C16.2995 19.2519 17.4346 18.8264 18.3184 18.0528C19.2021 17.2791 19.774 16.2102 19.9272 15.0458C19.9632 14.7514 19.9031 14.4533 19.7558 14.1959C19.6085 13.9385 19.382 13.7356 19.1099 13.6175ZM15.125 17.8748C12.2086 17.8716 9.41256 16.7117 7.35035 14.6495C5.28814 12.5873 4.12819 9.79123 4.12501 6.87483C4.12177 6.03564 4.42411 5.22396 4.97556 4.59139C5.52701 3.95881 6.28986 3.54859 7.12165 3.43733C7.12131 3.44076 7.12131 3.44421 7.12165 3.44764L8.92634 7.4867L7.15001 9.61279C7.13198 9.63354 7.1156 9.65567 7.10102 9.67897C6.9717 9.87741 6.89583 10.1059 6.88078 10.3423C6.86572 10.5787 6.91199 10.8149 7.01509 11.0282C7.79368 12.6206 9.39813 14.213 11.0077 14.9908C11.2226 15.0929 11.4602 15.1376 11.6974 15.1204C11.9347 15.1032 12.1634 15.0248 12.3613 14.8928C12.3833 14.8779 12.4046 14.8619 12.4249 14.8447L14.514 13.0623L18.5531 14.8713C18.5531 14.8713 18.5599 14.8713 18.5625 14.8713C18.4526 15.7043 18.043 16.4687 17.4103 17.0215C16.7776 17.5743 15.9652 17.8777 15.125 17.8748Z"
                      fill="#666666"
                    />
                  </svg>
                  (+995) 555 111 222
                </li>
                <li className="text-body-md-regular leading-5.5 flex justify-center gap-x-1.5 items-center text-grayscale-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6C11.2583 6 10.5333 6.21993 9.91661 6.63199C9.29993 7.04404 8.81928 7.62971 8.53545 8.31494C8.25162 9.00016 8.17736 9.75416 8.32205 10.4816C8.46675 11.209 8.8239 11.8772 9.34835 12.4017C9.8728 12.9261 10.541 13.2833 11.2684 13.4279C11.9958 13.5726 12.7498 13.4984 13.4351 13.2145C14.1203 12.9307 14.706 12.4501 15.118 11.8334C15.5301 11.2167 15.75 10.4917 15.75 9.75C15.75 8.75544 15.3549 7.80161 14.6517 7.09835C13.9484 6.39509 12.9946 6 12 6ZM12 12C11.555 12 11.12 11.868 10.75 11.6208C10.38 11.3736 10.0916 11.0222 9.92127 10.611C9.75097 10.1999 9.70642 9.7475 9.79323 9.31105C9.88005 8.87459 10.0943 8.47368 10.409 8.15901C10.7237 7.84434 11.1246 7.63005 11.561 7.54323C11.9975 7.45642 12.4499 7.50097 12.861 7.67127C13.2722 7.84157 13.6236 8.12996 13.8708 8.49997C14.118 8.86998 14.25 9.30499 14.25 9.75C14.25 10.3467 14.0129 10.919 13.591 11.341C13.169 11.7629 12.5967 12 12 12ZM12 1.5C9.81273 1.50248 7.71575 2.37247 6.16911 3.91911C4.62247 5.46575 3.75248 7.56273 3.75 9.75C3.75 12.6938 5.11031 15.8138 7.6875 18.7734C8.84552 20.1108 10.1489 21.3151 11.5734 22.3641C11.6995 22.4524 11.8498 22.4998 12.0037 22.4998C12.1577 22.4998 12.308 22.4524 12.4341 22.3641C13.856 21.3147 15.1568 20.1104 16.3125 18.7734C18.8859 15.8138 20.25 12.6938 20.25 9.75C20.2475 7.56273 19.3775 5.46575 17.8309 3.91911C16.2843 2.37247 14.1873 1.50248 12 1.5ZM12 20.8125C10.4503 19.5938 5.25 15.1172 5.25 9.75C5.25 7.95979 5.96116 6.2429 7.22703 4.97703C8.4929 3.71116 10.2098 3 12 3C13.7902 3 15.5071 3.71116 16.773 4.97703C18.0388 6.2429 18.75 7.95979 18.75 9.75C18.75 15.1153 13.5497 19.5938 12 20.8125Z"
                      fill="#525252"
                    />
                  </svg>
                  Aghmashenebeli St.115
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between h-5.5 text-body-md-regular text-[#666]">
          <p className="flex grow items-center justify-start">
            Copyright © 2026 Redberry International
          </p>
          <p className="flex grow items-center justify-end">
            {" "}
            All Rights Reserved <span className="mx-1.25">|</span>
            <span className="text-[#4F46E5]">Terms and Conditions</span>{" "}
            <span className="mx-1.25">|</span>
            <span className="text-[#4F46E5]">Privacy Policy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
