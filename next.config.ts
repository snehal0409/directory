import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions:{
      bodySizeLimit: '900mb',
    }
  },
};

export default nextConfig;

