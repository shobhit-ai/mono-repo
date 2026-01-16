import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'admin.localhost:3000',
          },
        ],
        destination: '/admin',
        permanent: false,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        has: [
          {
            type: 'host',
            value: 'localhost:3000',
          },
        ],
        destination: 'http://admin.localhost:3000/admin/:path*',
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
