/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'glhwlvhs6fyvq6hd.public.blob.vercel-storage.com' },
      { hostname: 'picsum.photos' },
      { hostname: 'image.tmdb.org' },
    ],
  },
};

module.exports = nextConfig;
