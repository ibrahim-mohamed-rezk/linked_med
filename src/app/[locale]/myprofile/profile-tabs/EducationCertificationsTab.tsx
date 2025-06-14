'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'

interface CertificateFile extends File {
  preview?: string
}

const EducationCertificationsTab: React.FC = () => {
  const [medicalDegree, setMedicalDegree] = useState<string>('')
  const [internshipResidency, setInternshipResidency] = useState<string>('')
  const [languageCertifications, setLanguageCertifications] = useState<string>('')
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Add submission logic here (API call or form data handling)
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

      {/* Certificates Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certificates
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
