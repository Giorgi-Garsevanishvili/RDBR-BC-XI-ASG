import { StaticImageData } from "next/image";
import bannerImage1 from "../public/banner-1.png";
import bannerImage2 from "../public/banner-2.png";
import bannerImage3 from "../public/banner-3.png";

export type BannerData = {
  title: string;
  info?: string;
  buttonText: string;
  img: StaticImageData | string;
};

export const bannerData: BannerData[] = [
  {
    title: "Start learning something new today",
    info: "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
    buttonText: "Browse Courses",
    img: bannerImage1,
  },
  {
    title: "Pick up where you left off",
    info: "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
    buttonText: "Start Learning",
    img: bannerImage2,
  },
  {
    title: "Learn together, grow faster",
    buttonText: "Learn More",
    img: bannerImage3,
  },
];
