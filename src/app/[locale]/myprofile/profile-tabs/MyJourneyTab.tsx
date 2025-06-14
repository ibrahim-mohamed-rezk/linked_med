"use client";

import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Step 1: Registration",
    items: ["Account Created", "Initial Assessment Completed"],
  },
  {
    title: "Step 2: Document Submission",
    items: [
      "Upload Required Documents (e.g., Passport, Degree, License)",
      "Document Review by LinkedMed Team",
      "Certified Translations Initiated (if required)",
    ],
  },
  {
    title: "Step 3: Language Preparation",
    items: [
      "Enrollment in General German Language Course",
      "Enrollment in Scientific Language Course (Fachsprachprüfung Prep)",
    ],
  },
  {
    title: "Step 4: Embassy Process",
    items: [
      "Embassy Appointment Scheduled",
      "Embassy Interview Training and Simulation",
    ],
  },
  {
    title: "Step 5: Job Placement",
    items: [
      "Job Interview Preparation & Coaching",
      "Interviews with Healthcare Employers",
      "Final Selection and Offer Negotiation",
    ],
  },
  {
    title: "Step 6: Contract Finalization",
    items: [
      "Contract Review and Signing",
      "Legal and Administrative Verification",
    ],
  },
  {
    title: "Step 7: Onboarding & Relocation",
    items: [
      "Travel Coordination and Relocation Support",
      "Housing and Arrival Assistance",
      "Integration and First-Day Support",
    ],
  },
];

const MyJourneyTab: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (!stepRefs.current.length || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the step most visible in viewport
        const visibleSteps = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSteps.length > 0) {
          const index = stepRefs.current.findIndex(
            (el) => el === visibleSteps[0].target
          );
          if (index !== -1) setActiveStep(index);
        }
      },
      {
        root: containerRef.current,
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      stepRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const progressPercent = Math.max(
    ((activeStep + 1) / steps.length) * 100,
    scrollProgress * 100
  );

  const scrollToStep = (stepIndex: number) => {
    const stepElement = stepRefs.current[stepIndex];
    const container = containerRef.current;
    
    if (stepElement && container) {
      // Get the bounding rect of the step element relative to the container
      const containerRect = container.getBoundingClientRect();
      const stepRect = stepElement.getBoundingClientRect();
      
      // Calculate the relative position
      const relativeTop = stepRect.top - containerRect.top + container.scrollTop;
      
      // Account for the sticky header (approximately 120px)
      const stickyHeaderHeight = 120;
      const targetScrollTop = relativeTop - stickyHeaderHeight;

      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full m-auto mx-auto bg-white rounded-2xl shadow overflow-y-auto max-h-screen scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Sticky Progress Bar Container */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm pt-4 pb-3 z-50 border-b border-gray-200 shadow-sm">
        <div className="px-4">
          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="h-3 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out relative"
                style={{ width: `${progressPercent}%` }}
                aria-label={`Progress: Step ${activeStep + 1} of ${
                  steps.length
                }`}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>

            {/* Step indicators on progress bar */}
            <div className="flex justify-between mt-1.5">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToStep(index)}
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 hover:scale-110 cursor-pointer ${
                    index <= activeStep
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-300 hover:border-blue-400"
                  }`}
                  title={`Go to ${steps[index].title}`}
                  aria-label={`Jump to ${steps[index].title}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-600">
              Progress: Step {activeStep + 1} of {steps.length}
            </p>
            <p className="text-xs text-blue-600 font-medium">
              {Math.round(progressPercent)}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Steps Content */}
      <div className="space-y-8 p-4 pt-6">
        {steps.map((step, index) => (
          <div
            key={step.title}
            ref={(el) => {
              if (el) {
                stepRefs.current[index] = el;
              }
            }}
            className={`border-l-4 pl-4 py-3 rounded-r-lg transition-all duration-500 ${
              index === activeStep
                ? "border-blue-600 bg-blue-50/50 shadow-md transform scale-[1.01]"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50/50"
            }`}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm transition-colors duration-300 ${
                  index <= activeStep ? "bg-blue-600" : "bg-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              {index <= activeStep && (
                <span className="text-green-600 text-lg">✓</span>
              )}
            </div>

            <ul className="list-disc list-inside text-gray-700 ml-9 space-y-1.5 text-sm">
              {step.items.map((item, itemIndex) => (
                <li
                  key={item}
                  className={`transition-all duration-300 ${
                    index === activeStep
                      ? "animate-fade-in opacity-100"
                      : "opacity-75"
                  }`}
                  style={{
                    animationDelay: `${itemIndex * 100}ms`,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="px-4 pb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <p className="text-gray-700 flex items-center gap-2 text-sm">
            <span className="text-xl">📍</span>
            <span className="italic">
              Track your progress in real-time through this visual timeline in
              your LinkedMed portal. Click on the progress indicators to jump to
              specific steps!
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MyJourneyTab;