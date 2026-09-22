/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cortex-api-htc8.onrender.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
