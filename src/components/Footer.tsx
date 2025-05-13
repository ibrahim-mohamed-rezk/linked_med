"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Footer = () => {
  const router = useRouter();
  const t = useTranslations("footer");
  const goToTestimonials = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      const el = document.getElementById("testimonials");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // navigate to home + hash
      router.push("/#testimonials");
    }
  };

  return (
    <footer className="w-full bg-white border border-[#f6f6f6] overflow-hidden py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-[1900px] mx-auto">
        <div className="flex w-full flex-col md:flex-row items-start justify-between gap-8">
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <div className="flex flex-col space-y-6">
              <Link
                href="/"
                className="text-black text-3xl sm:text-4xl font-bold"
              >
                <Image
                  className="w-[130px] h-[53px]"
                  src="/images/logo.svg"
                  alt="logo"
                  width={130}
                  height={53}
                />
              </Link>
              <p className="text-[#121127]/60 text-base sm:text-lg font-bold leading-relaxed max-w-md">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full md:w-auto">
            <div className="mb-4 sm:mb-0">
              <ul className="space-y-3">
                {[
                  { label: "home", url: "/" },
                  { label: "ourStory", url: "/our-story" },
                  { label: "ourValues", url: "/our-values" },
                  { label: "contactUs", url: "/contact-us" },
                  { label: "about", url: "/about" },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="text-[#111127] cursor-pointer text-sm sm:text-base font-bold"
                  >
                    <Link href={item.url}>{t(item.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 sm:mb-0">
              <ul className="space-y-3">
                {[
                  { label: "services", url: "/services" },
                  { label: "makingTheMove", url: "/make-move" },
                  { label: "seamlessProcessing", url: "/seamless-processing" },
                  { label: "tracking", url: "/tracking" },
                  { label: "referAFriend", url: "/refer-a-friend" },
                  { label: "eLearning", url: "/e-learning" },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="text-[#111127] cursor-pointer text-sm sm:text-base font-bold"
                  >
                    <Link href={item.url}>{t(item.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 sm:mb-0">
              <ul className="space-y-3">
                {["whyLinkedmed", "Partners"].map((item) => (
                  <li
                    key={item}
                    className="text-[#111127] text-sm sm:text-base font-bold"
                  >
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 sm:mb-0">
              <ul className="space-y-3">
                {[
                  "messageFromCeo",
                  // "blogs/Events",
                  "Testimonials",
                  "workWithUs",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[#111127] text-sm sm:text-base font-bold"
                  >
                    {t(item)}
                  </li>
                ))}
                <li
                  onClick={goToTestimonials}
                  className="text-[#111127] cursor-pointer text-sm sm:text-base font-bold"
                >
                  {t("Testimonials")}
                </li>
              </ul>
            </div>

            <div className="mb-4 sm:mb-0">
              <ul className="space-y-3">
                {[
                  { lable: "privacyPolicy", url: "/privacy" },
                  { lable: "termsAndConditions", url: "/terms" },
                ].map((item) => (
                  <li
                    key={item.lable}
                    className="text-[#111127] text-sm sm:text-base font-bold"
                  >
                    <Link href={item.url}>{t(item.lable)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#121127]/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#121127]/60 text-xs sm:text-sm mb-4 md:mb-0 text-center md:text-left">
              © LinkedMed. {t("rightsReserved")}
            </div>
            <div className="flex space-x-4 sm:space-x-6">
              {[
                { label: "Privacy", url: "/privacy" },
                { label: "Terms", url: "/terms" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.url}
                  className="text-[#111127] text-xs sm:text-sm font-bold"
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
