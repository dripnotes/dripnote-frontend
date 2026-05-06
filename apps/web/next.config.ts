import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@coffee-service/ui-library'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/oauth2/:path*',
        destination: `${process.env.BACKEND_URL}/oauth2/:path*`,
      },
      {
        source: '/login/oauth2/:path*',
        destination: `${process.env.BACKEND_URL}/login/oauth2/:path*`,
      },
    ];
  },
};

export default nextConfig;
