"use client";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="h-screen relative overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
      />
      <div className="container h-full !mx-auto z-10 relative">
        <div className="text-white text-[82px] font-bold w-full h-full flex items-center justify-start font-['Satoshi Variable']">
          {t("hero.title")}
          <br />
          {t("hero.subtitle")}
          {/* <br /> */}
          {/* {t("hero.description")} */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
