// app/blogs/[id]/page.tsx
import { getData } from "@/libs/server/server";
import Image from "next/image";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

interface BlogData {
  id: number;
  cover: string;
  image: string;
  title: string;
  description: string;
  content?: string; // HTML content from API
  keywords: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { id, locale } = await params;
    const blog: BlogData = await getData(`/blogs/${id}`, {}, { lang: locale });
    const t = await getTranslations("Blogs" );

    return {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.description,
      keywords: blog.meta_keywords || blog.keywords,
      openGraph: {
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.description,
        images: blog.cover ? [{ url: blog.cover }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.description,
        images: blog.cover ? [blog.cover] : [],
      },
    };
  } catch {
    const { locale } = await params;
    const t = await getTranslations("Blogs");
    
    return {
      title: t("pageTitle"),
      description: t("newsletterDescription"),
    };
  }
}

const BlogPage = async ({ params }: PageProps) => {
  const t = await getTranslations("Blogs");
  try {
    const { id, locale } = await params;
    const blog: BlogData = await getData(
      `/blogs/${id}`,
      {},
      {
        lang: locale,
      }
    );

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        {/* Enhanced Hero Section with Cover */}
        {blog.cover && (
          <section className="relative h-[clamp(60vh,80vh,90vh)] w-full overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]" />

            {/* Hero Image */}
            <div className="relative w-full h-full">
              <Image
                src={blog.cover}
                alt={blog.title || "Blog cover"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="100vw"
                quality={90}
              />
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 z-[2] flex items-end">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 w-full">
                <div className="max-w-4xl">
                  <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white mb-4 leading-tight tracking-tight">
                    {blog.title}
                  </h1>
                  {/* <p
                    className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-gray-200 font-light max-w-3xl leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  /> */}

                  {/* Reading Time & Date */}
                  <div className="flex items-center gap-4 mt-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">{t("readingTime")}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">{t("publishedDate")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Article */}
            <article className="lg:col-span-8">
              <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                {/* Article Header (only if no cover) */}
                {!blog.cover && (
                  <header className="p-6 sm:p-8 md:p-12 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                      {blog.title}
                    </h1>
                    <p
                      className="text-[clamp(1.125rem,2vw,1.25rem)] text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                    />

                    {/* Article Meta */}
                    <div className="flex items-center gap-4 mt-6 text-gray-500">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm">{t("readingTime")}</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm">{t("publishedDate")}</span>
                      </div>
                    </div>
                  </header>
                )}

                {/* Article Body */}
                <div className="p-6 sm:p-8 md:p-12 space-y-8">
                  {/* Blog Content Image */}
                  {blog.image && (
                    <figure className="relative group">
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={blog.image}
                          alt={blog.title || "Blog content image"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                          quality={85}
                        />
                        <div className="absolute z-0 inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </figure>
                  )}

                  {/* Enhanced Content Area */}
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-800 leading-8 space-y-8">
                      {/* Main HTML Content from API */}
                      {blog.description && blog.description.trim() && (
                        <div
                          className="prose prose-lg max-w-none
                            prose-headings:text-gray-900 prose-headings:font-bold
                            prose-h1:text-[clamp(1.875rem,4vw,2.25rem)] prose-h1:border-l-4 prose-h1:border-blue-600 prose-h1:pl-4 prose-h1:mb-6
                            prose-h2:text-[clamp(1.5rem,3vw,2rem)] prose-h2:border-l-4 prose-h2:border-green-600 prose-h2:pl-4 prose-h2:mb-4
                            prose-h3:text-[clamp(1.25rem,2.5vw,1.5rem)] prose-h3:text-purple-700 prose-h3:mb-3
                            prose-h4:text-[clamp(1.125rem,2vw,1.25rem)] prose-h4:text-indigo-700 prose-h4:mb-2
                            prose-p:text-[clamp(1rem,1.5vw,1.125rem)] prose-p:leading-relaxed prose-p:mb-4
                            prose-a:text-blue-600 prose-a:underline prose-a:hover:text-blue-800
                            prose-strong:text-gray-900 prose-strong:font-semibold
                            prose-em:text-gray-700 prose-em:italic
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                            prose-li:text-[clamp(1rem,1.5vw,1.125rem)] prose-li:leading-relaxed
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700
                            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-gray-800
                            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto
                            prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-gray-200 prose-table:rounded-lg
                            prose-th:bg-gray-50 prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
                            prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2
                            prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:h-auto"
                          dangerouslySetInnerHTML={{ __html: blog.description }}
                        />
                      )}

                      {/* Show message if no content */}
                      {(!blog.description || !blog.description.trim()) && (
                        <div className="text-center py-12">
                          <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {t("contentComingSoon.title")}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {t("contentComingSoon.description")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Tags Section */}
                  {blog.keywords && (
                    <div className="pt-8 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        {t("tags")}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {blog.keywords.split(",").map((keyword, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium hover:from-blue-100 hover:to-indigo-100 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
                          >
                            #{keyword.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>

            {/* Enhanced Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Table of Contents */}

              {/* Enhanced SEO Info Card */}
              <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {t("seoInsights")}
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {t("metaTitle")}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {blog.meta_title}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {t("metaDescription")}
                    </p>
                    <p
                      className="text-sm text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: blog.meta_description,
                      }}
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {t("keywords")}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {blog.meta_keywords}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Share Card */}
              <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  {t("shareArticle")}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
{t("shareOnTwitter")}
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl hover:from-blue-900 hover:to-blue-950 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
{t("shareOnFacebook")}
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
{t("shareOnLinkedIn")}
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
{t("copyLink")}
                  </button>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-bold mb-2">{t("stayUpdated")}</h3>
                <p className="text-sm text-indigo-100 mb-4">
                  {t("newsletterDescription")}
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="w-full bg-white text-indigo-600 px-4 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200">
{t("subscribe")}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-red-100 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.5 0L3.732 16.5c-.77.833.19 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold text-gray-900 mb-2">
              {t("errorTitle")}
            </h1>
            <p className="text-gray-600 mb-6 text-[clamp(0.875rem,2vw,1rem)]">
              {t("errorDescription")}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
{t("tryAgain")}
            </button>
          </div>
        </div>
      </main>
    );
  }
};

export default BlogPage;
