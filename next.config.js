/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t&q=Check',
      },
    ];
  },
};

module.exports = nextConfig;
