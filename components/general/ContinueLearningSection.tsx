"use client";
import Link from "next/link";
import React from "react";
import CourseCardProgress from "./CourseCardProgress";
import { useAuth } from "@/context/AuthContext";
import LockComponent from "./LockComponent";

function ContinueLearningSection() {
  const { loggedIn } = useAuth();
  return (
    <section className="h-92.25 w-full flex flex-col gap-8">
      <div className="flex flex-col w-full pl-px gap-2.5">
        <div className="flex relative w-full">
          <div className="flex grow flex-col gap-1.5">
            <h1 className=" text-grayscale-950  w-full h-12 text-h1">
              Continue Learning
            </h1>
            <div className="w-full pl-0.5 gap-2.5">
              <h4 className="text-body-md w-374.5 h-5.5  text-grayscale-700">
                Pick up where you left
              </h4>
            </div>
          </div>
          <div className="content-end items-end flex grow text-[#4F46E5] text-underlined-md ">
            <Link className="w-[66px] h-[24px]" href="/">
              See All
            </Link>
          </div>
        </div>
      </div>
        <div className="flex w-full gap-6">
          {loggedIn ? (
            <CourseCardProgress locked={false} />
          ) : (
            <div className="flex w-full gap-6 relative">
              <CourseCardProgress locked />
              <CourseCardProgress locked />
              <CourseCardProgress locked />
              <div className="absolute flex justify-center inset-0">
                <LockComponent />
              </div>
            </div>
          )}
        </div>
    </section>
  );
}

export default ContinueLearningSection;
