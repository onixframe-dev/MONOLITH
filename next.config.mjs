/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Target viewport widths the optimizer will generate srcset for.
    deviceSizes: [320, 375, 390, 420, 768, 1024, 1280, 1440, 1536, 1920, 2560],
    // Widths for icon / thumbnail sized images (non-fill).
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for a year — URLs are content-hashed.
    minimumCacheTTL: 31536000,
  },
  poweredByHeader: false,
};
export default nextConfig;
