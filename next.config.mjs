/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeholder.com', 'v0.blob.vercel-storage.com'],
    unoptimized: true,
  },
  // Garantir que o SWC seja usado
  experimental: {
    // Configurações experimentais para melhorar a compatibilidade
    serverComponentsExternalPackages: ['bcryptjs', '@prisma/client'],
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configurar webpack para não tentar resolver módulos específicos do servidor no cliente
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      };
    }
    return config;
  },
};

export default nextConfig;
