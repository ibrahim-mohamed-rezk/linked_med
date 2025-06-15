import Image from 'next/image';
import Link from 'next/link';
import ceoImage from '/public/images/Home/CEO011.png';
import { getTranslations } from 'next-intl/server';

export default async function InspirationPage() {
  const t = await getTranslations('Home');
     
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 w-full">
      {/* Modern Title Section */}
      <div className="w-full max-w-6xl mb-8 lg:mb-12 xl:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-center">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Message from
          </span>
          <br />
          <div className="h-2 sm:h-3 lg:h-4 xl:h-5 2xl:h-6"></div>
          <span className="font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent tracking-wider">
            CEO
          </span>
        </h1>
        <div className="w-24 sm:w-32 lg:w-40 xl:w-48 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-4 lg:mt-6 xl:mt-8"></div>
      </div>

      <div className="max-w-full px-4 mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16 2xl:gap-20">
        {/* Text Section */}
        <div className="lg:w-2/3 xl:w-3/5 space-y-4 lg:space-y-6 xl:space-y-8">
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed lg:leading-relaxed xl:leading-relaxed">
            {t('journey')}
          </p>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed lg:leading-relaxed xl:leading-relaxed">
            {t('connect')}
          </p>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed lg:leading-relaxed xl:leading-relaxed">
            {t('roots')}
          </p>
        </div>
                 
        {/* Image + Button */}
        <div className="flex flex-col items-center gap-4 lg:gap-6 xl:gap-8 lg:w-1/3 xl:w-2/5">
          <div className="relative">
            <Image
              src={ceoImage}
              alt="CEO or Mentor"
              width={400}
              height={400}
              className="rounded-xl w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[400px] 2xl:h-[400px] object-cover"
              priority
            />
          </div>
                     
          <Link href="/start" className="w-full max-w-xs">
            <div className="px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-16 py-2 sm:py-3 lg:py-4 border-2 text-base sm:text-lg lg:text-xl xl:text-2xl border-white rounded-3xl rounded-br-none rounded-tl-none text-white hover:bg-white hover:text-black transition-all duration-300 text-center cursor-pointer w-full">
              {t('button')}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}