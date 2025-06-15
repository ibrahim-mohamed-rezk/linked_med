import Image from "next/image";
import image1 from "@/../public/images/Home/5f138d9875160b5c2f3fd0000386dd7dc0d0eeef.jpg";
import image2 from "@/../public/images/Home/50ca6f572f4ba4bc65b7bafa7a46b2c7c0c9254c.jpg";

export default function LinkedMedPage() {
  return (
    <section className="bg-black text-white min-h-screen w-full relative overflow-hidden">
      {/* Large screens layout */}
      <div className="hidden lg:block h-screen w-full">
        {/* Title - Center Top */}
        <div className="absolute top-[8%] left-1/2 transform -translate-x-1/2 w-[60%] max-w-4xl">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold font-['Satoshi Variable'] text-center leading-tight">
            why linkedmed?
          </h1>
        </div>

        {/* Description - Left Center */}
        <div className="absolute left-[4%] top-1/2 transform -translate-y-1/2 w-[35%] max-w-lg">
          <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl leading-relaxed">
            Can be like the attached map but interactive with blinking countries
            (Germany / Dubai / Egypt / London / Columbia)
          </p>
        </div>

        {/* Image Layout */}
        <div className="absolute w-full bottom-[8%] pr-[4%] flex gap-4 lg:gap-6 xl:gap-8 justify-end">
          <div className="w-32 h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 xl:w-52 xl:h-84 2xl:w-64 2xl:h-[26rem] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={image1}
              alt="Medical Device"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={256}
              height={416}
              priority
            />
          </div>
          <div className="w-32 h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 xl:w-52 xl:h-84 2xl:w-64 2xl:h-[26rem] rounded-lg overflow-hidden shadow-2xl mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-16">
            <Image
              src={image2}
              alt="Doctor"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={256}
              height={416}
              priority
            />
          </div>
        </div>
      </div>

      {/* Small & Medium screens layout */}
      <div className="lg:hidden flex flex-col items-center justify-center min-h-screen w-full px-6 py-12 gap-8 sm:gap-10 md:gap-12">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-['Satoshi Variable'] text-center w-full leading-tight">
          why linkedmed?
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl md:text-2xl text-center w-[90%] sm:w-[85%] md:w-[80%] max-w-2xl leading-relaxed">
          Can be like the attached map but interactive, with blinking countries
          (Germany, Dubai, Egypt, London, Columbia).
        </p>

        {/* Images - Responsive grid */}
        <div className="flex flex-row gap-3 sm:gap-4 md:gap-5 items-start justify-center w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="w-24 h-36 sm:w-26 sm:h-40 md:w-32 md:h-52 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={image1}
              alt="Medical Device"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={128}
              height={208}
              priority
            />
          </div>
          <div className="w-24 h-36 sm:w-26 sm:h-40 md:w-32 md:h-52 rounded-lg overflow-hidden shadow-xl mt-4 sm:mt-5 md:mt-8">
            <Image
              src={image2}
              alt="Doctor"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={128}
              height={208}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}