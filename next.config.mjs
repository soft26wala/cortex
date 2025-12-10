/** @type {import('next').NextConfig} */
// const basePath = "/symposium-nextjs";
const basePath = "";
const nextConfig = {
	// build static export output
	output: "export",
	// ensure exported pages end up as folders (helps GitHub Pages routing)
	basePath: basePath || undefined,
	assetPrefix: basePath || undefined,
    env:{
        NEXT_PUBLIC_BASE_PATH:basePath
    },
    reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cortex-api-htc8.onrender.com",
        pathname: "/uploads/**"
      }
    ]
  }
};

module.exports = nextConfig;
// export default nextConfig;
