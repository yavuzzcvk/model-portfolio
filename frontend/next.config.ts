import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'backend.test',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
