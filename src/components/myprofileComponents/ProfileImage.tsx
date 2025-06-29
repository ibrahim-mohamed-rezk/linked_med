"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { UserDataTypes } from "@/types/profile";

interface ProfileImageProps {
  user: UserDataTypes;
  previewUrl: string | null;
  profileImage: File | null;
  isLoading: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageUpload: () => void;
}

const ProfileImage = ({
  user,
  previewUrl,
  profileImage,
  isLoading,
  onImageChange,
  onImageUpload
}: ProfileImageProps) => {
  const t = useTranslations("Profile");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden shadow-md relative">
        {user.profileImage || previewUrl ? (
          <Image 
            src={previewUrl || user.profileImage || ''} 
            alt="Profile" 
            layout="fill" 
            objectFit="cover"
          />
        ) : (
          <div className="text-5xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={triggerFileInput}
          className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          {t("Choose Image")}
        </button>
        
        {profileImage && (
          <button
            type="button"
            onClick={onImageUpload}
            disabled={isLoading}
            className={`px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? t("Uploading...") : t("Upload Image")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
