'use client'

import Image from 'next/image'
import React, { useState, ChangeEvent } from 'react'

type DocumentStatus = "Approved" | "Needs Revision" | "In Progress" | "Other";

interface ManagedDocument {
  id: number;
  name: string;
  file: File;
  previewUrl?: string;
  status: DocumentStatus;
}

const statusColors: Record<DocumentStatus, string> = {
  Approved: "bg-green-100 text-green-800",
  "Needs Revision": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-gray-100 text-gray-700",
  Other: "bg-purple-100 text-purple-800",
};

const DocumentManagementTab: React.FC = () => {
  const [documents, setDocuments] = useState<ManagedDocument[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [customStatuses, setCustomStatuses] = useState<Record<number, string>>(
    {}
  );

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    docId?: number
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const previewUrl =
      file.type.startsWith("image/") || file.type === "application/pdf"
        ? URL.createObjectURL(file)
        : undefined;

    if (docId != null) {
      setDocuments((docs) =>
        docs.map((doc) => {
          if (doc.id === docId) {
            if (doc.previewUrl) URL.revokeObjectURL(doc.previewUrl);
            return { ...doc, file, name: file.name, previewUrl };
          }
          return doc;
        })
      );
    } else {
      const newDoc: ManagedDocument = {
        id: nextId,
        name: file.name,
        file,
        previewUrl,
        status: "In Progress",
      };
      setDocuments((docs) => [...docs, newDoc]);
      setNextId((id) => id + 1);
    }
  };

  const handleStatusChange = (id: number, newStatus: DocumentStatus) => {
    setDocuments((docs) =>
      docs.map((doc) => (doc.id === id ? { ...doc, status: newStatus } : doc))
    );
  };

  const handleCustomStatusChange = (id: number, customStatus: string) => {
    setCustomStatuses((prev) => ({
      ...prev,
      [id]: customStatus,
    }));
  };

  const handleRemove = (id: number) => {
    setDocuments((docs) => {
      const docToRemove = docs.find((doc) => doc.id === id);
      if (docToRemove?.previewUrl) URL.revokeObjectURL(docToRemove.previewUrl);
      return docs.filter((doc) => doc.id !== id);
    });
  };

  return (
    <div className="max-w-full px-20 mx-auto p-6 bg-white rounded-2xl shadow space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Document Management
      </h2>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Upload New Document
        </label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700
            cursor-pointer"
          accept="image/*,.pdf,.doc,.docx"
        />
      </div>

      {documents.length === 0 && (
        <p className="text-gray-500 text-center">No documents uploaded yet.</p>
      )}

      <ul className="space-y-6">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-4 max-w-sm">
              {doc.previewUrl && doc.file.type.startsWith("image/") && (
                <Image
                  width={80}
                  height={80}
                  src={doc.previewUrl}
                  alt={doc.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              {doc.previewUrl && doc.file.type === "application/pdf" && (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-md text-gray-600 font-bold">
                  PDF
                </div>
              )}

              <div className="truncate">
                <p className="font-semibold truncate">{doc.name}</p>
                <p
                  className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                    doc.status === "Other"
                      ? "bg-purple-100 text-purple-800"
                      : statusColors[doc.status]
                  }`}
                >
                  {doc.status === "Other"
                    ? customStatuses[doc.id] || "Other"
                    : doc.status}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label
                htmlFor={`replace-doc-${doc.id}`}
                className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-semibold"
                title="Replace document"
              >
                Replace
                <input
                  type="file"
                  id={`replace-doc-${doc.id}`}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, doc.id)}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>

              <select
                value={doc.status}
                onChange={(e) =>
                  handleStatusChange(doc.id, e.target.value as DocumentStatus)
                }
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Change status for ${doc.name}`}
              >
                <option value="Approved">Approved</option>
                <option value="Needs Revision">Needs Revision</option>
                <option value="In Progress">In Progress</option>
                <option value="Other">Other</option>
              </select>
              {doc.status === "Other" && (
                <input
                  type="text"
                  value={customStatuses[doc.id] || ""}
                  onChange={(e) =>
                    handleCustomStatusChange(doc.id, e.target.value)
                  }
                  placeholder="Please specify status"
                  className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                />
              )}

              <button
                type="button"
                onClick={() => handleRemove(doc.id)}
                className="text-red-600 hover:text-red-800 text-sm font-semibold"
                aria-label={`Remove document ${doc.name}`}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

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
          <li>
            Certificate of Good Conduct from the Professional Syndicate (valid
            for 3 months)
          </li>
          <li>Birth Certificate</li>
          <li>Medical License or Professional Registration</li>
          <li>Police Clearance Certificate</li>
          <li>Language Proficiency Certificates (e.g., Goethe, ÖSD, telc)</li>
          <li>
            CV formatted according to professional and regulatory standards
          </li>
          <li>Upload others</li>
        </ul>
      </section>
    </div>
  );
};

export default DocumentManagementTab
