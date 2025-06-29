'use client'

import { useState, useEffect } from "react";
import { ProfileData } from "@/libs/helpers/types";
import { postData } from "@/libs/server/server";
import { AxiosHeaders,AxiosError } from 'axios';


const PersonalInfoTab = ({ profileData, token }: { profileData: ProfileData, token: string }) => {
  console.log("profileData", profileData);

  // Form state with real data
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    nationality: "",
    current_city: "",
    current_country: "",
    phone_number: "",
    preferred_contact_language: "",
    linkedmed_case_manager: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  // Populate form with real data when profileData changes
  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.full_name || "",
        date_of_birth: profileData.date_of_birth || "",
        nationality: profileData.nationality || "",
        current_city: profileData.current_city || "",
        current_country: profileData.current_country || "",
        phone_number: profileData.phone_number || "",
        preferred_contact_language: profileData.preferred_contact_language || "",
        linkedmed_case_manager: profileData.linkedmed_case_manager || ""
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      // API call to update the profile
      console.log("Submitting form data:", formData);

      const response = await postData(
        "profile/update/personal",
        formData,  new AxiosHeaders({Authorization: `Bearer ${token}`})
      );

      console.log("Profile updated successfully:", response);
      alert("Profile updated successfully!");

    } catch (error) {
      if(error instanceof AxiosError){ 
      console.error("Error updating profile:", error);
    }
      // Handle different error scenarios
      if (error) {
        // Server responded with error status
        const errorMessage = "Error updating profile. Please try again.";
        alert(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            placeholder="e.g., Egyptian"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Current City</label>
          <input
            type="text"
            name="current_city"
            value={formData.current_city}
            onChange={handleInputChange}
            placeholder="Berlin"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Current Country</label>
          <input
            type="text"
            name="current_country"
            value={formData.current_country}
            onChange={handleInputChange}
            placeholder="Germany"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="+49 123 456789"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Preferred Contact Language</label>
          <select
            name="preferred_contact_language"
            value={formData.preferred_contact_language}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
            <option value="German">German</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">LinkedMed Case Manager</label>
          <input
            type="text"
            name="linkedmed_case_manager"
            value={formData.linkedmed_case_manager}
            onChange={handleInputChange}
            placeholder="Coordinator Name"
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

export default PersonalInfoTab