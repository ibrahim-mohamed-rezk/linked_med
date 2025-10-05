"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import loginImage from "../../public/images/Home/login.jpg";
// import signupImage from "../../public/Assets/singupimage.png";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { login, signup, getFullAuthData } from "@/libs/server/auth";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchModal?: () => void;
  openVerifyModal?: () => void; // Switching between login/signup
};

type VerifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  onResend?: () => void;
};

export const SignupModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSwitchModal,
  openVerifyModal,
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
  // const router = useRouter();

  // Password validation checks
  const passwordValidation = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Check if all password requirements are met
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const isPasswordMatch = password === confirmPassword;
  const isFormValid =
    isPasswordValid && isPasswordMatch && name.length > 0 && email.length > 0;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(t("passwords_dont_match"));
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet security requirements");
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
      // const authData = getFullAuthData();
      // console.log("Full auth data:", authData);

      // Close modal after a short delay
      onClose();
      if (openVerifyModal !== undefined) {
        openVerifyModal();
      }
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
      style={{ overflow: "hidden" }}
    >
      <div className="relative rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden max-h-[90vh]">
        {/* Background Image - Full Modal */}
        <Image
          src={loginImage}
          alt="Sign Up Background"
          fill
          className={`object-cover rounded-2xl ${
            locale === "en" ? "scale-x-[-1]" : ""
          }`}
          priority
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 rounded-2xl"></div>

        {/* Form Content */}
        <div
          dir={direction}
          className="relative z-10 overflow-y-auto items-start justify-start"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
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

          <div
            className="rounded-xl p-8 w-3/6 justify-end flex items-end max-h-[100vh] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="w-full">
              <h2 className="text-sm text-gray-600">
                {t("welcome")}{" "}
                <a href="#" className="text-blue-600 font-semibold">
                  Linkedmed
                </a>
              </h2>
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {t("sign_up")}
              </h1>

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

              <form onSubmit={handleSignup} className="space-y-6">
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
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 focus:border-blue-300 focus:outline-none bg-white transition-all duration-200 ease-in-out"
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
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 focus:border-blue-300 focus:outline-none bg-white transition-all duration-200 ease-in-out"
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
                      className="w-full mt-1 px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 focus:border-blue-300 focus:outline-none bg-white transition-all duration-200 ease-in-out"
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
                      className="w-full mt-1 px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 focus:border-blue-300 focus:outline-none bg-white transition-all duration-200 ease-in-out"
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
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      {t("passwords_dont_match")}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Password Requirements
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li
                        className={`flex items-center ${
                          passwordValidation.length ? "text-green-600" : ""
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.length ? "✓" : "•"}
                        </span>
                        At least 8 characters
                      </li>
                      <li
                        className={`flex items-center ${
                          passwordValidation.upper ? "text-green-600" : ""
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.upper ? "✓" : "•"}
                        </span>
                        One uppercase letter
                      </li>
                      <li
                        className={`flex items-center ${
                          passwordValidation.lower ? "text-green-600" : ""
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.lower ? "✓" : "•"}
                        </span>
                        One lowercase letter
                      </li>
                      <li
                        className={`flex items-center ${
                          passwordValidation.number ? "text-green-600" : ""
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.number ? "✓" : "•"}
                        </span>
                        One number
                      </li>
                      <li
                        className={`flex items-center ${
                          passwordValidation.special ? "text-green-600" : ""
                        }`}
                      >
                        <span className="mr-2">
                          {passwordValidation.special ? "✓" : "•"}
                        </span>
                        One special character
                      </li>
                    </ul>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className={`w-full py-2 rounded-md text-sm font-medium transition ${
                    isFormValid && !loading
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await login({
        login: email,
        password,
      });

      // Use the message from the API response or fallback to translation
      setSuccess(response.message || t("login_success"));

      // Get full data from cookies
      const authData = getFullAuthData();
      console.log("Full auth data:", authData);

      // Close modal after a short delay and redirect to profile
      setTimeout(() => {
        onClose();
        window.location.href = `/${locale}/myprofile`; // Redirect to profile page
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
          className={`object-cover rounded-2xl ${
            locale === "en" ? "scale-x-[-1]" : ""
          }`}
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
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {t("sign_in")}
              </h1>

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
                  <div
                    className={`${
                      locale === "en" ? "text-left" : "text-right"
                    }`}
                  >
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
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

export const VerifyModal: FC<VerifyModalProps> = ({
  isOpen,
  onClose,
  onVerify,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  // const [timeLeft, setTimeLeft] = useState<number>(60);
  const [currentInputIndex, setCurrentInputIndex] = useState<number>(0);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const t = useTranslations("VerifyModal");

  // Start the 60s countdown on mount
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  // Auto-focus first empty input on mount
  useEffect(() => {
    const firstEmptyIndex = code.findIndex((digit) => digit === "");
    const targetIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    setCurrentInputIndex(targetIndex);
    inputsRef.current[targetIndex]?.focus();
  }, []);

  // Progress bar percentage
  // const progress = (timeLeft / 60) * 100;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const next = [...code];
    next[idx] = val;
    setCode(next);

    // Auto-focus next input if value is entered
    if (val && idx < 3) {
      setCurrentInputIndex(idx + 1);
      setTimeout(() => {
        inputsRef.current[idx + 1]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      const next = [...code];
      next[idx - 1] = "";
      setCode(next);
      setCurrentInputIndex(idx - 1);
      inputsRef.current[idx - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      setCurrentInputIndex(idx - 1);
      inputsRef.current[idx - 1]?.focus();
    }

    if (e.key === "ArrowRight" && idx < 3) {
      e.preventDefault();
      setCurrentInputIndex(idx + 1);
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleFocus = (idx: number) => {
    // Don't allow focus if previous inputs are not filled
    const canFocus =
      idx === 0 || code.slice(0, idx).every((digit) => digit !== "");

    if (canFocus) {
      setCurrentInputIndex(idx);
    } else {
      // Find the first empty input and focus it instead
      const firstEmptyIndex = code.findIndex((digit) => digit === "");
      const targetIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
      setCurrentInputIndex(targetIndex);
      inputsRef.current[targetIndex]?.focus();
    }
  };

  // const formatTime = (sec: number) => {
  //   const m = String(Math.floor(sec / 60)).padStart(2, "0");
  //   const s = String(sec % 60).padStart(2, "0");
  //   return `${m}:${s}`;
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed ltr-dir inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 w-full max-w-sm transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center">
          {t("title", { defaultMessage: "Verify Your Account" })}
        </h2>
        <p className="text-gray-500 mb-4 text-sm text-center">
          {t("subtitle", {
            defaultMessage: "Enter the 4-digit code sent to your email",
          })}
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <div className="flex items-center gap-2 text-amber-800 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <span>
              {t("spam_notice", {
                defaultMessage:
                  "Check your spam/junk folder if you don't see the email",
              })}
            </span>
          </div>
        </div>

        {/* Force LTR direction for the input container */}
        <div className="flex justify-between mb-4 gap-2" dir="ltr">
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={false}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onFocus={() => handleFocus(idx)}
              className={`w-14 h-14 border rounded-lg text-center text-2xl font-semibold outline-none transition-all shadow-sm ${
                idx === currentInputIndex
                  ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500"
                  : code[idx]
                  ? "bg-green-50 border-green-300"
                  : "bg-gray-50 border-gray-300"
              }`}
              style={{ direction: "ltr", textAlign: "center" }}
            />
          ))}
        </div>

        {/* Progress bar for timer */}
        {/* <div className="w-full h-2 bg-gray-200 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-gray-600 text-sm mb-4 text-center">
          {t("expires_in", { defaultMessage: "Code expires in:" })}{" "}
          <span className="font-medium">{formatTime(timeLeft)}</span>
        </div> */}

        {/* <div className="text-sm mb-6 text-center">
          {t("no_code", { defaultMessage: "Didn't receive code?" })}{" "}
          <button
            onClick={onResend}
            disabled={timeLeft > 0}
            className={`ml-1 font-semibold transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              timeLeft > 0
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-white bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {t("resend", { defaultMessage: "Resend Code" })}
          </button>
        </div> */}

        <button
          onClick={() => {
            onVerify(code.join(""));
          }}
          disabled={code.some((d) => d === "")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:bg-blue-700 transition-colors"
        >
          {t("verify", { defaultMessage: "Verify" })}
        </button>
      </div>
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};
