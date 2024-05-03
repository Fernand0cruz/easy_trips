/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'a0.muscache.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.guiademoteis.com.br'
            }
        ]
    }
};

export default nextConfig;
