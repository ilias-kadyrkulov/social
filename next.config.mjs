/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SOCKET_IO_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    }
};

export default nextConfig;
