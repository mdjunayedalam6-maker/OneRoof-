import { Product } from '../types';

/**
 * Comprehensive mapping of Subcategory IDs and Bengali names to distinct, high-quality images.
 * Guarantees every subcategory displays its exact matching apparel/product image.
 */

export const SUBCATEGORY_IMAGE_MAP: Record<string, string> = {
  // ছেলেদের পোশাক (Men's Clothing)
  'katua': 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=250&auto=format&fit=crop&q=80',
  'কাতুয়া': 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=250&auto=format&fit=crop&q=80',
  'polo-shirts': 'https://shopbasebd.com/public/uploads/shop/products/1789381529_L_5.jpeg',
  'পলো শার্ট': 'https://shopbasebd.com/public/uploads/shop/products/1789381529_L_5.jpeg',
  'basic-tshirt': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=250&auto=format&fit=crop&q=80',
  'বেসিক টি-শার্ট': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=250&auto=format&fit=crop&q=80',
  'dropshoulder-tshirt': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=250&auto=format&fit=crop&q=80',
  'ড্রপসোল্ডার টিশার্ট': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=250&auto=format&fit=crop&q=80',
  'embroidery-panjabi': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=250&auto=format&fit=crop&q=80',
  'পাঞ্জাবি কালেকশন': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=250&auto=format&fit=crop&q=80',
  'printed-shirt': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=250&auto=format&fit=crop&q=80',
  'প্রিন্ট শার্ট': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=250&auto=format&fit=crop&q=80',
  'jeans-pant': 'https://images.unsplash.com/photo-1542272604-780c96856592?w=250&auto=format&fit=crop&q=80',
  'জিন্স প্যান্ট': 'https://images.unsplash.com/photo-1542272604-780c96856592?w=250&auto=format&fit=crop&q=80',
  'chino-pant': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=250&auto=format&fit=crop&q=80',
  'চিনো প্যান্ট': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=250&auto=format&fit=crop&q=80',

  // মেয়েদের পোশাক (Women's Clothing)
  'saree': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=250&auto=format&fit=crop&q=80',
  'শাড়ি কালেকশন': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=250&auto=format&fit=crop&q=80',
  'three-piece': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=250&auto=format&fit=crop&q=80',
  'রেডিমেড থ্রিপিস ও কুর্তি': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=250&auto=format&fit=crop&q=80',
  'girls-tops': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=250&auto=format&fit=crop&q=80',
  'টপস ও টিশার্ট': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=250&auto=format&fit=crop&q=80',
  'borka-abaya': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=250&auto=format&fit=crop&q=80',
  'বোরকা ও আবায়া': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=250&auto=format&fit=crop&q=80',
  'tanter-saree': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=250&auto=format&fit=crop&q=80',
  'তাঁতের শাড়ী': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=250&auto=format&fit=crop&q=80',
  'handprint-saree': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=250&auto=format&fit=crop&q=80',
  'হ্যান্ডপ্রিন্ট শাড়ি': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=250&auto=format&fit=crop&q=80',
  'sunnati-dress': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&auto=format&fit=crop&q=80',
  'সুন্নাতি ড্রেস': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&auto=format&fit=crop&q=80',
  'inner-nighty': 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=250&auto=format&fit=crop&q=80',
  'ইনার ও নাইটি': 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=250&auto=format&fit=crop&q=80',
  'girls-clothing': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=250&auto=format&fit=crop&q=80',
  'মেয়েদের ফ্যাশন': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=250&auto=format&fit=crop&q=80',

  // বেবি কালেকশন (Baby & Kids Collection)
  'kids-clothing': 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=250&auto=format&fit=crop&q=80',
  'কিডস কালেকশন': 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=250&auto=format&fit=crop&q=80',
  'pari-dress': 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=250&auto=format&fit=crop&q=80',
  'পরী ড্রেস': 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=250&auto=format&fit=crop&q=80',
  'baby-borka': 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=250&auto=format&fit=crop&q=80',
  'বেবি বোরখা': 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=250&auto=format&fit=crop&q=80',
  'kids-pant': 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=250&auto=format&fit=crop&q=80',
  'কিডস প্যান্ট': 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=250&auto=format&fit=crop&q=80',
  'girls-tshirt-set': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=250&auto=format&fit=crop&q=80',
  'গার্লস টিশার্ট সেট': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=250&auto=format&fit=crop&q=80',
  'baby': 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=250&auto=format&fit=crop&q=80',
  'বেবি ও কিডস কেয়ার': 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=250&auto=format&fit=crop&q=80',

  // কাপল এন্ড কম্বো (Couple & Combo)
  'couple-saree': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
  'কাপল শাড়ী ও পাঞ্জাবি': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
  'couple-threepiece': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=250&auto=format&fit=crop&q=80',
  'কাপল থ্রীপিস': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=250&auto=format&fit=crop&q=80',
  'tshirt-skirt': 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=250&auto=format&fit=crop&q=80',
  'টিশার্ট & স্কার্ট কম্বো': 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=250&auto=format&fit=crop&q=80',

  // গৃহ সামগ্রী (Home & Living)
  'bedsheet': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=250&auto=format&fit=crop&q=80',
  'রেগুলার বেডশীট': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=250&auto=format&fit=crop&q=80',
  'home-decor': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=250&auto=format&fit=crop&q=80',
  'গৃহ সজ্জা ও ডেকর': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=250&auto=format&fit=crop&q=80',
  'waterproof-dining': 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=250&auto=format&fit=crop&q=80',
  'ওয়াটারপ্রুফ ডাইনিং': 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=250&auto=format&fit=crop&q=80',
  'regular-dining': 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=250&auto=format&fit=crop&q=80',
  'রেগুলার ডাইনিং': 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=250&auto=format&fit=crop&q=80',
  'ac-katha': 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=250&auto=format&fit=crop&q=80',
  'এসি কাথা': 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=250&auto=format&fit=crop&q=80',
  'comforter': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=250&auto=format&fit=crop&q=80',
  'কম্ফর্টার': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=250&auto=format&fit=crop&q=80',
  'home': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=250&auto=format&fit=crop&q=80',
  'হোম ও কিচেন অ্যাপ্লায়েন্স': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=250&auto=format&fit=crop&q=80',

  // ব্যাগ কালেকশন (Bag Collection)
  'girls-bag': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=250&auto=format&fit=crop&q=80',
  'মেয়েদের ব্যাগ': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=250&auto=format&fit=crop&q=80',
  'purse-bag': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=250&auto=format&fit=crop&q=80',
  'পার্স ও ওয়ালেট ব্যাগ': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=250&auto=format&fit=crop&q=80',

  // জুয়েলারি এন্ড এক্সেসরিজ (Jewelry & Accessories)
  'accessories': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=250&auto=format&fit=crop&q=80',
  'এক্সেসরিজ কালেকশন': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=250&auto=format&fit=crop&q=80',

  // ইলেকট্রনিক্স এবং গ্যাজেট (Electronics & Gadgets)
  'smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=250&auto=format&fit=crop&q=80',
  'স্মার্টফোন': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=250&auto=format&fit=crop&q=80',
  'electronics': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=250&auto=format&fit=crop&q=80',
  'স্মার্ট গ্যাজেট ও অ্যাক্সেসরিজ': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=250&auto=format&fit=crop&q=80',

  // শীতের কালেকশন (Winter Collection)
  'hoodie-sweatshirt': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=250&auto=format&fit=crop&q=80',
  'হুডি / সোয়েটশার্ট': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=250&auto=format&fit=crop&q=80',
  'jacket-blazer': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=250&auto=format&fit=crop&q=80',
  'জ্যাকেট / ব্লেজার': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=250&auto=format&fit=crop&q=80',
  'gents-jacket': 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=250&auto=format&fit=crop&q=80',
  'জেন্টস জ্যাকেট': 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=250&auto=format&fit=crop&q=80',
  'gents-hoodie': 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=250&auto=format&fit=crop&q=80',
  'জেন্টস হুডি': 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=250&auto=format&fit=crop&q=80',
  'ladies-hoodie': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&auto=format&fit=crop&q=80',
  'লেডিস হুডি': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&auto=format&fit=crop&q=80',
  'ladies-overcoat': 'https://images.unsplash.com/photo-1539533018447-63fcce667823?w=250&auto=format&fit=crop&q=80',
  'লেডিস ওভারকোট': 'https://images.unsplash.com/photo-1539533018447-63fcce667823?w=250&auto=format&fit=crop&q=80',
  'hoodie-set': 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=250&auto=format&fit=crop&q=80',
  'হুডি সেট': 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=250&auto=format&fit=crop&q=80',

  // সিজোনাল প্রোডাক্ট (Seasonal Products)
  'world-cup': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=250&auto=format&fit=crop&q=80',
  'ওয়ার্ল্ড কাপ কালেকশন': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=250&auto=format&fit=crop&q=80',

  // অন্যান্য ক্যাটেগরি (Other Categories)
  'grocery': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=250&auto=format&fit=crop&q=80',
  'মুদি ও খাঁটি পণ্য': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=250&auto=format&fit=crop&q=80',
  'beauty': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=250&auto=format&fit=crop&q=80',
  'বিউটি ও রূপচর্চা': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=250&auto=format&fit=crop&q=80',
  'books': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=250&auto=format&fit=crop&q=80',
  'বই ও স্টেশনারি': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=250&auto=format&fit=crop&q=80',
  'sports': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=250&auto=format&fit=crop&q=80',
  'স্পোর্টস ও ফিটনেস': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=250&auto=format&fit=crop&q=80',
};

/**
 * Returns the exact product image for a given subcategory dynamically:
 * 1. Checks current products list: uses the first/latest uploaded product's image for that subcategory.
 * 2. When a product is added or updated, its image instantly appears for that subcategory.
 * 3. When a product is deleted, the next available product's image automatically takes its place.
 * 4. If all products in that subcategory are deleted, falls back to the curated default image.
 */
export function getSubcategoryImage(
  subcatId: string,
  subcatName?: string,
  fallbackParentImage?: string,
  products?: Product[],
  parentCatId?: string
): string {
  // 1. Dynamic product image check from current live catalog
  if (products && Array.isArray(products) && products.length > 0) {
    const cleanSubId = (subcatId || '').trim().toLowerCase();
    const cleanSubName = (subcatName || '').trim().toLowerCase();
    const cleanParentId = (parentCatId || '').trim().toLowerCase();

    const matchedProduct = products.find((p) => {
      if (!p.images || p.images.length === 0 || !p.images[0]) return false;

      const pSub = (p.subcategory || '').trim().toLowerCase();
      const pCat = (p.category || '').trim().toLowerCase();

      // Check parent category compatibility if provided
      if (cleanParentId && pCat && cleanParentId !== 'all') {
        const catMatch =
          pCat === cleanParentId ||
          pCat.includes(cleanParentId) ||
          cleanParentId.includes(pCat);
        if (!catMatch) return false;
      }

      // Check subcategory match by ID or Bengali Name
      if (cleanSubId && (pSub === cleanSubId || pSub.includes(cleanSubId))) return true;
      if (cleanSubName && (pSub === cleanSubName || pSub.includes(cleanSubName))) return true;

      // Check product title keywords
      if (cleanSubName && p.titleBn && p.titleBn.toLowerCase().includes(cleanSubName)) return true;
      if (cleanSubName && p.titleEn && p.titleEn.toLowerCase().includes(cleanSubName)) return true;

      // Check tags
      if (Array.isArray(p.tags)) {
        if (cleanSubId && p.tags.some((t) => t.toLowerCase() === cleanSubId)) return true;
        if (cleanSubName && p.tags.some((t) => t.toLowerCase() === cleanSubName)) return true;
      }

      return false;
    });

    if (matchedProduct && matchedProduct.images && matchedProduct.images[0]) {
      return matchedProduct.images[0];
    }
  }

  // 2. Curated mapping lookup by ID or Bengali name
  if (subcatId && SUBCATEGORY_IMAGE_MAP[subcatId.toLowerCase()]) {
    return SUBCATEGORY_IMAGE_MAP[subcatId.toLowerCase()];
  }
  if (subcatName && SUBCATEGORY_IMAGE_MAP[subcatName.trim()]) {
    return SUBCATEGORY_IMAGE_MAP[subcatName.trim()];
  }
  if (subcatName && SUBCATEGORY_IMAGE_MAP[subcatName.toLowerCase()]) {
    return SUBCATEGORY_IMAGE_MAP[subcatName.toLowerCase()];
  }

  // 3. Fallback to provided image or safe default
  return fallbackParentImage || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=250&auto=format&fit=crop&q=80';
}
