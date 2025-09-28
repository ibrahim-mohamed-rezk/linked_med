"use client";

import Image from "next/image";
import ceoImage from "/public/images//H.png";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { LoginModal, SignupModal } from "@/components/AuthModals";
import {
  getUserFromCookies,
  isAuthenticated,
  UserProfile,
} from "@/libs/server/auth";

export default function InspirationPage() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const router = useRouter();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const userData = getUserFromCookies();
      if (userData) setUser(userData);
    }
  }, []);

  const handleCtaClick = () => {
    if (user) {
      router.push(`/${locale}/myprofile`);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div
      id="Message-CEO"
      className=" w-full px-[clamp(1rem,4vw,12vw)] py-10 sm:py-50 lg:py-20   mx-auto  text-white flex flex-col items-center max-w-[1920px]  justify-center font-['Satoshi Variable']"
    >
      {/* Modern Title Section */}
      <div className="text-end lg:w-full flex ">
        <h1 className="text-[clamp(1.25rem,5vw,3.75rem)] flex text-start w-full font-light px-[clamp(0.75rem,2vw,1.5rem)]">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-en">
            {t("Message from")}
          </span>
          <div className="h-[clamp(0.25rem,1vw,1.25rem)]"></div>
          <div>
            <span className="font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent tracking-wider px-[clamp(0.75rem,2vw,1.5rem)] font-en">
              {t("CEO")}
            </span>
            <div className="w-[clamp(4rem,8vw,10rem)] h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-[clamp(0.5rem,1vw,1rem)]"></div>
          </div>
        </h1>
      </div>

      <div className="max-w-full px-[clamp(0.5rem,2vw,1rem)] mt-[clamp(1.25rem,4vw,2.5rem)] mx-auto shrink-0 flex flex-col md:flex-row justify-between gap-[clamp(1rem,4vw,5rem)]">
        {/* Text Section */}
        <div className="md:w-1/2 lg:w-[60%] space-y-[clamp(0.75rem,2vw,2rem)]">
          <div
            className={`text-[clamp(0.9rem,1.8vw,1.7vw)] leading-relaxed text-justify`}
          >
            <span>
              {t("journey")}
              {t("connect")}
              {t("roots")}
              <span
                onClick={handleCtaClick}
                className="font-en gradient-btn border-2 text-[clamp(0.625rem,1vw,1.25rem)] border-white rounded-lg  text-white transition-all duration-300 text-center cursor-pointer inline-block"
              >
                {t("button")}
              </span>
            </span>
          </div>
          {/* <Link             
      href="/start"             
      className="!w-[50%] flex items-center justify-center mx-auto"           
    >             
      <div className="font-en gradient-btn px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.5rem,2vw,1.25rem)] border-2 text-[clamp(0.875rem,2vw,1.5rem)] border-white rounded-3xl rounded-br-none rounded-tl-none text-white transition-all duration-300 text-center cursor-pointer w-full">               
        {t("button")}             
      </div>           
    </Link> */}
        </div>

        {/* Image + Button */}
        <div className="flex flex-col items-center justify-center gap-[clamp(0.75rem,2vw,2rem)] md:w-1/2 lg:w-[40%]">
          <div className="flex items-center justify-center w-full">
            <Image
              src={ceoImage}
              alt="CEO or Mentor"
              width={450}
              height={450}
              className="rounded-xl w-[clamp(15rem,25vw,28.125rem)] h-[clamp(15rem,25vw,28.125rem)] object-cover mx-auto"
              priority
            />
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          if (isAuthenticated()) {
            const userData = getUserFromCookies();
            if (userData) setUser(userData);
          }
        }}
        onSwitchModal={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => {
          setIsSignupOpen(false);
          if (isAuthenticated()) {
            const userData = getUserFromCookies();
            if (userData) setUser(userData);
          }
        }}
        onSwitchModal={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
}
