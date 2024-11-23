/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true, // See if cache hit or not on server side
    },
  },
};

export default nextConfig;
