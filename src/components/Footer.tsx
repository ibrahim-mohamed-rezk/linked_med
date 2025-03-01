import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border border-[#f6f6f6] overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex flex-col space-y-8">
              <div className="text-black text-3xl sm:text-4xl font-bold">Logo</div>
              <p className="text-[#121127]/60 text-base sm:text-lg font-bold leading-relaxed">
                Making the world a better place through constructing elegant hierarchies
              </p>
              <div className="flex space-x-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Facebook icon */}
                </svg>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Twitter icon */}
                </svg>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Instagram icon */}
                </svg>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* GitHub icon */}
                </svg>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[#121127]/40 text-sm font-bold uppercase tracking-wide mb-4">Solutions</h3>
            <ul className="space-y-2">
              {["Marketing", "Analytics", "Commerce", "Insights"].map((item) => (
                <li key={item} className="text-[#111127] text-base font-bold">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#121127]/40 text-sm font-bold uppercase tracking-wide mb-4">Support</h3>
            <ul className="space-y-2">
              {["Pricing", "Documentation", "Guides", "API Status"].map((item) => (
                <li key={item} className="text-[#111127] text-base font-bold">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#121127]/40 text-sm font-bold uppercase tracking-wide mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Jobs", "Press", "Partners"].map((item) => (
                <li key={item} className="text-[#111127] text-base font-bold">{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#121127]/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#121127]/60 text-sm mb-4 md:mb-0">
              © 2020 Dlex, Inc. All rights reserved
            </div>
            <div className="flex space-x-6">
              {["Claim", "Privacy", "Terms"].map((item) => (
                <a key={item} href="#" className="text-[#111127] text-sm font-bold">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
