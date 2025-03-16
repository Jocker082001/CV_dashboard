/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/(.*)",  // Match all incoming requests
          destination: "/index.html", // Redirect to index.html
        },
      ];
    },
  };
  
  module.exports = nextConfig;