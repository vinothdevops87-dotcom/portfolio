import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Your GitHub repository name
  basePath: "/portfolio",

  // Required if you use next/image with GitHub Pages
  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
