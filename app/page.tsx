"use client";
import Banner from "@/components/general/Banner";
import Carousel from "@/components/general/Carousel";
import ContinueLearningSection from "@/components/general/ContinueLearningSection";
import FeaturedCoursesSection from "@/components/general/FeaturedCoursesSection";
import { useAuth } from "@/context/AuthContext";
import { bannerData } from "@/staticData/bannerData";

export default function Home() {
  const { loggedIn } = useAuth();
  return (
    <div className="flex flex-col gap-16 overflow-y-hidden justify-center">
      <Carousel
        className="w-391.5 h-105 flex relative rounded-[30px] overflow-hidden"
        slides={bannerData.map((item, index) => (
          <Banner key={index} Data={item} />
        ))}
      />
      {loggedIn ? (
        <>
          <ContinueLearningSection />
          <FeaturedCoursesSection />
        </>
      ) : (
        <>
          <FeaturedCoursesSection />
          <ContinueLearningSection />
        </>
      )}
    </div>
  );
}
