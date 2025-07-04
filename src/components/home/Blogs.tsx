"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

interface Blog {
  id: number;
  cover: string;
  image: string;
  title: string;
  description: string;
  keywords: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

const springTransition = {
  type: "spring",
  stiffness: 60,
  damping: 18,
  mass: 0.8,
};

export default function BlogSection({ data }: { data: Blog[] }) {
//   console.log("blogs", data);
  const locale = useLocale();

  const blogData = data || [];

  if (!blogData || blogData.length === 0) {
    return null;
  }

  return (
    <section className="front-full-inner max-w-[1920px] mx-auto w-full py-5 sm:px-3 md:px-[4vw] lg:px-[8vw]">
      <div className="mx-auto mb-7">
        {/* Header */}
        <div
          className="flex justify-between items-center"
          style={{
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            }}
          >
            Insights<span className="text-blue-500">.</span>
          </h2>
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
            style={{
              padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            }}
          >
            View all
          </a>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left Big Blog Card */}
          <Link href={`/${locale}/blogs/${blogData[0].id}`} className="block">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...springTransition }}
              className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{
                height: "clamp(300px, 50vh, 450px)",
              }}
            >
              <Image
                src={blogData[0].image || blogData[0].cover}
                alt={blogData[0].title}
                fill
                className="absolute inset-0 transition-transform duration-300 group-hover:scale-105 object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 flex flex-col justify-between p-6">
                <div>
                  <p className="font-medium text-gray-300 text-sm mb-1">
                    {blogData[0].keywords || "Blog"}
                  </p>
                  <h3 className="font-semibold text-2xl text-white">
                    {blogData[0].title}
                  </h3>
                </div>
                <div className="flex items-center gap-5 text-gray-300 text-sm">
                  <Clock size={16} className="text-blue-400" />
                  <span>{blogData[0].description}</span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Right Small Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {blogData.slice(1).map((blog, index) => (
              <Link href={`/${locale}/blogs/${blog.id}`} key={blog.id} className="block">

                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springTransition, delay: index * 0.1 }}
                  className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    height: "clamp(150px, 25vh, 220px)",
                  }}
                >
                  <Image
                    src={blog.image || blog.cover}
                    alt={blog.title}
                    fill
                    className="absolute inset-0 transition-transform duration-300 group-hover:scale-105 object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 flex flex-col justify-between p-4">
                    <div>
                      <p className="font-medium text-gray-300 text-xs mb-1">
                        {blog.keywords || "Blog"}
                      </p>
                      <h4 className="font-semibold text-base py-4 text-white">
                        {blog.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-5 border-2 w-fit rounded-xl p-1 text-gray-300 text-xs mt-1">
                      <Clock size={14} className="text-blue-400" />
                      <span>Recent</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
