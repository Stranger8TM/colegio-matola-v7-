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
        path: false,
        os: false,
      };
    }
    
    // Otimizar o tamanho do bundle
    if (process.env.NODE_ENV === 'production') {
      // Habilitar compressão de código
      config.optimization.minimize = true;
      
      // Dividir chunks para melhor cache
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Obter o nome do pacote
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              
              // Retornar nome do pacote para melhor debugging
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
