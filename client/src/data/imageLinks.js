// Product images from Unsplash
// Future-ready: Replace these URLs with Cloudinary URLs when ready
export const productImages = [
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
];

// Avatar / profile images
export const avatarImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
];

// Helper to get a random product image
export const getRandomImage = () =>
  productImages[Math.floor(Math.random() * productImages.length)];

// Helper to get image by index (cycles if out of bounds)
export const getImageByIndex = (index) =>
  productImages[index % productImages.length];
