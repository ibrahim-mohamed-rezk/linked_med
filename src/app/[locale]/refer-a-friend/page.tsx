"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useLocale, useTranslations } from "next-intl";
import { postData, getData } from "@/libs/server/server";

const ReferFriendPage = () => {
  const t = useTranslations("Refer");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("about"); // 'about', 'terms', 'form'
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const locale = useLocale();
  const [countries, setCountries] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [specializations, setSpecializations] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Form state for all required fields
  const [formData, setFormData] = useState({
    name: "",
    question: "",
    email: "",
    phone: "",
    candidate_name: "",
    candidate_email: "",
    candidate_phone: "",
    country_id: "",
    specialization_id: "",
    german_langauge_level: "",
    preferred_work_location: "",
    years_of_exp: "",
    profession: "",
  });

  // Fetch countries and specializations on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [countriesData, specializationsData] = await Promise.all([
          getData("countries", {}, { lang: locale }),
          getData("specializations", {}, { lang: locale }),
        ]);

        setCountries(countriesData.data || []);
        setSpecializations(specializationsData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await postData("refer-form", formData);
      setSubmitted(true);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "about", label: t("tabs.about") },
    { id: "terms", label: t("tabs.terms") },
    { id: "form", label: t("tabs.form") },
  ];

  // Check if both consent checkboxes are checked
  const isSubmitEnabled = consent1 && consent2;

  return (
    <>
      <Head>
        <title>{t("referFriend.pageTitle")}</title>
      </Head>

      <main className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0061A7] mb-8 text-center">
            {t("referFriend.heading")}
          </h1>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#0061A7] text-[#0061A7]"
                    : "border-transparent text-gray-500 hover:text-[#0061A7]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="text-[#0061A7]">
                  <h2 className="text-2xl font-semibold mb-4">
                    {t("about.title")}
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>{t("about.description1")}</p>
                    <p>{t("about.description2")}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#0061A7] mb-3">
                    {t("about.howItWorks.title")}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">1.</span>
                      {t("about.howItWorks.step1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">2.</span>
                      {t("about.howItWorks.step2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0061A7] font-bold">3.</span>
                      {t("about.howItWorks.step3")}
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#0061A7] mb-2">
                      {t("about.benefits.referrer.title")}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {t("about.benefits.referrer.description")}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#0061A7] mb-2">
                      {t("about.benefits.friend.title")}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {t("about.benefits.friend.description")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms Tab */}
            {activeTab === "terms" && (
              <div className="space-y-6">
                <div className="text-[#0061A7]">
                  <h2 className="text-2xl font-semibold mb-4">
                    {t("terms.title")}
                  </h2>
                </div>
                <div className="text-sm text-gray-700 space-y-4 whitespace-pre-line">
                  {t("terms.content")}
                </div>
              </div>
            )}

            {/* Form Tab */}
            {activeTab === "form" && (
              <div>
                {submitted ? (
                  <div className="text-center text-[#0061A7] space-y-4">
                    <h2 className="text-2xl font-bold">
                      {t("referFriend.thankYouTitle")}
                    </h2>
                    <p>{t("referFriend.thankYouMessage")}</p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setConsent1(false);
                        setConsent2(false);
                        setFormData({
                          name: "",
                          question: "",
                          email: "",
                          phone: "",
                          candidate_name: "",
                          candidate_email: "",
                          candidate_phone: "",
                          country_id: "",
                          specialization_id: "",
                          german_langauge_level: "",
                          preferred_work_location: "",
                          years_of_exp: "",
                          profession: "",
                        });
                        setErrors({});
                      }}
                      className="mt-4 px-6 py-2 bg-[#0061A7] text-white rounded hover:bg-blue-700 transition"
                    >
                      {t("form.submitAnother")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-[#0061A7] mb-6 whitespace-pre-line">
                      {t("referFriend.intro")}
                    </p>

                    {/* Referrer Section */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t("referFriend.referrerSection")}
                      </h2>
                      <div className="space-y-4">
                        <InputField
                          id="name"
                          label={t("referFriend.fields.referrerName")}
                          value={formData.name}
                          onChange={handleInputChange}
                          errors={errors.name}
                        />
                        <InputField
                          id="email"
                          label={t("referFriend.fields.email")}
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          errors={errors.email}
                        />
                        <InputField
                          id="phone"
                          label={t("referFriend.fields.phone")}
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          errors={errors.phone}
                        />
                        <TextareaField
                          id="question"
                          label={t("referFriend.fields.referrerMessage")}
                          value={formData.question}
                          onChange={handleInputChange}
                          errors={errors.question}
                        />
                      </div>
                    </section>

                    {/* Candidate Section */}
                    <section>
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t("referFriend.candidateSection")}
                      </h2>
                      <div className="space-y-4">
                        <InputField
                          id="candidate_name"
                          label={t("referFriend.fields.candidateName")}
                          value={formData.candidate_name}
                          onChange={handleInputChange}
                          errors={errors.candidate_name}
                        />
                        <InputField
                          id="candidate_email"
                          label={t("referFriend.fields.candidateEmail")}
                          type="email"
                          value={formData.candidate_email}
                          onChange={handleInputChange}
                          errors={errors.candidate_email}
                        />
                        <InputField
                          id="candidate_phone"
                          label={t("referFriend.fields.candidatePhone")}
                          value={formData.candidate_phone}
                          onChange={handleInputChange}
                          errors={errors.candidate_phone}
                        />
                        <SelectField
                          id="country_id"
                          label={t("referFriend.fields.country")}
                          options={countries}
                          value={formData.country_id}
                          onChange={handleInputChange}
                          errors={errors.country_id}
                          loading={dataLoading}
                        />
                        <SelectField
                          id="profession"
                          label={t("referFriend.fields.profession")}
                          options={[
                            t("professions.doctor"),
                            t("professions.nurse"),
                            t("professions.pharmacist"),
                            t("professions.other"),
                          ]}
                          value={formData.profession}
                          onChange={handleInputChange}
                          errors={errors.profession}
                        />
                        <SelectField
                          id="specialization_id"
                          label={t("referFriend.fields.specialty")}
                          options={specializations}
                          value={formData.specialization_id}
                          onChange={handleInputChange}
                          errors={errors.specialization_id}
                          loading={dataLoading}
                        />
                        <SelectField
                          id="years_of_exp"
                          label={t("referFriend.fields.experience")}
                          options={[
                            t("experience.junior"),
                            t("experience.mid"),
                            t("experience.senior"),
                          ]}
                          value={formData.years_of_exp}
                          onChange={handleInputChange}
                          errors={errors.years_of_exp}
                        />
                        <SelectField
                          id="preferred_work_location"
                          label={t("referFriend.fields.location")}
                          options={countries}
                          value={formData.preferred_work_location}
                          onChange={handleInputChange}
                          errors={errors.preferred_work_location}
                          loading={dataLoading}
                        />
                        <SelectField
                          id="german_langauge_level"
                          label={t("referFriend.fields.language")}
                          options={[
                            t("languages.a1"),
                            t("languages.a2"),
                            t("languages.b1"),
                            t("languages.b2"),
                            t("languages.notStarted"),
                          ]}
                          value={formData.german_langauge_level}
                          onChange={handleInputChange}
                          errors={errors.german_langauge_level}
                        />
                      </div>
                    </section>

                    {/* Consent */}
                    <div className="space-y-3 text-sm text-[#0061A7]">
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={consent1}
                          onChange={(e) => setConsent1(e.target.checked)}
                          required
                        />
                        {t("referFriend.consent1")}
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={consent2}
                          onChange={(e) => setConsent2(e.target.checked)}
                          required
                        />
                        {t("referFriend.consent2")}
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!isSubmitEnabled || loading}
                      className={`w-full py-3 font-semibold rounded transition ${
                        isSubmitEnabled && !loading
                          ? "bg-[#0061A7] hover:bg-blue-700 text-white cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {loading ? t("form.submitting") : t("referFriend.submit")}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ReferFriendPage;

// --- Helper Components ---
const InputField = ({
  id,
  label,
  type = "text",
  optional = false,
  value,
  onChange,
  errors,
}: {
  id: string;
  label: string;
  type?: string;
  optional?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  errors?: string[];
}) => {
  const t = useTranslations("Refer");
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
        {label}{" "}
        {optional && (
          <span className="text-xs text-gray-500">({t("form.optional")})</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value || ""}
        onChange={onChange}
        required={!optional}
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          errors && errors.length > 0 ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors && errors.length > 0 && (
        <div className="text-red-500 text-xs mt-1">{errors[0]}</div>
      )}
    </div>
  );
};

const TextareaField = ({
  id,
  label,
  optional = false,
  value,
  onChange,
  errors,
}: {
  id: string;
  label: string;
  optional?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  errors?: string[];
}) => {
  const t = useTranslations("Refer");
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
        {label}{" "}
        {optional && (
          <span className="text-xs text-gray-500">({t("form.optional")})</span>
        )}
      </label>
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value || ""}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          errors && errors.length > 0 ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors && errors.length > 0 && (
        <div className="text-red-500 text-xs mt-1">{errors[0]}</div>
      )}
    </div>
  );
};

const SelectField = ({
  id,
  label,
  options,
  value,
  onChange,
  errors,
  loading = false,
}: {
  id: string;
  label: string;
  options: string[] | Array<{ id: string; name: string }>;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  errors?: string[];
  loading?: boolean;
}) => {
  const t = useTranslations("Refer");
  const isObjectOptions = options?.length > 0 && typeof options[0] === "object";

  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#0061A7] mb-1">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        required
        disabled={loading}
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          errors && errors.length > 0 ? "border-red-500" : "border-gray-300"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <option value="" disabled>
          {loading ? t("form.loading") : `-- ${label} --`}
        </option>
        {options?.map((opt) => {
          if (isObjectOptions) {
            const option = opt as { id: string; name: string };
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          } else {
            const option = opt as string;
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          }
        })}
      </select>
      {errors && errors.length > 0 && (
        <div className="text-red-500 text-xs mt-1">{errors[0]}</div>
      )}
    </div>
  );
};

const RadioGroup = ({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}) => (
  <div>
    <span className="block text-sm text-[#0061A7] mb-1">{label}</span>
    <div className="flex gap-6">
      {options?.map((opt) => (
        <label key={opt.value} className="inline-flex items-center gap-1">
          <input type="radio" name={name} value={opt.value} required />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);
