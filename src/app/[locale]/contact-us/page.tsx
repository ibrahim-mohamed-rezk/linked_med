import { getTranslations } from "next-intl/server";
import Image from "next/image";

const ContactUsPage = async () => {
  const t = await getTranslations("terms.contact");

  return (
    <main className="bg-[#F3F6FF] py-20 px-6 sm:px-10 lg:px-20 text-gray-800">
      {/* Contact Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left Block */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-gray-600 mb-2 text-sm">
            {t("description.line1")} <br />
            {t("description.line2")}
          </p>

          <p className="text-sm text-[#6A6A6A] mb-1">{t("email")}</p>
          <p className="text-sm text-[#6A6A6A] mb-4">+20 162 80 856</p>

          <a href="#" className="text-sm text-blue-700 underline font-medium block mb-8">
            {t("supportLink")}
          </a>

          {/* Help Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700 pt-10 lg:pt-40">
            <div>
              <p className="font-semibold text-black mb-1">{t("help.customerSupport.title")}</p>
              <p className="text-[#6A6A6A] leading-relaxed">{t("help.customerSupport.description")}</p>
            </div>
            <div>
              <p className="font-semibold text-black mb-1">{t("help.feedback.title")}</p>
              <p className="text-[#6A6A6A] leading-relaxed">{t("help.feedback.description")}</p>
            </div>
            <div>
              <p className="font-semibold text-black mb-1">{t("help.media.title")}</p>
              <p className="text-[#6A6A6A] leading-relaxed">{t("help.media.description")}</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 w-full max-w-lg mx-auto border border-gray-100">
          <h2 className="text-lg font-semibold mb-1">{t("form.title")}</h2>
          <p className="text-xs text-gray-500 mb-6">{t("form.subtitle")}</p>

          <form className="space-y-4 text-sm">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder={t("form.firstName")}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder={t("form.lastName")}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <input
              type="email"
              placeholder={t("form.email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none">
                <option value="+20">+20</option>
                <option value="+1">+1</option>
              </select>
              <input
                type="tel"
                placeholder="10 162 80 856"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <textarea
                placeholder={t("form.message")}
                maxLength={240}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-xs text-right text-gray-400 mt-1">0 / 240</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition"
            >
              {t("form.submit")}
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Map Image */}
        <div className="rounded-xl overflow-hidden shadow-md min-h-90">
          <Image src="/images/map.png" alt="Map" layout="responsive" width={800} height={600} className="w-full h-full object-cover" />
        </div>

        {/* Location Details */}
        <div>
          <h3 className="text-xl font-semibold mb-2">{t("location.sectionTitle")}</h3>
          <h2 className="text-3xl font-bold mb-6">{t("location.title")}</h2>

          <div className="space-y-6 text-sm text-gray-700">
            {[1, 2, 3].map((_, i) => (
              <div key={i}>
                <h4 className="font-semibold text-black mb-1">{t("location.branchTitle")}</h4>
                <p>{t("location.country")}</p>
                <p>{t("location.street")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
