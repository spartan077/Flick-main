/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nafuouqgyqhcisrlnpru.supabase.co'],
  },
  experimental: {
    serverActions: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    })
    return config
  },
}

module.exports = nextConfig