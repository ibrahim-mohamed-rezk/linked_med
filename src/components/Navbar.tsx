"use client";

import { langs } from "@/libs/data/langs";
import React, { useEffect, useState, useRef } from "react";

interface Lang {
  label: string;
  value: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>({
    label: "Arabic",
    value: "ar",
  });
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(JSON.parse(storedLanguage));
    }
  }, []);

  const navItems = ["Home", "Services", "Portfolio", "Pricing", "About"];

  return (
    <nav className="w-full bg-white rounded-bl-[20px] rounded-br-[20px] shadow-md">
      <div className="container !mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex w-full justify-between items-center z-50 relative h-16">
            <div className="flex-shrink-0">
              <div className="bg-[#96b8ff] rounded-lg p-2">
                <span className="text-black text-lg font-bold font-['Satoshi_Variable']">
                  Logo
                </span>
              </div>
            </div>

            <div className="hidden md:flex">
              <div className="ml-10 flex items-center space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-800 hover:text-blue-600 transition-colors duration-200 text-sm font-medium font-['Satoshi_Variable']"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="ml-3 relative">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2"
                >
                  <div>
                    <img
                      src={`/images/${selectedLanguage.value}.svg`}
                      alt="language"
                    />
                  </div>
                  <button className="appearance-none bg-transparent border-none pr-8 py-2 text-[#5e6278] text-xs font-semibold font-['Inter'] focus:outline-none flex items-center">
                    {selectedLanguage.label}
                    <svg
                      className="h-5 w-5 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white border border-[#f1f1f2] ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {langs.map((language) => (
                        <a
                          key={language.value}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => {
                            setSelectedLanguage(language);
                            setIsOpen(false);
                          }}
                        >
                          {language.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button className="bg-[#96b8ff] hidden md:flex items-center justify-center px-[20px] py-[10px] text-white rounded-full text-sm font-bold font-['Satoshi_Variable']">
                Contact Us
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className={`md:hidden fixed top-[66px] inset-0 z-20 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div
            className={`fixed top-[66px] right-0 bottom-0 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="pt-5 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item}
                </a>
              ))}
              <button className="w-full text-left px-4 py-2 text-base font-medium text-white bg-[#96b8ff] hover:bg-blue-700">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
