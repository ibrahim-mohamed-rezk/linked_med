'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ProfileData } from '@/libs/helpers/types';
import { useTranslations } from 'next-intl';
import { postData } from '@/libs/server/server';
import toast from "react-hot-toast";

interface CertificateFile extends File {
  preview?: string;
}

const EducationCertificationsTab = ({
  profileData,
  token,
}: {
  profileData: ProfileData;
  token: string;
}) => {
  const t = useTranslations("Profile");

  const [medicalDegree, setMedicalDegree] = useState<string>(
    profileData?.education?.medical_degree_details || ""
  );
  const [internshipResidency, setInternshipResidency] = useState<string>(
    profileData?.education?.internship_residency_history || ""
  );
  const [languageCertifications, setLanguageCertifications] = useState<string>(
    profileData?.education?.language_certifications || ""
  );
  const [certificate, setCertificate] = useState<CertificateFile | null>(null);
  const [existingCertificateUrl, setExistingCertificateUrl] = useState<
    string | null
  >(profileData?.education?.certificates || null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (
      certificate &&
      certificate.type?.startsWith("image/") &&
      !certificate.preview
    ) {
      const previewUrl = URL.createObjectURL(certificate);
      setCertificate({ ...certificate, preview: previewUrl });
    }
    return () => {
      if (certificate?.preview) {
        URL.revokeObjectURL(certificate.preview);
      }
    };
  }, [certificate]);

  const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    // Take only the first file
    const file = e.target.files[0] as CertificateFile;

    // Validate file type - only allow PDF files
    if (file.type !== "application/pdf") {
      toast.error("Please select only PDF files.");
      e.target.value = ""; // Clear the input
      return;
    }

    setCertificate(file);
  };

  const removeCertificate = () => {
    if (certificate?.preview) {
      URL.revokeObjectURL(certificate.preview);
    }
    setCertificate(null);
  };

  const removeExistingCertificate = () => {
    setExistingCertificateUrl(null);
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();

      // Append text fields
      formData.append("medical_degree_details", medicalDegree);
      formData.append("internship_residency_history", internshipResidency);
      formData.append("language_certifications", languageCertifications);

      // Append certificate file
      if (certificate) {
        formData.append("certificates", certificate);
      }

      // Append existing certificate URL (empty string if removed, or the URL if kept)
      formData.append("existing_certificate_url", existingCertificateUrl || "");

      const response = await postData("profile/update/education", formData, {
        Authorization: `Bearer ${token}`,
      });

      console.log("Response:", response);
      // Handle success response here
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error updating profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full px-4 md:px-20 mx-auto p-6 bg-white rounded-2xl shadow space-y-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800">{t("Title")}</h2>

      <div>
        <label
          htmlFor="medicalDegree"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("MedicalDegreeLabel")}
        </label>
        <input
          type="text"
          id="medicalDegree"
          value={medicalDegree}
          onChange={(e) => setMedicalDegree(e.target.value)}
          placeholder={t("MedicalDegreePlaceholder")}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="internshipResidency"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("InternshipLabel")}
        </label>
        <textarea
          id="internshipResidency"
          value={internshipResidency}
          onChange={(e) => setInternshipResidency(e.target.value)}
          placeholder={t("InternshipPlaceholder")}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          rows={5}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        {/* Existing Certificate Section */}
        {existingCertificateUrl && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t("ExistingCertificate") || "Existing Certificate"}
            </label>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 max-w-xs truncate">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-200 rounded-md text-red-600 text-xs font-medium">
                    PDF
                  </div>
                  <div className="truncate">
                    <span className="block font-medium">
                      {existingCertificateUrl.split("/").pop() || "Certificate"}
                    </span>
                    <span className="text-xs text-gray-500">
                      Previously uploaded
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={existingCertificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {t("View") || "View"}
                  </a>
                  <button
                    type="button"
                    onClick={removeExistingCertificate}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove certificate"
                    disabled={isSubmitting}
                  >
                    {t("Remove")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload New Certificates Section */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("UploadNewCerts")}
        </label>
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleCertificateChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          disabled={isSubmitting}
        />

        {certificate && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {t("NewCertificate") || "New Certificate to Upload"}
            </h4>
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3 max-w-xs truncate">
                <div className="w-12 h-12 flex items-center justify-center bg-red-200 rounded-md text-red-600 text-xs font-medium">
                  PDF
                </div>
                <span className="truncate font-medium">{certificate.name}</span>
              </div>
              <button
                type="button"
                onClick={removeCertificate}
                className="text-red-500 hover:text-red-700"
                aria-label={`Remove certificate ${certificate.name}`}
                disabled={isSubmitting}
              >
                {t("Remove")}
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="languageCertifications"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("LanguageCertLabel")}
        </label>
        <input
          type="text"
          id="languageCertifications"
          value={languageCertifications}
          onChange={(e) => setLanguageCertifications(e.target.value)}
          placeholder={t("LanguageCertPlaceholder")}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : t("SaveButton")}
        </button>
      </div>
    </form>
  );
};

export default EducationCertificationsTab;