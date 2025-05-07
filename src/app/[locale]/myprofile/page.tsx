"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { UserDataTypes } from "@/libs/helpers/types";

const Page = () => {
  const t = useTranslations("Profile");
  const [user, setUser] = useState<UserDataTypes>({
    name: "test",
    email: "test@test.test",
    updated_at: "2025-05-07T09:46:03.000000Z",
    created_at: "2025-05-07T09:46:03.000000Z",
    id: 3,
    profileImage: null,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize form data with user data
    setFormData({
      name: user.name,
      email: user.email
    });
  }, [user]);

  useEffect(() => {
    // Create preview URL when profile image changes
    if (profileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(profileImage);
    } else {
      setPreviewUrl(null);
    }
  }, [profileImage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;
    
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      
      // Example API call - replace with your actual endpoint
      // const response = await fetch(`/api/users/${user.id}/profile-image`, {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user state with new profile image
      setUser({
        ...user,
        profileImage: previewUrl,
        updated_at: new Date().toISOString()
      });
      
      setMessage({ text: "Profile image updated successfully!", type: "success" });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Failed to update profile image. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    try {
      // Example API call - replace with your actual endpoint
      // const response = await postData(`/api/users/${user.id}`, formData);
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user state with new data
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        updated_at: new Date().toISOString()
      });
      
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setMessage({ text: "Failed to update profile. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: "New passwords do not match.", type: "error" });
      setIsLoading(false);
      return;
    }
    
    try {
      // Example API call - replace with your actual endpoint
      // const response = await postData(`/api/users/${user.id}/change-password`, {
      //   currentPassword: passwordData.currentPassword,
      //   newPassword: passwordData.newPassword
      // });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ text: "Password changed successfully!", type: "success" });
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Failed to change password. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1900px] mx-auto min-h-screen relative bg-white rounded-[20px] overflow-hidden px-[5px] md:px-0">
      <div className="px-4 max-w-[1200px] md:px-8 z-10 relative lg:px-16 pt-16 md:pt-24 lg:pt-32 pb-8 mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-8">
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
                  onChange={handleImageChange}
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
                    onClick={handleImageUpload}
                    disabled={isLoading}
                    className={`px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? t("Uploading...") : t("Upload Image")}
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              {!isEditing && !isChangingPassword ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        {t("Edit Profile")}
                      </button>
                      <button 
                        onClick={() => setIsChangingPassword(true)}
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
              ) : isEditing ? (
                <form onSubmit={handleSubmit} className="w-full">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("Edit Your Profile")}</h2>
                  
                  {message.text && (
                    <div className={`p-4 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {message.text}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? t("Saving...") : t("Save Changes")}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user.name,
                            email: user.email
                          });
                          setMessage({ text: "", type: "" });
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                      >
                        {t("Cancel")}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="w-full">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("Change Your Password")}</h2>
                  
                  {message.text && (
                    <div className={`p-4 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {message.text}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Current Password")}
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("New Password")}
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                        minLength={8}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Confirm New Password")}
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                        minLength={8}
                      />
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? t("Changing...") : t("Change Password")}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                          });
                          setMessage({ text: "", type: "" });
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                      >
                        {t("Cancel")}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;