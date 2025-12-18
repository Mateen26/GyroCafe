/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export if BUILD_STATIC is set (for Hostinger)
  // Otherwise, normal build for Vercel (with API routes)
  ...(process.env.BUILD_STATIC === 'true' ? {
    output: 'export',
    distDir: 'out',
    trailingSlash: true, // Ensures routes end with / and creates proper folder structure
  } : {}),
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
