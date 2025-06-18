import { getTranslations } from "next-intl/server";
import Image from "next/image";
import dots from "/public/images/logo.ico";
import { getLocale } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("about");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  return (
    <div className="w-full max-w-[1900px] mx-auto min-h-screen relative bg-white rounded-[20px] overflow-hidden px-[5px] md:px-0 pb-20">
      {/* Process Section */}
      <div className="w-full overflow-hidden">
        <div className="w-full py-10 md:py-10 relative flex flex-col justify-center items-center gap-2.5 px-4">
          <div className="absolute w-full z-0">
            <div className="w-full h-full">
              <Image
                className="opacity-50"
                src="/images/aboutbg.svg"
                alt="bg"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute z-[1] top-0 left-0 w-full h-full bg-[#96B8FF]/40"></div>
            </div>
          </div>

          <div className="relative z-10 w-full flex flex-col justify-center items-center">
            <div className="text-black text-xl md:text-4xl lg:text-5xl font-normal font-['Satoshi_Variable'] text-center">
              {t("Seamless Process")}
            </div>
            <div className="text-black text-3xl md:text-5xl lg:text-6xl font-bold font-['Satoshi_Variable'] text-center">
              {t("From Application to Onboarding")}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mt-16 text-center">
        <div className="relative mt-10">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

          <div className="flex flex-col items-center space-y-12 md:space-y-16">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center w-full">
              <div className="w-full md:w-1/2 lg:pr-8 px-5 flex justify-end">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md w-full md:w-96 lg:w-112">
                  <h4 className="font-bold text-lg md:text-xl lg:text-2xl">{t("Submit Application")}</h4>
                  <p className="text-sm text-gray-600 md:text-base lg:text-lg">
                    {t("Candidates submit")}
                  </p>
                </div>
              </div>
              <div
                className={`w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-white rounded-full border-4 border-white  absolute bottom-[-15px] ${
                  isRTL ? "right-1/2 transform translate-x-1/2" : "left-1/2 transform -translate-x-1/2"
                } md:static md:bottom-auto spin`}
              >
                <Image
                  className="w-full h-full object-contain"
                  src={dots}
                  alt="dot"
                />
              </div>
              <div className="w-full md:w-1/2 pl-8 flex justify-start"></div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center w-full">
              <div className="w-full md:w-1/2 pr-8 flex justify-end"></div>
              <div
                className={`w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-white rounded-full border-4 border-white  absolute bottom-[-15px] ${
                  isRTL ? "left-1/2 transform -translate-x-1/2" : "right-1/2 transform translate-x-1/2"
                } md:static md:bottom-auto spin`}
              >
                <Image
                  className="w-full h-full object-contain"
                  src={dots}
                  alt="dot"
                />
              </div>
              <div className="w-full md:w-1/2 lg:pl-8 px-5 flex justify-start">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md w-full md:w-96 lg:w-112">
                  <h4 className="font-bold text-lg md:text-xl lg:text-2xl">{t("Review Application")}</h4>
                  <p className="text-sm text-gray-600 md:text-base lg:text-lg">
                    {t("Applications")}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center w-full">
              <div className="w-full md:w-1/2 lg:pr-8 px-5 flex justify-end">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md w-full md:w-96 lg:w-112">
                  <h4 className="font-bold text-lg md:text-xl lg:text-2xl">{t("Coordinate Interview")}</h4>
                  <p className="text-base text-gray-600 md:text-lg lg:text-xl">
                    {t("Candidate")}
                  </p>
                </div>
              </div>
              <div
                className={`w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-white rounded-full border-4 border-white  absolute bottom-[-15px] ${
                  isRTL ? "right-1/2 transform translate-x-1/2" : "left-1/2 transform -translate-x-1/2"
                } md:static md:bottom-auto spin`}
              >
                <Image
                  className="w-full h-full object-contain"
                  src={dots}
                  alt="dot"
                />
              </div>
              <div className="w-full md:w-1/2 pl-8 flex justify-start"></div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-center w-full">
              <div className="w-full md:w-1/2 pr-8 flex justify-end"></div>
              <div
                className={`w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-white rounded-full border-4 border-white  absolute bottom-[-15px] ${
                  isRTL ? "left-1/2 transform -translate-x-1/2" : "right-1/2 transform translate-x-1/2"
                } md:static md:bottom-auto spin`}
              >
                <Image
                  className="w-full h-full object-contain"
                  src={dots}
                  alt="dot"
                />
              </div>
              <div className="w-full md:w-1/2 lg:pl-8 px-5 flex justify-start">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md w-full md:w-96 lg:w-112">
                  <h4 className="font-bold text-lg md:text-xl lg:text-2xl">{t("Offer Job")}</h4>
                  <p className="text-sm text-gray-600 md:text-base lg:text-lg">
                    {t("Successful")}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row items-center w-full">
              <div className="w-full md:w-1/2 lg:pr-8 px-5 flex justify-end">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md w-full md:w-96 lg:w-112">
                  <h4 className="font-bold text-lg md:text-xl lg:text-2xl">{t("Onboard")}</h4>
                  <p className="text-sm text-gray-600 md:text-base lg:text-lg">
                    {t("Candidates")}
                  </p>
                </div>
              </div>
              <div
                className={`w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-white rounded-full border-4 border-white absolute bottom-[-15px] ${
                  isRTL ? "right-1/2 transform translate-x-1/2" : "left-1/2 transform -translate-x-1/2"
                } md:static md:bottom-auto spin`}
              >
                <Image
                  className="w-full h-full object-contain"
                  src={dots}
                  alt="dot"
                />
              </div>
              <div className="w-full md:w-1/2 pl-8 flex justify-start"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
