"use client";

import { useState, useEffect } from "react";
import { CountryTypes, ProfileData } from "@/libs/helpers/types";
import { getData, postData } from "@/libs/server/server";
import { AxiosHeaders } from "axios";
import { toast } from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";

const PersonalInfoTab = ({
  profileData,
  token,
}: {
  profileData: ProfileData;
  token: string;
}) => {
  const t = useTranslations("Profile");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    nationality: "",
    current_city: "",
    current_country: "",
    phone_number: "",
    preferred_contact_language: "",
    linkedmed_case_manager: "",
  });
  const [countries, setCountries] = useState<CountryTypes[]>([]);
  const getCountries = async () => {
    const response = await getData(
      "countries",
      {},
      { Authorization: `Bearer ${token}`, lang: locale }
    );
    setCountries(response.data);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCountries();
  }, [token]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.full_name || "",
        date_of_birth: profileData.date_of_birth || "",
        nationality: profileData.nationality || "",
        current_city: profileData.current_city || "",
        current_country: profileData.current_country || "",
        phone_number: profileData.phone_number || "",
        preferred_contact_language:
          profileData.preferred_contact_language || "",
        linkedmed_case_manager: profileData?.linkedmed_case_manager || "",
      });
    }
  }, [profileData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await postData(
        "profile/update/personal",
        formData,
        new AxiosHeaders({ Authorization: `Bearer ${token}` })
      );

      toast.success(t("UpdateSuccess"));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(t("UpdateError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-800">{t("Title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("FullName")}
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("DateOfBirth")}
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("Nationality")}
          </label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          >
            <option value="">Select country</option>
            {countries?.map((country: CountryTypes) => {
              const key =
                country?.id ??
                country?.code ??
                country?.iso2 ??
                country?.iso3 ??
                country?.name ??
                country?.en_name ??
                country?.country_name;
              const label =
                country?.name ??
                country?.en_name ??
                country?.country_name ??
                "";
              return (
                <option key={String(key)} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("CurrentCity")}
          </label>
          <input
            type="text"
            name="current_city"
            value={formData.current_city}
            onChange={handleInputChange}
            placeholder="Berlin"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("CurrentCountry")}
          </label>
          <select
            name="current_country"
            value={formData.current_country}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          >
            <option value="">Select country</option>
            {countries?.map((country: CountryTypes) => {
              return (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("PhoneNumber")}
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="+49 123 456789"
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            {t("ContactLang")}
          </label>
          <select
            name="preferred_contact_language"
            value={formData.preferred_contact_language}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
          >
            <option value="">{t("SelectLanguage")}</option>
            <option value="English">{t("Languages.English")}</option>
            <option value="Arabic">{t("Languages.Arabic")}</option>
            <option value="German">{t("Languages.German")}</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">
            {t("CaseManager")}
          </label>
          <input
            type="text"
            name="linkedmed_case_manager"
            value={formData.linkedmed_case_manager}
            onChange={handleInputChange}
            placeholder="Coordinator Name"
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

export default PersonalInfoTab;
