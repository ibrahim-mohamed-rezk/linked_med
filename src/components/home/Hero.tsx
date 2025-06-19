"use client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react"; // أيقونات للصوت (يمكنك استبدالها بـ SVG إذا أردت)

const Hero = ({ data }: { data: { web: string; mobile: string } }) => {
  const [visible, setVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show text after 10.4 seconds
    const showTimeout = setTimeout(() => {
      setVisible(true);
    }, 10400);

    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener("resize", checkScreenSize);

    return () => {
      clearTimeout(showTimeout);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Only render one video based on screen size */}
      {isMobile ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={data.mobile}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={data.web}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      )}

      {/* زر التحكم بالصوت */}
      <button
        onClick={handleToggleMute}
        className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label={isMuted ? "Unmute Video" : "Mute Video"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* النص الظاهر بعد مدة */}
      <div className="container h-full !mx-auto z-10 relative">
        {visible && (
          <div
            className={`text-white px-[20px] md:px-0 text-[clamp(30px,4.27083vw,82px)] font-bold w-full h-[85%] flex items-end ${
              locale === "ar" ? "justify-end font-en" : "justify-start font-ar"
            } text-left `}
          >
            {t("hero.title")}
            <br />
            {t("hero.subtitle")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
