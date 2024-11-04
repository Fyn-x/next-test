/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        localPatterns: [
          {
            pathname: '/assets/images/**',
            search: '',
          },
        ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'cms.wika.co.id',
              port: '',
              pathname: '/storage/**',
            },
        ],
    },
};

export default nextConfig;
