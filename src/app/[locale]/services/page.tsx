'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineSteps = [
  {
    step: '01',
    title: 'Traditional Passwords',
  },
  {
    step: '02',
    title: 'Password + Phishable MFA',
  },
  {
    step: '03',
    title: 'Multi-Device Passkeys',
  },
  {
    step: '04',
    title: 'Single-Device Enterprise Passkeys',
    desc: 'Transform your mobile device into a FIDO2 passkey with secure asymmetric cryptography.',
  },
  {
    step: '05',
    title: 'Next-Gen Authentication',
    desc: 'Deliver the most robust security with offline-first authentication technology.',
    image: '/auth-card.png',
  },
];

export default function FlowTimeline() {
  const scrollContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef, // <--- This makes it web scroll
    offset: ['start start', 'end end'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-white py-24 sm:px-12 relative">
      <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">
        Progressive Snake Timeline
      </h1>

      {/* Scrollable Area */}
      <div
        ref={scrollContainerRef}
        className="relative w-full max-w-5xl mx-auto overflow-y-scroll h-[800px] border rounded-lg"
      >
        {/* Snake SVG Path */}
        <svg
          viewBox="0 0 1000 1400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-[1400px] z-0"
        >
          <motion.path
            d="
              M 240 100
              Q 260 100, 260 120
              H 800
              Q 820 120, 820 140
              V 240
              Q 820 260, 800 260
              H 200
              Q 180 260, 180 280
              V 380
              Q 180 400, 200 400
              H 700
              Q 720 400, 720 420
              V 520
              Q 720 540, 700 540
              H 200
              Q 180 540, 180 560
              V 660
              Q 180 680, 200 680
              H 800
              Q 820 680, 820 700
              V 800
              Q 820 820, 800 820
              H 240
              Q 220 820, 220 840
              V 940
              Q 220 960, 240 960
              H 760
              Q 780 960, 780 980
              V 1080
              Q 780 1100, 760 1100
              H 180
              Q 160 1100, 160 1120
              V 1220
              Q 160 1240, 180 1240
              H 800
            "
            stroke="#3B82F6"
            strokeWidth="2"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray="1"
            style={{
              pathLength,
            }}
          />

          {/* Dots */}
          {[{ x: 250, y: 100 }, { x: 800, y: 260 }, { x: 200, y: 400 }, { x: 720, y: 520 }, { x: 240, y: 960 }, { x: 800, y: 1240 }].map(
            (dot, i) => (
              <circle key={i} cx={dot.x} cy={dot.y} r="4" fill="#3B82F6" />
            )
          )}
        </svg>

        {/* Timeline Content */}
        <div className="relative z-10 space-y-24 py-10 px-4">
          {timelineSteps.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className={`flex ${isLeft ? 'justify-start' : 'justify-end'} w-full`}
              >
                <div className="max-w-md px-6 py-4 bg-white border border-gray-200 shadow-lg rounded-xl">
                  <span className="text-xs text-gray-400 mb-1 block">[ {item.step} ]</span>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  {item.desc && <p className="text-sm text-gray-600 mt-2">{item.desc}</p>}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-xl mt-4 w-full"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
