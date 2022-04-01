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
          destination: `https://react-kugoo-server-n7kmd7ns8-sorokin2204.vercel.app/static/:path*`,
        },
        {
          source: '/static',
          destination: `https://react-kugoo-server-n7kmd7ns8-sorokin2204.vercel.app/static`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
