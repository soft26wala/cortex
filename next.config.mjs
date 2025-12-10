/** @type {import('next').NextConfig} */
const basePath = "";

const nextConfig = {
  reactStrictMode: true,

  // REMOVE STATIC EXPORT (VERY IMPORTANT)
  // output: "export",  <-- REMOVE THIS LINE

  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cortex-api-htc8.onrender.com",
        port: "",
        pathname: "/uploads/**"
      }
    ]
  }
};

export default nextConfig;
