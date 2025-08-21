import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/fir-auth-1c3bc.appspot.com/**',
      },
    ],
  },
};

export default nextConfig;
