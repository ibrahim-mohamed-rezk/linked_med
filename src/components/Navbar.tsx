"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { langs } from "@/libs/data/langs";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { LoginModal } from "./AuthModals";
import { SignupModal } from "./AuthModals";
import Image from "next/image";
import { UserRound } from 'lucide-react';
import {
  getUserFromCookies,
  isAuthenticated,
  logout,
  UserProfile,
} from "@/libs/server/auth";

const Navbar = () => {
  const t = useTranslations("header");
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Check if user is authenticated on component mount
  useEffect(() => {
    if (isAuthenticated()) {
      const userData = getUserFromCookies();
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeLang = (lang: string) => {
    if (lang === locale) return;
    router.push(`/${lang}${pathname.replace(`/${locale}`, "")}`);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsUserMenuOpen(false);
    router.refresh(); // Refresh the page to update UI
  };

  // Display name or email depending on what's available
  const getDisplayName = () => {
    if (!user) return "";
    return user.name || user.email;
  };

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("services"), href: "/services" },
    { label: t("contact_us"), href: "/contact-us" },
    { label: t("about"), href: "/about" },
  ];

  return (
    <>
      <nav className="w-full rounded-bl-[20px] rounded-br-[20px] shadow-md" style={{ background: 'linear-gradient(to right, #F3EBFC, #E5EEFC)' }}>
        <div className="max-w-[1900px] mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex w-full justify-between items-center h-16 relative z-50">
              {/* Logo */}
              <Link href="/" className="rounded-lg p-2">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={130}
                  height={53}
                  className="w-[130px] h-[53px]"
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex space-x-6 ml-10">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`text-sm font-bold transition-colors text-[18px] ${
                      locale === "ar" ? "" : "font-[Satoshi_Variable]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              </div>
              <Link href="/employers" className="hidden lg:block">
                <button className="px-4 py-2 gradient-btn text-white text-sm rounded-full font-medium  transition">{t("employers")}</button>

              </Link>
              {/* Desktop Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Language Switcher */}
                <div className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsLangOpen(!isLangOpen)}
                  >
                    <Image
                      src={`/images/${locale}.svg`}
                      width={47}
                      height={29}
                      className="rounded-md"
                      alt="lang"
                    />
                    <span className="text-xs text-[#5e6278] font-semibold flex items-center pe-8 font-['Inter']">
                      {langs.find((l) => l.value === locale)?.label}
                      <svg
                        className="h-5 w-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  {isLangOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {langs.map((lang) => (
                          <div
                            key={lang.value}
                            onClick={() => {
                              changeLang(lang.value);
                              setIsLangOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            {lang.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu or Auth Buttons */}
                {user ? (
                  <div className="relative flex gap-2 items-center" ref={userMenuRef}>

                    <Link href="/myprofile" locale={locale}>
                      <UserRound size={24} color="black" className="cursor-pointer" />
                    </Link>


                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition"
                    >
                      <span className="text-sm font-medium truncate max-w-[150px]">
                        {getDisplayName()}
                      </span>
                      <svg
                        className="h-5 w-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>



                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <div className="py-1">
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            {t("logout")}
                          </button>
                        </div>
                      </div>

                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setIsLoginOpen(true)}
                        className="px-4 py-2 gradient-btn text-white text-sm rounded-full font-medium  transition"
                    >
                      {t("login")}
                    </button>
                    {/* <button
                      onClick={() => setIsSignupOpen(true)}
                      className="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded-full font-medium hover:bg-blue-50 transition"
                    >
                      {t("singup")}
                    </button> */}
                  </>
                )}
              </div>

              {/* Mobile Button & Hamburger */}
              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div
            ref={mobileMenuRef}
            className={`fixed top-[66px] inset-0 z-20 lg:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <div
              className="fixed inset-0 bg-black/30"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div
              className={`fixed top-[66px] right-0 bottom-0 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="pt-5 pb-3 space-y-1">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="px-4 pt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      <div className="py-2 px-4 bg-blue-50 rounded-md">
                        <p className="text-sm font-medium text-blue-700 truncate">
                          {getDisplayName()}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-full text-sm font-medium hover:bg-red-50 transition"
                      >
                        {t("logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsLoginOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
                      >
                        {t("login")}
                      </button>
                      {/* <button
                        onClick={() => {
                          setIsSignupOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition"
                      >
                        {t("singup")}
                      </button> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          // Check if user logged in after modal closes
          if (isAuthenticated()) {
            const userData = getUserFromCookies();
            if (userData) {
              setUser(userData);
            }
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
          // Check if user signed up after modal closes
          if (isAuthenticated()) {
            const userData = getUserFromCookies();
            if (userData) {
              setUser(userData);
            }
          }
        }}
        onSwitchModal={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;
