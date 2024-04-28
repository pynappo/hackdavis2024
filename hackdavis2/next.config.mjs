/** @type {import('next').NextConfig} */
export default {
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
