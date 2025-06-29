"use client";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import PersonalInfoTab from "./profile-tabs/PersonalInfoTab";
import ProfessionalBackgroundTab from "./profile-tabs/ProfessionalBackgroundTab";
import EducationCertificationsTab from "./profile-tabs/EducationCertificationsTab";
import MyJourneyTab from "./profile-tabs/MyJourneyTab";
import ChangePasswordTab from "./profile-tabs/ChangePasswordTab";
import { ProfileData } from "@/libs/helpers/types";

const TabsProfile = ({ profileData, token }: { profileData: ProfileData; token: string }) => {
  const t = useTranslations("Profile");

  const tabData = [
    t("PersonalInfo"),
    t("ProfessionalBackground"),
    t("EducationCertifications"),
    // t("DocumentManagement"),
    t("MyJourney"),
    // t("Payments"),
    t("Settings")
  ];

  const [activeTab, setActiveTab] = useState(tabData[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      case t("PersonalInfo"):
        return <PersonalInfoTab profileData={profileData} token={token} />;
      case t("ProfessionalBackground"):
        return <ProfessionalBackgroundTab profileData={profileData} token={token} />;
      case t("EducationCertifications"):
        return <EducationCertificationsTab profileData={profileData} />;
      case t("MyJourney"):
        return <MyJourneyTab />;
      case t("Settings"):
        return <ChangePasswordTab token={token} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("TabsTitle")}</h1>

      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap mb-4 scrollbar-hide cursor-grab select-none scroll-smooth"
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
                ? "border-b-2 border-blue-500 text-blue-600"
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
