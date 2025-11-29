import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from external sources (Google, Clerk, Vercel Blob)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "public.blob.vercel-storage.com",
      },
    ],
  },
  // Suppress specific build warnings during rapid development
  typescript: {
    ignoreBuildErrors: true, // Set to false for production
  },
  eslint: {
    ignoreDuringBuilds: true, // Set to false for production
  },
  // Server Actions are default in Next 14, but good to be explicit if using older minor versions
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
