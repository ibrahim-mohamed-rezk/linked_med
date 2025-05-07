import { getTranslations } from "next-intl/server";
import Image from "next/image";

const page = async () => {
    const t = await getTranslations("about");
  return (
    <div className="w-full max-w-[1900px] mx-auto min-h-screen relative bg-white rounded-[20px] overflow-hidden px-[5px] md:px-0">
      {/* Process Section */}
      <div className="w-full mt-20 overflow-hidden">
        <div className="w-full py-16 md:py-24 relative flex flex-col justify-center items-center gap-2.5 px-4">
          <div className="absolute  top-0 left-0 w-full z-0">
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
            <div className="text-black text-xl md:text-3xl font-normal font-['Satoshi_Variable'] text-center">
              {t("A Seamless Process")}
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

          <div className="flex flex-col items-center space-y-8">
            {/* Step 1 */}
            <div className="relative flex items-center w-full">
              <div className="w-1/2 pr-8 flex justify-end">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md w-64">
                  <h4 className="font-bold">{t("Application Submission")}</h4>
                  <p className="text-sm text-gray-600">
                    {t(
                      "Candidates initiate their journey by submitting applications through www.linkedinmed.org, ensuring that all required information is captured effectively. Our online platform simplifies the application process, allowing candidates to upload their credentials and details conveniently."
                    )}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
              <div className="w-1/2 pl-8 flex justify-start"></div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center w-full">
              <div className="w-1/2 pr-8 flex justify-end"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
              <div className="w-1/2 pl-8 flex justify-start">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md w-64">
                  <h4 className="font-bold">{t("Review Process")}</h4>
                  <p className="text-sm text-gray-600">
                    {t(
                      "Submitted applications undergo a thorough review process. Qualified personnel evaluate candidates based on predefined criteria, ensuring only the best move forward. Our team carefully considers your experience, qualifications, and language proficiency to find the perfect match."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center w-full">
              <div className="w-1/2 pr-8 flex justify-end">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md w-64">
                  <h4 className="font-bold">{t("Interview Coordination")}</h4>
                  <p className="text-sm text-gray-600">
                    {t(
                      "Candidates who pass the review are invited for interviews. Coordination between candidates and interviewers is handled seamlessly to align schedules. We streamline the interview process, ensuring a smooth and efficient experience for both candidates and employers."
                    )}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
              <div className="w-1/2 pl-8 flex justify-start"></div>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-center w-full">
              <div className="w-1/2 pr-8 flex justify-end"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
              <div className="w-1/2 pl-8 flex justify-start">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md w-64">
                  <h4 className="font-bold">{t("Offer Presentation")}</h4>
                  <p className="text-sm text-gray-600">
                    {t(
                      "Successful candidates receive formal offers, which detail job roles and responsibilities, ensuring clarity and transparency. Our team works closely with employers to ensure that the offers meet your expectations and reflect your desired career path."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex items-center w-full">
              <div className="w-1/2 pr-8 flex justify-end">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md w-64">
                  <h4 className="font-bold">{t("Onboarding Procedures")}</h4>
                  <p className="text-sm text-gray-600">
                    {t(
                      "Once candidates accept offers, they enter the onboarding phase, which includes orientation sessions and training to equip them for their new roles. We support your transition into the German healthcare system, providing guidance on regulations, procedures, and cultural nuances."
                    )}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
              <div className="w-1/2 pl-8 flex justify-start"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page