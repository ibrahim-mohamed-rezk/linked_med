'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Testimonial {
  name: string;         // This is now a translation key
  testimonial: string;  // This is now a translation key
  image: string;
  stars?: number;
}

const testimonials: Testimonial[] = [
  {
    image: "/images/testimonials/hager.png",
    name: "hagar_name",
    testimonial: "hagar_testimonial",
    stars: 5
  },
  {
    image: "/images/testimonials/RebicaMuller.jpg",
    name: "rebica_name",
    testimonial: "rebica_testimonial",
    stars: 5
  },
  {
    image: "/images/testimonials/AhmedSabri.jpg",
    name: "ahmed_name",
    testimonial: "ahmed_testimonial",
    stars: 5
  },
  {
    image: "/images/testimonials/SaraDabagh.jpg",
    name: "sara_name",
    testimonial: "sara_testimonial",
    stars: 4
  },
  {
    image: "/images/testimonials/FatimaM.jpg",
    name: "fatima_name",
    testimonial: "fatima_testimonial",
    stars: 5
  },
  {
    image: "/images/testimonials/SalmaHany.jpg",
    name: "salma_name",
    testimonial: "salma_testimonial",
    stars: 4
  },
];

const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cardWidth = 380;
  const scrollSpeed = 1.5;

  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const t = useTranslations('footer');

  const animateScroll = () => {
    if (scrollContainerRef.current && !isPaused) {
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
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  });

  const renderStars = (starCount: number = 5) => {
    return (
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < starCount ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div id="testimonials" className="h-screen max-w-[1920px] h-100vh mx-auto w-full px-2 sm:px-3 md:px-[4vw] lg:px-[8vw] mt-40">
      <div className="w-full">
        <h2 className="text-2xl flex text-end sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight md:leading-snug text-white md:text-left font-ar">
          {t("Testimonials")}
        </h2>

        <div className="relative mt-10">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-80 md:w-86 lg:w-96 mx-3 flip-card h-96"
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
                      <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 p-4 backdrop-blur-sm">
                        <h3 className="font-en text-lg text-white bg-black py-2 px-2 rounded">
                          {t(testimonial.name)}
                        </h3>
                        {renderStars(testimonial.stars)}
                      </div>
                    </div>
                  </div>

                  <div className="flip-card-back bg-blue-900 text-white rounded-xl overflow-hidden shadow-lg p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="font-en text-xl mb-4">{t(testimonial.name)}</h3>
                      <p className="text-base leading-relaxed overflow-y-auto max-h-48">
                        {t(testimonial.testimonial)}
                      </p>
                    </div>
                    <div className="mt-4">
                      {renderStars(testimonial.stars)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-8 mt-6 px-6">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 z-10"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 z-10"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-6 w-6" />
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
      `}</style>
    </div>
  );
};

export default Testimonials;
