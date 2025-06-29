"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const steps = [
  {
    titleKey: "Journey.Step1.Title",
    itemsKey: "Journey.Step1.Items",
  },
  {
    titleKey: "Journey.Step2.Title",
    itemsKey: "Journey.Step2.Items",
  },
  {
    titleKey: "Journey.Step3.Title",
    itemsKey: "Journey.Step3.Items",
  },
  {
    titleKey: "Journey.Step4.Title",
    itemsKey: "Journey.Step4.Items",
  },
  {
    titleKey: "Journey.Step5.Title",
    itemsKey: "Journey.Step5.Items",
  },
  {
    titleKey: "Journey.Step6.Title",
    itemsKey: "Journey.Step6.Items",
  },
  {
    titleKey: "Journey.Step7.Title",
    itemsKey: "Journey.Step7.Items",
  },
];

const MyJourneyTab: React.FC = () => {
  const t = useTranslations("Profile");
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const progress = Math.min(scrollTop / (scrollHeight - clientHeight), 1);
      setScrollProgress(progress);
    };
    const c = containerRef.current;
    c?.addEventListener("scroll", handleScroll);
    return () => c?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  if (!containerRef.current || stepRefs.current.length === 0) return;

  // ✅ Copy ref to local variable
  const currentStepRefs = [...stepRefs.current];
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSteps = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSteps.length > 0) {
        const index = currentStepRefs.findIndex((el) => el === visibleSteps[0].target);
        if (index !== -1) setActiveStep(index);
      }
    },
    {
      root: containerRef.current,
      rootMargin: "-30% 0px -30% 0px",
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
    }
  );

  currentStepRefs.forEach((el) => {
    if (el) observer.observe(el);
  });

  return () => {
    currentStepRefs.forEach((el) => {
      if (el) observer.unobserve(el);
    });
  };
}, [stepRefs]);

  const progressPercent = Math.max(((activeStep + 1) / steps.length) * 100, scrollProgress * 100);

  const scrollToStep = (i: number) => {
    const el = stepRefs.current[i];
    const c = containerRef.current;
    if (el && c) {
      const offset = el.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop - 120;
      c.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl shadow overflow-y-auto max-h-screen scrollbar-hide"
    >
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm pt-4 pb-3 z-50 border-b border-gray-200 shadow-sm">
        <div className="px-4">
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="h-3 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 relative"
                style={{ width: `${progressPercent}%` }}
                aria-label={t("Journey.ProgressLabel", { step: activeStep + 1, total: steps.length })}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>

            <div className="flex justify-between mt-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToStep(idx)}
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                    idx <= activeStep ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 hover:border-blue-400"
                  }`}
                  title={t("Journey.GoToStep", { num: idx + 1 })}
                  aria-label={t("Journey.GoToStep", { num: idx + 1 })}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-600">{t("Journey.ProgressText", { step: activeStep + 1, total: steps.length })}</p>
              <p className="text-xs text-blue-600 font-medium">{Math.round(progressPercent)}% {t("Journey.Complete")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-4 pt-6">
        {steps.map((step, idx) => {
  const items = t.raw(step.itemsKey) as string[];

  return (
    <div
      key={step.titleKey}
      ref={(el) => {
  stepRefs.current[idx] = el;
}}

      className={`border-l-4 pl-4 py-3 rounded-r-lg transition-all duration-500 ${
        idx === activeStep
          ? "border-blue-600 bg-blue-50/50 shadow-md scale-[1.01]"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50/50"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm ${
            idx <= activeStep ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          {idx + 1}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{t(step.titleKey)}</h3>
        {idx <= activeStep && <span className="text-green-600 text-lg">✓</span>}
      </div>

      <ul className="list-disc list-inside text-gray-700 ml-9 space-y-1.5 text-sm">
        {items.map((it, id) => (
          <li
            key={id}
            className={`transition-all duration-300 ${
              idx === activeStep ? "animate-fade-in opacity-100" : "opacity-75"
            }`}
            style={{ animationDelay: `${id * 100}ms` }}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
})}

      </div>

      <div className="px-4 pb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <p className="text-gray-700 flex items-center gap-2 text-sm italic">
            📍 {t("Journey.InfoText")}
          </p>
        </div>
      </div>

      <style jsx>{`
        ::-webkit-scrollbar { display: none; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MyJourneyTab;
