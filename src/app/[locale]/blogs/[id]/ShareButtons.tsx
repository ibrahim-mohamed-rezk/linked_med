'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
  description: string
  twitterHandle?: string
}

const ShareButtons = ({ 
  url, 
  title, 
  description, 
  twitterHandle = '@LinkedMed' 
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=${twitterHandle.replace('@', '')}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      console.error('Failed to copy: ', err)
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        console.error('Failed to copy: ', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
        Share Article
      </h3>
      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={shareOnTwitter}
          className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
          Share on Twitter
        </button>
        
        <button 
          onClick={shareOnFacebook}
          className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl hover:from-blue-900 hover:to-blue-950 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Share on Facebook
        </button>
        
        <button 
          onClick={shareOnLinkedIn}
          className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Share on LinkedIn
        </button>
        
        <button 
          onClick={copyToClipboard}
          className={`flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ${
            copied 
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
              : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
          }`}
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ShareButtons