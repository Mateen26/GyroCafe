/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export if BUILD_STATIC is set (for Hostinger)
  // Otherwise, normal build for Vercel (with API routes)
  ...(process.env.BUILD_STATIC === 'true' ? {
    output: 'export',
    distDir: 'out',
  } : {}),
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
