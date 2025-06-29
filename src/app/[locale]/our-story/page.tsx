import { ArrowRight, Users, Globe, Award, CheckCircle, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import dots from "/public/images/logo.ico";
import Image from "next/image";

const LinkedMedLanding = async () => {
  const t = await getTranslations();

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 text-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 -right-4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 gradient-btn px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg ">
            {/* <Sparkles className="w-4 h-4" /> */}
            <Image width={30} height={30} src={dots} alt="logo" className="spin bg-white rounded-full p-1" />
            {t('hero.badge')}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r text-[#095D94] bg-clip-text  leading-tight">
            {t('hero.title')}
          </h1>

          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto font-light">
            {t('hero.subtitle')}
          </p>

          {/* Key Message Box */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8 shadow-xl max-w-4xl mx-auto">
            <p className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text mb-4">
              {t('hero.messageBox.title')}
            </p>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>{t('hero.messageBox.paragraph1')}</p>
              <p>{t('hero.messageBox.paragraph2')}</p>
              <p>{t('hero.messageBox.paragraph3')}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r gradient-btn text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-3 shadow-xl hover:scale-105 transform">
              {t('hero.buttons.startJourney')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 text-gray-800 font-semibold px-8 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-3 hover:shadow-lg">
              {t('hero.buttons.watchStory')}
              <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { number: "2000+", label: t('hero.stats.professionals') },
              { number: "15+", label: t('hero.stats.countries') },
              { number: "98%", label: t('hero.stats.successRate') }
            ].map((stat, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
                <div className="text-xl font-black text-blue-800">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From One Dream to Many */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                {t('expansion.badge')}
              </div>

              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-gray-900 leading-tight">
                {t('expansion.title')}
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium text-gray-800">
                  {t('expansion.paragraph1')}
                </p>
                <p>
                  {t('expansion.paragraph2')}
                </p>
                <p>{t('expansion.paragraph3')}</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Users, title: t('expansion.features.expertTeam.title'), desc: t('expansion.features.expertTeam.desc') },
                    { icon: Globe, title: t('expansion.features.globalReach.title'), desc: t('expansion.features.globalReach.desc') },
                    { icon: Award, title: t('expansion.features.premiumService.title'), desc: t('expansion.features.premiumService.desc') },
                    { icon: Star, title: t('expansion.features.provenResults.title'), desc: t('expansion.features.provenResults.desc') }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300 shadow-lg">
                      <div className="bg-gradient-to-br gradient-btn w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Process */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="w-4 h-4" />
              {t('process.badge')}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900">
              {t('process.title')}
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 text-gray-700 mb-8">
              <p className="text-lg font-medium">
                {t('process.subtitle')}
              </p>
              <p>{t('process.description')}</p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: t('process.steps.languageMastery.title'),
                desc: t('process.steps.languageMastery.desc'),
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: t('process.steps.examExcellence.title'),
                desc: t('process.steps.examExcellence.desc'),
                color: "from-purple-500 to-pink-500"
              },
              {
                title: t('process.steps.documentPerfection.title'),
                desc: t('process.steps.documentPerfection.desc'),
                color: "from-green-500 to-teal-500"
              },
              {
                title: t('process.steps.perfectMatching.title'),
                desc: t('process.steps.perfectMatching.desc'),
                color: "from-orange-500 to-red-500"
              },
              {
                title: t('process.steps.ongoingSupport.title'),
                desc: t('process.steps.ongoingSupport.desc'),
                color: "from-indigo-500 to-purple-500"
              }
            ].map((step, i) => (
              <div key={i} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:scale-105 transition-all duration-300">
                <div className={`bg-gradient-to-r ${step.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-center">{step.title}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Message */}
          <div className="bg-gradient-to-r gradient-btn rounded-2xl p-8 text-white text-center shadow-xl">
            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-xl font-bold">
                {t('process.bottomMessage.line1')}
              </p>
              <p className="text-lg font-semibold opacity-90">{t('process.bottomMessage.line2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              {t('stories.badge')}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900">
              {t('stories.title')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Story Cards */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gradient-to-r gradient-btn w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t('stories.aya.name')}</h4>
                  <p className="text-blue-600 font-medium text-sm">{t('stories.aya.title')}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('stories.aya.quote')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gradient-to-r gradient-btn w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t('stories.mahmoud.name')}</h4>
                  <p className="text-green-600 font-medium text-sm">{t('stories.mahmoud.title')}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{t('stories.mahmoud.quote')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white text-center shadow-xl">
            <div className="max-w-4xl mx-auto space-y-3">
              <p className="text-xl font-bold">{t('stories.bottomMessage.line1')}</p>
              <p className="text-lg font-semibold opacity-90">{t('stories.bottomMessage.line2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              {t('whoWeAre.title')}
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6">
                <div className="space-y-4 text-lg leading-relaxed">
                  <p className="text-blue-200 text-xl italic font-light">{t('whoWeAre.notJust.line1')}</p>
                  <p className="text-blue-200 text-xl italic font-light">{t('whoWeAre.notJust.line2')}</p>
                  <p className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {t('whoWeAre.weAre')}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="space-y-4 leading-relaxed">
                  <p className="text-white/90">{t('whoWeAre.beliefs.line1')}</p>
                  <p className="text-white/90">{t('whoWeAre.beliefs.line2')}</p>
                  <p className="text-white font-bold text-lg">{t('whoWeAre.beliefs.line3')}</p>
                  <p className="text-white/90">{t('whoWeAre.beliefs.line4')}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-12">
              <div className="space-y-4 text-center">
                <p className="text-xl font-bold text-white">{t('whoWeAre.future.line1')}</p>
                <p className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t('whoWeAre.future.line2')}
                </p>
                <p className="text-lg text-white/90">{t('whoWeAre.future.line3')}</p>
                <p className="text-white/80">{t('whoWeAre.future.line4')}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl font-medium text-white/90 mb-6">{t('whoWeAre.welcome')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-10 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-3 shadow-xl hover:scale-105 transform">
                  {t('whoWeAre.buttons.startJourney')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-3 hover:bg-white/30">
                  {t('whoWeAre.buttons.scheduleConsultation')}
                  <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LinkedMedLanding;