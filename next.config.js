/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'picsum.photos' }],
  },
};

module.exports = nextConfig;
