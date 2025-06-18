"use client";
import { motion, useAnimationControls, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Lock, Fingerprint, Shield, Key } from 'lucide-react';

const services = [
  { id: '01', label: 'Traditional Passwords', description: 'Classic username/password authentication', icon: <Lock /> },
  { id: '02', label: 'Biometric Login', description: 'Fingerprint, face recognition, or retina scan', icon: <Fingerprint /> },
  { id: '03', label: 'Multi-Factor', description: 'Combined password with secondary verification', icon: <Shield /> },
  { id: '04', label: 'Passkeys', description: 'Passwordless FIDO2 authentication', icon: <Key /> },
];

export default function EnhancedTimelinePage() {
  const data = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 1400 });
  const pointControls = useRef(services.map(() => data)); // Initialize animation controls for each service outside the callback
  const svgControls = useAnimationControls();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      const scale = Math.min(width / 1200, 1.2);
      const heightMultiplier = width < 768 ? 3 : 1;
      setDimensions({ width, height: Math.min(1400 * scale * heightMultiplier, 3000) });
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return scrollYProgress.on('change', (progress) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const dashTotal = 3300;

      if (dimensions.width >= 768) {
        svgControls.start({
          strokeDashoffset: dashTotal * (1 - clamped),
          transition: { type: 'tween', duration: 0.3 },
        });

        const segment = 1 / services.length;
        services.forEach((_, idx) => {
          const start = idx * segment;
          const end = (idx + 1) * segment;
          const buffer = segment * 0.15;
          const inRange = clamped >= start - buffer && clamped <= end + buffer;
          const isActive = clamped >= start && clamped < end;

          if (isActive && activePoint !== idx) setActivePoint(idx);

          pointControls.current[idx].start({
            opacity: inRange ? (isActive ? 1 : 0.7) : 0.3,
            y: inRange ? 0 : 30,
            scale: inRange ? (isActive ? 1.2 : 1) : 0.8,
            transition: { type: 'spring', stiffness: 200, damping: 30 },
          });
        });
      }
    });
  }, [scrollYProgress, dimensions, activePoint]);

  const servicePositions = [
    { x: dimensions.width * 0.67, y: dimensions.height * 0.13 },
    { x: dimensions.width * 0.75, y: dimensions.height * 0.42 },
    { x: dimensions.width * 0.17, y: dimensions.height * 0.42 },
    { x: dimensions.width * 0.5, y: dimensions.height * 0.7 },
  ];

  const scrollToPoint = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const targetY = rect.top + rect.height * (idx / (services.length - 1)) - viewHeight * 0.45;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const pathData = [
    `M ${dimensions.width / 2} 0`,
    `L ${dimensions.width / 2} ${dimensions.height * 0.14}`,
    `Q ${dimensions.width / 2} ${dimensions.height * 0.16}, ${dimensions.width / 2 + 20} ${dimensions.height * 0.16}`,
    `L ${dimensions.width * 0.92} ${dimensions.height * 0.16}`,
    `Q ${dimensions.width * 0.93} ${dimensions.height * 0.16}, ${dimensions.width * 0.93} ${dimensions.height * 0.17}`,
    `L ${dimensions.width * 0.93} ${dimensions.height * 0.43}`,
    `Q ${dimensions.width * 0.93} ${dimensions.height * 0.44}, ${dimensions.width * 0.92} ${dimensions.height * 0.44}`,
    `L ${dimensions.width * 0.08} ${dimensions.height * 0.44}`,
    `Q ${dimensions.width * 0.07} ${dimensions.height * 0.44}, ${dimensions.width * 0.07} ${dimensions.height * 0.46}`,
    `L ${dimensions.width * 0.07} ${dimensions.height * 0.71}`,
    `Q ${dimensions.width * 0.07} ${dimensions.height * 0.73}, ${dimensions.width * 0.08} ${dimensions.height * 0.73}`,
    `L ${dimensions.width / 2} ${dimensions.height * 0.73}`,
    `Q ${dimensions.width / 2 + 20} ${dimensions.height * 0.73}, ${dimensions.width / 2 + 20} ${dimensions.height * 0.74}`,
    `L ${dimensions.width / 2 + 20} ${dimensions.height * 0.78}`,
  ].join(' ');

  return (
    <main className="bg-gradient-to-b from-white to-indigo-50 min-h-screen overflow-x-hidden relative">
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-screen-lg md:px-12 px-4"
        style={{ height: dimensions.width < 768 ? '50vh' : `${dimensions.height}px` }}
      >
        <motion.svg viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} className="absolute inset-0 z-10 hidden md:block">
          <motion.path
            d={pathData}
            fill="none"
            stroke="#6366f1"
            strokeLinecap="round"
            initial={{ strokeDasharray: 3500, strokeDashoffset: 3500 }}
            animate={svgControls}
            style={{ strokeWidth: 2 }}
          />
        </motion.svg>

        <div className="absolute inset-0 z-20 hidden md:block">
          {services.map((service, idx) => {
            const { x, y } = servicePositions[idx];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={pointControls.current[idx]}
                className="absolute cursor-pointer"
                style={{ top: y, left: x, transform: 'translate(-50%, -50%)' }}
                onClick={() => scrollToPoint(idx)}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs tracking-wider font-mono text-gray-600">{`{ ${service.id} }`}</span>
                  <motion.h3
                    className="text-sm md:text-xl font-semibold text-center px-3 py-1 rounded-lg"
                    animate={{
                      color: activePoint === idx ? '#4338ca' : '#111827',
                      backgroundColor: activePoint === idx ? '#e0e7ff' : 'transparent',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.label}
                  </motion.h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="md:hidden flex flex-col items-center justify-center h-screen gap-12 z-50 relative">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: idx * 0.2, type: 'spring', stiffness: 150 }}
              className="relative flex flex-col items-center gap-7"
              onClick={() => scrollToPoint(idx)}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-indigo-500 mb-3 flex items-center justify-center"
                animate={{
                  scale: activePoint === idx ? 1.3 : 1,
                  backgroundColor: activePoint === idx ? '#a5b4fc' : '#a5b4fc',
                }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>
              <motion.div
                className="text-xl font-medium text-center text-gray-800"
                animate={{ scale: activePoint === idx ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {service.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
