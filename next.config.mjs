/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.isbndb.com',
      'image.slidesharecdn.com',
      'picsum.photos'
    ], // Add your external image domain here
  },
};

export default nextConfig;