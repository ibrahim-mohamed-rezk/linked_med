import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("HomePage");
  const outServices = [
    { service: t("out_services.service1") },
    { service: t("out_services.service2") },
    { service: t("out_services.service3") },
    { service: t("out_services.service4") },
  ];
  const inServices = [
    { service: t("in_services.service1") },
    { service: t("in_services.service2") },
    { service: t("in_services.service3") },
    { service: t("in_services.service4") },
  ];
  return (
    <div className="w-full">
      <div className="front-full front-full-story featured1 w-full">
        <video src="/videos/services.mp4" autoPlay loop muted />

        <div className="front-full-inner w-full max-w-[1920px] mx-auto">
          <div className="font-full-inner-content front-story w-full">
            <h3 className="text-6xl w-full text-center font-bold leading-snug text-white">
              {t("our_services")}
            </h3>
            <div className="flex w-full mt-[100px] items-center justify-between">
              <div className="w-[671px] group h-[582px] relative bg-white/10 rounded-[30px] flex-col justify-start items-start inline-flex overflow-hidden">
                <div className="w-[671px] text-center text-white text-[82px] font-bold font-['Satoshi Variable']">
                  {t("in")}
                </div>
                <ul className="w-[671px] list-none translate-x-[-100%] flex flex-col items-start justify-center group-hover:translate-x-0 transition-all duration-300 h-[451px] rounded-[33px] pl-5">
                  {inServices?.map((service: { service: string }) => (
                    <li
                      key={service.service}
                      className="text-[30px] font-semibold leading-relaxed"
                    >
                      {service.service}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-svg-wrapper>
                <svg
                  width="8"
                  height="533"
                  viewBox="0 0 8 533"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4L4.00002 529"
                    stroke="url(#paint0_linear_122_409)"
                    stroke-width="7"
                    stroke-linecap="round"
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
                      <stop stop-color="#999999" stop-opacity="0" />
                      <stop offset="0.515" stop-color="white" />
                      <stop offset="1" stop-color="#999999" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="w-[671px] group h-[582px] relative bg-white/10 rounded-[30px] flex-col justify-start items-start inline-flex overflow-hidden">
                <div className="w-[671px] text-center text-white text-[82px] font-bold font-['Satoshi Variable']">
                  {t("out")}
                  <ul className="w-[671px] list-none translate-x-[100%] flex flex-col items-start justify-center group-hover:translate-x-0 transition-all duration-300 h-[451px] rounded-[33px] pl-5">
                    {outServices?.map((service: { service: string }) => (
                      <li
                        key={service.service}
                        className="text-[40px] font-semibold leading-relaxed"
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
