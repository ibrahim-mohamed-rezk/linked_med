"use client";
import { postData } from "@/libs/server/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactUsPage = () => {
  const t = useTranslations("terms.contact");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await postData("/contact-us", formData);
      toast.success(t("success"));
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        description: "",
      });
    } catch (error) {
      toast.error("Error submitting form");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main className="w-full bg-black min-h-2/4 py-12 md:py-16 relative">
      <div className="front-full front-full-story featured1  relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/map.gif"
            alt="Global map"
            className="w-full md:w-[80%] mx-auto object-contain max-h-[400px] md:max-h-none"
            width={800}
            height={400}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 front-full-inner max-w-[1920px] mx-auto w-full px-4 sm:px-6 md:px-[8vw] lg:px-[12vw] mt-12 mb-12 min-h-[60vh]">
          <div className="font-full-inner-content front-story w-full min-h-[50vh] flex flex-col justify-start">
            {/* Contact Section */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ">
              {/* Left Block */}
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-4 text-white md:text-left font-en">
                  {t("title")}
                </h1>
                <p className="text-gray-200 mb-2 text-sm">
                  {t("description.line1")} <br />
                  {t("description.line2")}
                </p>

                <p className="text-sm text-white mb-1">{t("email")}</p>
                <p className="text-sm text-white mb-4">+20 162 80 856</p>

                <a
                  href="#"
                  className="text-sm text-blue-300 underline font-medium block mb-8 hover:underline"
                >
                  {t("supportLink")}
                </a>

                {/* Help Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm pt-10 lg:pt-40">
                  <div>
                    <p className="font-semibold text-white mb-1">
                      {t("help.customerSupport.title")}
                    </p>
                    <p className="text-white leading-relaxed">
                      {t("help.customerSupport.description")}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">
                      {t("help.feedback.title")}
                    </p>
                    <p className="text-white leading-relaxed">
                      {t("help.feedback.description")}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">
                      {t("help.media.title")}
                    </p>
                    <p className="text-white leading-relaxed">
                      {t("help.media.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="px-6 py-8 w-full max-w-lg mx-auto">
                <h2 className="text-lg font-semibold mb-1 text-white">
                  {t("form.title")}
                </h2>
                <p className="text-xs text-white mb-6">{t("form.subtitle")}</p>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder={t("form.firstName")}
                      className="w-1/2 px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder={t("form.lastName")}
                      className="w-1/2 px-4 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("form.email")}
                    className="w-full px-4 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10 162 80 856"
                      className="w-full text-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder={t("form.message")}
                      name="description"
                      value={formData.description}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }));
                      }}
                      maxLength={240}
                      className="w-full px-4 py-2 border text-white border-gray-300 rounded-md resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-xs text-right text-gray-400 mt-1">
                      0 / 240
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition"
                  >
                    {t("form.submit")}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUsPage;
