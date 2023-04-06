/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },

  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/dqkllpzwy/image/upload",
  },
};

module.exports = nextConfig;
