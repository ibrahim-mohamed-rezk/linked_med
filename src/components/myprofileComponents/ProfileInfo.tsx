"use client";

import { useTranslations } from "next-intl";
import { UserDataTypes } from "@/types/profile";

interface ProfileInfoProps {
  user: UserDataTypes;
  onEditProfile: () => void;
  onChangePassword: () => void;
}

const ProfileInfo = ({ user, onEditProfile, onChangePassword }: ProfileInfoProps) => {
  const t = useTranslations("Profile");

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
        <div className="flex gap-2">
          <button 
            onClick={onEditProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            {t("Edit Profile")}
          </button>
          <button 
            onClick={onChangePassword}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {t("Change Password")}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-gray-500 text-sm">{t("Email")}</span>
          <div className="font-medium text-gray-800 mt-1">{user.email}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-gray-500 text-sm">{t("User ID")}</span>
          <div className="font-medium text-gray-800 mt-1">{user.id}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-gray-500 text-sm">{t("Member Since")}</span>
          <div className="font-medium text-gray-800 mt-1">{new Date(user.created_at as string).toLocaleDateString()}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-gray-500 text-sm">{t("Last Updated")}</span>
          <div className="font-medium text-gray-800 mt-1">{new Date(user.updated_at as string).toLocaleDateString()}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;