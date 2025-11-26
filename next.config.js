/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to support dynamic booking routes
  // Booking pages are created at runtime and cannot be pre-generated
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
