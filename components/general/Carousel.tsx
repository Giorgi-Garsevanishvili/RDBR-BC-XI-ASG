"use client";

import arrowLeftActive from "../../public/arrow-left-active.svg";
import arrowRightActive from "../../public/arrow-right-active.svg";

import arrowLeftDisabled from "../../public/arrow-left-disabled.svg";
import arrowRightDisabled from "../../public/arrow-right-disabled.svg";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";
import Image from "next/image";
import { useState } from "react";

type CarouselProps = {
  slides: React.ReactNode[];
  className?: string;
};

export default function Carousel({ slides, className }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className={className}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        spaceBetween={0}
        slidesPerView={1}
        speed={500}
        loop={true}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-full h-105 flex items-center justify-center rounded-[30px] overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            {slide}
          </SwiperSlide>
        ))}

        <div className="absolute grid grid-cols-[132px_1206px_132px] content-center grid-rows-1 left-12 w-367.5  top-77.75  items-center z-10">
          {/* Pagination (centered) */}
          <div></div>
          <div className="swiper-pagination"></div>

          {/* Arrows (right) */}
          <div className="flex  justify-end gap-6">
            <div className="swiper-button-prev-custom cursor-pointer">
              <Image
                alt="arrow-left"
                src={activeIndex === 0 ? arrowLeftDisabled : arrowLeftActive}
              />
            </div>

            <div className="swiper-button-next-custom cursor-pointer">
              <Image
                alt="arrow-right"
                src={
                  activeIndex === slides.length - 1
                    ? arrowRightDisabled
                    : arrowRightActive
                }
              />
            </div>
          </div>
        </div>
      </Swiper>
    </div>
  );
}
