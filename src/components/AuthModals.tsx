"use client";

import React, { useState } from "react";
import Image from "next/image";
import loginImage from "../../public/images/Home/login.jpg";
// import signupImage from "../../public/Assets/singupimage.png";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { login, signup, getFullAuthData } from "@/libs/server/auth";
import { useRouter } from "next/navigation";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchModal?: () => void; // Switching between login/signup
};

export function LoginModal({ isOpen, onClose, onSwitchModal }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations("auth");
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await login({
        email,
        password,
      });

      // Use the message from the API response or fallback to translation
      setSuccess(response.message || t("login_success"));

      // Get full data from cookies
      const authData = getFullAuthData();
      console.log("Full auth data:", authData);

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        router.refresh(); // Refresh page to update UI with logged-in state
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setError(t("login_failed"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      dir={direction}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
    >
      <div className="relative  rounded-2xl shadow-lg w-full max-w-2xl overflow-hidden max-h-[130vh]">
        {/* Background Image - Full Modal */}
        <Image
          src={loginImage}
          alt="Sign In Background"

          fill
          className={`object-cover rounded-2xl ${locale === "en" ? "scale-x-[-1]" : ""}`}
          priority
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0  rounded-2xl"></div>

        {/* Form Content */}
        <div
          dir={direction}
          className="relative z-10 overflow-y-auto items-start  justify-start"
        >
          <button
            onClick={onClose}
            className="absolute top-4 ltr:right-4 rtl:left-4 bg-black backdrop-blur-sm hover:bg-white/30 text-white rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className=" rounded-xl p-8 w-3/6 justify-end flex items-end">
            <div className="w-full">
              <h2 className="text-sm text-gray-600">
                {t("welcome")}{" "}
                <a href="#" className="text-blue-600 font-semibold">
                  Linkedmed
                </a>
              </h2>
              <h1 className="text-3xl font-bold mb-6 text-gray-800">{t("sign_in")}</h1>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
                  {success}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium rtl:text-right ltr:text-left text-gray-700"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("placeholder_email")}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium rtl:text-right ltr:text-left text-gray-700"
                  >
                    {t("password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("placeholder_password")}
                      className="w-full mt-1 px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className={`${locale === "en" ? "text-left" : "text-right"}`}>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      {t("forgot")}
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                  disabled={loading}
                >
                  {loading ? t("loading") : t("submit_signin")}
                </button>

                <p className="text-sm text-center text-gray-600">
                  {t("no_account")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchModal?.();
                    }}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {t("link_signup")}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const SignupModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSwitchModal,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const t = useTranslations("auth");
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(t("passwords_dont_match"));
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await signup({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      // Use the message from the API response or fallback to translation
      setSuccess(response.message || t("signup_success"));

      // Get full data from cookies
      const authData = getFullAuthData();
      console.log("Full auth data:", authData);

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        router.refresh(); // Refresh page to update UI with logged-in state
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      setError(t("signup_failed"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      dir={direction}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
    >
      <div className="relative  rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden max-h-[130vh]">
        {/* Background Image - Full Modal */}
        <Image
          src={loginImage}
          alt="Sign Up Background"
          fill
          className={`object-cover rounded-2xl ${locale === "en" ? "scale-x-[-1]" : ""}`}
          priority
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0  rounded-2xl"></div>

        {/* Form Content */}
        <div
          dir={direction}
          className="relative z-10 overflow-y-auto items-start  justify-start"
        >
          <button
            onClick={onClose}
            className="absolute top-4 ltr:right-4 rtl:left-4 bg-black backdrop-blur-sm hover:bg-white/30 text-white rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className=" rounded-xl p-8 w-3/6 justify-end flex items-end">
            <div className="w-full">
              <h2 className="text-sm text-gray-600">
                {t("welcome")}{" "}
                <a href="#" className="text-blue-600 font-semibold">
                  Linkedmed
                </a>
              </h2>
              <h1 className="text-3xl font-bold mb-6 text-gray-800">{t("sign_up")}</h1>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
                  {success}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-8">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium rtl:text-right ltr:text-left text-gray-700"
                  >
                    {t("Name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("placeholder_name")}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium rtl:text-right ltr:text-left text-gray-700"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("placeholder_email")}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium rtl:text-right ltr:text-left text-gray-700"
                  >
                    {t("password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("placeholder_create_password")}
                      className="w-full mt-1 px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium rtl:text-right ltr:text-left text-gray-700"
                  >
                    {t("confirm_password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t("placeholder_confirm_password")}
                      className="w-full mt-1 px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                  disabled={loading}
                >
                  {loading ? t("loading") : t("submit_signup")}
                </button>

                <p className="text-sm text-center text-gray-600">
                  {t("have_account")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchModal?.();
                    }}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {t("link_signin")}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};