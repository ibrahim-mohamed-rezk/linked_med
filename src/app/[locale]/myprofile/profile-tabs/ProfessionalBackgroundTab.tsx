"use client";

import { useState, useEffect, useRef } from "react";
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
    years_of_experience: "",
    specialty_field: "",
    languages_spoken: "",
    licensing_status: "",
    previous_countries_worked_in: "",
  });

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageInputRef = useRef<HTMLDivElement>(null);
  const [showCustomLanguage, setShowCustomLanguage] = useState(false);
  const [customLanguage, setCustomLanguage] = useState("");

  const availableLanguages = [
    "English",
    "Deutsch",
    "عربي",
    "French",
    "Turkey",
    "Russian",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();

  const [specializations, setSpecializations] = useState<SpecializationTypes[]>(
    []
  );
  const [specializationSearch, setSpecializationSearch] = useState("");
  const [showSpecializationDropdown, setShowSpecializationDropdown] =
    useState(false);
  const specializationInputRef = useRef<HTMLInputElement>(null);

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
        years_of_experience: String(profileData.years_of_experience || ""),
        specialty_field: profileData.specialty_field || "",
        languages_spoken: profileData.languages_spoken || "",
        licensing_status: profileData.licensing_status || "",
        previous_countries_worked_in:
          profileData.previous_countries_worked_in || "",
      });
      setSpecializationSearch(profileData.specialty_field || "");

      // Parse existing languages from string to array
      if (profileData.languages_spoken) {
        const languagesArray = profileData.languages_spoken
          .split("-")
          .filter((lang) => lang.trim());

        // Check if any language is not in predefined options
        const predefinedLanguages = [
          "English",
          "Deutsch",
          "عربي",
          "French",
          "Turkey",
          "Russian",
        ];
        const customLanguages = languagesArray.filter(
          (lang) => !predefinedLanguages.includes(lang)
        );

        if (customLanguages.length > 0) {
          // Add custom languages to selected languages
          setSelectedLanguages(languagesArray);
        } else {
          setSelectedLanguages(languagesArray);
        }
      }
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "years_of_experience" ? value : value,
    }));
  };

  // For clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        specializationInputRef.current &&
        !specializationInputRef.current.contains(event.target as Node)
      ) {
        setShowSpecializationDropdown(false);
      }
      if (
        languageInputRef.current &&
        !languageInputRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
    }
    if (showSpecializationDropdown || showLanguageDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSpecializationDropdown, showLanguageDropdown]);

  const handleSpecializationInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpecializationSearch(e.target.value);
    setShowSpecializationDropdown(true);
    setFormData((prev) => ({
      ...prev,
      specialty_field: e.target.value,
    }));
  };

  const handleSpecializationSelect = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      specialty_field: name,
    }));
    setSpecializationSearch(name);
    setShowSpecializationDropdown(false);
  };

  const handleLanguageToggle = (language: string) => {
    if (language === "Other") {
      setShowCustomLanguage(true);
      setShowLanguageDropdown(false);
      return;
    }

    setSelectedLanguages((prev) => {
      const isSelected = prev.includes(language);
      let newLanguages;

      if (isSelected) {
        newLanguages = prev.filter((lang) => lang !== language);
      } else {
        newLanguages = [...prev, language];
      }

      // Update formData with dash-separated string
      setFormData((prevForm) => ({
        ...prevForm,
        languages_spoken: newLanguages.join("-"),
      }));

      return newLanguages;
    });
  };

  const handleCustomLanguageAdd = () => {
    if (customLanguage.trim()) {
      const newLanguages = [...selectedLanguages, customLanguage.trim()];
      setSelectedLanguages(newLanguages);
      setFormData((prevForm) => ({
        ...prevForm,
        languages_spoken: newLanguages.join("-"),
      }));
      setCustomLanguage("");
      setShowCustomLanguage(false);
    }
  };

  const filteredSpecializations = specializationSearch
    ? specializations.filter((spec) =>
        spec.name.toLowerCase().includes(specializationSearch.toLowerCase())
      )
    : specializations;

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

        <div className="sm:col-span-2" ref={specializationInputRef}>
          <label className="block text-sm text-gray-600 mb-1">
            {t("Specialty")}
          </label>
          <div className="relative">
            <input
              type="text"
              name="specialty_field"
              autoComplete="off"
              value={specializationSearch}
              onChange={handleSpecializationInput}
              onFocus={() => setShowSpecializationDropdown(true)}
              placeholder={
                t("SpecialtyPlaceholder") || "Type or select specialization"
              }
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
            />
            {showSpecializationDropdown && (
              <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-2xl mt-1 max-h-48 overflow-auto shadow-lg">
                {filteredSpecializations.length > 0 ? (
                  filteredSpecializations.map((specialization) => (
                    <li
                      key={specialization.id}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                        specialization.name === formData.specialty_field
                          ? "bg-blue-50 font-semibold"
                          : ""
                      }`}
                      onClick={() =>
                        handleSpecializationSelect(specialization.name)
                      }
                    >
                      {specialization.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400">
                    {t("NoResults") || "No specializations found"}
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="sm:col-span-2" ref={languageInputRef}>
          <label className="block text-sm text-gray-600 mb-1">
            {t("Languages")}
          </label>
          <div className="relative">
            <div
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out cursor-pointer min-h-[48px] flex flex-wrap gap-2 items-center"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              {selectedLanguages.length > 0 ? (
                selectedLanguages.map((language) => (
                  <span
                    key={language}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {language}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageToggle(language);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400">
                  {t("LanguagesPlaceholder") || "Select languages"}
                </span>
              )}
            </div>
            {showLanguageDropdown && (
              <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-2xl mt-1 max-h-48 overflow-auto shadow-lg">
                {availableLanguages.map((language) => (
                  <li
                    key={language}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 flex items-center gap-2 ${
                      selectedLanguages.includes(language)
                        ? "bg-blue-50 font-semibold"
                        : ""
                    }`}
                    onClick={() => handleLanguageToggle(language)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(language)}
                      onChange={() => {}} // Handled by onClick
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    {language}
                  </li>
                ))}
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 flex items-center gap-2 border-t border-gray-200"
                  onClick={() => handleLanguageToggle("Other")}
                >
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => {}} // Handled by onClick
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  {t("Other")}
                </li>
              </ul>
            )}
            {showCustomLanguage && (
              <div className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-2xl mt-1 p-4 shadow-lg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value)}
                    placeholder={t("PleaseSpecify")}
                    className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 focus:border-blue-300 transition-all duration-200 ease-in-out"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleCustomLanguageAdd()
                    }
                  />
                  <button
                    type="button"
                    onClick={handleCustomLanguageAdd}
                    className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors"
                  >
                    {t("Add")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomLanguage(false);
                      setCustomLanguage("");
                    }}
                    className="px-4 py-3 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-colors"
                  >
                    {t("Cancel")}
                  </button>
                </div>
              </div>
            )}
          </div>
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
