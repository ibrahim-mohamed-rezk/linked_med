"use client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setVisible(true);
    }, 10400);

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 110000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);
  console.log(visible);
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <div className="h-screen relative overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://storage.googleapis.com/otherprojects1323/hero.mp4"
        autoPlay
        loop
        muted
      />
      <div className="container h-full !mx-auto z-10 relative">
        {visible && (
          <div
            className={`text-white px-[20px] md:px-0 text-[clamp(30px,4.27083vw,82px)] font-bold w-full h-full flex items-center ${
              locale === "ar" ? "justify-end" : "justify-start"
            } text-left font-['Satoshi Variable']`}
          >
            {t("hero.title")}
            <br />
            {t("hero.subtitle")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
