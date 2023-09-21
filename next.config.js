/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  transpilePackages: ['three'],
};

export default nextConfig;
