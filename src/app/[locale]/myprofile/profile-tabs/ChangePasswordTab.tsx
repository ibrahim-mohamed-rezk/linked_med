'use client'
import { useState } from 'react'
import { postData } from '@/libs/server/server'
import { AxiosHeaders,AxiosError } from 'axios';


const ChangePasswordTab = ({token}:{token:string}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!')
      return
    }

    setIsLoading(true)

    try {
      // Prepare the data to send to the API
      const requestData = {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmPassword
      }

      // Send the request to your API endpoint
      const response = await postData('profile/change-password', requestData, new AxiosHeaders({Authorization: `Bearer ${token}`}) )
      
      // Handle successful response
      console.log('Password changed successfully:', response)
      alert('Password changed successfully!')
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
    } catch (error) {
      if(error instanceof AxiosError) {
      // Handle errors
      console.error('Error changing password:', error)
      
      // Display error message to user
      if (error?.response?.data?.message) {
        alert(`Error: ${error?.response.data.message}`)
      } else if (error?.response?.data?.errors) {
        // Handle validation errors from backend
        const errors = error?.response.data.errors
        const errorMessages = Object.values(errors).flat().join('\n')
        alert(`Validation errors:\n${errorMessages}`)
      } else {
        alert('An error occurred while changing the password. Please try again.')
      }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword)
        break
      case 'new':
        setShowNewPassword(!showNewPassword)
        break
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword)
        break
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 px-20 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
      
      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Current Password</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter your current password"
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {showCurrentPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {showNewPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters long
          </p>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              Passwords do not match
            </p>
          )}
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li className={`flex items-center ${formData.newPassword.length >= 8 ? 'text-green-600' : ''}`}>
            <span className="mr-2">{formData.newPassword.length >= 8 ? '✓' : '•'}</span>
            At least 8 characters long
          </li>
          <li className={`flex items-center ${/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : ''}`}>
            <span className="mr-2">{/[A-Z]/.test(formData.newPassword) ? '✓' : '•'}</span>
            Contains uppercase letter
          </li>
          <li className={`flex items-center ${/[a-z]/.test(formData.newPassword) ? 'text-green-600' : ''}`}>
            <span className="mr-2">{/[a-z]/.test(formData.newPassword) ? '✓' : '•'}</span>
            Contains lowercase letter
          </li>
          <li className={`flex items-center ${/\d/.test(formData.newPassword) ? 'text-green-600' : ''}`}>
            <span className="mr-2">{/\d/.test(formData.newPassword) ? '✓' : '•'}</span>
            Contains number
          </li>
          <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? 'text-green-600' : ''}`}>
            <span className="mr-2">{/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? '✓' : '•'}</span>
            Contains special character
          </li>
        </ul>
      </div>

      <div className="pt-4 flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Changing Password...' : 'Change Password'}
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ChangePasswordTab