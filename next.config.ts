import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "store.bensonboone.com", pathname: "/cdn/shop/files/**" },
      { protocol: "https", hostname: "**.spotifycdn.com", pathname: "/image/**" },
      { protocol: "https", hostname: "is1-ssl.mzstatic.com", pathname: "/image/thumb/**" },
    ],
  },
};

export default nextConfig;
