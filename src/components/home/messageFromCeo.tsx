import Image from "next/image";
// import Link from "next/link";
import ceoImage from "/public/images//H.png";
import { getTranslations, getLocale } from "next-intl/server";

export default async function InspirationPage() {
  const t = await getTranslations("Home");
  const locale = getLocale()

  return (
    <div id='Message-CEO' className="min-h-screen  h-screen w-full px-4 my-20 sm:px-6 md:px-[8vw] lg:px-[12vw]  mx-auto bg-black text-white flex flex-col items-center justify-center font-['Satoshi Variable']">
      {/* Modern Title Section */}
      <div className="text-end w-full flex">
        <h1 className="text-xl flex text-start w-full sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light px-6 ">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-en">
            {t("Message from")}
          </span>
          <div className="h-1 sm:h-2 md:h-3 lg:h-4 xl:h-5"></div>
          <div>
            <span className="font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent tracking-wider px-6 font-en">
              {t("CEO")}
            </span>
            <div className="w-16 sm:w-24 md:w-28 lg:w-32 xl:w-40 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-2 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-4"></div>
          </div>
        </h1>
      </div>

      <div className="max-w-full px-2 mt-[20px] sm:px-4 mx-auto flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20">
        {/* Text Section */}
        <div className="lg:w-2/3 xl:w-4/7 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-8">
          <div className={`${await locale === "ar" ? "text-[clamp(21px,2.46875vw,30px)]" : "text-[clamp(21px,2.46875vw,28px)]"}  leading-relaxed  text-justify`}>
            <span>
              {t("journey")}
              {t("connect")} 
              {t("roots")}
              <span className=" font-en gradient-btn 5 border-2 text-[clamp(10px,1vw,20px)] border-white rounded-lg p-2 mx-3 text-white  transition-all duration-300 text-center cursor-pointer w-full">              {t("button")}
              </span>
            </span>
          </div>
          {/* <Link
            href="/start"
            className="!w-[50%] flex items-center justify-center mx-auto"
          >
            <div className=" font-en gradient-btn  px-4 sm:px-5 py-1 sm:py-3 md:py-4 lg:py-5 border-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl border-white rounded-3xl rounded-br-none rounded-tl-none text-white  transition-all duration-300 text-center cursor-pointer w-full">
              {t("button")}
            </div>
          </Link> */}
        </div>

        {/* Image + Button */}
        <div className="flex flex-col items-center sm:justify-center  gap-3 sm:gap-4 md:gap-6 lg:gap-8 lg:w-1/3 xl:w-2/5">
          <div className="flex items-center w-full">
            <Image
              src={ceoImage}
              alt="CEO or Mentor"
              width={350}
              height={350}
              className="rounded-xl w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] 2xl:w-[450px] 2xl:h-[450px] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
