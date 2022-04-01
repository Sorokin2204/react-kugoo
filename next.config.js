/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/static/:path*',
          destination: `https://react-kugoo.herokuapp.com/static/:path*`,
        },
        {
          source: '/static',
          destination: `https://react-kugoo.herokuapp.com/static`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
