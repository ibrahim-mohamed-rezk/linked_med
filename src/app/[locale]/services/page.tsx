"use client";

import { useState, useEffect, useRef } from "react";
import { GraduationCap, FileText, Briefcase, Plane, FolderCheck } from "lucide-react";
import dots from "/public/images/logo.ico";
import Image from "next/image";

const services = [
  {
    id: "01",
    label: "Document Support",
    description: "Professional handling of all essential medical and legal documents",
    icon: FolderCheck,
    subPoints: [
      "Issuing Good Standing & Syndicate certificates",
      "Certified translations, notarization & embassy attestation",
      "Real-time checklist & document tracking"
    ]
  },
  {
    id: "02",
    label: "Language Training",
    description: "Comprehensive German language courses for medical professionals",
    icon: GraduationCap,
    subPoints: [
      "German courses from A1 to C2 levels",
      "Fachsprachprüfung & Kenntnisprüfung exam prep",
      "24/7 access to an intuitive e-learning platform"
    ]
  },
  {
    id: "03",
    label: "Visa & Embassy",
    description: "Complete visa and embassy support services",
    icon: FileText,
    subPoints: [
      "Visa application preparation & document management",
      "Embassy appointment scheduling & interview simulations",
      "Family reunification & pre-departure checklist"
    ]
  },
  {
    id: "04",
    label: "Job Placement",
    description: "Personalized job matching and onboarding into the German healthcare system",
    icon: Briefcase,
    subPoints: [
      "CV formatting & profile optimization",
      "Job matching with trusted hospitals",
      "Interview coaching, contract review & licensing support"
    ]
  },
  {
    id: "05",
    label: "Relocation Support",
    description: "Comprehensive relocation and integration assistance for you and your family",
    icon: Plane,
    subPoints: [
      "Travel, housing & school support",
      "Visa interviews, driving license & residency guidance",
      "Cultural orientation & post-arrival follow-up"
    ]
  }
];

const MedicalServicesTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mobile = windowWidth < 768;

      setIsMobile(mobile);

      const containerWidth = Math.min(windowWidth * 0.95, mobile ? windowWidth - 32 : 1400);
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
      if (!rect) return;

      const viewportHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const progress = Math.max(0, Math.min(1, (viewportHeight - elementTop) / (elementHeight + viewportHeight)));
      setScrollProgress(progress);

      const segment = 1 / services.length;
      const currentSegment = Math.floor(progress / segment);
      const clampedSegment = Math.min(currentSegment, services.length - 1);

      if (progress > 0.05 && progress < 0.95) {
        setActivePoint(clampedSegment);
      } else {
        setActivePoint(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dimensions]);

  const getServicePositions = () => {
    const { width, height } = dimensions;

    if (isMobile) {
      const startY = height * 0.12;
      const endY = height * 0.88;
      const spacing = (endY - startY) / (services.length - 1);

      return services.map((_, idx) => ({
        x: width * 0.5,
        y: startY + (idx * spacing)
      }));
    } else {
      const leftX = width * 0.2;
      const rightX = width * 0.8;

      return [
        { x: width * 0.5, y: height * 0.10 },
        { x: rightX, y: height * 0.32 },
        { x: leftX, y: height * 0.48 },
        { x: leftX, y: height * 0.68 },
        { x: rightX, y: height * 0.85 }, 
      ];
    }
  };

  const servicePositions = getServicePositions();

  const scrollToPoint = (idx: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const targetProgress = (idx + 0.5) / services.length;
    const targetY = window.pageYOffset + rect!.top + rect!.height * targetProgress - viewHeight * 0.5;

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
        L ${centerX} ${height * 0.10} 
        Q ${centerX} ${height * 0.12}, ${centerX + curveRadius} ${height * 0.12} 
        L ${rightX - curveRadius} ${height * 0.12} 
        Q ${rightX} ${height * 0.12}, ${rightX} ${height * 0.14} 
        L ${rightX} ${height * 0.36} 
        Q ${rightX} ${height * 0.38}, ${rightX - curveRadius} ${height * 0.38} 
        L ${leftX + curveRadius} ${height * 0.38} 
        Q ${leftX} ${height * 0.38}, ${leftX} ${height * 0.40} 
        L ${leftX} ${height * 0.72} 
        Q ${leftX} ${height * 0.74}, ${leftX + curveRadius} ${height * 0.74} 
        L ${rightX - curveRadius} ${height * 0.74} 
        Q ${rightX} ${height * 0.74}, ${rightX} ${height * 0.76} 
        L ${rightX} ${height * 0.85}
        Q ${rightX} ${height * 0.89}, ${rightX - curveRadius} ${height * 0.89}
        L ${centerX + curveRadius} ${height * 0.89}
        Q ${centerX} ${height * 0.89}, ${centerX} ${height * 0.91}
        L ${centerX} ${height * 0.98}
      `.replace(/\s+/g, ' ').trim();
    }
  };

  const pathData = createPathData();
  const estimatedPathLength = isMobile
    ? dimensions.height * 1.4
    : dimensions.width * 3 + dimensions.height * 0.8;

  const strokeDashoffset = estimatedPathLength * (1 - scrollProgress);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return (
      <main className="min-h-screen bg-slate-900 overflow-x-hidden relative flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/70">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 overflow-x-hidden relative pb-20">
      {/* Simple background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero section */}
      <div className="relative z-10 pt-20 pb-12 text-center">
        <div className="flex items-center justify-center text-center gap-3 mb-6">
          <Image
            width={32}
            height={32}
            className=" object-contain"
            src={dots}
            alt="dot"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Service
          </h1>
          <Image
            width={37}
            height={37}
            className=" object-contain"
            src={dots}
            alt="dot"
          />
        </div>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto px-4">
          At LinkedMed, we turn ambition into achievement through a fully guided path to medical careers abroad, organized into four key service categories that support you at every stage.
        </p>
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

          {/* Animated path */}
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
            const { x, y } = servicePositions[idx];
            const Icon = service.icon;
            const isActive = activePoint === idx;
            const isHovered = hoveredPoint === idx;

            const segment = 1 / services.length;
            const start = idx * segment;
            const end = (idx + 1) * segment;
            const buffer = segment * 0.2;
            const inRange = scrollProgress >= start - buffer && scrollProgress <= end + buffer;

            return (
              <div
                key={service.id}
                className={`absolute cursor-pointer transition-all duration-700 ease-out ${inRange ? "opacity-100" : "opacity-30"
                  } ${isActive ? "scale-110" : inRange ? "scale-100" : "scale-85"
                  }`}
                style={{
                  top: y,
                  left: x,
                  transform: `translate(-50%, -50%) ${isActive ? "translateY(-12px)" : inRange ? "translateY(0px)" : "translateY(8px)"
                    }`,
                }}
                onClick={() => scrollToPoint(idx)}
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <div className="flex flex-col items-center gap-3">
                  {/* ID badge */}
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-500
                    ${isActive
                      ? 'bg-blue-500/20 text-white border border-blue-400/50'
                      : 'bg-white/5 text-white/60 border border-white/10'
                    }
                  `}>
                    {service.id}
                  </div>

                  {/* Service card */}
                  <div className={`
                    group relative backdrop-blur-xl rounded-2xl transition-all duration-700 transform
                    ${isActive || isHovered
                      ? 'bg-white/15 shadow-2xl border border-white/30 scale-105'
                      : 'bg-white/5 shadow-lg border border-white/10 hover:bg-white/10'
                    }
                  `}>
                    {/* Content */}
                    <div className="relative flex items-center gap-4 px-4 py-3 md:px-6 md:py-4">
                      <div className={`
                        p-2 rounded-xl transition-all duration-500 
                        ${isActive || isHovered ? 'bg-blue-500 shadow-lg' : 'bg-blue-600'}
                      `}>
                        <Icon size={isMobile ? 18 : 22} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm md:text-base whitespace-nowrap">
                          {service.label}
                        </h3>
                        {(isActive || isHovered) && (
                          <p className="text-white/70 text-xs mt-1 max-w-48 hidden md:block">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Hover indicator */}
                    {(isActive || isHovered) && (
                      <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-sm -z-10"></div>
                    )}
                  </div>

                  {/* Tooltip for desktop */}
                  {isHovered && !isMobile && (
                    <div className="absolute top-full mt-6 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 min-w-80 z-50 transform transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-blue-500">
                          <Icon size={20} className="text-white" />
                        </div>
                        <h4 className="font-bold text-white text-lg">{service.label}</h4>
                      </div>
                      <div className="space-y-3">
                        {service.subPoints.map((point, pointIdx) => (
                          <div key={pointIdx} className="flex items-start gap-3 group/item">
                            <div className="w-2 h-2 rounded-full mt-2 bg-blue-400"></div>
                            <span className="text-white/80 text-sm leading-relaxed group-hover/item:text-white transition-colors">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-800/95 border-l border-t border-white/20 rotate-45"></div>
                    </div>
                  )}

                  {/* Mobile active state */}
                  {isActive && isMobile && (
                    <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-4 mt-3 max-w-xs">
                      <div className="space-y-2">
                        {service.subPoints.map((point, pointIdx) => (
                          <div key={pointIdx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 bg-blue-400"></div>
                            <span className="text-white/80 text-xs leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral & Community Engagement Section */}
      <div className="relative z-10 mt-20 px-4 max-w-4xl mx-auto">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Referral & Community Engagement
            </h2>
            <p className="text-xl md:text-2xl text-blue-400 font-medium">
              Because You&rsquo;re Family
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">
                  Cash rewards for every successful friend referral.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">
                  A dedicated dashboard to track progress, documents, and service status.
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">
                  Lifelong support for new job opportunities, licensing renewals, and education.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-400 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">
                  Invitations to alumni events, community check-ins, and LinkedMed updates.
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <blockquote className="text-white/90 italic text-lg leading-relaxed">
                My friend joined LinkedMed through me. We&rsquo;re now colleagues in Germany.
              </blockquote>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🎉</span>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
                LinkedMed is more than a service—it&apos;s your support system, your advocate, and your lifelong career partner.
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default MedicalServicesTimeline;