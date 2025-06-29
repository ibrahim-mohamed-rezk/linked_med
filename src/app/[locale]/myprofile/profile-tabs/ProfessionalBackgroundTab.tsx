'use client'

import { useState, useEffect } from "react";
import { ProfileData } from "@/libs/helpers/types";
import { postData } from "@/libs/server/server";
import { AxiosHeaders,AxiosError } from 'axios';


const ProfessionalBackgroundTab = ({ profileData, token }: { profileData: ProfileData, token: string }) => {
  console.log("ProfessionalBackgroundTab", profileData);

  // Form state
  const [formData, setFormData] = useState({
    current_job_title: "",
    years_of_experience: 0,
    specialty_field: "",
    languages_spoken: "",
    licensing_status: "",
    previous_countries_worked_in: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  // Populate form with real data when profileData changes
  useEffect(() => {
    if (profileData) {
      setFormData({
        current_job_title: profileData.current_job_title || "",
        years_of_experience: profileData.years_of_experience || 0,
        specialty_field: profileData.specialty_field || "",
        languages_spoken: profileData.languages_spoken || "",
        licensing_status: profileData.licensing_status || "",
        previous_countries_worked_in: profileData.previous_countries_worked_in || ""
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call to update the professional background using postData
      console.log("Submitting form data:", formData);

      const response = await postData(
        "profile/update/professional",
        formData,new AxiosHeaders({Authorization: `Bearer ${token}`})
      );

      console.log("Professional background updated successfully:", response);
      alert("Professional background updated successfully!");

    } catch (error){ 
    if (error instanceof AxiosError) {
      console.error("Error updating professional background:", error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || "Error updating professional background. Please try again.";
        alert(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        alert("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        alert("An unexpected error occurred. Please try again.");
      }
    }} finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Professional Background</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Current Job Title</label>
          <input
            type="text"
            name="current_job_title"
            value={formData.current_job_title}
            onChange={handleInputChange}
            placeholder="e.g., Resident Doctor"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Years of Experience</label>
          <input
            type="number"
            name="years_of_experience"
            min="0"
            value={formData.years_of_experience}
            onChange={handleInputChange}
            placeholder="e.g., 5"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Specialty / Field</label>
          <input
            type="text"
            name="specialty_field"
            value={formData.specialty_field}
            onChange={handleInputChange}
            placeholder="e.g., Cardiology, General Medicine"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Languages Spoken</label>
          <input
            type="text"
            name="languages_spoken"
            value={formData.languages_spoken}
            onChange={handleInputChange}
            placeholder="e.g., English, Arabic, German"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Licensing Status</label>
          <input
            type="text"
            name="licensing_status"
            value={formData.licensing_status}
            onChange={handleInputChange}
            placeholder="e.g., MOH Certified, HAAD Eligible"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Previous Countries Worked In</label>
          <input
            type="text"
            name="previous_countries_worked_in"
            value={formData.previous_countries_worked_in}
            onChange={handleInputChange}
            placeholder="e.g., Egypt, Saudi Arabia, Germany"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </div>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  )
}

export default ProfessionalBackgroundTab