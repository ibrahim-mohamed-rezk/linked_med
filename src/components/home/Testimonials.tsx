"use client";

import React from "react";
import TestimonialCard from "../cards/TestimonialCard";

const Testimonials = () => {
  return (
    <div>
      <section className="kz-cardwheel" data-menu-inverse="">
        <div className="kz-cardwheel-content">
          <div className="kz-cardwheel-bg">
            <svg
              width="2311"
              height="2623"
              viewBox="0 0 2311 2623"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1206.54 1070.04L2307.17 2620.64H1659.74L837.501 1471.45L552.632 1782.21V2620.64H2.31641L2.31641 1.78223L552.632 1.78223L552.632 1089.46L1549.67 1.78223L2190.63 1.78223L1206.54 1070.04Z"
                stroke="white"
                stroke-width="3"
              ></path>
            </svg>
          </div>
          <div className="kz-cardwheel-container">
            <div className="kz-cardwheel-main">
              <div className="kz-cardwheel-header will-change-transform opacity-0 translate-y-[-80%]">
                <h2>
                  <div className="relative inline-block -m-[0.1em] p-[0.1em] align-top overflow-hidden">
                    <div className="relative inline-block translate-none rotate-none scale-100 transform translate-y-0 origin-top-left will-change-auto">
                      Experience
                    </div>
                  </div>
                  <div className="relative inline-block -m-[0.1em] p-[0.1em] align-top overflow-hidden">
                    <div className="relative inline-block translate-none rotate-none scale-100 transform translate-y-0 origin-top-left will-change-auto">
                      True
                    </div>
                  </div>
                  <div className="relative inline-block -m-[0.1em] p-[0.1em] align-top overflow-hidden">
                    <div className="relative inline-block translate-none rotate-none scale-100 transform translate-y-0 origin-top-left will-change-auto">
                      Security
                    </div>
                  </div>
                </h2>
              </div>
              <div className="kz-cardwheel-body will-change-transform translate-y-5">
                <div className="kz-cardwheel-items will-change-transform transform  translate-y-[378rem] rotate-[30deg]">
                  {[1, 2, 3, 4].map((item, index) => (
                    <div className="kz-cardwheel-item">
                      {/* <div className="kz-cardwheel-item-body translate-none  scale-100 transform rotate-[0.0101265deg]">
                        <div className="kz-cardwheel-number"> 01 </div>
                        <div className="kz-cardwheel-img">
                          <img
                            src="/wp-content/uploads/2024/02/kzero-1-1.png"
                            loading="eager"
                            alt=""
                          />
                        </div>
                        <div className="kz-cardwheel-text">
                          <p>
                            Deliver a secure and frictionless login experience
                          </p>
                        </div>
                      </div> */}
                      <TestimonialCard />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
