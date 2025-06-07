/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "comnecta.s3.eu-north-1.amazonaws.com",
      "encrypted-tbn0.gstatic.com",
      "ibassets.com.br",
    ],
  },
};

module.exports = nextConfig;
