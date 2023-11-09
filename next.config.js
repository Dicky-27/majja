/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  images: {
    domains: ['cloud.squidex.io', 'lh3.googleusercontent.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
