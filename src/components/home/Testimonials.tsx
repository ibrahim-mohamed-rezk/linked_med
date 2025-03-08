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
    if (!isVisible) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? -1 : 1;
      const maxRotation = 11;
      const minRotation = -10;

      setRotation((prev) => {
        const newRotation = prev + direction * 0.6;
        return Math.max(minRotation, Math.min(maxRotation, newRotation));
      });

      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, lastScrollY]);

  const testimonials = [
    {
      image: "/images/testimonials/SusiSmith.jpg",
      name: "Susi Smith",
      testimonial:
        "LinkedMed's career guidance and job placement support helped me secure my ideal role in Germany. Their professional and personalized approach made everything smooth. Highly recommended!",
    },
    {
      image: "/images/testimonials/RebicaMüller.jpg",
      name: "Rebica Müller",
      testimonial:
        "LinkedMed provides well- prepared, qualified healthcare professionals. Their recruitment process ensures seamless integration into our hospital. A trusted partner for hiring skilled international medical staff!",
    },
    {
      image: "/images/testimonials/AhmedSabri.jpg",
      name: "Ahmed Sabri",
      testimonial:
        "LinkedMed helped me achieve training to document verification, their support was my dream of working in Germany! From language incredible. Now, I'm happily working in a top Berlin hospital!",
    },
    {
      image: "/images/testimonials/SaraDabagh.jpg",
      name: "Sara Dabagh",
      testimonial:
        "Navigating the visa process was overwhelming, but LinkedMed handled everything professionally. Their expertise ensured a smooth journey, and today, I'm a licensed pharmacist in Germany. Highly recommended!",
    },
    {
      image: "/images/testimonials/FatimaM.jpg",
      name: "Fatima M",
      testimonial:
        "LinkedMed's German courses and exam preparation made learning easy. Their guidance gave me confidence to pass my exams and secure a nursing job in Germany. Truly life- changing!",
    },
    {
      image: "/images/testimonials/SalmaHany.jpg",
      name: "Salma Hany",
      testimonial:
        "Thanks to LinkedMed, I gained great insight on the crucial role of a pharmacist during my internship (Praktikum) in easy Apotheke for 2 weeks. It enriched my skill pack and experience",
    },
  ];

  return (
    <div ref={sectionRef} className="w-full">
      <div className="w-full ">
        <section className="sticky top-0 w-full h-screen">
          <div className="relative w-full h-screen overflow-hidden">
            <div
              style={{
                WebkitTextStroke: "3px #578bfd",
              }}
              className="absolute w-full top-[-620px] inset-0 flex items-center justify-center"
            >
              <h2 className="relative opacity-10 justify-center text-[#8cb0fd]/60 text-[clamp(55px,15.625vw,300px)] font-bold font-['Inter']">
                Testimonials
              </h2>
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
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="kz-cardwheel-item flex-shrink-0 translate-y-[-300rem] mb-0 rounded-[5rem]"
                      >
                        <TestimonialCard testimonial={testimonial} />
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
