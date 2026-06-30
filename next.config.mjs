/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
  // Static export has no server to run the Image Optimization API, so images
  // must be served as-is. See https://nextjs.org/docs/messages/export-image-api
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
