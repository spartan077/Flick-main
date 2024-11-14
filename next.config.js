/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nafuouqgyqhcisrlnpru.supabase.co'],
  },
  experimental: {
    serverActions: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

module.exports = nextConfig