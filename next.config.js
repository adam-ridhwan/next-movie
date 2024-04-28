/* eslint-disable @typescript-eslint/no-var-requires */
const { withHydrationOverlay } = require('@builder.io/react-hydration-overlay/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'image.tmdb.org' }],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/browse',
        permanent: true,
      },
    ];
  },
};

module.exports = withHydrationOverlay({
  appRootSelector: 'main',
})(nextConfig);
