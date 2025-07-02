"use client";

import { useState } from "react";
import Head from "next/head";
import { useTranslations } from "next-intl";

const EmployerRegistrationPage = () => {
  const t = useTranslations("Employer");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("about"); // 'about', 'terms', 'form'
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  // };

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
        <title>{t("pageTitle")}</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0061A7] mb-4 leading-tight">
              {t("heading.title")}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              {t("heading.subtitle")}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0061A7] to-blue-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-white rounded-t-2xl shadow-sm border-b border-gray-100 mb-0 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-medium text-sm border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? "border-[#0061A7] text-[#0061A7] bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-[#0061A7] hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-2xl rounded-t-none shadow-lg border border-gray-100 p-8 md:p-10">
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="text-[#0061A7]">
                  <h2 className="text-3xl font-semibold mb-6 text-center">
                    {t("about.title")}
                  </h2>
                  <div className="text-center mb-8">
                    <span className="inline-block bg-gradient-to-r from-[#0061A7] to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      {t("about.subtitle")}
                    </span>
                  </div>
                  <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                    <p className="text-center max-w-4xl mx-auto">
                      {t("about.description1")}
                    </p>
                    <p className="text-center max-w-4xl mx-auto">
                      {t("about.description2")}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#0061A7] mb-6 text-center">
                    {t("about.service.title")}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0061A7] to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        1
                      </div>
                      <p className="text-gray-700">
                        {t("about.service.step1")}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0061A7] to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        2
                      </div>
                      <p className="text-gray-700">
                        {t("about.service.step2")}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0061A7] to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        3
                      </div>
                      <p className="text-gray-700">
                        {t("about.service.step3")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-4">🎯</div>
                    <h4 className="font-semibold text-[#0061A7] mb-4 text-lg">
                      {t("about.features.precision.title")}
                    </h4>
                    <p className="text-gray-700">
                      {t("about.features.precision.description")}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-4">📋</div>
                    <h4 className="font-semibold text-[#0061A7] mb-4 text-lg">
                      {t("about.features.compliance.title")}
                    </h4>
                    <p className="text-gray-700">
                      {t("about.features.compliance.description")}
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
                  <p className="text-sm text-gray-600 mb-4">
                    {t("terms.effective")} {t("terms.agreement")}
                  </p>
                </div>

                <div className="text-sm text-gray-700 space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.scope.title")}
                    </h3>
                    <p>{t("terms.scope.content")}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.liability.title")}
                    </h3>
                    <ul className="space-y-1 ml-4">
                      <li>• {t("terms.liability.point1")}</li>
                      <li>• {t("terms.liability.point2")}</li>
                      <li>• {t("terms.liability.point3")}</li>
                      <li>• {t("terms.liability.point4")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.compliance.title")}
                    </h3>
                    <ul className="space-y-1 ml-4">
                      <li>• {t("terms.compliance.point1")}</li>
                      <li>• {t("terms.compliance.point2")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.dataProtection.title")}
                    </h3>
                    <ul className="space-y-1 ml-4">
                      <li>• {t("terms.dataProtection.point1")}</li>
                      <li>• {t("terms.dataProtection.point2")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.indemnification.title")}
                    </h3>
                    <p>{t("terms.indemnification.content")}</p>
                    <ul className="space-y-1 ml-4 mt-2">
                      <li>• {t("terms.indemnification.point1")}</li>
                      <li>• {t("terms.indemnification.point2")}</li>
                      <li>• {t("terms.indemnification.point3")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.noGuarantee.title")}
                    </h3>
                    <p>{t("terms.noGuarantee.content")}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.termination.title")}
                    </h3>
                    <p>{t("terms.termination.content")}</p>
                    <ul className="space-y-1 ml-4 mt-2">
                      <li>• {t("terms.termination.point1")}</li>
                      <li>• {t("terms.termination.point2")}</li>
                      <li>• {t("terms.termination.point3")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.jurisdiction.title")}
                    </h3>
                    <p>{t("terms.jurisdiction.content")}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0061A7] mb-2">
                      {t("terms.modification.title")}
                    </h3>
                    <p>{t("terms.modification.content")}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Tab */}
            {activeTab === "form" && (
              <div>
                {submitted ? (
                  <div className="text-center text-[#0061A7] space-y-6 bg-gradient-to-r from-green-50 to-emerald-50 p-12 rounded-2xl border border-green-200 shadow-sm">
                    <div className="text-6xl">✅</div>
                    <h2 className="text-3xl font-bold">
                      {t("form.thankYou.title")}
                    </h2>
                    <div className="bg-white p-6 rounded-xl max-w-2xl mx-auto shadow-sm">
                      <p className="text-lg text-gray-700 mb-2">
                        {t("form.thankYou.message")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("form.thankYou.email")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setConsent1(false);
                        setConsent2(false);
                      }}
                      className="mt-6 px-8 py-3 bg-gradient-to-r from-[#0061A7] to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-[#0061A7] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {t("form.submitAnother")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                      <h2 className="text-xl font-semibold text-[#0061A7] mb-2">
                        {t("form.title")}
                      </h2>
                      <p className="text-[#0061A7]">{t("form.description")}</p>
                    </div>

                    {/* Organization Information */}
                    <section className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-[#0061A7] mb-6 flex items-center gap-2">
                        🏥 {t("form.sections.organization")}
                      </h3>
                      <div className="space-y-4">
                        <InputField
                          id="organizationName"
                          label={t("form.fields.organizationName")}
                        />
                        <InputField
                          id="countryCity"
                          label={t("form.fields.countryCity")}
                          placeholder={t("form.fields.countryCityPlaceholder")}
                        />
                        <SelectField
                          id="facilityType"
                          label={t("form.fields.facilityType")}
                          options={[
                            t("form.options.hospital"),
                            t("form.options.clinic"),
                            t("form.options.careHome"),
                            t("form.options.privatePractice"),
                            t("form.options.other"),
                          ]}
                        />
                      </div>
                    </section>

                    {/* Contact Information */}
                    <section className="bg-gradient-to-r from-gray-50 to-green-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-[#0061A7] mb-6 flex items-center gap-2">
                        📞 {t("form.sections.contact")}
                      </h3>
                      <div className="space-y-4">
                        <InputField
                          id="contactName"
                          label={t("form.fields.contactName")}
                        />
                        <InputField
                          id="email"
                          label={t("form.fields.email")}
                          type="email"
                        />
                        <InputField
                          id="confirmEmail"
                          label={t("form.fields.confirmEmail")}
                          type="email"
                        />
                        <InputField
                          id="phoneNumber"
                          label={t("form.fields.phoneNumber")}
                          optional
                        />
                      </div>
                    </section>

                    {/* Hiring Requirements */}
                    <section className="bg-gradient-to-r from-gray-50 to-purple-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-[#0061A7] mb-6 flex items-center gap-2">
                        💼 {t("form.sections.requirements")}
                      </h3>
                      <div className="space-y-4">
                        <TextareaField
                          id="jobTitles"
                          label={t("form.fields.jobTitles")}
                          placeholder={t("form.fields.jobTitlesPlaceholder")}
                        />
                        <InputField
                          id="numberOfPositions"
                          label={t("form.fields.numberOfPositions")}
                          type="number"
                          optional
                        />
                        <InputField
                          id="languagesRequired"
                          label={t("form.fields.languagesRequired")}
                          placeholder={t("form.fields.languagesPlaceholder")}
                          optional
                        />
                        <InputField
                          id="startDate"
                          label={t("form.fields.startDate")}
                          type="date"
                          optional
                        />
                        <InputField
                          id="salaryRange"
                          label={t("form.fields.salaryRange")}
                          placeholder={t("form.fields.salaryPlaceholder")}
                          optional
                        />
                      </div>
                    </section>

                    {/* Additional Information */}
                    <section className="bg-gradient-to-r from-gray-50 to-orange-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-semibold text-[#0061A7] mb-6 flex items-center gap-2">
                        📋 {t("form.sections.additional")}
                      </h3>
                      <div className="space-y-4">
                        <FileUploadField
                          id="jobDescription"
                          label={t("form.fields.jobDescription")}
                          accept=".pdf,.docx"
                        />
                        <TextareaField
                          id="helpMessage"
                          label={t("form.fields.helpMessage")}
                          placeholder={t("form.fields.helpPlaceholder")}
                          optional
                        />
                        <SelectField
                          id="hearAboutUs"
                          label={t("form.fields.hearAboutUs")}
                          options={[
                            t("form.options.website"),
                            t("form.options.referral"),
                            t("form.options.linkedin"),
                            t("form.options.event"),
                            t("form.options.other"),
                          ]}
                        />
                      </div>
                    </section>

                    {/* Consent */}
                    <div className="">
                      <h3 className="text-sm font-semibold text-[#0061A7] mb-6 flex items-center gap-2">
                        ✅ {t("form.consent.title")}
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-start gap-3 text-sm text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent1}
                            onChange={(e) => setConsent1(e.target.checked)}
                            required
                            className="mt-1 w-5 h-5 text-[#0061A7] rounded focus:ring-2 focus:ring-[#0061A7]"
                          />
                          <span>{t("form.consent.terms")}</span>
                        </label>
                        <label className="flex items-start gap-3 text-sm text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent2}
                            onChange={(e) => setConsent2(e.target.checked)}
                            required
                            className="mt-1 w-5 h-5 text-[#0061A7] rounded focus:ring-2 focus:ring-[#0061A7]"
                          />
                          <span>{t("form.consent.acknowledge")}</span>
                        </label>
                      </div>
                    </div>
                    <div className="items-center justify-center w-full flex">
                      <button
                        type="submit"
                        disabled={!isSubmitEnabled}
                        className={`w-fit p-4 flex  font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg transform ${
                          isSubmitEnabled
                            ? "gradient-btn"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {t("form.submit")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default EmployerRegistrationPage;

// --- Helper Components ---
const InputField = ({
  id,
  label,
  type = "text",
  optional = false,
  placeholder = "",
}: {
  id: string;
  label: string;
  type?: string;
  optional?: boolean;
  placeholder?: string;
}) => {
  const t = useTranslations("Employer");
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#0061A7] mb-2"
      >
        {label}{" "}
        {optional && (
          <span className="text-xs text-gray-500 font-normal">
            ({t("form.optional")})
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={!optional}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061A7] focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
      />
    </div>
  );
};

const TextareaField = ({
  id,
  label,
  optional = false,
  placeholder = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  placeholder?: string;
}) => {
  const t = useTranslations("Employer");
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#0061A7] mb-2"
      >
        {label}{" "}
        {optional && (
          <span className="text-xs text-gray-500 font-normal">
            ({t("form.optional")})
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={id}
        rows={4}
        required={!optional}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061A7] focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 resize-vertical"
      />
    </div>
  );
};

const SelectField = ({
  id,
  label,
  options,
  optional = false,
}: {
  id: string;
  label: string;
  options: string[];
  optional?: boolean;
}) => {
  const t = useTranslations("Employer");
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#0061A7] mb-2"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        required={!optional}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061A7] focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
        defaultValue=""
      >
        <option value="" disabled>
          -- {t("form.selectOption")} {label} --
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

const FileUploadField = ({
  id,
  label,
  accept = "",
  optional = false,
}: {
  id: string;
  label: string;
  accept?: string;
  optional?: boolean;
}) => {
  const t = useTranslations("Employer");
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#0061A7] mb-2"
      >
        {label}{" "}
        {optional && (
          <span className="text-xs text-gray-500 font-normal">
            ({t("form.optional")})
          </span>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type="file"
          accept={accept}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0061A7] focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gradient-to-r file:from-[#0061A7] file:to-blue-600 file:text-white hover:file:from-blue-600 hover:file:to-[#0061A7] file:font-medium file:transition-all file:duration-200"
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
        <span>📎</span> {t("form.fileAccepts")}
      </p>
    </div>
  );
};
