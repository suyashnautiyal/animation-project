import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for static export to GitHub Pages
  output: 'export',

  // Required for GitHub Pages subpath (e.g., /animation-project)
  // Replace 'animation-project' if your repo has a different name
  basePath: process.env.NODE_ENV === 'production' ? '/animation-project' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/animation-project/' : '',

  // Required because GitHub Pages doesn't support Next.js image optimization
  images: {
    unoptimized: true,
  },

  // Your Turbopack CSS rule for Tailwind (keep this)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;