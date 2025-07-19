"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
// { data }: { data: { web: string; mobile: string } }
const Services = () => {
// const [isMobile, setIsMobile] = useState(true);
  const t = useTranslations("HomePage");

  const outServices = [
    { service: t("At LinkedMed") },
  ];
  const inServices = [
    { service: t("LinkedMed is") },
  ];

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      // setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return ( 
    <div id="why-linkedmed" className="w-full">
      <div className="  w-full">
        {/* {isMobile ? (
          <video src={data.mobile} autoPlay loop muted />
        ) : (
          <video src={data.web} autoPlay loop muted />
        )} */}

        <div className="front-full-inner w-full max-w-[1920px] px-6 mx-auto">
          <div className="font-full-inner-content front-story w-full">
            <h3 className="text-[clamp(32px,4.27083vw,72px)] w-full text-center font-bold leading-snug text-white">
              {t("Why LinkedMed")}
            </h3>
            <div className="flex     flex-col md:flex-row w-full mt-[30px] md:mt-[100px] items-center justify-around">
              <div className="w-full max-w-[671px] px-6 text-justify group h-fit py-[20px] md:py-[30px] relative bg-white/10 rounded-[clamp(15px,1.5625vw,30px)] flex-col justify-start items-start inline-flex overflow-hidden">
                <div className="w-full max-w-[671px] text-center text-white text-[clamp(15px,2vw,60px)] font-bold font-['Satoshi Variable'] pb-4">
                  {t("For Medical Professionals")}
                </div>

                <ul className="w-full max-w-[671px] list-none flex flex-col items-center justify-center translate-x-0 transition-all duration-300 h-fit rounded-[33px] pl-5">
                  {inServices?.map((service: { service: string }) => (
                    <li
                      key={service.service}
                      className="text-[clamp(12px,1.2vw,24px)] text-white font-semibold leading-relaxed"
                    >
                      {service.service}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rotate-90 md:rotate-0 flex items-center justify-center"
                data-svg-wrapper
              >
                <svg
                  className="w-full md:w-[8px] h-[8px] md:h-[533px] "
                  viewBox="0 0 8 533"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4L4.00002 529"
                    stroke="url(#paint0_linear_122_409)"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_122_409"
                      x1="3.5"
                      y1="4"
                      x2="3.50002"
                      y2="529"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#999999" stopOpacity="0" />
                      <stop offset="0.515" stopColor="white" />
                      <stop offset="1" stopColor="#999999" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="w-full max-w-[671px] px-6  group h-fit py-[20px] md:py-[30px] relative bg-white/10 rounded-[clamp(15px,1.5625vw,30px)] flex-col justify-start items-start inline-flex overflow-hidden">
                <div className="w-full max-w-[671px]  text-center text-white text-[clamp(15px,2vw,30px)] font-bold font-['Satoshi Variable']">
                  <div className="pb-4">
                  {t("For Employers & Healthcare Institutions")}
                  </div>
                  <ul className="w-full max-w-[671px]  text-justify list-none  flex flex-col items-center justify-center translate-x-0 transition-all duration-300 h-fit rounded-[33px] pl-5">
                    {outServices?.map((service: { service: string }) => (
                      <li
                        key={service.service}
                        className="text-[clamp(12px,1.2vw,24px)] text-white font-semibold leading-relaxed"
                      >
                        {service.service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;