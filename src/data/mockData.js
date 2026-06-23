/**
 * Mock data store.
 *
 * In a production deployment this file is deleted entirely; everything that
 * imports from `services/api.js` keeps working unchanged because the
 * service layer is the only thing that knows where data comes from.
 */

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Phones, laptops, audio gear and more.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Clothing, footwear and accessories.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    description: 'Furniture, decor and kitchen essentials.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80',
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    description: 'Gear for fitness, sports and the outdoors.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
];

export const products = [
  {
    id: 'e-001',
    categoryId: 'electronics',
    name: 'Aria Wireless Headphones',
    price: 129.99,
    rating: 4.5,
    reviewCount: 312,
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    ],
    description:
      'Over-ear wireless headphones with active noise cancellation, 30-hour battery life, and plush memory-foam ear cushions for all-day comfort.',
    specs: { 'Battery life': '30 hours', Connectivity: 'Bluetooth 5.3', Weight: '250g', Color: 'Matte black' },
  },
  {
    id: 'e-002',
    categoryId: 'electronics',
    name: 'Pulse Smartwatch SE',
    price: 199.0,
    rating: 4.2,
    reviewCount: 187,
    stock: 41,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    ],
    description:
      'Track workouts, heart rate, and sleep with a vivid AMOLED display. Water resistant to 50m, with a 7-day battery.',
    specs: { Display: '1.4" AMOLED', 'Water resistance': '5 ATM', Battery: '7 days', Compatibility: 'iOS & Android' },
  },
  {
    id: 'e-003',
    categoryId: 'electronics',
    name: 'Nimbus 14" Ultrabook',
    price: 1099.5,
    rating: 4.7,
    reviewCount: 98,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    ],
    description:
      'A lightweight 14-inch ultrabook with a crisp 2.8K display, all-day battery life, and a fanless silent design.',
    specs: { CPU: '8-core, 3.2GHz', RAM: '16GB', Storage: '512GB SSD', Weight: '1.2kg' },
  },
  {
    id: 'f-001',
    categoryId: 'fashion',
    name: 'Heritage Denim Jacket',
    price: 89.0,
    rating: 4.4,
    reviewCount: 156,
    stock: 33,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    ],
    description: 'A classic mid-wash denim jacket cut from heavyweight cotton, built to soften and fade with wear.',
    specs: { Material: '100% cotton denim', Fit: 'Regular', Care: 'Machine wash cold', Origin: 'Imported' },
  },
  {
    id: 'f-002',
    categoryId: 'fashion',
    name: 'Trail Runner Sneakers',
    price: 74.99,
    rating: 4.3,
    reviewCount: 421,
    stock: 58,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    ],
    description: 'Lightweight, breathable trail sneakers with responsive cushioning and a grippy rubber outsole.',
    specs: { Material: 'Mesh upper', Sole: 'Rubber', Weight: '280g', Fit: 'True to size' },
  },
  {
    id: 'h-001',
    categoryId: 'home',
    name: 'Oslo Ceramic Dinnerware Set',
    price: 64.5,
    rating: 4.6,
    reviewCount: 89,
    stock: 19,
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80',
    ],
    description: 'A 16-piece stoneware dinnerware set in a soft matte glaze, dishwasher and microwave safe.',
    specs: { Pieces: 16, Material: 'Stoneware', 'Dishwasher safe': 'Yes', Color: 'Sand' },
  },
  {
    id: 'h-002',
    categoryId: 'home',
    name: 'Lumen Adjustable Desk Lamp',
    price: 42.0,
    rating: 4.1,
    reviewCount: 64,
    stock: 47,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
    ],
    description: 'A fully adjustable LED desk lamp with three color temperatures and stepless brightness control.',
    specs: { 'Light source': 'LED', Modes: '3 color temps', Power: 'USB-C', Adjustable: 'Yes' },
  },
  {
    id: 's-001',
    categoryId: 'sports',
    name: 'Flex Pro Yoga Mat',
    price: 39.99,
    rating: 4.8,
    reviewCount: 275,
    stock: 65,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80',
    ],
    description: 'A 6mm extra-thick non-slip yoga mat with a textured surface for stability in any pose.',
    specs: { Thickness: '6mm', Material: 'TPE', Length: '183cm', 'Non-slip': 'Yes' },
  },
  {
    id: 's-002',
    categoryId: 'sports',
    name: 'Summit 30L Hiking Backpack',
    price: 95.0,
    rating: 4.5,
    reviewCount: 132,
    stock: 21,
    images: [
      'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&q=80',
      'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=800&q=80',
    ],
    description: 'A 30-liter hiking backpack with a ventilated back panel, rain cover, and multiple access points.',
    specs: { Capacity: '30L', Material: 'Ripstop nylon', 'Rain cover': 'Included', Weight: '1.1kg' },
  },
];
