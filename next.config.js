/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nafuouqgyqhcisrlnpru.supabase.co'],
  },
  experimental: {
    serverActions: true,
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig