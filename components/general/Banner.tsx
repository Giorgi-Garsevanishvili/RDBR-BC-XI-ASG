import { BannerData, bannerData } from "@/staticData/bannerData";
import Image from "next/image";

function Banner({ Data }: { Data: BannerData }) {
  return (
    <div className=" w-full h-full relative p-12 gap-3 overflow-hidden  rounded-[30px]">
      <Image
        loading="eager"
        src={Data.img}
        alt="Banner"
        fill
        className="object-cover"
      />

      <div className="absolute flex h-58 w-full flex-col justify-center gap-10 text-white">
        <div className="gap-3 flex items-start w-[1470px] h-full justify-start flex-col">
          <h1 className="text-display top-0 font-bold">{Data.title}</h1>
          {Data.info && <p className="text-body-xl-light">{Data.info}</p>}
        </div>
        <button className="bg-indigo-600 text-button-md px-6 py-3 rounded-lg w-fit">
          {Data.buttonText}
        </button>
      </div>
    </div>
  );
}

export default Banner;
