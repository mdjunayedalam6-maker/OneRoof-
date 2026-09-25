import { Product } from '../types';

export interface ShopBaseCategoryItem {
  id: number;
  name: string;
  nameEn?: string;
  image: string;
  count?: number;
  targetSlug: string;
}

export interface ShopBaseRawProduct {
  pid: number;
  name: string;
  img_sm: string;
  sprice: string | number; // Wholesale cost
  price: string | number;  // Suggested retail price
}

export interface ShopBaseProductDetail {
  pid: number;
  name: string;
  sprice: number;
  suggestedPrice: number;
  description: string;
  images: string[];
  sizes: string[];
  fabric?: string;
  sourceUrl: string;
}

// Default popular categories from shopbasebd.com
export const POPULAR_SHOPBASE_CATEGORIES: ShopBaseCategoryItem[] = [
  { id: 19, name: 'পলো শার্ট', nameEn: 'Polo Shirt', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1738393401.png', targetSlug: 'polo-shirts' },
  { id: 3, name: 'ড্রপসোল্ডার টিশার্ট', nameEn: 'Drop Shoulder T-Shirt', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1769500397.png', targetSlug: 'dropshoulder-tshirt' },
  { id: 80, name: 'বেসিক টিশার্ট', nameEn: 'Basic T-Shirt', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1769500295.png', targetSlug: 'basic-tshirt' },
  { id: 34, name: 'লং-স্লীভ টিশার্ট', nameEn: 'Long Sleeve T-Shirt', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1769500733.png', targetSlug: 'long-sleeve-tshirt' },
  { id: 33, name: 'প্রিন্ট শার্ট', nameEn: 'Printed Shirt', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696174388.png', targetSlug: 'printed-shirt' },
  { id: 81, name: 'সলিড শার্ট', nameEn: 'Solid Shirt', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1769500890.png', targetSlug: 'solid-shirt' },
  { id: 82, name: 'চেক শার্ট', nameEn: 'Check Shirt', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1769501420.png', targetSlug: 'check-shirt' },
  { id: 59, name: 'শার্ট কম্বো', nameEn: 'Shirt Combo', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1738389025.png', targetSlug: 'shirt-combo' },
  { id: 99, name: 'কাতুয়া', nameEn: 'Katua', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1789034416.png', targetSlug: 'katua' },
  { id: 1, name: 'এমব্রো. পাঞ্জাবি', nameEn: 'Embroidery Panjabi', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1738393868.png', targetSlug: 'embroidery-panjabi' },
  { id: 63, name: 'প্রিন্ট পাঞ্জাবি', nameEn: 'Print Panjabi', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1738394140.png', targetSlug: 'print-panjabi' },
  { id: 2, name: 'পাঞ্জাবি কম্বো', nameEn: 'Panjabi Combo', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1709743708.jpeg', targetSlug: 'panjabi-combo' },
  { id: 32, name: 'শর্ট কম্বো', nameEn: 'Short Combo', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696173751.png', targetSlug: 'short-combo' },
  { id: 75, name: 'হাফ স্লিভ সেট', nameEn: 'Half Sleeve Set', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1760424071.png', targetSlug: 'half-sleeve-set' },
  { id: 31, name: 'লং স্লিভ সেট', nameEn: 'Long Sleeve Set', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1760424294.png', targetSlug: 'long-sleeve-set' },
  { id: 4, name: 'জিন্স প্যান্ট', nameEn: 'Jeans Pant', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696173800.png', targetSlug: 'jeans-pant' },
  { id: 10, name: 'চিনো প্যান্ট', nameEn: 'Chino Pant', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696173820.png', targetSlug: 'chino-pant' },
  { id: 5473, name: 'মেয়েদের পোশাক', nameEn: 'Girls Clothing', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696173900.png', targetSlug: 'girls-clothing' },
  { id: 51, name: 'নতুন কালেকশন', nameEn: 'New Collection', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696173900.png', targetSlug: 'products/5/1' },
  { id: 14, name: 'গার্লস টপস', nameEn: 'Girls Tops', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696173900.png', targetSlug: 'girls-tops' },
  { id: 18, name: 'থ্রি পিস', nameEn: 'Three Piece', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696173950.png', targetSlug: 'three-piece' },
  { id: 25, name: 'স্মার্ট ওয়াচ', nameEn: 'Smart Watch', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696174050.png', targetSlug: 'smart-watch' },
  { id: 28, name: 'এয়ারবাডস / হেডফোন', nameEn: 'Airbuds / Headphone', image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1696174100.png', targetSlug: 'airbuds-headphone' },
];

// Pre-curated real ShopBaseBD products for instant 1-click import
export const CURATED_SHOPBASE_PRODUCTS: {
  pid: number;
  name: string;
  nameBn: string;
  sprice: number;
  price: number;
  img_sm: string;
  categoryName: string;
  categorySlug: string;
  sizes: string[];
  description: string;
}[] = [
  {
    pid: 32950,
    name: 'Stylish Premium Polo Shirt Navy Blue',
    nameBn: 'স্টাইলিশ প্রিমিয়াম পলো শার্ট (নেভি ব্লু)',
    sprice: 290,
    price: 600,
    img_sm: '1789381529_S_5.jpg',
    categoryName: 'পলো শার্ট',
    categorySlug: 'polo-shirts',
    sizes: ['M', 'L', 'XL'],
    description: 'Product Type: Polo Shirt\nMain Material: 100% PK Cotton\nPremium Export Quality\nFabrication: 200 GSM\nSleeve: Half Sleeve\nSize: M (Length 28, Chest 38), L (Length 29, Chest 40), XL (Length 30, Chest 42)',
  },
  {
    pid: 32949,
    name: 'Stylish Contrast Collar Polo Shirt Maroon',
    nameBn: 'কন্ট্রাস্ট কলার এক্সক্লুসিভ পলো শার্ট (মেরুন)',
    sprice: 290,
    price: 600,
    img_sm: '1789381529_S_4.jpg',
    categoryName: 'পলো শার্ট',
    categorySlug: 'polo-shirts',
    sizes: ['M', 'L', 'XL'],
    description: 'Product Type: Polo Shirt\nMain Material: 100% PK Cotton\nExport Quality Stitching & Comfortable Fit\nFabrication: 200 GSM\nSize: M, L, XL',
  },
  {
    pid: 32948,
    name: 'Stylish Classic Casual Polo Shirt Olive Green',
    nameBn: 'ক্লাসিক ক্যাজুয়াল পলো শার্ট (অলিভ গ্রিন)',
    sprice: 290,
    price: 600,
    img_sm: '1789381529_S_3.jpg',
    categoryName: 'পলো শার্ট',
    categorySlug: 'polo-shirts',
    sizes: ['M', 'L', 'XL'],
    description: 'Product Type: Polo Shirt\nMain Material: PK Cotton\nSoft and Breathable Summer Wear\nSize: M, L, XL',
  },
  {
    pid: 32947,
    name: 'Executive Slim Fit Polo Shirt Royal Blue',
    nameBn: 'এক্সিকিউটিভ স্লিম ফিট পলো শার্ট (রয়েল ব্লু)',
    sprice: 290,
    price: 600,
    img_sm: '1789381529_S_2.jpg',
    categoryName: 'পলো শার্ট',
    categorySlug: 'polo-shirts',
    sizes: ['M', 'L', 'XL'],
    description: 'Product Type: Polo Shirt\nMain Material: PK Cotton\nColor fastness guaranteed\nSize: M, L, XL',
  },
  {
    pid: 32846,
    name: 'Premium Quality Solid Katua Navy',
    nameBn: 'প্রিমিয়াম কোয়ালিটি সলিড কাতুয়া (নেভি ব্লু)',
    sprice: 500,
    price: 850,
    img_sm: '1788981514_S_6.jpg',
    categoryName: 'কাতুয়া',
    categorySlug: 'katua',
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Fabrics: Oxford Cotton\nQuality: Export quality\nFashionable & Slim Fit\nColor: As shown in picture\nSize: M (Long 28, Body 40), L (Long 29, Body 42), XL (Long 30, Body 44), XXL (Long 31, Body 46)',
  },
  {
    pid: 32845,
    name: 'Premium Oxford Cotton Katua Maroon',
    nameBn: 'প্রিমিয়াম অক্সফোর্ড কটন কাতুয়া (মেরুন)',
    sprice: 500,
    price: 850,
    img_sm: '1788981514_S_5.jpg',
    categoryName: 'কাতুয়া',
    categorySlug: 'katua',
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Fabrics: 100% Oxford Cotton\nFinest Stitching & Unique Button Style\nSize: M, L, XL, XXL',
  },
  {
    pid: 32844,
    name: 'Traditional Slim Fit Katua White',
    nameBn: 'ট্রেডিশনাল স্লিম ফিট কাতুয়া (হোয়াইট)',
    sprice: 500,
    price: 850,
    img_sm: '1788981514_S_4.jpg',
    categoryName: 'কাতুয়া',
    categorySlug: 'katua',
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Fabrics: Premium Cotton\nPerfect for special gatherings and casual hangouts\nSize: M, L, XL, XXL',
  },
  {
    pid: 32843,
    name: 'Modern Festive Casual Katua Black',
    nameBn: 'মডার্ন ফেস্টিভ ক্যাজুয়াল কাতুয়া (ব্ল্যাক)',
    sprice: 500,
    price: 850,
    img_sm: '1788981514_S_3.jpg',
    categoryName: 'কাতুয়া',
    categorySlug: 'katua',
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Fabrics: Oxford Cotton\nExport Quality Finish\nSize: M, L, XL, XXL',
  },
  {
    pid: 32810,
    name: 'Premium Cotton Drop Shoulder T-Shirt Black',
    nameBn: 'প্রিমিয়াম কটন ড্রপসোল্ডার টিশার্ট (কালো)',
    sprice: 330,
    price: 650,
    img_sm: '1788785429_S_4.jpg',
    categoryName: 'ড্রপসোল্ডার টিশার্ট',
    categorySlug: 'dropshoulder-tshirt',
    sizes: ['M', 'L', 'XL'],
    description: 'Fabric: 100% Combed Cotton 210+ GSM\nOversized Trendy Drop Shoulder Fit\nHigh density print & soft hand feel\nSize: M, L, XL',
  },
  {
    pid: 32809,
    name: 'Trendy Graphic Drop Shoulder T-Shirt Grey',
    nameBn: 'ট্রেন্ডি গ্রাফিক্স ড্রপসোল্ডার টিশার্ট (গ্রে)',
    sprice: 330,
    price: 650,
    img_sm: '1788785429_S_3.jpg',
    categoryName: 'ড্রপসোল্ডার টিশার্ট',
    categorySlug: 'dropshoulder-tshirt',
    sizes: ['M', 'L', 'XL'],
    description: 'Fabric: 100% Pure Cotton 220 GSM\nDrop shoulder relaxed fit\nSize: M (Chest 42), L (Chest 44), XL (Chest 46)',
  },
  {
    pid: 32808,
    name: 'Streetwear Minimalist Drop Shoulder T-Shirt Olive',
    nameBn: 'স্ট্রিটওয়্যার মিনিমালিস্ট ড্রপসোল্ডার টিশার্ট (অলিভ)',
    sprice: 330,
    price: 650,
    img_sm: '1788785429_S_2.jpg',
    categoryName: 'ড্রপসোল্ডার টিশার্ট',
    categorySlug: 'dropshoulder-tshirt',
    sizes: ['M', 'L', 'XL'],
    description: 'Fabric: 100% Combed Cotton\nComfortable all-day wear for summer and monsoon\nSize: M, L, XL',
  },
  {
    pid: 32750,
    name: 'Cotton Printed Basic Casual T-Shirt White',
    nameBn: 'কটন প্রিন্টেড বেসিক ক্যাজুয়াল টিশার্ট (সাদা)',
    sprice: 210,
    price: 350,
    img_sm: '1788698124_S_1.jpg',
    categoryName: 'বেসিক টিশার্ট',
    categorySlug: 'basic-tshirt',
    sizes: ['M', 'L', 'XL'],
    description: 'Fabric: 100% Cotton 170 GSM\nLightweight, breathable, everyday casual wear\nSize: M, L, XL',
  },
  {
    pid: 32749,
    name: 'Solid Color Basic Regular T-Shirt Red',
    nameBn: 'সলিড কালার বেসিক রেগুলার টিশার্ট (লাল)',
    sprice: 210,
    price: 350,
    img_sm: '1788698124_S_2.jpg',
    categoryName: 'বেসিক টিশার্ট',
    categorySlug: 'basic-tshirt',
    sizes: ['M', 'L', 'XL'],
    description: 'Fabric: Soft Cotton 170 GSM\nRegular fit comfortable collar\nSize: M, L, XL',
  },
  {
    pid: 32620,
    name: 'Print Shirt Cotton Half Sleeve Floral Blue',
    nameBn: 'প্রিন্ট শার্ট কটন হাফ স্লিভ (ফ্লোরাল ব্লু)',
    sprice: 450,
    price: 750,
    img_sm: '1788523190_S_2.jpg',
    categoryName: 'প্রিন্ট শার্ট',
    categorySlug: 'printed-shirt',
    sizes: ['M', 'L', 'XL'],
    description: 'Fabrics: 100% Export Quality Cotton\nHalf Sleeve Smart Casual Cut\nSize: M (Chest 38, Length 28), L (Chest 40, Length 29), XL (Chest 42, Length 30)',
  },
  {
    pid: 32619,
    name: 'Print Shirt Cotton Half Sleeve Abstract Brown',
    nameBn: 'প্রিন্ট শার্ট কটন হাফ স্লিভ (অ্যাবস্ট্রাক্ট ব্রাউন)',
    sprice: 450,
    price: 750,
    img_sm: '1788523190_S_3.jpg',
    categoryName: 'প্রিন্ট শার্ট',
    categorySlug: 'printed-shirt',
    sizes: ['M', 'L', 'XL'],
    description: 'Fabrics: Premium Pure Cotton\nSoft touch, wrinkle resistant, stylish summer outfit\nSize: M, L, XL',
  },
  {
    pid: 32550,
    name: 'Premium Cotton Full Sleeve Formal Shirt Light Blue',
    nameBn: 'প্রিমিয়াম কটন ফুল স্লিভ ফরমাল শার্ট (লাইট ব্লু)',
    sprice: 450,
    price: 800,
    img_sm: '1788410291_S_1.jpg',
    categoryName: 'সলিড শার্ট',
    categorySlug: 'solid-shirt',
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Fabrics: 100% Oxford Cotton\nFull Sleeve Office & Event Wear\nSize: M, L, XL, XXL',
  },
  {
    pid: 32549,
    name: 'Premium Cotton Full Sleeve Formal Shirt White',
    nameBn: 'প্রিমিয়াম কটন ফুল স্লিভ ফরমাল শার্ট (সাদা)',
    sprice: 450,
    price: 800,
    img_sm: '1788410291_S_2.jpg',
    categoryName: 'সলিড শার্ট',
    categorySlug: 'solid-shirt',
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Fabrics: High count cotton\nClassic collar with premium buttons\nSize: M, L, XL, XXL',
  },
  {
    pid: 32410,
    name: 'Premium Cotton Embroidery Panjabi Royal Maroon',
    nameBn: 'প্রিমিয়াম কটন এক্সক্লুসিভ এমব্রয়ডারি পাঞ্জাবি (রয়েল মেরুন)',
    sprice: 1050,
    price: 1600,
    img_sm: '1788204910_S_1.jpg',
    categoryName: 'এমব্রো. পাঞ্জাবি',
    categorySlug: 'embroidery-panjabi',
    sizes: ['40', '42', '44'],
    description: 'Fabrics: High Density Cotton\nFinest computer embroidery around placket and collar\nSnap buttons, side pockets\nSize: 40 (Chest 41, Length 40), 42 (Chest 43, Length 42), 44 (Chest 45, Length 44)',
  },
  {
    pid: 32409,
    name: 'Premium Cotton Embroidery Panjabi Pure White',
    nameBn: 'প্রিমিয়াম কটন এক্সক্লুসিভ এমব্রয়ডারি পাঞ্জাবি (সাদা)',
    sprice: 1050,
    price: 1600,
    img_sm: '1788204910_S_2.jpg',
    categoryName: 'এমব্রো. পাঞ্জাবি',
    categorySlug: 'embroidery-panjabi',
    sizes: ['40', '42', '44'],
    description: 'Fabrics: 100% Soft Combed Cotton\nSpecial religious and festive event wear\nSize: 40, 42, 44',
  },
  {
    pid: 32350,
    name: 'Premium Cotton Digital Print Panjabi Black Gold',
    nameBn: 'প্রিমিয়াম কটন ডিজিটাল প্রিন্ট পাঞ্জাবি (ব্ল্যাক গোল্ড)',
    sprice: 950,
    price: 1450,
    img_sm: '1788091102_S_1.jpg',
    categoryName: 'প্রিন্ট পাঞ্জাবি',
    categorySlug: 'print-panjabi',
    sizes: ['40', '42', '44'],
    description: 'Fabrics: Silk-Touch Cotton\nFade-resistant digital print\nSize: 40, 42, 44',
  },
  {
    pid: 32200,
    name: 'Stylish Shirt & T-Shirt Combo Pack (Set of 2)',
    nameBn: 'স্টাইলিশ শার্ট ও টিশার্ট কম্বো প্যাক (২টি সেট)',
    sprice: 720,
    price: 1200,
    img_sm: '1787910283_S_1.jpg',
    categoryName: 'শার্ট কম্বো',
    categorySlug: 'shirt-combo',
    sizes: ['M', 'L', 'XL'],
    description: 'Includes: 1 Casual Half Sleeve Shirt + 1 Solid Basic T-Shirt\nHigh value combo for everyday wear\nSize: M, L, XL',
  },
  {
    pid: 32150,
    name: 'Mash T-Shirt and Short Pant Summer Active Set',
    nameBn: 'ম্যাশ টিশার্ট ও শর্ট প্যান্ট সামার অ্যাক্টিভ সেট',
    sprice: 299,
    price: 550,
    img_sm: '1787820194_S_1.jpg',
    categoryName: 'শর্ট কম্বো',
    categorySlug: 'short-combo',
    sizes: ['M', 'L', 'XL'],
    description: 'Fabrics: Dry-fit breathable mesh polyester\nIdeal for gym, running, and casual home comfort\nSize: M, L, XL',
  },
];

/**
 * Calculates Selling Price based on Wholesale Cost and Profit Margin %
 * Default requested margin: 15% লাভ
 */
export function calculateSellingPrice(wholesalePrice: number, marginPercent: number = 15): {
  wholesalePrice: number;
  profitAmount: number;
  sellingPrice: number;
} {
  const profit = wholesalePrice * (marginPercent / 100);
  const roundedPrice = Math.round(wholesalePrice + profit);
  return {
    wholesalePrice,
    profitAmount: Math.round(profit),
    sellingPrice: roundedPrice,
  };
}

/**
 * Converts a raw ShopBase item into a full OneRoof Product model
 */
export function convertShopBaseToProduct(
  item: ShopBaseRawProduct,
  categorySlug: string = 'mens-clothing',
  categoryNameBn: string = 'পোশাক',
  marginPercent: number = 15,
  descriptionText?: string,
  extraImages: string[] = []
): Product {
  const wholesale = typeof item.sprice === 'string' ? parseFloat(item.sprice) || 0 : item.sprice;
  const suggested = typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price;
  
  const { profitAmount, sellingPrice } = calculateSellingPrice(wholesale, marginPercent);
  
  // Crossed out regular price: suggested retail price from ShopBase, or wholesale * 1.5
  const originalPrice = suggested > sellingPrice ? Math.round(suggested) : Math.round(wholesale * 1.45);
  const discountPercentage = Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);

  // High-res image URL formatting with fallback handling
  const mainImgUrl = `https://shopbasebd.com/public/uploads/shop/products/${item.img_sm}`;
  const largeImgUrl = `https://shopbasebd.com/public/uploads/shop/products/${item.img_sm.replace('_S_', '_L_').replace(/\.jpg$/i, '.jpeg')}`;
  
  const allImages = [
    largeImgUrl,
    mainImgUrl,
    ...extraImages
  ].filter(Boolean);

  const uniqueImages = [...new Set(allImages)];

  // Deduce sizes
  const sizes = ['M', 'L', 'XL', 'XXL'];

  return {
    id: `sbp-${item.pid}`,
    sku: `SBP-${item.pid}`,
    titleBn: `${item.name}`,
    titleEn: item.name,
    descriptionBn: descriptionText || `অরিজিনাল ShopBaseBD ভেরিফায়েড পণ্য। প্রিমিয়াম এক্সপোর্ট কোয়ালিটি ফ্যাব্রিক। ১০০% অথেনটিক এবং দ্রুত ক্যাশ অন ডেলিভারি সুবিধা সহ। ৭ দিনের সহজ এক্সচেঞ্জ ও রিটার্ন গ্যারান্টি। সাইজ: M, L, XL, XXL।`,
    descriptionEn: descriptionText || `Verified premium export quality apparel sourced from ShopBaseBD wholesale catalog. 100% brand new, authentic fabrics with comfortable slim and regular fitting.`,
    category: categorySlug,
    subcategory: categoryNameBn,
    brand: 'ShopBaseBD Official',
    price: sellingPrice,
    originalPrice: originalPrice,
    discountPercentage: discountPercentage > 0 ? discountPercentage : 15,
    rating: 4.8,
    reviewCount: Math.floor(Math.random() * 25) + 12,
    images: uniqueImages.length > 0 ? uniqueImages : [mainImgUrl],
    stock: 50,
    isFeatured: true,
    isNewArrival: true,
    tags: ['shopbase', categorySlug, 'reseller', 'trending', 'wholesale-direct'],
    sizes: sizes,
    variants: [
      {
        type: 'size',
        options: sizes,
      },
    ],
    specifications: {
      'সোর্স / উৎস': 'ShopBaseBD Official Reseller',
      'পাইকারি মূল্য (হোলসেল)': `৳ ${wholesale}`,
      'আপনার নিট প্রফিট (১৫%)': `৳ ${profitAmount}`,
      'কোয়ালিটি': 'Export Standard Quality',
      'ওয়ারেন্টি': '৭ দিনের রিটার্ন ও রিপ্লেসমেন্ট',
      'ডেলিভারি': 'সারাদেশে হোম ডেলিভারি (২-৪ দিন)',
    },
    reviews: [
      {
        id: `rev-${item.pid}-1`,
        userName: 'রফিকুল ইসলাম',
        rating: 5,
        date: '১ দিন আগে',
        comment: 'কাপড়ের কোয়ালিটি সত্যিই চমৎকার। ফিটিংস ও ফিনিশিং দারুণ। ধন্যবাদ OneRoof!',
        verifiedPurchase: true,
      },
      {
        id: `rev-${item.pid}-2`,
        userName: 'তানভীর আহমেদ',
        rating: 5,
        date: '৩ দিন আগে',
        comment: 'প্যাকেজিং এবং ডেলিভারি খুব দ্রুত পেয়েছি। ছবি অনুযায়ী হুবহু সেইম পেয়েছি।',
        verifiedPurchase: true,
      },
    ],
    warranty: '৭ দিনের সহজ ক্যাশব্যাক বা রিপ্লেসমেন্ট গ্যারান্টি',
    deliveryTime: '২-৪ কর্মদিবসের মধ্যে দ্রুত ডেলিভারি',
    shippingInside: 60,
    shippingOutside: 120,
    isFreeShipping: false,
    sourceUrl: `https://shopbasebd.com/store/sample/product/details/${item.pid}`,
    wholesalePrice: wholesale,
    profitMarginPercent: marginPercent,
  };
}

/**
 * Fetch categories live from ShopBaseBD (via proxy or fallback to popular list)
 */
export async function fetchShopBaseCategories(): Promise<ShopBaseCategoryItem[]> {
  try {
    const res = await fetch('/api/shopbase/store/product-category', {
      headers: { 'Accept': 'text/html' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    
    // Parse categories from HTML
    const regex = /href="https:\/\/shopbasebd\.com\/store\/sample\/products\/(\d+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[\s\S]*?<h6[^>]*>([^<]+)<\/h6>/g;
    const matches = [...html.matchAll(regex)];
    
    if (matches.length > 0) {
      return matches.map((m) => {
        const id = parseInt(m[1], 10);
        const name = m[4].trim();
        const img = m[2];
        return {
          id,
          name,
          image: img,
          targetSlug: mapNameToCategorySlug(name),
        };
      });
    }
  } catch (err) {
    console.warn('Live fetch categories failed, using standard ShopBase category catalog:', err);
  }
  return POPULAR_SHOPBASE_CATEGORIES;
}

/**
 * Fetch products for a specific category ID from ShopBaseBD
 */
export async function fetchShopBaseProductsByCategory(
  categoryId: number,
  categorySlug: string = 'mens-clothing',
  categoryNameBn: string = 'পোশাক',
  marginPercent: number = 15
): Promise<Product[]> {
  try {
    const res = await fetch(`/api/shopbase/store/sample-product/data/${categoryId}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rawData = await res.json();
    
    if (Array.isArray(rawData) && rawData.length > 0) {
      const seenPids = new Set<number>();
      const uniqueRaw = rawData.filter((item: ShopBaseRawProduct) => {
        if (!item || !item.pid || seenPids.has(item.pid)) return false;
        seenPids.add(item.pid);
        return true;
      });
      return uniqueRaw.map((item: ShopBaseRawProduct) =>
        convertShopBaseToProduct(item, categorySlug, categoryNameBn, marginPercent)
      );
    }
  } catch (err) {
    console.warn(`Live fetch products for category ${categoryId} failed, using curated matching:`, err);
  }

  // Filter curated products that match this category
  const matching = CURATED_SHOPBASE_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug || p.categoryName === categoryNameBn
  );

  if (matching.length > 0) {
    return matching.map((item) =>
      convertShopBaseToProduct(
        {
          pid: item.pid,
          name: item.nameBn || item.name,
          img_sm: item.img_sm,
          sprice: item.sprice,
          price: item.price,
        },
        item.categorySlug,
        item.categoryName,
        marginPercent,
        item.description
      )
    );
  }

  // If no match, return default curated products
  return CURATED_SHOPBASE_PRODUCTS.slice(0, 10).map((item) =>
    convertShopBaseToProduct(
      {
        pid: item.pid,
        name: item.nameBn || item.name,
        img_sm: item.img_sm,
        sprice: item.sprice,
        price: item.price,
      },
      categorySlug,
      categoryNameBn,
      marginPercent,
      item.description
    )
  );
}

/**
 * Fetch a single product by ShopBaseBD Product ID or URL
 */
export async function fetchShopBaseSingleProduct(
  identifier: string | number,
  marginPercent: number = 15
): Promise<Product | null> {
  let pid: number = 0;
  
  if (typeof identifier === 'number') {
    pid = identifier;
  } else {
    // Extract PID from URL like https://shopbasebd.com/store/sample/product/details/32846
    const clean = identifier.trim();
    // More flexible regex to match common ShopBaseBD URL patterns
    const match = clean.match(/details\/(\d+)/i) || 
                  clean.match(/products\/(\d+)/i) || 
                  clean.match(/product\/(\d+)/i) || 
                  clean.match(/(\d+)$/);
    if (match) {
      pid = parseInt(match[1], 10);
    }
  }

  if (!pid) return null;

  // Try live fetch via proxy
  try {
    const res = await fetch(`/api/shopbase/store/sample/product/details/${pid}`);
    if (res.ok) {
      const html = await res.text();
      
      // Extract title
      const titleMatch = html.match(/<h4 class="fw-bold mb-0">([^<]+)<\/h4>/);
      const title = titleMatch ? titleMatch[1].trim() : `ShopBase Product #${pid}`;

      // Extract wholesale price
      const spriceMatch = html.match(/হোলসেল প্রাইসঃ?\s*([0-9.]+)\s*টাকা/);
      const sprice = spriceMatch ? parseFloat(spriceMatch[1]) : 300;

      // Extract suggested retail price
      const priceMatch = html.match(/সাজেস্টেড বিক্রয়মূল্যঃ?\s*([0-9.]+)\s*টাকা/);
      const price = priceMatch ? parseFloat(priceMatch[1]) : Math.round(sprice * 1.6);

      // Extract images
      const imgMatches = [...html.matchAll(/src="(https:\/\/shopbasebd\.com\/public\/uploads\/shop\/products\/[^"]+)"/g)];
      const images = [...new Set(imgMatches.map((m) => m[1]))];

      // Extract description
      const descMatch = html.match(/<p class="text-muted">([\s\S]*?)<\/p>/);
      const description = descMatch ? descMatch[1].replace(/<br\s*\/?>/gi, '\n').trim() : '';

      const rawItem: ShopBaseRawProduct = {
        pid,
        name: title,
        img_sm: images[0]?.split('/').pop() || `${pid}.jpg`,
        sprice,
        price,
      };

      const product = convertShopBaseToProduct(
        rawItem,
        'mens-clothing',
        'ShopBaseBD কালেকশন',
        marginPercent,
        description,
        images
      );

      return product;
    }
  } catch (err) {
    console.warn(`Live single product fetch failed for pid ${pid}:`, err);
  }

  // Check if PID exists in curated products
  const curated = CURATED_SHOPBASE_PRODUCTS.find((p) => p.pid === pid);
  if (curated) {
    return convertShopBaseToProduct(
      {
        pid: curated.pid,
        name: curated.nameBn || curated.name,
        img_sm: curated.img_sm,
        sprice: curated.sprice,
        price: curated.price,
      },
      curated.categorySlug,
      curated.categoryName,
      marginPercent,
      curated.description
    );
  }

  return null;
}

/**
 * Returns all 22+ curated popular ShopBaseBD products ready for 1-click import
 */
export function getCuratedShopBaseProducts(marginPercent: number = 15): Product[] {
  return CURATED_SHOPBASE_PRODUCTS.map((item) =>
    convertShopBaseToProduct(
      {
        pid: item.pid,
        name: item.nameBn || item.name,
        img_sm: item.img_sm,
        sprice: item.sprice,
        price: item.price,
      },
      item.categorySlug,
      item.categoryName,
      marginPercent,
      item.description
    )
  );
}

// Utility to map Bengali category names to our website category slugs
export function mapNameToCategorySlug(name: string): string {
  const n = (name || '').toLowerCase().trim();
  if (n.includes('পলো') || n.includes('polo')) return 'polo-shirts';
  if (n.includes('ড্রপসোল্ডার') || n.includes('drop shoulder')) return 'dropshoulder-tshirt';
  if (n.includes('বেসিক টিশার্ট') || n.includes('basic t')) return 'basic-tshirt';
  if (n.includes('লং-স্লীভ') || n.includes('long sleeve t')) return 'long-sleeve-tshirt';
  if (n.includes('টিশার্ট') || n.includes('t-shirt') || n.includes('tshirt')) return 'dropshoulder-tshirt';
  if (n.includes('প্রিন্ট শার্ট') || n.includes('printed shirt')) return 'printed-shirt';
  if (n.includes('সলিড শার্ট') || n.includes('solid shirt')) return 'solid-shirt';
  if (n.includes('চেক শার্ট') || n.includes('check shirt')) return 'check-shirt';
  if (n.includes('শার্ট কম্বো') || n.includes('shirt combo')) return 'shirt-combo';
  if (n.includes('কাতুয়া') || n.includes('katua')) return 'katua';
  if (n.includes('এমব্রো. পাঞ্জাবি') || n.includes('embroidery panjabi')) return 'embroidery-panjabi';
  if (n.includes('প্রিন্ট পাঞ্জাবি') || n.includes('print panjabi')) return 'print-panjabi';
  if (n.includes('পাঞ্জাবি কম্বো') || n.includes('panjabi combo')) return 'panjabi-combo';
  if (n.includes('পাঞ্জাবি') || n.includes('panjabi') || n.includes('punjabi')) return 'embroidery-panjabi';
  if (n.includes('শর্ট কম্বো') || n.includes('short combo')) return 'short-combo';
  if (n.includes('হাফ স্লিভ সেট') || n.includes('half sleeve set')) return 'half-sleeve-set';
  if (n.includes('লং স্লিভ সেট') || n.includes('long sleeve set')) return 'long-sleeve-set';
  if (n.includes('জিন্স') || n.includes('jeans')) return 'jeans-pant';
  if (n.includes('চিনো') || n.includes('chino')) return 'chino-pant';
  if (n.includes('গার্লস') || n.includes('মেয়ে') || n.includes('টপস')) return 'girls-tops';
  if (n.includes('থ্রি পিস') || n.includes('three piece')) return 'three-piece';
  if (n.includes('স্মার্ট ওয়াচ') || n.includes('smart watch')) return 'smart-watch';
  if (n.includes('এয়ারবাডস') || n.includes('হেডফোন') || n.includes('earbuds') || n.includes('headphone')) return 'airbuds-headphone';
  if (n.includes('শার্ট') || n.includes('shirt')) return 'printed-shirt';
  if (n.includes('প্যান্ট') || n.includes('pant')) return 'jeans-pant';

  // Fallback clean slug
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  return slug || 'shopbase-special';
}

/**
 * Returns complete Category metadata (ID, Slug, NameBn, NameEn, Icon, Image)
 * for any ShopBaseBD category name or slug.
 */
export function getShopBaseCategoryMetadata(slugOrName: string): {
  slug: string;
  nameBn: string;
  nameEn: string;
  image: string;
  iconName: string;
} {
  const clean = (slugOrName || '').toLowerCase().trim();

  // 1. Direct match in POPULAR_SHOPBASE_CATEGORIES
  const matched = POPULAR_SHOPBASE_CATEGORIES.find(
    (c) =>
      c.targetSlug.toLowerCase() === clean ||
      c.name.toLowerCase() === clean ||
      (c.nameEn && c.nameEn.toLowerCase() === clean)
  );

  if (matched) {
    let icon = 'Shirt';
    if (matched.targetSlug.includes('watch') || matched.targetSlug.includes('phone') || matched.targetSlug.includes('electronics')) {
      icon = 'Smartphone';
    } else if (matched.targetSlug.includes('girls') || matched.targetSlug.includes('three-piece')) {
      icon = 'Sparkles';
    }
    return {
      slug: matched.targetSlug,
      nameBn: matched.name,
      nameEn: matched.nameEn || matched.targetSlug,
      image: matched.image,
      iconName: icon,
    };
  }

  // 2. Fuzzy match by Bengali name
  const mappedSlug = mapNameToCategorySlug(slugOrName);
  const bySlug = POPULAR_SHOPBASE_CATEGORIES.find((c) => c.targetSlug === mappedSlug);
  if (bySlug) {
    return {
      slug: bySlug.targetSlug,
      nameBn: bySlug.name,
      nameEn: bySlug.nameEn || bySlug.targetSlug,
      image: bySlug.image,
      iconName: bySlug.targetSlug.includes('watch') || bySlug.targetSlug.includes('phone') ? 'Smartphone' : 'Shirt',
    };
  }

  // 3. Fallback dynamic object
  const enName = mappedSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    slug: mappedSlug,
    nameBn: slugOrName || 'নতুন ক্যাটাগরি',
    nameEn: enName || 'New Category',
    image: 'https://shopbasebd.com/public/uploads/shop/category/scategory-1738393401.png',
    iconName: 'ShoppingBag',
  };
}
