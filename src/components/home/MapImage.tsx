import { useTranslations } from "next-intl";

const MapImage = () => {
  const t = useTranslations("HomePage.mapImage");
  return (
    <div className="w-full bg-black">
      <div className="front-full front-full-story featured1">
        <img src="/images/map.gif" alt="" />

        <div className="front-full-inner max-w-[1920px] mx-auto w-full px-[12vw]">
          <div className="font-full-inner-content front-story w-full">
            <h3 className="text-6xl font-bold leading-snug text-white">
              {t("carrer")}
            </h3>
            <div className="front-excerpt mt-[20px] flex items-start justify-center gap-[15px] flex-col text-white w-full">
              <p className="text-2xl font-semibold leading-relaxed">
                {t("welcomePound")}
              </p>
              <a
                href="mailto:hany@linkedmed.org"
                target="_blank"
                className="text-2xl font-semibold leading-relaxed"
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
