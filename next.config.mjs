/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push("pino-pretty", "encoding");
        return config;
    },
    images: {
        domains: ["ik.imagekit.io"]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/marketplace',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
