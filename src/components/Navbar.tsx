"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { langs } from "@/libs/data/langs";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { LoginModal } from "./AuthModals";
import { SignupModal } from "./AuthModals";
import Image from "next/image";
// import { UserRound } from "lucide-react";
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
      <nav
        className="w-full rounded-bl-[20px] rounded-br-[20px] shadow-md"
        style={{ background: "linear-gradient(to right, #F3EBFC, #E5EEFC)" }}
      >
        <div className="max-w-[1900px] mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex w-full justify-between items-center h-16 relative z-20">
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

              {/* Desktop Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Language Switcher */}
                <div className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/50 transition-all duration-200"
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
                        className={`h-5 w-5 ml-2 transition-transform duration-200 ${
                          isLangOpen ? "rotate-180" : ""
                        }`}
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
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                      <div className="py-1">
                        {langs.map((lang) => (
                          <div
                            key={lang.value}
                            onClick={() => {
                              changeLang(lang.value);
                              setIsLangOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0"
                          >
                            <Image
                              src={`/images/${lang.value}.svg`}
                              width={24}
                              height={16}
                              className="rounded"
                              alt={lang.label}
                            />
                            {lang.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu or Auth Buttons */}
                {user ? (
                  <div
                    className="relative flex gap-2 items-center"
                    ref={userMenuRef}
                  >
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
                      <div
                        className={`absolute  top-12 ${
                          locale === "ar" ? "left-12 " : "right-12 "
                        } w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50`}
                      >
                        <div className="py-1">
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            {t("logout")}
                          </button>
                          <Link href="/myprofile" locale={locale}>
                            <div className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100">
                              <h1>{t("Profile")}</h1>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="px-8 py-2 gradient-btn text-white text-sm rounded-full font-medium  transition"
                    >
                      {t("login")}
                    </button>
                    <Link href="/employers" className="hidden lg:block">
                      <button className="px-4 py-2 gradient-btn text-white text-sm rounded-full font-medium  transition">
                        {t("employers")}
                      </button>
                    </Link>
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
                  className="p-3 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
            className={`fixed top-0 inset-0 z-40 lg:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Mobile Menu Panel */}
            <div
              className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={100}
                    height={40}
                    className="w-[100px] h-[40px]"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-white/70 transition-all duration-200"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col h-full">
                {/* Navigation Items */}
                <div className="flex-1 py-6">
                  <div className="space-y-2 px-4">
                    {navItems.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.label}
                        </span>
                        {/* <svg className="w-5 h-5 ml-auto text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg> */}
                      </Link>
                    ))}
                  </div>

                  {/* User Menu (if user is logged in) */}
                  {user && (
                    <div className="px-4 mt-8">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-3">
                          {locale === "ar" ? "الحساب" : "Account"}
                        </h3>
                        <div className="space-y-2">
                          <Link 
                            href="/myprofile" 
                            locale={locale}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-3 bg-white hover:bg-blue-50 rounded-lg transition-all duration-200 group border border-gray-200 hover:border-blue-300"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                {t("Profile")}
                              </span>
                              <p className="text-xs text-gray-500 truncate">
                                {getDisplayName()}
                              </p>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full p-3 bg-white hover:bg-red-50 rounded-lg transition-all duration-200 group border border-gray-200 hover:border-red-300"
                          >
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors duration-200">
                              {t("logout")}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Language Switcher */}
                  <div className="px-4 mt-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-gray-600 mb-3">
                        {locale === "ar" ? "اللغة" : "Language"}
                      </h3>
                      <div className="relative">
                        <div
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-all duration-200"
                          onClick={() => setIsLangOpen(!isLangOpen)}
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={`/images/${locale}.svg`}
                              width={32}
                              height={20}
                              className="rounded"
                              alt="lang"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {langs.find((l) => l.value === locale)?.label}
                            </span>
                          </div>
                          <svg
                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                              isLangOpen ? "rotate-180" : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        
                        {isLangOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                            {langs.map((lang) => (
                              <div
                                key={lang.value}
                                onClick={() => {
                                  changeLang(lang.value);
                                  setIsLangOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0"
                              >
                                <Image
                                  src={`/images/${lang.value}.svg`}
                                  width={24}
                                  height={16}
                                  className="rounded"
                                  alt={lang.label}
                                />
                                {lang.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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