import Image from 'next/image';
import Link from 'next/link';
import ceoImage from '/public/Assets/Untitled-1.png';
import { getTranslations } from 'next-intl/server';

export default async function InspirationPage() {
  const t = await getTranslations('Home');
     
  return (
    <div id='Message-CEO' className="min-h-screen w-full px-4 sm:px-6 md:px-[8vw] lg:px-[12vw] mb-10 mx-auto bg-black text-white flex flex-col items-center justify-center font-['Satoshi Variable']">
      {/* Modern Title Section */}
      <div className="text-end w-full flex">
        <h1 className="text-xl flex text-start w-full sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light px-6 ">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-['Satoshi_Variable']">
            {t("Message from")}
          </span>
          <div className="h-1 sm:h-2 md:h-3 lg:h-4 xl:h-5"></div>
          <div>
            <span className="font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent tracking-wider px-6 font-['Satoshi_Variable']">
              {t("CEO")}
            </span>
            <div className="w-16 sm:w-24 md:w-28 lg:w-32 xl:w-40 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-2 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-4"></div>
          </div>
        </h1>
      </div>

      <div className="max-w-full px-2 sm:px-4 mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20">
        {/* Text Section */}
        <div className="lg:w-2/3 xl:w-3/5 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-8">
          <p className="text-[clamp(21px,0.46875vw,9px)] leading-relaxed font-['Satoshi_Variable']">
            {t('journey')}
          </p>
          <p className="text-[clamp(21px,0.46875vw,9px)] leading-relaxed font-['Satoshi_Variable']">
            {t('connect')}
          </p>
          <p className="text-[clamp(21px,0.46875vw,9px)] leading-relaxed font-['Satoshi_Variable']">
            {t('roots')}
          </p>
        </div>
                 
        {/* Image + Button */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 lg:w-1/3 xl:w-2/5">
          <div className="relative">
            <Image
              src={ceoImage}
              alt="CEO or Mentor"
              width={350}
              height={350}
              className="rounded-xl w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] 2xl:w-[450px] 2xl:h-[450px] object-cover"
              priority
            />
          </div>
                     
          <Link href="/start" className="w-full max-w-xs">
            <div className=" font-['Satoshi_Variable'] bg-blue-800 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-2 sm:py-3 md:py-4 lg:py-5 border-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl border-white rounded-3xl rounded-br-none rounded-tl-none text-white hover:bg-white hover:text-black transition-all duration-300 text-center cursor-pointer w-full">
              {t('button')}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
