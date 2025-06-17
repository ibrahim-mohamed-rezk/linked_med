import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

const LinkedMedLanding = async () => {
  const t = await getTranslations("linkedmed");

  return (
    <main className="bg-[#F3F6FF] text-gray-800">
      {/* Hero Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-blue-800">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-4">
            {t("hero.subtitle")}
          </p>
          <p className="text-xl font-semibold text-gray-800 mb-6">
            {t("hero.truth")}
          </p>
          <div className="space-y-4 text-gray-700 text-lg max-w-3xl mx-auto">
            <p>{t("hero.description")}</p>
            <p>{t("hero.birth")}</p>
            <p>{t("hero.vision")}</p>
          </div>
        </div>
      </section>

      {/* From One Dream to Many */}
      <section className="py-24 px-6 sm:px-10 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-800">
            {t("journey.title")}
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>{t("journey.start")}</p>
            <p>{t("journey.expansion")}</p>
            <p>{t("journey.cairo")}</p>
          </div>
        </div>
      </section>

      {/* More Than a Process */}
      <section className="py-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-800">
            {t("process.title")}
          </h2>

          <div className="space-y-6 text-lg text-gray-700 mb-10">
            <p>{t("process.description")}</p>
            <p>{t("process.support")}</p>
          </div>

          <div className="space-y-5 mb-10">
            {[
              "language",
              "exam",
              "documents",
              "matching",
              "support"
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✔️</span>
                <p className="text-gray-700 text-base">
                  {t(`process.steps.${step}`)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-gray-800 space-y-4 text-lg">
            <p className="font-semibold">{t("process.logistics")}</p>
            <p className="font-semibold">{t("process.transformation")}</p>
          </div>
        </div>
      </section>

      {/* Real People. Real Stories */}
      <section className="py-24 px-6 sm:px-10 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-800">
            {t("stories.title")}
          </h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>{t("stories.aya")}</p>
            <p>{t("stories.mahmoud")}</p>
            <p className="font-semibold text-gray-900">
              {t("stories.notPlacements")}
            </p>
            <p className="font-semibold text-gray-900">
              {t("stories.newBeginnings")}
            </p>
          </div>
        </div>
      </section>

      {/* This Is Who We Are */}
      <section className="py-24 px-6 sm:px-10 lg:px-20 bg-[#F9FBFF] text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-blue-800 tracking-tight">
            {t("identity.title")}
          </h2>

          <div className="space-y-6 text-lg sm:text-xl text-gray-700 leading-loose max-w-3xl mx-auto">
            <p className="italic text-gray-600">{t("identity.notAgents")}</p>
            <p className="italic text-gray-600">{t("identity.notService")}</p>
            <p className="font-bold text-blue-900 text-xl">{t("identity.believers")}</p>
            <p>{t("identity.potential")}</p>
            <p>{t("identity.people")}</p>
            <p className="text-gray-800 font-medium">{t("identity.you")}</p>
            <p>{t("identity.connect")}</p>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <p className="font-semibold">{t("identity.future")}</p>
              <p className="text-blue-700 font-semibold">{t("identity.bigger")}</p>
              <p className="text-gray-800">{t("identity.ready")}</p>
              <p>{t("identity.walkBeside")}</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl font-medium text-gray-700 mb-6">{t("cta.welcome")}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-full transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
              {t("cta.button")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LinkedMedLanding;
