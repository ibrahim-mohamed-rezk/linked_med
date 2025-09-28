"use client";

import { useState, useEffect, useRef } from "react";
import "../../../../public/css/home.css";
import { useLocale, useTranslations } from "next-intl";
import { FolderCheck } from "lucide-react";
// import dots from "/public/images/logo.ico";
// import Image from "next/image";
import { getData } from "@/libs/server/server";
import ServicesComponent from "@/components/home/Services";

interface Service {
  id: string;
  icon: string;
  type: string;
  image: string;
  title: string;
  description: string;
  subPoints: string[];
  quoteMessage: string;
}

interface HomeData {
  "services-home-country": { id: number; title: "string" }[];
  "services-abroad": { id: number; title: "string" }[];
  videos: {
    service: { web: string; mobile: string };
  };
}

const MedicalServicesTimeline = () => {
  const t = useTranslations("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState<Service | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const loacale = useLocale();
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  const getServices = async () => {
    try {
      const response = await getData(
        "/services",
        {},
        {
          lang: loacale,
        }
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const feachData = async () => {
    try {
      const response = await getData("/home", {}, { lang: loacale });
      setHomeData(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getServices();
    feachData();
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mobile = windowWidth < 768;

      setIsMobile(mobile);

      const containerWidth = Math.min(
        windowWidth * 0.95,
        mobile ? windowWidth - 32 : 1400
      );
      const containerHeight = mobile ? windowHeight * 3 : windowHeight * 2.2;

      setDimensions({ width: containerWidth, height: containerHeight });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || services.length === 0) return;

      const viewportHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate scroll progress - starts from 0 when element enters viewport
      const scrollStart = viewportHeight - elementTop;
      const scrollRange = elementHeight + viewportHeight;
      const rawProgress = Math.max(0, Math.min(1, scrollStart / scrollRange));

      setScrollProgress(rawProgress);

      // Calculate active point based on scroll progress
      if (rawProgress > 0.05 && rawProgress < 0.95) {
        const pointIndex = Math.floor(rawProgress * services.length);
        const clampedIndex = Math.min(pointIndex, services.length - 1);

        // Calculate if we're in the "sweet spot" for showing modal
        const pointProgress = (rawProgress * services.length) % 1;
        const isInPointRange = pointProgress >= 0.2 && pointProgress <= 0.8;

        if (isInPointRange && clampedIndex !== activePoint) {
          setActivePoint(clampedIndex);
          setModalService(services[clampedIndex]);
          setShowModal(true);
        } else if (!isInPointRange && activePoint !== null) {
          setShowModal(false);
          setActivePoint(null);
          setModalService(null);
        }
      } else {
        setActivePoint(null);
        setShowModal(false);
        setModalService(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePoint, services]);

  const getServicePositions = () => {
    const { width, height } = dimensions;

    if (isMobile) {
      const startY = height * 0;
      const endY = height * 0.88;
      const spacing =
        services.length > 1 ? (endY - startY) / (services.length - 1) : 0;

      return services.map((_, idx) => ({
        x: width * 0.5,
        y: startY + idx * spacing,
      }));
    } else {
      // Desktop positions for up to 5 services
      const positions = [
        { x: width * 0.5, y: height * 0.1 },
        { x: width * 0.8, y: height * 0.32 },
        { x: width * 0.2, y: height * 0.48 },
        { x: width * 0.2, y: height * 0.68 },
        { x: width * 0.8, y: height * 0.85 },
      ];

      return services.map(
        (_, idx) =>
          positions[idx] || { x: width * 0.5, y: height * (0.1 + idx * 0.2) }
      );
    }
  };

  const servicePositions = getServicePositions();

  const scrollToPoint = (idx: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const viewHeight = window.innerHeight;
    const targetProgress = (idx + 0.5) / services.length;
    const targetY =
      window.pageYOffset +
      rect.top +
      rect.height * targetProgress -
      viewHeight * 0.5;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
  };

  const createPathData = () => {
    const { width, height } = dimensions;

    if (isMobile) {
      const centerX = width * 0.5;
      const startY = height * 0.02;
      const endY = height * 0.98;
      return `M ${centerX} ${startY} L ${centerX} ${endY}`;
    } else {
      const centerX = width * 0.5;
      const leftX = width * 0.08;
      const rightX = width * 0.92;
      const curveRadius = Math.min(width * 0.03, 30);

      return `
        M ${centerX} 0 
        L ${centerX} ${height * 0.1} 
        Q ${centerX} ${height * 0.12}, ${centerX + curveRadius} ${
        height * 0.12
      } 
        L ${rightX - curveRadius} ${height * 0.12} 
        Q ${rightX} ${height * 0.12}, ${rightX} ${height * 0.14} 
        L ${rightX} ${height * 0.36} 
        Q ${rightX} ${height * 0.38}, ${rightX - curveRadius} ${height * 0.38} 
        L ${leftX + curveRadius} ${height * 0.38} 
        Q ${leftX} ${height * 0.38}, ${leftX} ${height * 0.4} 
        L ${leftX} ${height * 0.72} 
        Q ${leftX} ${height * 0.74}, ${leftX + curveRadius} ${height * 0.74} 
        L ${rightX - curveRadius} ${height * 0.74} 
        Q ${rightX} ${height * 0.74}, ${rightX} ${height * 0.76} 
        L ${rightX} ${height * 0.85}
        Q ${rightX} ${height * 0.89}, ${rightX - curveRadius} ${height * 0.89}
        L ${centerX + curveRadius} ${height * 0.89}
        Q ${centerX} ${height * 0.89}, ${centerX} ${height * 0.91}
        L ${centerX} ${height * 0.98}
      `
        .replace(/\s+/g, " ")
        .trim();
    }
  };

  const pathData = createPathData();
  const estimatedPathLength = isMobile
    ? dimensions.height * 1.4
    : dimensions.width * 3 + dimensions.height * 0.8;

  // Fixed path animation - when scrollProgress is 0, show no path
  const strokeDashoffset =
    scrollProgress === 0
      ? estimatedPathLength
      : estimatedPathLength * (1 - scrollProgress);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return (
      <main className="min-h-screen bg-slate-900 overflow-x-hidden relative flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/70">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-900 overflow-x-hidden relative">
      {/* Simple background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <ServicesComponent
        servicesHomeCountry={
          (homeData && homeData["services-home-country"]) || []
        }
        servicesAbroad={(homeData && homeData["services-abroad"]) || []}
        data={(homeData && homeData.videos.service) || { web: "", mobile: "" }}
      />

      {/* Extended Hero section - Full viewport height */}
      <div className="relative z-10 min-h-[40vh] -mt-[clamp(10px,7vw,100px)] flex flex-col items-center justify-center text-center">
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">{t("Scroll to explore")}</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
   

      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-7xl px-4"
        style={{ height: `${dimensions.height}px` }}
      >
        <svg
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className="absolute inset-0 z-10 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background path */}
          <path
            d={pathData}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={isMobile ? "3" : "4"}
            strokeLinecap="round"
          />

          {/* Animated path - starts from 0 length when at top */}
          <path
            d={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={isMobile ? "4" : "6"}
            strokeLinecap="round"
            strokeDasharray={estimatedPathLength}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.1s ease-out",
            }}
          />
        </svg>

        {/* Service points */}
        <div className="absolute inset-0 z-20">
          {services.map((service, idx) => {
            const { x, y } = servicePositions[idx] || { x: 0, y: 0 };
            const isActive = activePoint === idx;

            // Calculate visibility based on scroll progress
            const pointProgress = idx / services.length;
            const nextPointProgress = (idx + 1) / services.length;
            const buffer = 0.1;

            const inRange =
              scrollProgress >= pointProgress - buffer &&
              scrollProgress <= nextPointProgress + buffer;

            return (
              <div
                key={service.id}
                className={`absolute cursor-pointer transition-all duration-700 ease-out ${
                  inRange ? "opacity-100" : "opacity-30"
                } ${
                  isActive ? "scale-110" : inRange ? "scale-100" : "scale-85"
                }`}
                style={{
                  top: y,
                  left: x,
                  transform: `translate(-50%, -50%) ${
                    isActive
                      ? "translateY(-12px)"
                      : inRange
                      ? "translateY(0px)"
                      : "translateY(8px)"
                  }`,
                }}
                onClick={() => scrollToPoint(idx)}
              >
                <div className="flex flex-col items-center gap-3">
                  {/* ID badge */}
                  <div
                    className={`
                    px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-500
                    ${
                      isActive
                        ? "bg-blue-500/20 text-white border border-blue-400/50"
                        : "bg-white/5 text-white/60 border border-white/10"
                    }
                  `}
                  >
                    {service.id}
                  </div>

                  {/* Service card */}
                  <div
                    className={`
                    group relative backdrop-blur-xl rounded-2xl transition-all duration-700 transform
                    ${
                      isActive
                        ? "bg-white/15 shadow-2xl border border-white/30 scale-105"
                        : "bg-white/5 shadow-lg border border-white/10 hover:bg-white/10"
                    }
                  `}
                  >
                    {/* Content */}
                    <div className="relative flex items-center gap-4 px-4 py-3 md:px-6 md:py-4">
                      <div
                        className={`
                        p-2 rounded-xl transition-all duration-500 
                        ${isActive ? "bg-blue-500 shadow-lg" : "bg-blue-600"}
                      `}
                      >
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-6 h-6 text-white"
                          />
                        ) : (
                          <FolderCheck className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm md:text-base whitespace-nowrap">
                          {service.title}
                        </h3>
                        {isActive && (
                          <p
                            className="text-white/70 text-xs mt-1 max-w-48 hidden md:block"
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "normal",
                              display: "-webkit-box",
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: "vertical",
                              maxHeight: "5.5em",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: service.description,
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-sm -z-10"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && modalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10 max-w-4xl w-full mx-auto transform transition-all duration-300 scale-100 animate-fadeIn overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center gap-4 mb-6">
              <div className="flex gap-3">
                <div className="p-3 rounded-xl bg-blue-500">
                  {modalService.image ? (
                    <img
                      src={modalService.image}
                      alt={modalService.title}
                      className="w-6 h-6 text-white"
                    />
                  ) : (
                    <FolderCheck className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <div className="text-blue-400 text-sm font-mono">
                    {modalService.id}
                  </div>
                  <h3 className="font-bold text-white text-xl md:text-2xl">
                    {modalService.title}
                  </h3>
                </div>
              </div>
              <div>
                <button
                  onClick={() => setShowModal(false)}
                  className="ml-auto p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <div
              className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed overflow-auto max-h-[40vh] md:max-h-[50vh] pr-2"
              style={{
                wordBreak: "break-word",
                WebkitOverflowScrolling: "touch",
              }}
              dangerouslySetInnerHTML={{ __html: modalService.description }}
            ></div>

            {/* Key Services */}
            {modalService.subPoints && modalService.subPoints.length > 0 && (
              <div className="mb-8">
                <h4 className="text-white font-semibold text-lg mb-4">
                  {t("Key Services")}:
                </h4>
                <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {modalService.subPoints.map((point, pointIdx) => (
                    <li key={pointIdx} className="flex items-start gap-3 group">
                      <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                      <span className="text-white/80 group-hover:text-white transition-colors leading-relaxed">
                        {t(point)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Testimonial */}
            {modalService.quoteMessage && (
              <blockquote className="italic text-white/90 text-lg md:text-xl border-l-4 border-blue-500 pl-4 pt-1 mt-6">
                &quot;{t(modalService.quoteMessage.replace(/^"|"$/g, ""))}&quot;
              </blockquote>
            )}
          </div>
        </div>
      )}

      {/* Referral & Community Engagement Section */}
      <div className="relative z-10 mt-20 px-4 max-w-4xl mx-auto pb-20">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Referral & Community Engagement")}
            </h2>
            <p className="text-xl md:text-2xl text-blue-400 font-medium">
              {t("Because You're Family")}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">
                  {t("Cash")}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">
                  {t("A dedicated")}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">
                  {t("Lifelong")}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">
                  {t("Invitations")}
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <blockquote className="text-white/90 italic text-lg leading-relaxed">
                {t("My friend")}
              </blockquote>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🎉</span>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
                {t("LinkedMed is more")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MedicalServicesTimeline;
