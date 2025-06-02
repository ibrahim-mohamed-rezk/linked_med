import Image from "next/image";
import image1 from "@/../public/images/Home/5f138d9875160b5c2f3fd0000386dd7dc0d0eeef.jpg";
import image2 from "@/../public/images/Home/50ca6f572f4ba4bc65b7bafa7a46b2c7c0c9254c.jpg";

export default function LinkedMedPage() {
  return (
    <section className="bg-black text-white min-h-[130vh] relative overflow-hidden">
      {/* Large screens layout (absolute) */}
      <div className="hidden lg:block">
        {/* Title - Center Top */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 px-4 max-w-xl">
          <h1 className="text-6xl font-bold font-['Satoshi Variable'] text-center leading-tight">
            why linkedmed?
          </h1>
        </div>

        {/* Description - Left Center */}
        <div className="absolute left-16 top-1/2 transform -translate-y-1/2 max-w-lg">
          <p className="text-lg leading-6">
            Can be like the attached map but in Interactive with blinking
            countries (Germany/Dubai/Egypt/London/Columbia)
          </p>
        </div>

        {/* Image Layout */}
        <div className="absolute w-full bottom-16 px-8 flex gap-6 justify-end">
          <div className="w-40 h-80 rounded-lg overflow-hidden">
            <Image
              src={image1}
              alt="Medical Device"
              className="w-full h-full object-cover"
              width={160}
              height={320}
              priority
            />
          </div>
          <div className="w-40 h-80 rounded-lg overflow-hidden mt-12">
            <Image
              src={image2}
              alt="Doctor"
              className="w-full h-full object-cover"
              width={160}
              height={320}
              priority
            />
          </div>
        </div>
      </div>

      {/* Small & Medium screens layout (flex) */}
      <div className="lg:hidden flex flex-col items-center px-4 py-12 gap-10 min-h-screen">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Satoshi Variable'] text-center leading-tight">
          why linkedmed?
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-center max-w-md leading-relaxed">
          Can be like the attached map but interactive, with blinking countries
          (Germany, Dubai, Egypt, London, Columbia).
        </p>

        {/* Image Layout */}
        <div className="flex flex-col gap-6">
          <div className="w-72 h-48 rounded-lg overflow-hidden">
            <Image
              src={image1}
              alt="Medical Device"
              className="w-full h-full object-cover"
              width={288}
              height={192}
              priority
            />
          </div>
          <div className="w-72 h-48 rounded-lg overflow-hidden">
            <Image
              src={image2}
              alt="Doctor"
              className="w-full h-full object-cover"
              width={288}
              height={192}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
