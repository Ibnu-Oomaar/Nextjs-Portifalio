import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'randomuser.me',
    //     pathname: '/api/portraits/**',
    //   },
    // ],
  },
  // Other typed Next.js config
}

export default nextConfig