"use client";

import { useState, useEffect } from "react";
import { ProfileData, SpecializationTypes } from "@/libs/helpers/types";
import { getData, postData } from "@/libs/server/server";
import { AxiosHeaders, AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";

const ProfessionalBackgroundTab = ({
  profileData,
  token,
}: {
  profileData: ProfileData;
  token: string;
}) => {
  const t = useTranslations("Profile");

  const [formData, setFormData] = useState({
    current_job_title: "",
    years_of_experience: 0,
    specialty_field: "",
    languages_spoken: "",
    licensing_status: "",
    previous_countries_worked_in: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();

  const [specializations, setSpecializations] = useState<SpecializationTypes[]>(
    []
  );
  const getSpecializations = async () => {
    const response = await getData(
      "specializations",
      {},
      { Authorization: `Bearer ${token}`, lang: locale }
    );
    setSpecializations(response.data);
  };

  useEffect(() => {
    getSpecializations();
    
    if (profileData) {
      setFormData({
        current_job_title: profileData.current_job_title || "",
        years_of_experience: profileData.years_of_experience || 0,
        specialty_field: profileData.specialty_field || "",
        languages_spoken: profileData.languages_spoken || "",
        licensing_status: profileData.licensing_status || "",
        previous_countries_worked_in:
          profileData.previous_countries_worked_in || "",
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "years_of_experience" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await postData(
        "profile/update/professional",
        formData,
        new AxiosHeaders({ Authorization: `Bearer ${token}` })
      );
      toast.success(t("Professional.UpdateSuccess"));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(
            error.response.data?.message || t("Professional.UpdateError")
          );
        } else if (error.request) {
          toast.error(t("Professional.NetworkError"));
        } else {
          toast.error(t("Professional.UnknownError"));
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {t("Professional.Title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("CurrentJobTitle")}
          </label>
          <input
            type="text"
            name="current_job_title"
            value={formData.current_job_title}
            onChange={handleInputChange}
            placeholder={t("CurrentJobTitlePlaceholder")}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("YearsOfExperience")}
          </label>
          <input
            type="number"
            name="years_of_experience"
            min="0"
            value={formData.years_of_experience}
            onChange={handleInputChange}
            placeholder={t("YearsOfExperiencePlaceholder")}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">
            {t("Specialty")}
          </label>
          <select
            name="specialty_field"
            value={formData.specialty_field}
            onChange={(e) => {
              handleInputChange(
                e as unknown as React.ChangeEvent<HTMLInputElement>
              );
              setFormData({
                ...formData,
                specialty_field: e.target.value,
              });
            }}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          >
            <option value="">Select specialization</option>
            {specializations?.map((specialization: SpecializationTypes) => (
              <option key={specialization.id} value={specialization.name}>
                {specialization.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">
            {t("Languages")}
          </label>
          <input
            type="text"
            name="languages_spoken"
            value={formData.languages_spoken}
            onChange={handleInputChange}
            placeholder={t("LanguagesPlaceholder")}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">
            {t("Licensing")}
          </label>
          <input
            type="text"
            name="licensing_status"
            value={formData.licensing_status}
            onChange={handleInputChange}
            placeholder={t("LicensingPlaceholder")}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">
            {t("PreviousCountries")}
          </label>
          <input
            type="text"
            name="previous_countries_worked_in"
            value={formData.previous_countries_worked_in}
            onChange={handleInputChange}
            placeholder={t("PreviousCountriesPlaceholder")}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t("Saving")}
            </div>
          ) : (
            t("SaveChanges")
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfessionalBackgroundTab;
