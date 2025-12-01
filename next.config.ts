import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        SESSION_SECRET: process.env.SESSION_SECRET,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
};

export default nextConfig;
