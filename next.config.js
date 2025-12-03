/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to support dynamic booking routes
  // Booking pages are created at runtime and cannot be pre-generated
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      // Polish URL aliases - serve English pages but keep Polish URLs
      {
        source: '/cennik',
        destination: '/rate',
      },
      {
        source: '/kontakt',
        destination: '/contact',
      },
      {
        source: '/flota',
        destination: '/fleet',
      },
      {
        source: '/flota/:slug',
        destination: '/fleet/:slug',
      },
      {
        source: '/polityka-prywatnosci',
        destination: '/privacy-policy',
      },
      {
        source: '/polityka-cookies',
        destination: '/cookies-policy',
      },
      {
        source: '/regulamin-rezerwacji',
        destination: '/terms-and-conditions',
      },
    ]
  },
}

module.exports = nextConfig
