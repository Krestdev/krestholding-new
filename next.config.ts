import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Next's on-the-fly optimizer spawns worker child processes, which crash
    // reliably on Windows when the project path contains a space (as this one does).
    // Payload already generates resized variants (thumbnail/card/tablet) via sharp
    // at upload time, so disabling this redundant layer avoids the crash entirely.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default withPayload(nextConfig);
