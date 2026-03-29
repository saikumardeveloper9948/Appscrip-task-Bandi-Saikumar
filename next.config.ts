import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/image/:path*",
          destination: "https://fakestoreapi.com/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
