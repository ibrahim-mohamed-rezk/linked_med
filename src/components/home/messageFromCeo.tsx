import React from "react";
import Image from "next/image";
import CEO from "@/../public/images/Home/CEO_2.png";

export default function MessageFromCeo() {
  return (
    <div className="relative px-4 bg-white overflow-hidden h-[600px]">
      {/* Background Title Full Width One Line with Outline */}
      <h1
        className="absolute top-0 left-0 w-full text-center text-[7rem] lg:text-[10rem] font-bold text-transparent tracking-tight select-none z-0 whitespace-nowrap overflow-hidden"
        style={{
          WebkitTextStroke: "1px #d1d5db",
        }}
      >
        Message from cso
      </h1>

      {/* Foreground Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl top-37 mx-auto">
        <div className="relative text-left space-y-4">
          {/* Top-left SVG */}
          <div className="absolute top-0 left-0 -translate-x-4 -translate-y-4">
            <QuoteSvgTop />
          </div>

          <p className="text-gray-800 text-lg mt-20">
            From the initial meeting to the final delivery, Ethan has created a
            feeling of trust and delivered everything we asked of him. The
            quality of his work speaks for itself and he is able to execute at a
            pace. He is an excellent Webflow developer and we will be calling on
            his services again, very soon.
          </p>
          <p className="text-sm text-blue-500">
            Message from cso <br />
            <span className="text-xs text-gray-500">@Mohammed</span>
          </p>

          {/* Bottom-right SVG */}
          <div className="absolute bottom-0 right-0 translate-x-4 translate-y-4">
            <QuoteSvgBottom />
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={CEO}
            alt="Message from the CSO"
            width={450}
            height={450}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// SVG Component for reuse
const QuoteSvgBottom = () => (
  <svg
    width="70"
    height="71"
    viewBox="0 0 70 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.1" clip-path="url(#clip0_1_359)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M70 50.1119C70 63.5406 62.3701 70.2549 49.2466 70.2549H42.8375V56.8262H48.9414C52.909 56.8262 55.0454 55.9106 55.0454 50.4171V43.0923H43.1427V0.97525H70V50.1119ZM27.8829 50.1119C27.8829 63.5406 20.253 70.2549 7.1295 70.2549H0.720398V56.8262H6.8243C11.0971 56.8262 12.9283 55.9106 12.9283 50.4171V43.0923H1.0256V0.97525H27.8829V50.1119Z"
        fill="#141414"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_359">
        <rect
          width="70"
          height="70"
          fill="white"
          transform="matrix(-1 0 0 -1 70 70.8608)"
        />
      </clipPath>
    </defs>
  </svg>
);
const QuoteSvgTop = () => (
  <svg
    width="71"
    height="71"
    viewBox="0 0 71 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.1" clipPath="url(#clip0_1_356)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.265625 21.2035C0.265625 7.77488 7.89554 1.06055 21.019 1.06055H27.4281V14.4892H21.3242C17.3566 14.4892 15.2202 15.4048 15.2202 20.8983V28.2231H27.1229V70.3402H0.265625V21.2035ZM42.3827 21.2035C42.3827 7.77488 50.0126 1.06055 63.1361 1.06055H69.5452V14.4892H63.4413C59.1685 14.4892 57.3373 15.4048 57.3373 20.8983V28.2231H69.24V70.3402H42.3827V21.2035Z"
        fill="#141414"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_356">
        <rect
          width="70"
          height="70"
          fill="white"
          transform="translate(0.265625 0.45459)"
        />
      </clipPath>
    </defs>
  </svg>
);
