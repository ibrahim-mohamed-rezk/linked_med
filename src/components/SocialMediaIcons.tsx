// // components/SocialMediaIcons.tsx
// "use client";
// import { FC, useState, useEffect } from "react";
// // import Link from "next/link";
// import { LoginModal, SignupModal } from "./AuthModals";
// import { getUserFromCookies, isAuthenticated, UserProfile } from "@/libs/server/auth";
// import { useLocale } from "next-intl";

// const SocialMediaIcons: FC = () => {
//     const [isLoginOpen, setIsLoginOpen] = useState(false);
//     const [isSignupOpen, setIsSignupOpen] = useState(false);
//     const [user, setUser] = useState<UserProfile | null>(null);
//     const locale = useLocale();

//     // Check if user is authenticated on component mount
//     useEffect(() => {
//         if (isAuthenticated()) {
//             const userData = getUserFromCookies();
//             if (userData) {
//                 setUser(userData);
//             }
//         }
//     }, []);

//     const handleLoginClick = () => {
//         if (user) {
//             // If user is logged in, redirect to profile
//             window.location.href = `${locale}/myprofile`;
//         } else {
//             // If user is not logged in, open login modal
//             setIsLoginOpen(true);
//         }
//     };
//     return (
//         <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
//             {/* Facebook Icon */}
//             <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative overflow-hidden bg-gradient-to-br from-[#1877F2] to-[#0C63D4] hover:from-[#165eab] hover:to-[#0a4d8c] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     width="18"
//                     height="18"
//                     fill="white"
//                     className="relative z-10 drop-shadow-sm"
//                 >
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//             </a>

//             {/* Instagram Icon */}
//             <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative overflow-hidden bg-gradient-to-br from-[#E4405F] via-[#F77737] to-[#FCAF45] hover:from-[#d63384] hover:via-[#fd7e14] hover:to-[#ffc107] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     width="20"
//                     height="20"
//                     fill="white"
//                     className="relative z-10 drop-shadow-sm"
//                 >
//                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                 </svg>
//             </a>

//             {/* TikTok Icon */}
//             <a
//                 href="https://tiktok.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333] hover:from-[#ff0050] hover:via-[#00f2ea] hover:to-[#000000] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     width="20"
//                     height="20"
//                     fill="white"
//                     className="relative z-10 drop-shadow-sm"
//                 >
//                     <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
//                 </svg>
//             </a>

//             {/* WhatsApp Icon */}
//             <a
//                 href="https://wa.me"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative overflow-hidden bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#1ea952] hover:to-[#0d6b5c] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     width="20"
//                     height="20"
//                     fill="white"
//                     className="relative z-10 drop-shadow-sm"
//                 >
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
//                 </svg>
//             </a>

//             {/* LinkedIn Icon */}
//             <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative overflow-hidden bg-gradient-to-br from-[#0A66C2] to-[#004B8D] hover:from-[#0958a5] hover:to-[#003d73] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     width="20"
//                     height="20"
//                     fill="white"
//                     className="relative z-10 drop-shadow-sm"
//                 >
//                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                 </svg>
//             </a>

//             {/* Premium Login Button */}
//             <button
//                 onClick={handleLoginClick}
//                 className="group relative overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] hover:from-[#5a6cf3] hover:via-[#6a42a0] hover:to-[#ef6aff] text-white font-semibold py-2 px-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     width="18"
//                     height="18"
//                     fill="white"
//                     className="relative z-10 drop-shadow-sm"
//                 >
//                     {user ? (
//                         // Show different icon if user is logged in (dashboard/profile icon)
//                         <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
//                     ) : (
//                         // Show login icon if user is not logged in
//                         <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//                     )}
//                 </svg>
//             </button>

//             {/* Floating backdrop effect */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-3xl blur-xl scale-110 pointer-events-none"></div>

//             {/* Login Modal */}
//             <LoginModal
//                 isOpen={isLoginOpen}
//                 onClose={() => {
//                     setIsLoginOpen(false);
//                     // Check if user logged in after modal closes
//                     if (isAuthenticated()) {
//                         const userData = getUserFromCookies();
//                         if (userData) {
//                             setUser(userData);
//                         }
//                     }
//                 }}
//                 onSwitchModal={() => {
//                     setIsLoginOpen(false);
//                     setIsSignupOpen(true);
//                 }}
//             />

//             <SignupModal
//                 isOpen={isSignupOpen}
//                 onClose={() => {
//                     setIsSignupOpen(false);
//                     // Check if user signed up after modal closes
//                     if (isAuthenticated()) {
//                         const userData = getUserFromCookies();
//                         if (userData) {
//                             setUser(userData);
//                         }
//                     }
//                 }}
//                 onSwitchModal={() => {
//                     setIsSignupOpen(false);
//                     setIsLoginOpen(true);
//                 }}
//             />
//         </div>
//     );
// };

// export default SocialMediaIcons;



// components/SocialMediaIcons.tsx
"use client";
import { FC, useState, useEffect } from "react";
// import Link from "next/link";
import { LoginModal, SignupModal } from "./AuthModals";
import { getUserFromCookies, isAuthenticated, UserProfile } from "@/libs/server/auth";
import { useLocale } from "next-intl";

const SocialMediaIcons: FC = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const locale = useLocale();
    
    // Check if locale is RTL
    const isRTL = locale === 'ar' || locale === 'he' || locale === 'fa' || locale === 'ur';

    // Check if user is authenticated on component mount
    useEffect(() => {
        if (isAuthenticated()) {
            const userData = getUserFromCookies();
            if (userData) {
                setUser(userData);
            }
        }
    }, []);

    const handleLoginClick = () => {
        if (user) {
            // If user is logged in, redirect to profile
            window.location.href = `${locale}/myprofile`;
        } else {
            // If user is not logged in, open login modal
            setIsLoginOpen(true);
        }
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`fixed bottom-8 z-50 flex flex-col gap-3 ${isRTL ? 'left-8' : 'right-8'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Social Media Icons Container */}
            <div
                className={`flex flex-col gap-3 transition-all duration-500 transform origin-bottom ${
                    isExpanded
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}
            >
                {/* Facebook Icon */}
                <a
                    href="https://www.facebook.com/LinkedMed.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-gradient-to-br from-[#1877F2] to-[#0C63D4] hover:from-[#165eab] hover:to-[#0a4d8c] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transition-transform duration-700 ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}></div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="white"
                        className="relative z-10 drop-shadow-sm"
                    >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>

                {/* Instagram Icon */}
                <a
                    href="https://www.instagram.com/linked_med/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-gradient-to-br from-[#E4405F] via-[#F77737] to-[#FCAF45] hover:from-[#d63384] hover:via-[#fd7e14] hover:to-[#ffc107] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transition-transform duration-700 ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}></div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="white"
                        className="relative z-10 drop-shadow-sm"
                    >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>

                {/* TikTok Icon */}
                <a
                    href="https://www.tiktok.com/@linkedmed?_t=ZS-8wx8iIJnMTx&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333] hover:from-[#ff0050] hover:via-[#00f2ea] hover:to-[#000000] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transition-transform duration-700 ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}></div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="white"
                        className="relative z-10 drop-shadow-sm"
                    >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                </a>

                {/* WhatsApp Icon */}
                <a
                    href="https://wa.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#1ea952] hover:to-[#0d6b5c] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transition-transform duration-700 ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}></div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="white"
                        className="relative z-10 drop-shadow-sm"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                    </svg>
                </a>

                {/* LinkedIn Icon */}
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-gradient-to-br from-[#0A66C2] to-[#004B8D] hover:from-[#0958a5] hover:to-[#003d73] p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transition-transform duration-700 ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}></div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="white"
                        className="relative z-10 drop-shadow-sm"
                    >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </a>

                {/* Premium Login Button */}
                <button
                    onClick={handleLoginClick}
                    className="group relative overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] hover:from-[#5a6cf3] hover:via-[#6a42a0] hover:to-[#ef6aff] text-white font-semibold py-2 px-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center"
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transition-transform duration-700 ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}></div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="white"
                        className="relative z-10 drop-shadow-sm"
                    >
                        {user ? (
                            // Show different icon if user is logged in (dashboard/profile icon)
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                        ) : (
                            // Show login icon if user is not logged in
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Toggle Button - Now at the bottom */}
            <button
                onClick={toggleExpanded}
                className={`group relative overflow-hidden gradient-btn p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10 w-12 h-12 flex items-center justify-center ${
                    isExpanded ? 'rotate-45' : ''
                }`}
            >
                <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transition-transform duration-700 ${isRTL ? 'translate-x-full group-hover:-translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}></div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="white"
                    className="relative z-10 drop-shadow-sm transition-transform duration-300"
                >
                    {isExpanded ? (
                        // Close/X icon
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    ) : (
                        // Menu/hamburger icon
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    )}
                </svg>
            </button>

            {/* Floating backdrop effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-3xl blur-xl scale-110 pointer-events-none"></div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => {
                    setIsLoginOpen(false);
                    // Check if user logged in after modal closes
                    if (isAuthenticated()) {
                        const userData = getUserFromCookies();
                        if (userData) {
                            setUser(userData);
                        }
                    }
                }}
                onSwitchModal={() => {
                    setIsLoginOpen(false);
                    setIsSignupOpen(true);
                }}
            />

            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => {
                    setIsSignupOpen(false);
                    // Check if user signed up after modal closes
                    if (isAuthenticated()) {
                        const userData = getUserFromCookies();
                        if (userData) {
                            setUser(userData);
                        }
                    }
                }}
                onSwitchModal={() => {
                    setIsSignupOpen(false);
                    setIsLoginOpen(true);
                }}
            />
        </div>
    );
};

export default SocialMediaIcons;