'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTranslations } from "next-intl";

import Image from 'next/image';

// Define the Testimonial type with stars
interface Testimonial {
  name: string;
  image: string;
  testimonial: string;
  stars?: number;
}

// Testimonial data with added star ratings
const testimonials: Testimonial[] = [
  {
    image: "/images/testimonials/hager.png",
    name: "Hagar Elnahhas",
    testimonial: "The support and resources provided by LinkedMed helped me secure my position as a pharmacist (Approbierte). To do so, the platform/company sharpened both my medical knowledge and my language skills to prepare me well for this position.",
    stars: 5
  },
  {
    image: "/images/testimonials/RebicaMuller.jpg",
    name: "Rebica Müller",
    testimonial: "LinkedMed provides well- prepared, qualified healthcare professionals. Their recruitment process ensures seamless integration into our hospital. A trusted partner for hiring skilled international medical staff!",
    stars: 5
  },
  {
    image: "/images/testimonials/AhmedSabri.jpg",
    name: "Ahmed Sabri",
    testimonial: "LinkedMed helped me achieve training to document verification, their support was my dream of working in Germany! From language incredible. Now, I'm happily working in a top Berlin hospital!",
    stars: 5
  },
  {
    image: "/images/testimonials/SaraDabagh.jpg",
    name: "Sara Dabagh",
    testimonial: "Navigating the visa process was overwhelming, but LinkedMed handled everything professionally. Their expertise ensured a smooth journey, and today, I'm a licensed pharmacist in Germany. Highly recommended!",
    stars: 4
  },
  {
    image: "/images/testimonials/FatimaM.jpg",
    name: "Fatima M",
    testimonial: "LinkedMed's German courses and exam preparation made learning easy. Their guidance gave me confidence to pass my exams and secure a nursing job in Germany. Truly life- changing!",
    stars: 5
  },
  {
    image: "/images/testimonials/SalmaHany.jpg",
    name: "Salma Hany",
    testimonial: "Thanks to LinkedMed, I gained great insight on the crucial role of a pharmacist during my internship (Praktikum) in easy Apotheke for 2 weeks. It enriched my skill pack and experience",
    stars: 4
  },
];

const CustomerReviewSlider: React.FC = () => {
  
  const t = useTranslations("Testimonials");
  
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  // Initialize with null and include null in the type
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardWidth = 320; // This should match the width of your cards with margin
  const scrollSpeed = 1.5; // pixels per frame - increase for faster scrolling

  // Create an extended array for infinite scrolling effect
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Smooth scrolling animation
  const animateScroll = () => {
    if (scrollContainerRef.current && !isPaused) {
      scrollContainerRef.current.scrollLeft += scrollSpeed;

      // Reset scroll position when we've scrolled through a complete set of testimonials
      if (scrollContainerRef.current.scrollLeft >= testimonials.length * cardWidth) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  // Handle manual navigation with exact page control
  const handleScroll = (direction: 'left' | 'right') => {
    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    setIsPaused(true);

    const max = testimonials.length;
    const nextIndex = direction === 'left'
      ? (currentIndex - 1 + max) % max
      : (currentIndex + 1) % max;

    setCurrentIndex(nextIndex);

    scrollContainerRef.current?.scrollTo({
      left: nextIndex * cardWidth,
      behavior: 'smooth'
    });

    // Resume auto-scroll after 3 seconds
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
  };

  // Setup and cleanup animation
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isPaused]);

  // Render stars based on rating
  const renderStars = (starCount: number = 5) => {
    return (
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < starCount ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-50 py-6 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-['Satoshi_Variable'] text-gray-900 mb-4">{t('customerReviews')}</h2>

        <div className="relative">
          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Cards */}
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-64 md:w-72 lg:w-80 mx-2.5 flip-card h-80"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flip-card-inner">
                  {/* Front of card */}
                  <div className="flip-card-front rounded-lg overflow-hidden shadow-sm bg-black">
                    <div className="w-full h-full relative">
                      <Image
                        src={testimonial.image || '/api/placeholder/300/300'}
                        alt={testimonial.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        priority={index < 4}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 p-3 backdrop-blur-sm">
                        <h3 className="font-['Satoshi_Variable'] text-white bg-black py-1">{t(testimonial.name)}</h3>
                        {renderStars(testimonial.stars)}
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="flip-card-back bg-blue-900 text-white rounded-lg overflow-hidden shadow-sm p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-['Satoshi_Variable'] text-lg mb-3">{t(testimonial.name)}</h3>
                      <p className="text-sm leading-relaxed overflow-y-auto max-h-40">
                        {t(testimonial.testimonial)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-4 px-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-200 z-10"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => handleScroll('right')}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-200 z-10"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS for flip cards and scroll hiding */}
      <style jsx>{`
        .flip-card {
          background-color: transparent;
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        /* Hide scrollbar */
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CustomerReviewSlider;
