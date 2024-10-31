/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.*.*" // Do NOT copy. "This is not recommended because it may allow malicious actors to optimize urls you did not intend."
      }
    ],
  },
}

export default nextConfig
