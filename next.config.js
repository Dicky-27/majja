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
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    paymentUrl: process.env.NEXT_PUBLIC_AWSENDPOINT,
  },
}

module.exports = nextConfig
