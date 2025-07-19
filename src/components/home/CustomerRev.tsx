'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Testimonial {
  id: number;
  name: string;
  testimonial: string;
  image: string;
  stars?: number;
}

const Testimonials: React.FC<{data: Testimonial[]}> = ({data}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cardWidth = 380;
  const scrollSpeed = 1.5;

  // Use the data prop instead of hardcoded testimonials
  const testimonials = data || [];
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const t = useTranslations('footer');

  const animateScroll = () => {
    if (scrollContainerRef.current && !isPaused && testimonials.length > 0) {
      scrollContainerRef.current.scrollLeft += scrollSpeed;

      if (scrollContainerRef.current.scrollLeft >= testimonials.length * cardWidth) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
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

    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      animationRef.current = requestAnimationFrame(animateScroll);
    }
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [testimonials.length,isPaused]);

  // const renderStars = (starCount: number = 5) => {
  //   return (
  //     <div className="flex items-center mt-2">
  //       {[...Array(5)].map((_, i) => (
  //         <Star
  //           key={i}
  //           size={16}
  //           className={i < starCount ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
  //         />
  //       ))}
  //     </div>
  //   );
  // };

  // Return early if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div id="testimonials" className="py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight text-white text-center md:text-left font-ar mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {t("Testimonials")}
        </h2>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden scroll-smooth gap-3 sm:gap-4 md:gap-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 md:w-86 lg:w-96 xl:w-[400px] 2xl:w-[420px] flip-card h-80 sm:h-96 md:h-[400px] lg:h-[420px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front rounded-xl overflow-hidden shadow-lg bg-black">
                    <div className="w-full h-full relative">
                      <Image
                        src={testimonial.image || '/api/placeholder/300/300'}
                        alt={testimonial.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        priority={index < 4}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 backdrop-blur-sm">
                        <div className="p-3 sm:p-4 md:p-5">
                          <h3 className="font-en text-sm sm:text-base md:text-lg text-white bg-black py-1 sm:py-2 px-2 sm:px-3 rounded">
                            {testimonial.name}
                          </h3>
                          <div className="flex items-center mt-1 sm:mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={`sm:w-4 sm:h-4 md:w-5 md:h-5 ${i < (testimonial.stars || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flip-card-back bg-blue-900 text-white rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="font-en text-base sm:text-lg md:text-xl mb-3 sm:mb-4">{testimonial.name}</h3>
                      <p className="text-xs sm:text-sm md:text-base leading-relaxed overflow-y-auto max-h-32 sm:max-h-40 md:max-h-48">
                        {testimonial.testimonial}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`sm:w-4 sm:h-4 md:w-5 md:h-5 ${i < (testimonial.stars || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 sm:space-x-6 md:space-x-8 mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 sm:p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 z-10 touch-manipulation"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 sm:p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 z-10 touch-manipulation"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </div>

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
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Mobile touch improvements */
        @media (max-width: 768px) {
          .flip-card:active .flip-card-inner {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;