/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'vercel-blob.com'],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Não tente resolver módulos específicos do servidor no cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      }
    }
    
    return config
  },
  // Garantir que o Prisma seja tratado corretamente
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  }
}

export default nextConfig
