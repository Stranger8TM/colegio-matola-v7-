/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
  transpilePackages: ['@prisma/client'],
  webpack: (config) => {
    // Isso resolve problemas com o Prisma Client
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
