/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable SWC minification (fixes the warning)
    swcMinify: true,

    // React strict mode for better development
    reactStrictMode: true,

    // Transpile packages that need it (Three.js ecosystem)
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

    // Image optimization
    images: {
        domains: ['localhost', 'images.unsplash.com'],
        formats: ['image/avif', 'image/webp'],
    },

    // Webpack configuration for 3D libraries
    webpack: (config, { isServer }) => {
        // Handle GLTF/GLB files for 3D models
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/',
                    outputPath: 'static/',
                },
            },
        });

        // Ensure Three.js works correctly
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
            };
        }

        return config;
    },

    // Environment variables (add as needed)
    env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },

    // Headers for security (political platform requirement)
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
