"use client";

import { useState, useEffect } from "react";
import { postData,deleteData } from "@/libs/server/server";
import { ProfileData } from '@/libs/helpers/types';
import { toast } from 'react-hot-toast';
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
  token = "demo-token",
}: {
  profileData?: ProfileData;
  token?: string;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [documents, setDocuments] = useState<Document[]>(profileData?.documents || []);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<number | null>(null);
  const t =useTranslations()

  // Handle file selection
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: SelectedFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        newFiles.push({
          id,
          file,
          preview,
          title: file.name.split('.')[0],
        });
      } else {
        // toast.success();
              toast.success(t('Only images and PDF files are allowed'));

      }
    });

    setSelectedFiles(prev => [...prev, ...newFiles]);
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
    setSelectedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  // Remove uploaded document with API call
const removeDocument = async (documentId: number) => {
  try {
    setDeletingDocId(documentId);
    
    // Call the delete API
    await deleteData(`profile/documents/${documentId}`, {
      'Authorization': `Bearer ${token}`,
    });

    // Remove from local state if API call succeeds
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    // toast.success('Document removed successfully');
          toast.success(t('Document removed successfully'));
  } catch  {
    // console.error('Failed to remove document:', error);
    // toast.success('Failed to remove document. Please try again.');
          toast.error(t('Failed to remove document:'));

  } finally {
    setDeletingDocId(null);
  }
};

  // Upload files
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    // Validate that all files have titles
    const filesWithoutTitle = selectedFiles.filter(file => !file.title.trim());
    if (filesWithoutTitle.length > 0) {
      toast.success('Please provide titles for all files before uploading');
      return;
    }

    setUploading(true);
    const uploadPromises = selectedFiles.map(async (selectedFile) => {
      try {
        const formData = new FormData();
        formData.append('document', selectedFile.file);
        formData.append('title', selectedFile.title.trim());

        const response = await postData('profile/documents', formData, {
          'Authorization': `Bearer ${token}`,
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
      const newDocuments = results.map(result => ({
        id: result.id,
        user_id: result.user_id,
        document: result.document,
        title: result.title,
        status: result.status || false,
        uploaded_at: result.uploaded_at || new Date().toISOString(),
      }));

      setDocuments(prev => [...prev, ...newDocuments]);
      
      // Clear selected files after successful upload
      selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
      setSelectedFiles([]);
      
      toast.success(`Successfully uploaded ${results.length} document${results.length > 1 ? 's' : ''}`);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload some documents. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Get file type icon
  const getFileIcon = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return (
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 18h12V6l-4-4H4v16zm8-14l2 2h-2V4z"/>
          </svg>
        </div>
      );
    }
    return (
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
        </svg>
      </div>
    );
  };

  // Update title
  const updateTitle = (id: string, newTitle: string) => {
    setSelectedFiles(prev => 
      prev.map(file => 
        file.id === id ? { ...file, title: newTitle } : file
      )
    );
  };

  useEffect(() => {
    return () => {
      selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      <div className="w-full mx-auto space-y-8">
        {/* Enhanced File Upload Area */}
        <div className="relative">
          <div
            className={`relative border-2 border-dashed rounded-3xl p-4 text-center transition-all duration-500 backdrop-blur-sm ${
              isDragging
                ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-blue-600/20 shadow-2xl transform scale-105'
                : 'border-gray-300 bg-white/80 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-600/10 hover:shadow-xl'
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
            
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-gray-800">
                  Drop files here or click to browse
                </p>
                <p className="text-gray-500 text-lg">
                  Supports images (JPG, PNG, GIF) and PDF files
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Images</span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Selected Files
                </h3>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}
                </span>
              </div>
              
              <button
                onClick={handleUpload}
                disabled={uploading || selectedFiles.some(file => !file.title.trim())}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {uploading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Files
                  </>
                )}
              </button>
            </div>

            {/* Title Validation Warning */}
            {selectedFiles.some(file => !file.title.trim()) && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-yellow-800 font-medium">
                    Please provide titles for all files before uploading
                  </p>
                </div>
              </div>
            )}

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {selectedFiles.map((file) => (
                <div key={file.id} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="space-y-4">
                    {/* File Preview */}
                    <div 
                      className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      onClick={() => file.file.type.startsWith('image/') && setSelectedImage(file.preview)}
                    >
                      {file.file.type.startsWith('image/') ? (
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
                        {file.file.type.startsWith('image/') && (
                          <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={file.title}
                        onChange={(e) => updateTitle(file.id, e.target.value)}
                        className={`w-full px-4 py-3 text-sm font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors ${
                          !file.title.trim() ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Document title (required)"
                        required
                      />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="truncate">{file.file.name}</span>
                        <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">
                          {(file.file.size / 1024 / 1024).toFixed(1)}MB
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeSelectedFile(file.id)}
                      className="w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
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
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Uploaded Documents */}
        {documents.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Uploaded Documents ({documents.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div key={doc.id} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="space-y-4">
                    {/* Document Preview */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      {doc?.document?.toLowerCase()?.includes('.pdf') ? (
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
                    <h4 className="font-semibold text-gray-900 text-lg truncate">
                      {doc.title}
                    </h4>
                    <div className="flex w-full justify-between">
                      <p className="text-sm text-gray-500">
                        {new Date(doc.uploaded_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          doc.status 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status ? '✓ Approved' : '⏳ Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={doc.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-300 text-center border border-blue-200 hover:border-blue-300"
                      >
                        View
                      </a>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        disabled={deletingDocId === doc.id}
                        className="flex-1 px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {deletingDocId === doc.id ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Removing...
                          </>
                        ) : (
                          'Remove'
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
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No documents uploaded yet
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Start by uploading your first certificate or document
            </p>
            <div className="flex justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Drag & Drop</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Click to Browse</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;