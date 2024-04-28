/** @type {import('next').NextConfig} */
export default {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i5.walmartimages.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
