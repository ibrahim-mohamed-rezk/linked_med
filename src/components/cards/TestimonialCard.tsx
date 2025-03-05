import React from "react";

const TestimonialCard = () => {
  return (
    <div className="testimony-card flex flex-col items-center justify-between p-6 w-[367px] h-[529px] bg-white rounded-[47px] border border-[#96b8ff] transform">
      <div className="flex justify-between w-full">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.6014 4.4881C12.3996 4.29587 12.0801 4.30367 11.8879 4.50552L7.60943 8.99817C7.43776 9.17843 7.42317 9.45694 7.57505 9.65416L11.3605 14.5694C11.5306 14.7903 11.8475 14.8314 12.0683 14.6613C12.2891 14.4913 12.3303 14.1744 12.1602 13.9535L8.63871 9.38101L12.6189 5.20162C12.8111 4.99977 12.8033 4.68032 12.6014 4.4881ZM9.91333 4.34729C9.71149 4.15506 9.39203 4.16286 9.19981 4.36471L4.92132 8.85736C4.74965 9.03763 4.73505 9.31614 4.88694 9.51336L8.67238 14.4286C8.84245 14.6495 9.15934 14.6906 9.38018 14.5205C9.60101 14.3505 9.64216 14.0336 9.47209 13.8127L5.95059 9.2402L9.93075 5.06081C10.123 4.85897 10.1152 4.53951 9.91333 4.34729Z" fill="#1C274C"/>
        </svg>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.43088 3.68184C5.65171 3.51177 5.9686 3.55291 6.13867 3.77375L9.92412 8.68901C10.076 8.88623 10.0614 9.16474 9.88974 9.34501L5.61125 13.8377C5.41902 14.0395 5.09957 14.0473 4.89772 13.8551C4.69588 13.6629 4.68808 13.3434 4.8803 13.1416L8.86046 8.96217L5.33897 4.38963C5.1689 4.1688 5.21005 3.85191 5.43088 3.68184ZM8.11899 3.82278C8.33982 3.65271 8.65671 3.69386 8.82678 3.91469L12.6122 8.82996C12.7641 9.02718 12.7495 9.30569 12.5778 9.48595L8.29935 13.9786C8.10713 14.1805 7.78767 14.1883 7.58583 13.996C7.38398 13.8038 7.37618 13.4844 7.56841 13.2825L11.5486 9.10311L8.02708 4.53058C7.857 4.30975 7.89815 3.99286 8.11899 3.82278Z" fill="#1C274C"/>
        </svg>
      </div>
      <div className="w-[210px] h-[210px] bg-[#e5cdcd] rounded-full border border-[#96b8ff]" />
      <div className="flex flex-col items-center">
        <div className="text-black text-[21px] font-black font-['Satoshi Variable']">Mohamed aboelyazed</div>
        <div className="text-black text-[21px] font-bold font-['Satoshi Variable']">CEO</div>
        <div className="text-black text-sm font-bold font-['Satoshi Variable'] text-center mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, dolore!
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
