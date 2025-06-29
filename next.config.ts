import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me', 'goldenrod-crab-464117.hostingersite.com'],
  },
};

export default withNextIntl(nextConfig);
