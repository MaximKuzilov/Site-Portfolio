import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Object Storage serves directory indexes but does not rewrite extensionless
  // routes such as /about to /about.html.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
