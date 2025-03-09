import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/category',
      destination: '/kategorija',
      permanent: true,
    },
    {
      source: '/category/:slug*',
      destination: '/kategorija/:slug*',
      permanent: true,
    },
  ],
};

export default nextConfig;
