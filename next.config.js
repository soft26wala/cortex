/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cortex-api-htc8.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
