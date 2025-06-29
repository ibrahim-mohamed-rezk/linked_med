'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import { ProfileData } from "@/libs/helpers/types";
// import { postData } from '@/libs/server/server';

interface CertificateFile extends File {
  preview?: string
}
// const ProfessionalBackgroundTab = ({ profileData }: { profileData: ProfileData }) => {

const EducationCertificationsTab = ({ profileData }: { profileData: ProfileData }) => {
  const [medicalDegree, setMedicalDegree] = useState<string>(profileData?.medical_degree_details || '')
  const [internshipResidency, setInternshipResidency] = useState<string>(profileData?.internship_residency_history || '')
  const [languageCertifications, setLanguageCertifications] = useState<string>(profileData?.language_certifications || '')
  const [certificates, setCertificates] = useState<CertificateFile[]>([])

  // Generate previews for image certificates
  useEffect(() => {
    certificates.forEach((file, index) => {
      if (file.type.startsWith('image/') && !file.preview) {
        const previewUrl = URL.createObjectURL(file)
        certificates[index].preview = previewUrl
        setCertificates([...certificates])
      }
    })

    // Cleanup previews on unmount
    return () => {
      certificates.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [certificates])

  const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const filesArray = Array.from(e.target.files).map((file) => file as CertificateFile)
    setCertificates((prev) => [...prev, ...filesArray])
  }

  const removeCertificate = (index: number) => {
    setCertificates((prev) => {
      const newFiles = [...prev]
      if (newFiles[index].preview) URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const removeExistingDocument = (documentId: number) => {
    // TODO: Add API call to remove document from server
    console.log('Remove document with ID:', documentId)
    alert('Remove existing document functionality needs to be implemented')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Add submission logic here (API call or form data handling)
    const formData = {
      medical_degree_details: medicalDegree,
      internship_residency_history: internshipResidency,
      language_certifications: languageCertifications,
      new_certificates: certificates
    }
    console.log('Form data to submit:', formData)
    alert('Submit Education & Certifications form (implement your logic)')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full px-20 mx-auto p-6 bg-white rounded-2xl shadow space-y-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Education & Certifications</h2>

      {/* Medical Degree Details */}
      <div>
        <label
          htmlFor="medicalDegree"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Medical Degree Details (University, Year, Country)
        </label>
        <input
          type="text"
          id="medicalDegree"
          value={medicalDegree}
          onChange={(e) => setMedicalDegree(e.target.value)}
          placeholder="e.g., Harvard University, 2015, USA"
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Internship & Residency History */}
      <div>
        <label
          htmlFor="internshipResidency"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Internship & Residency History
        </label>
        <textarea
          id="internshipResidency"
          value={internshipResidency}
          onChange={(e) => setInternshipResidency(e.target.value)}
          placeholder="Describe your internship and residency experiences"
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          rows={5}
          required
        />
      </div>

      {/* Existing Documents */}
      {profileData?.documents && profileData.documents.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Existing Documents
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {profileData.documents.map((doc, index) => (
              <div
                key={doc.id}
                className="relative bg-gray-50 p-3 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative mb-2">
                  <Image
                    src={doc.document}
                    alt={doc.title || `Document ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                    onError={(e) => {
                      // Handle image load error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
                    <span className="text-gray-600 text-sm">Document</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    doc.status === 0 ? 'bg-yellow-100 text-yellow-800' : 
                    doc.status === 1 ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {doc.status === 0 ? 'Pending' : doc.status === 1 ? 'Approved' : 'Rejected'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExistingDocument(doc.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                    aria-label={`Remove document ${doc.id}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Certificates Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload New Certificates
        </label>
        <input
          type="file"
          multiple
          onChange={handleCertificateChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700
            cursor-pointer"
          accept="image/*,.pdf"
        />

        {certificates.length > 0 && (
          <ul className="mt-4 space-y-4 max-h-48 overflow-y-auto">
            {certificates.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
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
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md text-gray-600 text-xs">
                      {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                    </div>
                  )}
                  <span className="truncate">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeCertificate(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Remove certificate ${file.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Language Certifications */}
      <div>
        <label
          htmlFor="languageCertifications"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Language Certifications (A1, A2, B1, B2, Fachsprachprüfung, etc.)
        </label>
        <input
          type="text"
          id="languageCertifications"
          value={languageCertifications}
          onChange={(e) => setLanguageCertifications(e.target.value)}
          placeholder="e.g., A2 German, B1 English, Fachsprachprüfung"
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <section className="pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Required Documents
          <span className="text-gray-500 font-normal text-base block mt-1">
            (depending on destination country and regulatory authority):
          </span>
        </h3>

        <ul className="list-disc list-inside space-y-2 text-gray-700 max-w-xl">
          <li>Certified Passport Copy</li>
          <li>Good Standing Certificate (recent and valid)</li>
          <li>Medical Degree Certification</li>
          <li>Academic Transcript</li>
          <li>Detailed Course Syllabus (required in some states)</li>
          <li>Professional Practice License</li>
          <li>Certificate of Good Conduct from the Professional Syndicate (valid for 3 months)</li>
          <li>Birth Certificate</li>
          <li>Medical License or Professional Registration</li>
          <li>Police Clearance Certificate</li>
          <li>Language Proficiency Certificates (e.g., Goethe, ÖSD, telc)</li>
          <li>CV formatted according to professional and regulatory standards</li>
          <li>Upload others</li>
        </ul>
      </section>

      <div className="text-right">
        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default EducationCertificationsTab