import { BannerData, bannerData } from "@/staticData/bannerData";
import Image from "next/image";
import CTA_Button from "./CTA_Button";

function Banner({ Data }: { Data: BannerData }) {
  return (
    <div className=" w-full h-full flex relative p-12 gap-3 overflow-hidden  rounded-[30px]">
      <Image
        loading="eager"
        src={Data.img}
        alt="Banner"
        fill
        className="object-cover"
      />

      <div className="absolute flex flex-col justify-start items-start w-367.5 h-32  gap-10 text-white">
        <div className="gap-3 flex w-full flex-col">
          <h1 className="text-display w-367.5 h-14.5 ">{Data.title}</h1>
          {Data.info && (
            <p className="text-body-xl-light  w-304.5 h-14.5 ">{Data.info}</p>
          )}
        </div>
        <CTA_Button
          type="button"
          className="h-16 text-button-md"
          title={Data.buttonText}
        />
      </div>
    </div>
  );
}

export default Banner;
