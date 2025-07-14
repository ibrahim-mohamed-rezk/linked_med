'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { ProfileData } from '@/libs/helpers/types';
import { useTranslations } from 'next-intl';
import { postData } from '@/libs/server/server';

interface CertificateFile extends File {
  preview?: string;
}

// Since certificates is just a string URL, we don't need this interface

const EducationCertificationsTab = ({ profileData, token }: { profileData: ProfileData, token: string }) => {
  const t = useTranslations('Profile');

  const [medicalDegree, setMedicalDegree] = useState<string>(profileData?.education?.medical_degree_details || '');
  const [internshipResidency, setInternshipResidency] = useState<string>(profileData?.education?.internship_residency_history || '');
  const [languageCertifications, setLanguageCertifications] = useState<string>(profileData?.education?.language_certifications || '');
  const [certificates, setCertificates] = useState<CertificateFile[]>([]);
  const [existingCertificateUrl, setExistingCertificateUrl] = useState<string | null>(
    profileData?.education?.certificates || null
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    certificates.forEach((file, index) => {
      if (file.type.startsWith('image/') && !file.preview) {
        const previewUrl = URL.createObjectURL(file);
        certificates[index].preview = previewUrl;
        setCertificates([...certificates]);
      }
    });
    return () => {
      certificates.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [certificates]);

  const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files).map((file) => file as CertificateFile);
    setCertificates((prev) => [...prev, ...filesArray]);
  };

  const removeCertificate = (index: number) => {
    setCertificates((prev) => {
      const newFiles = [...prev];
      if (newFiles[index].preview) URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const removeExistingCertificate = () => {
    setExistingCertificateUrl(null);
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || 'FILE';
  };

  const isImageFile = (filename: string | undefined, type?: string) => {
    if (type) return type.startsWith('image/');
    if (!filename) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData object
      const formData = new FormData();
      
      // Append text fields
      formData.append('medical_degree_details', medicalDegree);
      formData.append('internship_residency_history', internshipResidency);
      formData.append('language_certifications', languageCertifications);
      
      // Append certificate files
      certificates.forEach((file) => {
        formData.append('certificates', file);
      });

      // Append existing certificate URL (empty string if removed, or the URL if kept)
      formData.append('existing_certificate_url', existingCertificateUrl || '');
      
      const response = await postData('profile/update/education', formData, { Authorization: `Bearer ${token}` });

      console.log('Response:', response);
      // Handle success response here
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-full px-4 md:px-20 mx-auto p-6 bg-white rounded-2xl shadow space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">{t('Title')}</h2>

      <div>
        <label htmlFor="medicalDegree" className="block text-sm font-medium text-gray-700 mb-1">
          {t('MedicalDegreeLabel')}
        </label>
        <input
          type="text"
          id="medicalDegree"
          value={medicalDegree}
          onChange={(e) => setMedicalDegree(e.target.value)}
          placeholder={t('MedicalDegreePlaceholder')}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="internshipResidency" className="block text-sm font-medium text-gray-700 mb-1">
          {t('InternshipLabel')}
        </label>
        <textarea
          id="internshipResidency"
          value={internshipResidency}
          onChange={(e) => setInternshipResidency(e.target.value)}
          placeholder={t('InternshipPlaceholder')}
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
              {t('ExistingCertificate') || 'Existing Certificate'}
            </label>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 max-w-xs truncate">
                  {isImageFile(existingCertificateUrl) ? (
                    <Image
                      src={existingCertificateUrl}
                      alt="Certificate"
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-md"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const nextDiv = target.nextElementSibling as HTMLElement;
                        if (nextDiv) nextDiv.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-12 h-12 flex items-center justify-center bg-blue-200 rounded-md text-blue-600 text-xs font-medium ${isImageFile(existingCertificateUrl) ? 'hidden' : ''}`}>
                    {getFileExtension(existingCertificateUrl)}
                  </div>
                  <div className="truncate">
                    <span className="block font-medium">
                      {existingCertificateUrl.split('/').pop() || 'Certificate'}
                    </span>
                    <span className="text-xs text-gray-500">Previously uploaded</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={existingCertificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {t('View') || 'View'}
                  </a>
                  <button
                    type="button"
                    onClick={removeExistingCertificate}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove certificate"
                    disabled={isSubmitting}
                  >
                    {t('Remove')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload New Certificates Section */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('UploadNewCerts')}
        </label>
        <input
          type="file"
          multiple
          onChange={handleCertificateChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          accept="image/*,.pdf"
          disabled={isSubmitting}
        />

        {certificates.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {t('NewCertificates') || 'New Certificates to Upload'}
            </h4>
            <ul className="space-y-4 max-h-48 overflow-y-auto">
              {certificates.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3 max-w-xs truncate">
                    {file.type.startsWith('image/') && file.preview ? (
                      <Image
                        src={file.preview}
                        alt={file.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-green-200 rounded-md text-green-600 text-xs font-medium">
                        {getFileExtension(file.name)}
                      </div>
                    )}
                    <span className="truncate font-medium">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCertificate(index)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remove certificate ${file.name}`}
                    disabled={isSubmitting}
                  >
                    {t('Remove')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="languageCertifications" className="block text-sm font-medium text-gray-700 mb-1">
          {t('LanguageCertLabel')}
        </label>
        <input
          type="text"
          id="languageCertifications"
          value={languageCertifications}
          onChange={(e) => setLanguageCertifications(e.target.value)}
          placeholder={t('LanguageCertPlaceholder')}
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
          {isSubmitting ? 'Saving...' : t('SaveButton')}
        </button>
      </div>
    </form>
  );
};

export default EducationCertificationsTab;