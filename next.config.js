/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["blobgeekimagedata.blob.core.windows.net","picsum.photos","randomuser.me"],
    },
};

module.exports = nextConfig;