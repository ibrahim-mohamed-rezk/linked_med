import type { Metadata } from "next";
import "../globals.css";
import "../../../public/fonts/satoshi/css/satoshi.css";
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";
import SocialMediaIcons from "@/components/SocialMediaIcons"; // Import the server-side component
import { Archivo } from "next/font/google";
import { Toaster } from "react-hot-toast";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo", // optional for CSS variables
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linked Med",
  description: "Linked Med",
  icons: {
    icon: "/images/logo.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  type Locale = "en" | "ar" | "ru" | "de";
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  console.log(children);

  const messages = await getMessages();

  return (
    <html
      className={archivo.className}
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <body className="bg-black">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>
                    <Toaster position="top-center" />
            {children}</main>
          <Footer />
          <SocialMediaIcons /> 
        </NextIntlClientProvider>
        {/* <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center text-red-600">
          <h2>الموقع متوقف لفتره محدوده</h2>
          <h2>The site is temporarily down</h2>
          <h2>Сайт временно недоступен</h2>
          <h2>Die Website ist vorübergehend nicht erreichbar</h2>
        </div> */}
      </body>
    </html>
  );
}
