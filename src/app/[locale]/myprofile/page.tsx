"use client";

import { toast } from 'react-hot-toast';
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ProfileData, ApiResponse } from "@/libs/helpers/types";
import TabsProfile from "./TabsProfile";
import { getData, postData } from "@/libs/server/server";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const Page = () => {
  const t = useTranslations("Profile");

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const token = getCookie("auth_token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response: ApiResponse = await getData(
          "profile",
          {},
          { Authorization: `Bearer ${token}` }
        );
        if (response.status && response.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error(t("ErrorLoadingProfile"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (profileImage) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(profileImage);
    } else {
      setPreviewUrl(null);
    }
  }, [profileImage]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
    
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage || !token) return;

    setIsImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", profileImage);

      const response = await postData(
        "profile/update",
        formData,
        { Authorization: `Bearer ${token}` }
      );

      setProfileData((prev) =>
        prev
          ? {
              ...prev,
              user: {
                ...prev.user,
                image: response?.data?.image || previewUrl || prev.user.image,
              },
            }
          : prev
      );

      toast.success(t("ImageUploadSuccess"));
      setProfileImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(t("ImageUploadError"));
    } finally {
      setIsImageUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full mx-auto min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">{t("Loading")}</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="w-full mx-auto min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg">{t("NoProfileData")}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t("Retry")}
          </button>
        </div>
      </div>
    );
  }

  const { user } = profileData;

  return (
    <div className="w-full mx-auto min-h-screen bg-gray-50">
      <div className="px-4 max-w-[1440px] md:px-8 lg:px-16 pt-8 md:pt-12 lg:pt-16 pb-8 mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md relative">
                  {user.image || previewUrl ? (
                    <Image
                      src={previewUrl || user.image}
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center rounded-full">
                      <span className="text-2xl md:text-3xl font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-all"
                  title={t("EditImage")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 15.5A1.5 1.5 0 003.5 17h13a1.5 1.5 0 001.5-1.5V9a.5.5 0 00-1 0v6.5a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-13a.5.5 0 01.5-.5H11a.5.5 0 000-1H3.5A1.5 1.5 0 002 2.5v13z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />

              {profileImage && (
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={isImageUploading}
                  className={`px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
                    isImageUploading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isImageUploading ? t("Uploading") : t("UploadImage")}
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {profileData.full_name || user.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {profileData.current_job_title}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t("Email")}</p>
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t("Phone")}</p>
                    <p className="text-gray-900 font-medium">{profileData.phone_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t("Location")}</p>
                    <p className="text-gray-900 font-medium">
                      {profileData.current_city}, {profileData.current_country}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t("Experience")}</p>
                    <p className="text-gray-900 font-medium">
                      {profileData.years_of_experience} {t("years")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t("Nationality")}</p>
                    <p className="text-gray-900 font-medium">{profileData.nationality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t("Documents")}</p>
                    <p className="text-gray-900 font-medium">
                      {profileData.documents?.length || 0} {t("files")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TabsProfile profileData={profileData} token={token as string} />
      </div>
    </div>
  );
};

export default Page;
