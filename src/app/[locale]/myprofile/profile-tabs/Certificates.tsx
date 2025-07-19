"use client";

import { useState, useEffect } from "react";
import { postData, deleteData } from "@/libs/server/server";
import { ProfileData } from "@/libs/helpers/types";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

// Mock server functions for demo purposes

interface Document {
  id: number;
  user_id: number;
  document: string;
  title: string;
  status: boolean;
  uploaded_at: string;
}

interface SelectedFile {
  id: string;
  file: File;
  preview: string;
  title: string;
}

const Certificates = ({
  profileData,
  token,
}: {
  profileData?: ProfileData;
  token?: string;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [documents, setDocuments] = useState<Document[]>(
    profileData?.documents || []
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<number | null>(null);
  const t = useTranslations("Profile");

  // Handle file selection
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: SelectedFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        newFiles.push({
          id,
          file,
          preview,
          title: file.name.split(".")[0],
        });
      } else {
        // toast.success();
        toast.success(t("Only images and PDF files are allowed"));
      }
    });

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Remove selected file
  const removeSelectedFile = (id: string) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  // Remove uploaded document with API call
  const removeDocument = async (documentId: number) => {
    try {
      setDeletingDocId(documentId);

      // Call the delete API
      await deleteData(`profile/documents/${documentId}`, {
        Authorization: `Bearer ${token}`,
      });

      // Remove from local state if API call succeeds
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
      // toast.success('Document removed successfully');
      toast.success(t("Document removed successfully"));
    } catch {
      // console.error('Failed to remove document:', error);
      // toast.success('Failed to remove document. Please try again.');
      toast.error(t("Failed to remove document:"));
    } finally {
      setDeletingDocId(null);
    }
  };

  // Upload files
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    // Validate that all files have titles
    const filesWithoutTitle = selectedFiles.filter(
      (file) => !file.title.trim()
    );
    if (filesWithoutTitle.length > 0) {
      toast.success(t("Please provide titles for all files before uploading"));
      return;
    }

    setUploading(true);
    const uploadPromises = selectedFiles.map(async (selectedFile) => {
      try {
        const formData = new FormData();
        formData.append("document", selectedFile.file);
        formData.append("title", selectedFile.title.trim());

        const response = await postData("profile/documents", formData, {
          Authorization: `Bearer ${token}`,
        });

        return response;
      } catch (error) {
        console.error(`Failed to upload ${selectedFile.title}:`, error);
        throw error;
      }
    });

    try {
      const results = await Promise.all(uploadPromises);

      // Add uploaded documents to the state
      const newDocuments = results.map((result) => ({
        id: result.id,
        user_id: result.user_id,
        document: result.document,
        title: result.title,
        status: result.status || false,
        uploaded_at: result.uploaded_at || new Date().toISOString(),
      }));

      setDocuments((prev) => [...prev, ...newDocuments]);

      // Clear selected files after successful upload
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      setSelectedFiles([]);

      toast.success(
        t("Successfully uploaded {count} document", {
          count: results.length,
        })
      );
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(t("Failed to upload some documents. Please try again."));
    } finally {
      setUploading(false);
    }
  };

  // Get file type icon
  const getFileIcon = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase();
    if (extension === "pdf") {
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 18h12V6l-4-4H4v16zm8-14l2 2h-2V4z" />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  };

  // Update title
  const updateTitle = (id: string, newTitle: string) => {
    setSelectedFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, title: newTitle } : file))
    );
  };

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Enhanced File Upload Area */}
        <div className="relative">
          <div
            className={`relative border-2 border-dashed rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 text-center transition-all duration-500 backdrop-blur-sm ${
              isDragging
                ? "border-blue-500 bg-gradient-to-r from-blue-500/20 to-blue-600/20 shadow-2xl transform scale-105"
                : "border-gray-300 bg-white/80 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-600/10 hover:shadow-xl"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                  {t("Drop files here or click to browse")}
                </p>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                  {t("Supports images (JPG, PNG, GIF) and PDF files")}
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                    {t("Images")}
                  </span>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">
                    {t("PDF")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t("Selected Files")}
                </h3>
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
                  {t("{count} file", { count: selectedFiles.length })}
                </span>
              </div>

              <button
                onClick={handleUpload}
                disabled={
                  uploading || selectedFiles.some((file) => !file.title.trim())
                }
                className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
              >
                {uploading ? (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    {t("Uploading")}
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {t("Upload Files")}
                  </>
                )}
              </button>
            </div>

            {/* Title Validation Warning */}
            {selectedFiles.some((file) => !file.title.trim()) && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5 sm:mt-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <p className="text-yellow-800 font-medium text-xs sm:text-sm">
                    {t("Please provide titles for all files before uploading")}
                  </p>
                </div>
              </div>
            )}

            {/* Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {selectedFiles.map((file) => (
                <div
                  key={file.id}
                  className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* File Preview */}
                    <div
                      className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      onClick={() =>
                        file.file.type.startsWith("image/") &&
                        setSelectedImage(file.preview)
                      }
                    >
                      {file.file.type.startsWith("image/") ? (
                        <img
                          src={file.preview}
                          alt={file.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {getFileIcon(file.preview)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        {file.file.type.startsWith("image/") && (
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="space-y-2 sm:space-y-3">
                      <input
                        type="text"
                        value={file.title}
                        onChange={(e) => updateTitle(file.id, e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors ${
                          !file.title.trim()
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder={t("Document title (required)")}
                        required
                      />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="truncate max-w-[60%]">{file.file.name}</span>
                        <span className="ml-2 px-2 py-0.5 sm:py-1 bg-gray-100 rounded-full text-xs">
                          {(file.file.size / 1024 / 1024).toFixed(1)}{t("MB")}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeSelectedFile(file.id)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      {t("Remove")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt={t("Preview")}
                className="max-w-full max-h-[85vh] object-contain rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Uploaded Documents */}
        {documents.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              {t("Uploaded Documents")} ({documents.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Document Preview */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      {doc?.document?.toLowerCase()?.includes(".pdf") ? (
                        <div className="w-full h-full flex items-center justify-center">
                          {getFileIcon(doc.document)}
                        </div>
                      ) : (
                        <img
                          src={doc.document}
                          alt={doc.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Document Info */}
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg truncate">
                      {doc.title}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(doc.uploaded_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <div className="flex items-center">
                        <span
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
                            doc.status
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {doc.status ? t("✓ Approved") : t("⏳ Pending")}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={doc.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all duration-300 text-center border border-blue-200 hover:border-blue-300"
                      >
                        {t("View")}
                      </a>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        disabled={deletingDocId === doc.id}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2"
                      >
                        {deletingDocId === doc.id ? (
                          <>
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            {t("Removing...")}
                          </>
                        ) : (
                          t("Remove")
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {documents.length === 0 && selectedFiles.length === 0 && (
          <div className="text-center py-8 sm:py-12 md:py-16 bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              {t("No documents uploaded yet")}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 px-4">
              {t("Start by uploading your first certificate or document")}
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                {t("Drag & Drop")}
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">
                {t("Click to Browse")}
              </span>
            </div>
          </div>
        )}

        {/* Required Documents Section */}
        {/* <section className="p-4 sm:p-6 md:p-8 w-full border-t border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            {t("RequiredDocsTitle")}
            <span className="text-gray-500 font-normal text-sm sm:text-base block mt-1">
              {t("RequiredDocsSubtitle")}
            </span>
          </h3>

          <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base pl-2 sm:pl-4">
            <li>{t("PassportCopy")}</li>
            <li>{t("GoodStanding")}</li>
            <li>{t("MedicalDegree")}</li>
            <li>{t("Transcript")}</li>
            <li>{t("Syllabus")}</li>
            <li>{t("PracticeLicense")}</li>
            <li>{t("GoodConduct")}</li>
            <li>{t("BirthCertificate")}</li>
            <li>{t("MedicalLicense")}</li>
            <li>{t("PoliceClearance")}</li>
            <li>{t("LanguageProficiency")}</li>
            <li>{t("CVFormat")}</li>
            <li>{t("UploadOthers")}</li>
          </ul>
        </section> */}
       
      </div>
    </div>
  );
};

export default Certificates;