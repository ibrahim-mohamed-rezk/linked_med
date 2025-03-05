"use client";

import React, { useEffect, useState, useRef } from "react";
import TestimonialCard from "../cards/TestimonialCard";

const Testimonials = () => {
  const [rotation, setRotation] = useState(11);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsVisible(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isVisible) return; // If not visible, keep current rotation

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? -1 : 1; // Reverse rotation direction on scroll up
      const maxRotation = 11;
      const minRotation = -10;

      setRotation((prev) => {
        const newRotation = prev + direction * 0.6; // Adjust rotation speed
        return Math.max(minRotation, Math.min(maxRotation, newRotation)); // Clamp rotation
      });

      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, lastScrollY]);

  return (
    <div ref={sectionRef} className="w-full">
      <div className="w-full ">
        <section className="sticky top-0 w-full h-screen bg-[#d6d8e2]">
          <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute w-full inset-0 flex items-center justify-center -translate-x-8">
              <svg
                className="absolute"
                width="100%"
                height="2623"
                viewBox="0 0 2311 2623"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1206.54 1070.04L2307.17 2620.64H1659.74L837.501 1471.45L552.632 1782.21V2620.64H2.31641L2.31641 1.78223L552.632 1.78223L552.632 1089.46L1549.67 1.78223L2190.63 1.78223L1206.54 1070.04Z"
                  stroke="white"
                  strokeWidth="3"
                ></path>
              </svg>
            </div>
            <div className="">
              <div className="inset-0 absolute flex items-center justify-center">
                <div className="relative inline-flex justify-center items-center w-full h-full will-change-transform">
                  <div
                    style={{
                      transform: `rotate(${isVisible ? rotation : 11}deg)`,
                    }}
                    className={`flex items-center  translate-y-[300rem] ease-in-out justify-center gap-[50px] will-change-transform transform`}
                  >
                    {[1, 2, 3, 4].map((_, index) => (
                      <div
                        key={index}
                        className="kz-cardwheel-item flex-shrink-0 translate-y-[-300rem] mb-0 rounded-[5rem]"
                      >
                        <TestimonialCard />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex h-[700px]"></div>
      </div>
    </div>
  );
};

export default Testimonials;
