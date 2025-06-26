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
    <footer className="w-full border border-[#f6f6f6] overflow-hidden py-8 px-4 sm:py-12 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to right, #F3EBFC, #E5EEFC)' }}>
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
              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.facebook.com/LinkedMed.org"
                  target="_blank"
                  className=" w-[66px] h-[66px] flex items-center justify-center rounded-full border border-[#868686] p-4  transition"
                >
                  <svg
                    width="13"
                    height="26"
                    viewBox="0 0 13 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.49333 14.82H11.5267L12.74 9.96663H8.49333V7.53997C8.49333 6.98992 8.5176 6.59357 8.56613 6.3509C8.6632 5.96264 8.87351 5.66335 9.19707 5.45303C9.58533 5.22655 10.1596 5.1133 10.92 5.1133H12.74V1.0365C12.465 1.00415 12.0282 0.97179 11.4296 0.939436C10.6854 0.890902 9.96551 0.866634 9.26987 0.866634C8.1536 0.866634 7.1708 1.08908 6.32147 1.53397C5.47213 1.97886 4.82098 2.61383 4.368 3.4389C3.88267 4.32868 3.64 5.37214 3.64 6.5693V9.96663H0V14.82H3.64V25.1333H8.49333V14.82Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/linked_med/"
                  target="_blank"
                  className=" w-[66px] h-[66px] flex items-center justify-center rounded-full border border-[#868686] p-4  transition"
                >
                  <svg
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3709 0.866634C14.6004 0.866634 15.4902 0.874723 16.0403 0.890902L17.1323 0.939434C18.2647 0.987968 19.2435 1.17401 20.0685 1.49757C20.8936 1.82112 21.6135 2.29028 22.2283 2.90504C22.843 3.51979 23.3122 4.2397 23.6357 5.06477C23.9593 5.88984 24.1453 6.86859 24.1939 8.00103L24.2424 9.09303C24.2586 9.65926 24.2667 10.549 24.2667 11.7624V14.2376C24.2667 15.4671 24.2586 16.3569 24.2424 16.9069L24.1939 17.9989C24.1453 19.1313 23.9593 20.1101 23.6357 20.9352C23.3122 21.7602 22.843 22.4801 22.2283 23.0949C21.6135 23.7097 20.8936 24.1788 20.0685 24.5024C19.2435 24.8259 18.2647 25.012 17.1323 25.0605L16.0403 25.109C15.474 25.1252 14.5843 25.1333 13.3709 25.1333H10.8957C9.66622 25.1333 8.77644 25.1252 8.2264 25.109L7.1344 25.0605C6.00196 25.012 5.0232 24.8259 4.19813 24.5024C3.37307 24.1788 2.65316 23.7097 2.0384 23.0949C1.42364 22.4801 0.954489 21.7602 0.630933 20.9352C0.307378 20.1101 0.121333 19.1313 0.0728 17.9989L0.0242667 16.9069C0.00808889 16.3407 0 15.4509 0 14.2376V11.7624C0 10.5329 0.00808889 9.64308 0.0242667 9.09303L0.0728 8.00103C0.121333 6.86859 0.307378 5.88984 0.630933 5.06477C0.954489 4.2397 1.42364 3.51979 2.0384 2.90504C2.65316 2.29028 3.37307 1.82112 4.19813 1.49757C5.0232 1.17401 6.00196 0.987968 7.1344 0.939434L8.2264 0.890902C8.79262 0.874723 9.6824 0.866634 10.8957 0.866634H13.3709ZM12.1333 6.9333C11.0332 6.9333 10.0181 7.20428 9.08787 7.74623C8.15764 8.28819 7.42156 9.02428 6.8796 9.9545C6.33764 10.8847 6.06667 11.8999 6.06667 13C6.06667 14.1001 6.33764 15.1152 6.8796 16.0454C7.42156 16.9757 8.15764 17.7117 9.08787 18.2537C10.0181 18.7957 11.0332 19.0666 12.1333 19.0666C13.2334 19.0666 14.2486 18.7957 15.1788 18.2537C16.109 17.7117 16.8451 16.9757 17.3871 16.0454C17.929 15.1152 18.2 14.1001 18.2 13C18.2 11.8999 17.929 10.8847 17.3871 9.9545C16.8451 9.02428 16.109 8.28819 15.1788 7.74623C14.2486 7.20428 13.2334 6.9333 12.1333 6.9333ZM12.1333 9.35997C12.7966 9.35997 13.4073 9.52175 13.9655 9.8453C14.5236 10.1689 14.9644 10.6097 15.288 11.1678C15.6116 11.726 15.7733 12.3367 15.7733 13C15.7733 13.6633 15.6116 14.274 15.288 14.8321C14.9644 15.3902 14.5236 15.8311 13.9655 16.1546C13.4073 16.4782 12.7966 16.64 12.1333 16.64C11.47 16.64 10.8593 16.4782 10.3012 16.1546C9.74307 15.8311 9.30222 15.3902 8.97867 14.8321C8.65511 14.274 8.49333 13.6633 8.49333 13C8.49333 12.3367 8.65511 11.726 8.97867 11.1678C9.30222 10.6097 9.74307 10.1689 10.3012 9.8453C10.8593 9.52175 11.47 9.35997 12.1333 9.35997ZM18.4912 5.1133C18.0868 5.1133 17.7349 5.26295 17.4356 5.56223C17.1363 5.86152 16.9867 6.21743 16.9867 6.62997C16.9867 7.0425 17.1363 7.39841 17.4356 7.6977C17.7349 7.99699 18.0908 8.14664 18.5033 8.14664C18.9159 8.14664 19.2718 7.99699 19.5711 7.6977C19.8704 7.39841 20.02 7.0425 20.02 6.62997C20.02 6.21743 19.8704 5.86152 19.5711 5.56223C19.2718 5.26295 18.9118 5.1133 18.4912 5.1133Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@linkedmed?_t=ZS-8wx8iIJnMTx&_r=1"
                  target="_blank"
                  className=" w-[66px] h-[66px] flex items-center justify-center rounded-full border border-[#868686] p-4  transition"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 0.866634H16.25V17.3333C16.25 18.4334 15.35 19.3333 14.25 19.3333C13.15 19.3333 12.25 18.4334 12.25 17.3333C12.25 16.2333 13.15 15.3333 14.25 15.3333C14.45 15.3333 14.65 15.3666 14.8333 15.4166V12.1666C14.6333 12.1333 14.4333 12.1 14.25 12.1C11.0167 12.1 8.4 14.7166 8.4 17.95C8.4 21.1833 11.0167 23.8 14.25 23.8C17.4833 23.8 20.1 21.1833 20.1 17.95V8.66663C21.5 9.66663 23.15 10.2666 24.9667 10.2666V7.01663C22.15 7.01663 19.5 4.36663 19.5 0.866634Z"
                      fill="black"
                    />
                  </svg>
                </a>
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
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === "/") {
                      const el = document.getElementById("why-linkedmed");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      router.push("/#why-linkedmed");
                    }
                  }}
                  className="text-[#111127] cursor-pointer text-sm sm:text-base font-bold"
                >
                  {t("whyLinkedmed")}
                </li>

                <li
                    className="text-[#111127] text-sm sm:text-base font-bold"
                  >
                  {t("Partners")}
                  </li>

              </ul>
            </div>

            <div className="mb-4 sm:mb-0">
              <ul className="space-y-3">
                {[
                  // "messageFromCeo",
                  // "blogs/Events",
                  // "Testimonials",
                  "workWithUs",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[#111127] text-sm sm:text-base font-bold"
                  >
                    <Link href={"#Message-CEO"}>{t(item)}</Link>

                  </li>
                ))}
                <li
                  onClick={goToTestimonials}
                  className="text-[#111127] cursor-pointer text-sm sm:text-base font-bold"
                >
                  {t("Testimonials")}
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === "/") {
                      const el = document.getElementById("Message-CEO");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      router.push("/#Message-CEO");
                    }
                  }}
                  className="text-[#111127] cursor-pointer text-sm sm:text-base font-bold"
                >
                  {t("messageFromCeo")}
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
