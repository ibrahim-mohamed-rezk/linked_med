'use client';

import React, { useState, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { langs } from '@/libs/data/langs';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { LoginModal, SignupModal } from './AuthModals';

const Navbar = () => {
  const t = useTranslations('header');
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const changeLang = (lang: string) => {
    if (lang === locale) return;
    router.push(`/${lang}${pathname.replace(`/${locale}`, '')}`);
  };

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('services'), href: '/services' },
    { label: t('contact_us'), href: '/contact-us' },
    { label: t('about'), href: '/about' },
  ];

  return (
    <>
      <nav className="w-full bg-white rounded-bl-[20px] rounded-br-[20px] shadow-md">
        <div className="max-w-[1900px] mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex w-full justify-between items-center h-16 relative z-50">
              {/* Logo */}
              <Link href="/" className="rounded-lg p-2">
                <img
                  src="/images/logo.svg"
                  alt="Logo"
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
                      locale === 'ar' ? '' : 'font-[Satoshi_Variable]'
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
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsLangOpen(!isLangOpen)}
                  >
                    <img
                      src={`/images/${locale}.svg`}
                      className="w-[47px] h-[29px] rounded-md"
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

                {/* Auth Buttons */}
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full font-medium hover:bg-blue-700 transition"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded-full font-medium hover:bg-blue-50 transition"
                >
                  {t('singup')}
                </button>
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
              isMobileMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div
              className="fixed inset-0 bg-black/30"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div
              className={`fixed top-[66px] right-0 bottom-0 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
                  >
                    {t('login')}
                  </button>
                  <button
                    onClick={() => {
                      setIsSignupOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition"
                  >
                    {t('singup')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Page Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
};

export default Navbar;
