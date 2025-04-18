import { useTranslations } from "next-intl";

const About = ({ data }: { data: { web: string; mobile: string } }) => {
  const t = useTranslations("HomePage");
  return (
    <div className="w-full">
      <div className="front-full front-full-story featured1">
        <video src={data.mobile} className="md:hidden" autoPlay loop muted />
        <video src={data.web} className="hidden md:block" autoPlay loop muted />

        <div className="front-full-inner max-w-[1920px] mx-auto w-full px-[12vw]">
          <div className="font-full-inner-content front-story w-full">
            <h3 className="text-[clamp(25px,3.125vw,60px)] font-bold leading-snug text-white">
              {t("about_us")}
            </h3>
            <div className="front-excerpt mt-[20px] flex items-start justify-center gap-[15px] flex-col text-white w-full">
              <p className="text-[clamp(14px,1.25vw,24px)] font-semibold leading-relaxed">
                {t("about_p1")}
              </p>
              <p className="text-[clamp(14px,1.25vw,24px)] font-semibold leading-relaxed">
                {t("about_p2")}
              </p>
              <p className="text-[clamp(14px,1.25vw,24px)] font-semibold leading-relaxed">
                {t("about_p3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
