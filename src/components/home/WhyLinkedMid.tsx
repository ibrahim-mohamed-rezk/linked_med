import Image from "next/image";
import image1 from "@/../public/images/Home/5f138d9875160b5c2f3fd0000386dd7dc0d0eeef.jpg";
import image2 from "@/../public/images/Home/50ca6f572f4ba4bc65b7bafa7a46b2c7c0c9254c.jpg";
import { useTranslations } from "next-intl";

export default function LinkedMedPage() {
  const t = useTranslations('whyLinkedMed');

  return (
    <section
      id="why-linkedmed"
      className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 min-h-screen w-full relative overflow-hidden"
    >
      {/* Large screens layout (xl and above) */}
      <div className="hidden xl:block h-screen w-full">
        <h1 className="text-2xl pt-14 flex text-end sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight md:leading-snug text-white md:text-left font-['Satoshi_Variable']">
          {t('title')}
        </h1>

        <div className="absolute top-1/2 transform -translate-y-1/2 w-[38%] max-w-2xl">
          <div className="relative">
            <p className="text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl leading-relaxed font-['Satoshi Variable'] text-white relative z-10 p-6 backdrop-blur-sm rounded-2xl shadow-lg">
              {t('description1')}
            </p>
          </div>
        </div>

        <div className="absolute justify-end px-30 w-full bottom-[8%] flex gap-6 xl:gap-8 2xl:gap-10">
          {[image1, image2].map((img, index) => (
            <div className={`relative group ${index === 1 ? 'mt-8 xl:mt-12 2xl:mt-16' : ''}`} key={index}>
              <div className="w-48 xl:w-52 2xl:w-64 3xl:w-72 h-72 xl:h-80 2xl:h-96 3xl:h-[28rem] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <Image
                  src={img}
                  alt={index === 0 ? t('image1Alt') : t('image2Alt')}
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
      <div className="block xl:hidden py-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-['Satoshi_Variable'] px-4">
          {t('title')}
        </h1>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white px-4 max-w-xl backdrop-blur-sm p-4 rounded-2xl shadow-md font-['Satoshi Variable']">
          {t('description1')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          {[image1, image2].map((img, index) => (
            <div className="relative group w-60 h-80 rounded-2xl overflow-hidden shadow-lg" key={index}>
              <Image
                src={img}
                alt={index === 0 ? t('image1Alt') : t('image2Alt')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                width={240}
                height={320}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
