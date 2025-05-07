import { getTranslations } from "next-intl/server";
import Image from "next/image";

const page = async ({ }: { params: Promise<{ locale: string }> }) => {
  const t = await getTranslations("about");
  // const { locale } = await params;

  return (
    <div className="w-full max-w-[1900px] mx-auto min-h-screen relative bg-white rounded-[20px] overflow-hidden px-[5px] md:px-0">
      {/* Background visuals here (unchanged) */}

      {/* About section */}
      <div className="px-4 max-w-[1900px] md:px-8 z-10 relative lg:px-16 pt-16 md:pt-24 lg:pt-32 pb-8 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-[clamp(14px,5vw,100px)] font-bold font-['Satoshi_Variable'] uppercase text-black">
              {t("title")}
            </h1>
            <div className="text-neutral-900 text-[clamp(10px,1.25vw,30px)] font-normal font-['Satoshi_Variable']">
              {t("aboutText")}
            </div>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-3 gap-4">
            {[0, 1, 2].map((_, i) => (
              <div
                key={i}
                className={`w-full aspect-[1/2] bg-neutral-400 rounded-[20px] overflow-hidden mt-${i * 8}`}
              >
                <Image
                  className="w-full h-full object-cover"
                  src="/images/aboutImage.png"
                  alt="Team member"
                  width={500}
                  height={1000}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default page;
