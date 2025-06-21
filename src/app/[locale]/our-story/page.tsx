import { ArrowRight, Sparkles, Users, Globe, Award, CheckCircle, Star } from "lucide-react";

const LinkedMedLanding = () => {
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            Premium Healthcare Placement
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-purple-700 bg-clip-text text-transparent leading-tight">
            Transform Your Healthcare Career Globally
          </h1>

          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto font-light">
            Connect with premium healthcare opportunities worldwide through our comprehensive placement and support program
          </p>

          {/* Key Message Box */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8 shadow-xl max-w-4xl mx-auto">
            <p className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text mb-4">
              The Truth About Healthcare Career Transformation
            </p>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>We understood that finding the right healthcare opportunity abroad isn&#39;t just about matching skills&mdash;it&#39;s about navigating complex systems, language barriers, and cultural differences.</p>
              <p>LinkedMed was born from recognizing that healthcare professionals needed more than job placement—they needed comprehensive career transformation support.</p>
              <p>Our vision: to bridge the gap between talented healthcare professionals and global opportunities through personalized guidance and unwavering support.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-3 shadow-xl hover:scale-105 transform">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 text-gray-800 font-semibold px-8 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-3 hover:shadow-lg">
              Watch Our Story
              <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { number: "2000+", label: "Healthcare Professionals" },
              { number: "15+", label: "Countries Served" },
              { number: "98%", label: "Success Rate" }
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
                Global Expansion
              </div>

              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-gray-900 leading-tight">
                From One Dream to Many
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium text-gray-800">
                  What started as one person&#39;s dream of working abroad has evolved into a movement connecting thousands of healthcare professionals worldwide.
                </p>
                <p>
                  We&#39;ve expanded from helping individual nurses find opportunities to building comprehensive pathways for doctors, specialists, and healthcare support staff across multiple countries.
                </p>
                <p>From our headquarters in Cairo, we now serve healthcare professionals across the Middle East, Europe, and beyond, creating bridges between talent and opportunity.</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Users, title: "Expert Team", desc: "Healthcare specialists guiding your journey" },
                    { icon: Globe, title: "Global Reach", desc: "Opportunities across 15+ countries" },
                    { icon: Award, title: "Premium Service", desc: "Personalized support throughout" },
                    { icon: Star, title: "Proven Results", desc: "98% success rate with placements" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300 shadow-lg">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
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
              Comprehensive Process
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900">
              More Than a Process
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 text-gray-700 mb-8">
              <p className="text-lg font-medium">
                We don&#39;t just process applications&mdash;we transform careers through comprehensive support that addresses every aspect of your international healthcare journey.
              </p>
              <p>From language mastery to cultural integration, from exam preparation to ongoing career support, we&#39;re with you every step of the way.</p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Language Mastery",
                desc: "Comprehensive language training tailored to healthcare terminology and cultural communication",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Exam Excellence",
                desc: "Targeted preparation for licensing exams with expert guidance and proven strategies",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Document Perfection",
                desc: "Complete credential evaluation and documentation support for seamless applications",
                color: "from-green-500 to-teal-500"
              },
              {
                title: "Perfect Matching",
                desc: "Personalized job matching based on your skills, preferences, and career goals",
                color: "from-orange-500 to-red-500"
              },
              {
                title: "Ongoing Support",
                desc: "Continuous guidance from application to integration and beyond",
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
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-white text-center shadow-xl">
            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-xl font-bold">
                We don&#39;t just handle logistics and paperwork.
              </p>
              <p className="text-lg font-semibold opacity-90">We orchestrate complete career transformations.</p>
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
              Success Stories
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900">
              Real People. Real Stories.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Story Cards */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Aya&#39;s Journey</h4>
                  <p className="text-blue-600 font-medium text-sm">Nurse • Germany</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
  &quot;I was overwhelmed by the process of working abroad. LinkedMed didn&#39;t just find me a position&mdash;they prepared me for success. From language training to cultural orientation, they thought of everything. Now I&#39;m thriving in my dream role in Germany.&quot;
</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Mahmoud&#39;s Success</h4>
                  <p className="text-green-600 font-medium text-sm">Doctor • UAE</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed"> &quot;The licensing exam seemed impossible until LinkedMed&#39;s targeted preparation program. Their expert guidance and personalized study plan made all the difference. I passed on my first attempt and now practice medicine in the UAE with confidence&quot;</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white text-center shadow-xl">
            <div className="max-w-4xl mx-auto space-y-3">
              <p className="text-xl font-bold">We don&#39;t just create job placements.</p>
              <p className="text-lg font-semibold opacity-90">We create new beginnings and transform lives.</p>
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
              This Is Who We Are
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6">
                <div className="space-y-4 text-lg leading-relaxed">
                  <p className="text-blue-200 text-xl italic font-light">We are not just recruitment agents processing applications.</p>
                  <p className="text-blue-200 text-xl italic font-light">We are not just a service provider checking boxes.</p>
                  <p className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    We are believers in human potential.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="space-y-4 leading-relaxed">
                  <p className="text-white/90">We believe in the potential of every healthcare professional to make a difference beyond borders.</p>
                  <p className="text-white/90">We see the person behind the CV, the dreams behind the qualifications, the impact you can make in a new country.</p>
                  <p className="text-white font-bold text-lg">When you succeed, patients receive better care. When you thrive, healthcare systems improve. When you grow, we all benefit.</p>
                  <p className="text-white/90">We don&#39;t just connect you with opportunities—we connect you with your future.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-12">
              <div className="space-y-4 text-center">
                <p className="text-xl font-bold text-white">The future of healthcare is global, and you&#39;re part of that future.</p>
                <p className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Something bigger than yourself is calling.
                </p>
                <p className="text-lg text-white/90">Are you ready to answer that call?</p>
                <p className="text-white/80">We&#39;ll be right there to walk beside you, every step of the way.</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl font-medium text-white/90 mb-6">Welcome to LinkedMed.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-10 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-3 shadow-xl hover:scale-105 transform">
                  Start Your Journey Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-3 hover:bg-white/30">
                  Schedule Consultation
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