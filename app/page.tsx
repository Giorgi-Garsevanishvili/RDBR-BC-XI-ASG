import Banner from "@/components/general/Banner";
import Carousel from "@/components/general/Carousel";
import { bannerData } from "@/staticData/bannerData";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Carousel
        className="w-[1566px] h-[420px] rounded-[30px] overflow-hidden"
        slides={bannerData.map((item, index) => (
          <Banner key={index} Data={item} />
        ))}
      />
    </div>
  );
}