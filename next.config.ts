import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Using ReactBD Mirror (more stable than fakestoreapi.com)
      {
        protocol: "https",
        hostname: "fakestoreapi.reactbd.com",
      },
      // Fallback to original FakeStore API
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};

export default nextConfig;
