import type { Metadata } from "next";
import "../globals.css";
import "../../../public/fonts/satoshi/css/satoshi.css";
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";

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

  const messages = await getMessages();

  return (
    <html dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
