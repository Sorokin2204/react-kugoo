/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/static/:path*',
          destination: `http://localhost:5000/static/:path*`,
        },
        {
          source: '/static',
          destination: `http://localhost:5000/static`,
        },
      ],
    };
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/static/:path*',
  //       destination: `http://localhost:5000/static/:path*`,
  //       permanent: false,
  //       basePath: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
