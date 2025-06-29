"use client";

import { useRef, useState } from "react";
import PersonalInfoTab from "./profile-tabs/PersonalInfoTab";
import ProfessionalBackgroundTab from "./profile-tabs/ProfessionalBackgroundTab";
import EducationCertificationsTab from "./profile-tabs/EducationCertificationsTab";
// import DocumentManagementTab from "./profile-tabs/DocumentManagementTab";
import MyJourneyTab from "./profile-tabs/MyJourneyTab";
import ChangePasswordTab from "./profile-tabs/ChangePasswordTab";
// import other tab components similarly...
import { ProfileData} from "@/libs/helpers/types";

const tabData = [
  "Personal & Contact Information",
  "Professional Background",
  "Education & Certifications",
  // "Document Management",
  "My Journey",
  // "Payment & Invoices",
  // "Messages & Support",
  // "Referrals & Rewards",
  "Settings & Preferences",
];

const TabsProfile = ({profileData,token}:{profileData:ProfileData,token:string}) => {
  const [activeTab, setActiveTab] = useState(tabData[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // mouse drag scroll handlers here...
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown = true;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };
  const handleMouseUp = () => {
    isDown = false;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal & Contact Information":
        return <PersonalInfoTab profileData={profileData} token={token} />;
      case "Professional Background":
        return <ProfessionalBackgroundTab profileData={profileData} token={token} />;
      case "Education & Certifications":
        return <EducationCertificationsTab profileData={profileData}   />;
      // case "Document Management":
      //   return <DocumentManagementTab profileData={profileData}  />;
      case "My Journey":
        return <MyJourneyTab />;
      case "Payment & Invoices":
        return <div>Invoices and Payments</div>;
      case "Settings & Preferences":
        return <ChangePasswordTab token={token} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap mb-4  scrollbar-hide cursor-grab select-none scroll-smooth"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {tabData.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`inline-block px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};

export default TabsProfile;
