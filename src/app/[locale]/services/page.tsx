'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const services = [
  { id: '01', label: 'Traditional Passwords' },
  { id: '02', label: 'Biometric Login' },
  { id: '03', label: 'Multi-Factor' },
  { id: '04', label: 'Passkeys' },
];

const servicePositions = [
  { x: 800, y: 185 },
  { x: 900, y: 585 },
  { x: 200, y: 585 },
  { x: 600, y: 980 },
];

export default function AnimatedTimelinePage() {
  const svgRef = useRef(null);
  const isInView = useInView(svgRef, { once: true });
  const svgControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      svgControls.start({
        strokeDashoffset: 0,
        transition: { duration: 3, ease: 'easeInOut' },
      });
    }
  }, [isInView, svgControls]);

  return (
    <main className="bg-white min-h-screen py-32 px-4 w-screen overflow-y-auto overflow-x-hidden">
      <div className="max-w-5xl mx-auto text-center mb-24">
        <h1 className="text-4xl font-bold text-gray-900">Secure Auth Timeline</h1>
        <p className="text-gray-500 mt-3 text-lg">Modern methods for secure login</p>
      </div>

      <div className="relative w-full max-w-screen-xl mx-auto h-[1400px]">
        {/* SVG Path */}
        <svg
          viewBox="0 0 1200 1400"
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          ref={svgRef}
        >
          <motion.path
            d="
              M 600 0
              L 600 200
              Q 600 220, 620 220
              L 1100 220
              Q 1120 220, 1120 240
              L 1120 600
              Q 1120 620, 1100 620
              L 100 620
              Q 80 620, 80 640
              L 80 1000
              Q 80 1020, 100 1020
              L 600 1020
              Q 620 1020, 620 1040
              L 620 1300
            "
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
            animate={svgControls}
          />
        </svg>

        {/* Service Steps */}
        <div className="absolute top-0 left-0 w-full h-full text-9xl">
          {services.map((service, i) => {
            const position = servicePositions[i];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="absolute"
                style={{
                  top: position.y - 50,
                  left: position.x - 50,
                }}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs tracking-widest text-gray-600 font-mono">{`{ ${service.id} }`}</span>
                  <h3 className="text-3xl text-gray-900 font-semibold line-through">{service.label}</h3>
                  {/* Glowing Dot */}
                  <div className="mt-4 w-4 h-4 rounded-full bg-[#6366f1] relative">
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-indigo-500/10 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
