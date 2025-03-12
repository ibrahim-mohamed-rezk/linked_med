import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-white border border-[#f6f6f6] overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1900px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
          <div className="col-span-1 ">
            <div className="flex flex-col space-y-8">
              <div className="text-black text-3xl sm:text-4xl font-bold">
                <img
                  className="w-[130px] h-[53px]"
                  src="/images/logo.svg"
                  alt="logo"
                />
              </div>
              <p className="text-[#121127]/60 text-base sm:text-lg font-bold leading-relaxed">
                {t("missionStatement")}
              </p>
              <div className="flex space-x-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Facebook icon */}
                </svg>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Twitter icon */}
                </svg>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Instagram icon */}
                </svg>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* GitHub icon */}
                </svg>
              </div>
            </div>
          </div>
          <div>
            <ul className="space-y-2">
              {["home", "ourStory", "ourValues", "contactUs"].map((item) => (
                <li key={item} className="text-[#111127] text-base font-bold">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {[
                "services",
                "makingTheMove",
                "seamlessProcessing",
                "tracking",
                "referAFriend",
                "eLearning",
              ].map((item) => (
                <li key={item} className="text-[#111127] text-base font-bold">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {["whyLinkedmed", "Partners"].map((item) => (
                <li key={item} className="text-[#111127] text-base font-bold">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {["messageFromCeo", "blogs/Events", "Testimonials", "workWithUs"].map((item) => (
                <li key={item} className="text-[#111127] text-base font-bold">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {["privacyPolicy", "termsAndConditions"].map((item) => (
                <li key={item} className="text-[#111127] text-base font-bold">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#121127]/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#121127]/60 text-sm mb-4 md:mb-0">
              © 2020 Dlex, Inc. {t("rightsReserved")}
            </div>
            <div className="flex space-x-6">
              {["Claim", "Privacy", "Terms"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[#111127] text-sm font-bold"
                >
                  {t(item)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
