"use client";

const Hero = () => {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <img
        className="absolute w-full h-full top-0 left-0 right-0 bottom-0 "
        src="/images/testBg.png"
        alt="background"
      />
      <div className="container h-full !mx-auto z-10 relative">
        <div className="text-white text-[82px] font-bold w-full h-full flex items-center justify-start font-['Satoshi Variable']">
          LinkedMed: Transforming
          <br />
          Global Healthcare Talent
          <br />
          for a Better Future
        </div>
      </div>
    </div>
  );
};

export default Hero;
