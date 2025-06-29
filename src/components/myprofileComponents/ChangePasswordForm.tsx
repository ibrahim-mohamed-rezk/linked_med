"use client";

import { useTranslations } from "next-intl";
import { PasswordDataTypes, MessageTypes } from "@/types/profile";

interface ChangePasswordFormProps {
  passwordData: PasswordDataTypes;
  message: MessageTypes;
  isLoading: boolean;
  onPasswordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const ChangePasswordForm = ({
  passwordData,
  message,
  isLoading,
  onPasswordInputChange,
  onSubmit,
  onCancel
}: ChangePasswordFormProps) => {
  const t = useTranslations("Profile");

  return (
    <form onSubmit={onSubmit} className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("Change Your Password")}</h2>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
            {t("Current Password")}
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={onPasswordInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>
        
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            {t("New Password")}
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={onPasswordInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
            minLength={8}
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            {t("Confirm New Password")}
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={onPasswordInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
            minLength={8}
          />
        </div>
        
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? t("Changing...") : t("Change Password")}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;