"use client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react"; // أيقونات للصوت (يمكنك استبدالها بـ SVG إذا أردت)

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // تشغيل النص بعد 10.4 ثانية
    const showTimeout = setTimeout(() => {
      setVisible(true);
    }, 10400);

    return () => clearTimeout(showTimeout);
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
      {/* فيديو الخلفية */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://storage.googleapis.com/otherprojects1323/linked-med/intro%20to%20edit-2.mp4"
        autoPlay
        loop
        muted
      />

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
              locale === "ar" ? "justify-end" : "justify-start"
            } text-left font-['Satoshi Variable']`}
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
