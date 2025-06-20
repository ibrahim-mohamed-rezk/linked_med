import Image from "next/image";
import image1 from "@/../public/images/Home/5f138d9875160b5c2f3fd0000386dd7dc0d0eeef.jpg";
import image2 from "@/../public/images/Home/50ca6f572f4ba4bc65b7bafa7a46b2c7c0c9254c.jpg";
import { useTranslations, useLocale } from "next-intl";

export default function LinkedMedPage() {
  const t = useTranslations('whyLinkedMed');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <section
      id="why-linkedmed"
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`front-full-inner max-w-[1920px] mx-auto w-full px-2 py-5 pb-17 min-h-screen sm:px-3 md:px-[4vw] lg:px-[10vw]`}
    >
      {/* Large screens layout (xl and above) */}
      <div
        className="hidden xl:flex relative w-full"
        style={{ height: "40vw" }}
      >
        {/* Text Top-Left or Top-Right based on direction */}
        <div className={`absolute top-16 ${isArabic ? 'right-10 text-right' : 'left-10 text-left'} w-[40%] max-w-2xl`}>
          <h1 className="text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight md:leading-snug text-white font-en pt-10">
            {t('title')}
          </h1>
          <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl leading-relaxed font-['Satoshi Variable'] text-white z-10 p-6 backdrop-blur-sm rounded-2xl pt-8">
            {t('description1')}
          </p>
        </div>

        {/* Images Bottom-Right or Bottom-Left */}
        <div className={`absolute bottom-0 ${isArabic ? 'left-0' : 'right-0'} flex gap-6 xl:gap-8 2xl:gap-10`}>
          {[image1, image2].map((img, index) => (
            <div
              className={`relative group ${index === 1 ? 'mt-8 xl:mt-12 2xl:mt-16' : ''}`}
              key={index}
            >
              <div className="w-48 xl:w-52 2xl:w-64 3xl:w-72 h-72 xl:h-80 2xl:h-96 3xl:h-[28rem] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <Image
                  src={img}
                  alt={index === 0 ? 'image1Alt' : 'image2Alt'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  width={288}
                  height={448}
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive layout for screens smaller than xl */}
      <div className={`xl:hidden py-10 flex flex-col items-center gap-6 ${isArabic ? 'text-right' : 'text-center'}`}>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-en px-4">
          {t('title')}
        </h1>

        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-white px-4 max-w-xl backdrop-blur-sm p-4 rounded-2xl shadow-md font-['Satoshi Variable']">
          {t('description1')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          {[image1, image2].map((img, index) => (
            <div className="relative group w-60 h-96 rounded-2xl overflow-hidden shadow-lg" key={index}>
              <Image
                src={img}
                alt={index === 0 ? 'image1Alt' : 'image2Alt'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                width={240}
                height={384}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
