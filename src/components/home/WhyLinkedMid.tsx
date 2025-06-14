import Image from "next/image";
import image1 from "@/../public/images/Home/5f138d9875160b5c2f3fd0000386dd7dc0d0eeef.jpg";
import image2 from "@/../public/images/Home/50ca6f572f4ba4bc65b7bafa7a46b2c7c0c9254c.jpg";

export default function LinkedMedPage() {
  return (
    <section className="bg-black text-white h-screen w-screen relative overflow-hidden">
      {/* Large screens layout */}
      <div className="hidden lg:block h-full w-full">
        {/* Title - Center Top */}
        <div className="absolute  left-1/2 transform -translate-x-1/2 w-[60%] max-w-none">
          <h1 className="text-[4vw] lg:text-[3.5vw] xl:text-[3vw] 2xl:text-[2.5vw] font-bold font-['Satoshi Variable'] text-center leading-tight">
            why linkedmed?
          </h1>
        </div>

        {/* Description - Left Center */}
        <div className="absolute left-[4%] top-1/2 transform -translate-y-1/2 w-[35%]">
          <p className="text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw] 2xl:text-[0.9vw] leading-relaxed">
            Can be like the attached map but interactive with blinking countries
            (Germany / Dubai / Egypt / London / Columbia)
          </p>
        </div>

        {/* Image Layout */}
        <div className="absolute w-full bottom-[8%] pr-[4%] flex gap-[2%] justify-end">
          <div className="w-[12vw] h-[32vh] min-w-[180px] min-h-[320px] max-w-[250px] max-h-[900px] rounded-lg overflow-hidden">
            <Image
              src={image1}
              alt="Medical Device"
              className="w-full h-full object-cover"
              width={250}
              height={400}
              priority
            />
          </div>
          <div className="w-[12vw] h-[32vh] min-w-[180px] min-h-[320px] max-w-[250px] max-h-[900px] rounded-lg overflow-hidden mt-[8vh]">
            <Image
              src={image2}
              alt="Doctor"
              className="w-full h-full object-cover"
              width={250}
              height={400}
              priority
            />
          </div>
        </div>
      </div>

      {/* Small & Medium screens layout */}
      <div className="lg:hidden flex flex-col items-center justify-center h-full w-full px-[5%] py-[8%] gap-[6%]">
        {/* Title */}
        <h1 className="text-[8vw] sm:text-[7vw] md:text-[6vw] font-bold font-['Satoshi Variable'] text-center   w-full">
          why linkedmed?
        </h1>

        {/* Description */}
        <p className="text-[4vw] sm:text-[3.5vw] md:text-[3vw] text-center w-[85%] ">
          Can be like the attached map but interactive, with blinking countries
          (Germany, Dubai, Egypt, London, Columbia).
        </p>

        {/* Images - Portrait aspect ratio like large screens */}
        <div className="flex flex-row lg:flex-col sm:flex-row gap-[4%] sm:gap-[3%] items-center w-full justify-center">
          <div className="w-[35%] sm:w-[28%] md:w-[24%] aspect-[5/8] min-w-[110px] max-w-[160px]  overflow-hidden">
            <Image
              src={image1}
              alt="Medical Device"
              className="w-full h-full object-cover"
              width={160}
              height={256}
              priority
            />
          </div>
          <div className="w-[35%] sm:w-[28%] md:w-[24%] aspect-[5/8] min-w-[110px] max-w-[160px] overflow-hidden sm:mt-[6%]">
            <Image
              src={image2}
              alt="Doctor"
              className="w-full h-full object-cover"
              width={160}
              height={256}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
