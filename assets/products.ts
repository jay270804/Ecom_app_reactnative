import { Product } from '@/store/types';

// Helper function to calculate discounted price with better precision handling
const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number): number => {
  if (discountPercentage <= 0 || discountPercentage >= 100) {
    return originalPrice;
  }

  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;

  // Round to 2 decimal places to avoid floating point issues
  return Math.round(discountedPrice * 100) / 100;
};

export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    image: require('./images/headphones.jpg'),
    discountPercentage: 15,
    discountedPrice: calculateDiscountedPrice(89.99, 15)
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and water resistance. Track your workouts and health metrics.',
    image: require('./images/smartwatch.jpg'),
    discountPercentage: 25,
    discountedPrice: calculateDiscountedPrice(199.99, 25)
  },
  {
    id: '3',
    name: 'Portable Power Bank',
    price: 49.99,
    description: '20,000mAh portable charger with fast charging capability. Keep your devices powered on the go.',
    image: require('./images/power-bank.jpg'),
    discountPercentage: 10,
    discountedPrice: calculateDiscountedPrice(49.99, 10)
  },
  {
    id: '4',
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    description: 'Ergonomic gaming mouse with RGB lighting, 25K DPI sensor, and programmable buttons for ultimate gaming performance.',
    image: require('./images/headphones.jpg'),
    discountPercentage: 20,
    discountedPrice: calculateDiscountedPrice(79.99, 20)
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'Premium mechanical keyboard with Cherry MX switches, RGB backlighting, and aluminum frame for typing enthusiasts.',
    image: require('./images/smartwatch.jpg'),
    discountPercentage: 30,
    discountedPrice: calculateDiscountedPrice(129.99, 30)
  },
  {
    id: '6',
    name: '4K Webcam',
    price: 159.99,
    description: 'Professional 4K webcam with autofocus, noise-canceling microphone, and privacy cover for video calls and streaming.',
    image: require('./images/power-bank.jpg')
  },
  {
    id: '7',
    name: 'Wireless Earbuds',
    price: 69.99,
    description: 'True wireless earbuds with active noise cancellation, touch controls, and 24-hour total battery life.',
    image: require('./images/headphones.jpg'),
    discountPercentage: 12,
    discountedPrice: calculateDiscountedPrice(69.99, 12)
  },
  {
    id: '8',
    name: 'Laptop Stand',
    price: 39.99,
    description: 'Adjustable aluminum laptop stand with ergonomic design to improve posture and cooling for your laptop.',
    image: require('./images/smartwatch.jpg'),
    discountPercentage: 8,
    discountedPrice: calculateDiscountedPrice(39.99, 8)
  },
  {
    id: '9',
    name: 'USB-C Hub',
    price: 29.99,
    description: '7-in-1 USB-C hub with HDMI, USB ports, SD card reader, and Ethernet for expanding your laptop connectivity.',
    image: require('./images/power-bank.jpg'),
    discountPercentage: 18,
    discountedPrice: calculateDiscountedPrice(29.99, 18)
  },
  {
    id: '10',
    name: 'Desk Lamp',
    price: 59.99,
    description: 'LED desk lamp with adjustable brightness, color temperature, and USB charging port for your workspace.',
    image: require('./images/headphones.jpg'),
    discountPercentage: 22,
    discountedPrice: calculateDiscountedPrice(59.99, 22)
  },
  {
    id: '11',
    name: 'Bluetooth Speaker',
    price: 89.99,
    description: 'Portable Bluetooth speaker with 360-degree sound, waterproof design, and 20-hour battery life.',
    image: require('./images/smartwatch.jpg'),
    discountPercentage: 35,
    discountedPrice: calculateDiscountedPrice(89.99, 35)
  },
  {
    id: '12',
    name: 'Monitor Stand',
    price: 45.99,
    description: 'Dual monitor stand with gas spring arms, cable management, and VESA compatibility for a clean workspace setup.',
    image: require('./images/power-bank.jpg'),
    discountPercentage: 14,
    discountedPrice: calculateDiscountedPrice(45.99, 14)
  },
  {
    id: '13',
    name: 'iPhone 14 Pro Earpiece Speaker',
    price: 22,
    description: 'Original quality earpiece speaker for fixing audio issues during calls on the iPhone 14 Pro.',
    summary: 'Replacement earpiece speaker for iPhone 14 Pro.',
    image: require('./images/headphones.jpg'),
    discountPercentage: 10,
    discountedPrice: calculateDiscountedPrice(22, 10)
  }
];

// Helper function to get a product by ID
export const getProductById = (id: string): Product | undefined => {
  return dummyProducts.find(product => product.id === id);
};

// Helper function to get products by category (if you want to add categories later)
export const getProductsByCategory = (category: string): Product[] => {
  // For now, return all products. You can implement category filtering later
  return dummyProducts;
};

// Helper function to search products by name
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return dummyProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Utility function for calculating discounted prices (exported for use elsewhere)
export const calculateProductDiscount = (originalPrice: number, discountPercentage: number): number => {
  return calculateDiscountedPrice(originalPrice, discountPercentage);
};

// Utility function to get discount amount
export const getDiscountAmount = (originalPrice: number, discountPercentage: number): number => {
  if (discountPercentage <= 0 || discountPercentage >= 100) {
    return 0;
  }
  return Math.round((originalPrice * discountPercentage) / 100 * 100) / 100;
};