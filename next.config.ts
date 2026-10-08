import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "store.bensonboone.com", pathname: "/cdn/shop/files/**" },
    ],
  },
};

export default nextConfig;
