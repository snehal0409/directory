import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions:{
      bodySizeLimit: '900mb',
    }
  },
  images: {
    domains:[process.env.AWS_DOMAIN!]
  }
};
export default nextConfig;

