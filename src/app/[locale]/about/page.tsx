"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

// const page =  () => {
export default function AboutPage() {
  const imagesList = [
    [
      '/images/about/iO8gkR4SV0lBOYjmX9eOc.webp',
      '/images/about/AISelect_20250512_223546_Gallery.webp',
      '/images/about/AISelect_20250512_223609_Gallery.webp',
    ],
    [
      '/images/about/IMG_0408.WEBP',
      '/images/about/IMG_0411.WEBP',
      '/images/about/IMG_0412.WEBP',
    ],
    [
      '/images/about/IMG_0407.WEBP',
      '/images/about/IMG_0409.WEBP',
      '/images/about/IMG_0410.WEBP',
    ],
  ];
  const t = useTranslations("about");
  const [currentImages, setCurrentImages] = useState(imagesList[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagesList.length);
      setCurrentImages(imagesList[(index + 1) % imagesList.length]);
    }, 5000);
    return () => clearInterval(interval);
  });


  return (
    <div className="w-full max-w-[1900px] mx-auto min-h-screen relative bg-white rounded-[20px] overflow-hidden px-[5px] md:px-0">
      {/* Background visuals here (unchanged) */}

      {/* About section */}
      <div className="px-4 max-w-[1900px] md:px-8 z-10 relative lg:px-16 pt-16 md:pt-24 lg:pt-32 pb-8 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-[clamp(14px,5vw,100px)] font-bold font-en uppercase text-black">
              {t("title")}
            </h1>
            <div className="text-neutral-900 text-[clamp(10px,1.25vw,30px)] font-normal font-en">
              {t("aboutText")}
            </div>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-3 gap-4">
            {currentImages.map((image, i) => (
              <div
                key={`${index}-${i}`}
                className={`w-full aspect-[1/2] bg-neutral-400 rounded-[20px] overflow-hidden mt-${i * 8} transition-all duration-1000 ease-in-out transform`}
                style={{
                  animation: `slideInY 1000ms ease-in-out`,
                  animationDelay: `${i * 200}ms`,
                  animationFillMode: 'both'
                }}
              >
                <Image
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                  src={image}
                  alt="Team member"
                  width={500}
                  height={1000}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInY {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};