"use client";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";

type CarouselProps = {
  slides: React.ReactNode[];
  className?: string;
};

export default function Carousel({ slides, className }: CarouselProps) {
  return (
    <div className={className}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={false}
        pagination={{
          clickable: true,
           // custom type requires renderCustom
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
