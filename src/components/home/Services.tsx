"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Service {
  id: number;
  title: "string";
}

const Services = ({
  data,
  servicesHomeCountry,
  servicesAbroad,
}: {
  data: { web: string; mobile: string };
  servicesHomeCountry: Service[];
  servicesAbroad: Service[];
}) => {
  const [isMobile, setIsMobile] = useState(true);
  const t = useTranslations("HomePage");

  // const medicalProfessionalServices = [
  //   { service: "Document preparation" },
  //   { service: "German language training" },
  //   { service: "Visa coordination" },
  //   { service: "Job placement and post-arrival onboarding" },
  // ];

  // Services for employers & healthcare institutions
  // const employerServices = [
  //   { service: "Rigorous document verification" },
  //   { service: "Personalized recruitment strategies" },
  //   { service: "Linguistically trained professionals" },
  //   { service: "Culturally ready integration" },
  // ];

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
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
    <div className="w-full">
      <div
        className="front-full front-full-story featured1 w-full relative"
        style={{ height: "100vh" }}
      >
        {isMobile ? (
          <video
            src={data.mobile}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ position: "absolute", zIndex: 0 }}
          />
        ) : (
          <video
            src={data.web}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ position: "absolute", zIndex: 0 }}
          />
        )}
        <div className="front-full-inner absolute inset-0 z-10 flex flex-col items-center justify-center w-full max-w-[1920px] mx-auto ">
          <div className="font-full-inner-content front-story mt-[20px] w-full ">
            <h3 className="text-[clamp(42px,4.27083vw,82px)] w-full text-center font-bold leading-snug text-white">
              {t("our_services")}
            </h3>
            <div className="flex px-[clamp(5px,1.56vw,20px)] gap-[clamp(20px,4vw,80px)] md:gap-[clamp(40px,6vw,120px)] md:px-0 flex-col md:flex-row w-full mt-[clamp(15px,4vw,100px)] items-center justify-center">
              <div className="w-full md:max-w-[clamp(280px,42vw,671px)] group h-[350px] md:h-fit py-[clamp(12px,3vw,30px)] md:py-0 md:h-[clamp(320px,35vw,582px)] relative bg-white/10 rounded-[clamp(8px,1.5vw,30px)] flex-col justify-center md:justify-start items-center md:items-start inline-flex overflow-hidden">
                <div className="w-full text-center items-center justify-center text-white text-[clamp(38px,3.3vw,79px)] font-bold ">
                  {t("in")}
                </div>

                <ul className="w-full list-none md:translate-x-[-100%] flex flex-col items-center text-center justify-center group-hover:translate-x-0 transition-all duration-300 h-fit md:h-[clamp(250px,28vw,451px)] rounded-[clamp(12px,1.8vw,33px)] pl-[clamp(8px,1vw,20px)] md:pl-[clamp(8px,1vw,20px)] pl-0">
                  {servicesHomeCountry?.map(
                    (service: { title: string; id: number }) => (
                      <li
                        key={service.id}
                        className="text-[clamp(16px,4vw,30px)] text-white font-semibold leading-relaxed"
                      >
                        {service.title}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div
                className="rotate-90 md:rotate-0 flex items-center justify-center"
                data-svg-wrapper
              >
                <svg
                  className="w-[clamp(25px,1.5vw,60px)] md:w-[clamp(4px,0.56vw,8px)] h-[clamp(4px,0.56vw,8px)] md:h-[clamp(250px,32vw,533px)]"
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
              <div className="w-full md:max-w-[clamp(280px,42vw,671px)] group h-[350px] md:h-fit py-[clamp(12px,3vw,30px)] md:py-0 md:h-[clamp(320px,35vw,582px)] relative bg-white/10 rounded-[clamp(8px,1.5vw,30px)] flex-col justify-center md:justify-start items-center md:items-start inline-flex overflow-hidden">
                <div className="w-full text-center text-white text-[clamp(38px,3.3vw,79px)] font-bold font-['Satoshi Variable']">
                  {t("out")}
                  <ul className="w-full list-none md:translate-x-[-100%] flex flex-col items-center justify-center group-hover:translate-x-0 transition-all duration-300 h-fit md:h-[clamp(250px,28vw,451px)] rounded-[clamp(12px,1.8vw,33px)] pl-[clamp(8px,1vw,20px)] md:pl-[clamp(8px,1vw,20px)] pl-0">
                    {servicesAbroad?.map(
                      (service: { title: string; id: number }) => (
                        <li
                          key={service.id}
                          className="text-[clamp(16px,4vw,30px)] text-white font-semibold leading-relaxed"
                        >
                          {service.title}
                        </li>
                      )
                    )}
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
