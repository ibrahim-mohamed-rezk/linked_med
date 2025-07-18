"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
const MapImage = () => {
  const t = useTranslations("HomePage.mapImage");
  return (
    <div className="w-full bg-black py-8 md:py-12">
      <div className="front-full front-full-story featured1 px-4">
        <Image
          src="/images/map.gif"
          alt="Global map"
          className="w-full md:w-[80%] mx-auto object-contain max-h-[400px] md:max-h-none"
          width={800}
          height={400}
        />

        <div className="front-full-inner max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-[8vw] lg:px-[12vw] mt-8">
          <div className="font-full-inner-content front-story w-full">
            <h3 className="text-2xl flex text-end sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight md:leading-snug text-white md:text-left font-en">
              {t("carrer")}
            </h3>
            <div className="front-excerpt mt-4 md:mt-6 flex items-center md:items-start justify-center md:justify-start gap-3 sm:gap-4 flex-col text-white w-full">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed text-center md:text-left font-en">
                {t("welcomePound")}
              </p>
              <a
                href="mailto:hany@linkedmed.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed hover:underline text-center md:text-left inline-block font-en"
              >
                {t("makeForgs")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapImage;
