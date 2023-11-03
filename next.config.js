/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};

module.exports = nextConfig;
