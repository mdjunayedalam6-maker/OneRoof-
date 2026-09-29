import { Category, Product } from '../types';

// Map of legacy / shopbase category IDs, Bengali names, and subcategory slugs to the 11 main categories
const CATEGORY_MAP: Record<string, { parentId: string; subId?: string }> = {
  // 1. Womens Clothing (মেয়েদের পোশাক)
  'womens-clothing': { parentId: 'womens-clothing' },
  'girls-clothing': { parentId: 'womens-clothing', subId: 'girls-clothing' },
  'saree': { parentId: 'womens-clothing', subId: 'saree' },
  'শাড়ি': { parentId: 'womens-clothing', subId: 'saree' },
  'tanter-saree': { parentId: 'womens-clothing', subId: 'tanter-saree' },
  'তাঁতের শাড়ী': { parentId: 'womens-clothing', subId: 'tanter-saree' },
  'handprint-saree': { parentId: 'womens-clothing', subId: 'handprint-saree' },
  'হ্যান্ডপ্রিন্ট শাড়ি': { parentId: 'womens-clothing', subId: 'handprint-saree' },
  'three-piece': { parentId: 'womens-clothing', subId: 'three-piece' },
  'থ্রি পিস': { parentId: 'womens-clothing', subId: 'three-piece' },
  'রেডিমেড থ্রিপিস': { parentId: 'womens-clothing', subId: 'three-piece' },
  'girls-tops': { parentId: 'womens-clothing', subId: 'girls-tops' },
  'গার্লস টপস': { parentId: 'womens-clothing', subId: 'girls-tops' },
  'borka-abaya': { parentId: 'womens-clothing', subId: 'borka-abaya' },
  'বোরকা ও আবায়া': { parentId: 'womens-clothing', subId: 'borka-abaya' },
  'sunnati-dress': { parentId: 'womens-clothing', subId: 'sunnati-dress' },
  'সুন্নাতি ড্রেস': { parentId: 'womens-clothing', subId: 'sunnati-dress' },
  'inner-nighty': { parentId: 'womens-clothing', subId: 'inner-nighty' },
  'ইনার & নাইটি': { parentId: 'womens-clothing', subId: 'inner-nighty' },
  'ইনার ও নাইটি': { parentId: 'womens-clothing', subId: 'inner-nighty' },

  // 2. Mens Clothing (ছেলেদের পোশাক)
  'mens-clothing': { parentId: 'mens-clothing' },
  'polo-shirts': { parentId: 'mens-clothing', subId: 'polo-shirts' },
  'পলো শার্ট': { parentId: 'mens-clothing', subId: 'polo-shirts' },
  'basic-tshirt': { parentId: 'mens-clothing', subId: 'basic-tshirt' },
  'বেসিক টিশার্ট': { parentId: 'mens-clothing', subId: 'basic-tshirt' },
  'বেসিক টি-শার্ট': { parentId: 'mens-clothing', subId: 'basic-tshirt' },
  'dropshoulder-tshirt': { parentId: 'mens-clothing', subId: 'dropshoulder-tshirt' },
  'ড্রপসোল্ডার টিশার্ট': { parentId: 'mens-clothing', subId: 'dropshoulder-tshirt' },
  'embroidery-panjabi': { parentId: 'mens-clothing', subId: 'embroidery-panjabi' },
  'পাঞ্জাবি': { parentId: 'mens-clothing', subId: 'embroidery-panjabi' },
  'punjabi': { parentId: 'mens-clothing', subId: 'embroidery-panjabi' },
  'printed-shirt': { parentId: 'mens-clothing', subId: 'printed-shirt' },
  'প্রিন্ট শার্ট': { parentId: 'mens-clothing', subId: 'printed-shirt' },
  'shirt': { parentId: 'mens-clothing', subId: 'printed-shirt' },
  'শার্ট': { parentId: 'mens-clothing', subId: 'printed-shirt' },
  'katua': { parentId: 'mens-clothing', subId: 'katua' },
  'কাতুয়া': { parentId: 'mens-clothing', subId: 'katua' },
  'jeans-pant': { parentId: 'mens-clothing', subId: 'jeans-pant' },
  'জিন্স প্যান্ট': { parentId: 'mens-clothing', subId: 'jeans-pant' },
  'chino-pant': { parentId: 'mens-clothing', subId: 'chino-pant' },
  'চিনো প্যান্ট': { parentId: 'mens-clothing', subId: 'chino-pant' },
  'fashion': { parentId: 'mens-clothing' },

  // 3. Baby Collection (বেবি কালেকশন)
  'baby-collection': { parentId: 'baby-collection' },
  'kids-clothing': { parentId: 'baby-collection', subId: 'kids-clothing' },
  'কিডস কালেকশন': { parentId: 'baby-collection', subId: 'kids-clothing' },
  'pari-dress': { parentId: 'baby-collection', subId: 'pari-dress' },
  'পরী ড্রেস': { parentId: 'baby-collection', subId: 'pari-dress' },
  'baby-borka': { parentId: 'baby-collection', subId: 'baby-borka' },
  'বেবি বোরখা': { parentId: 'baby-collection', subId: 'baby-borka' },
  'kids-pant': { parentId: 'baby-collection', subId: 'kids-pant' },
  'কিডস প্যান্ট': { parentId: 'baby-collection', subId: 'kids-pant' },
  'girls-tshirt-set': { parentId: 'baby-collection', subId: 'girls-tshirt-set' },
  'গার্লস টিশার্ট সেট': { parentId: 'baby-collection', subId: 'girls-tshirt-set' },
  'baby': { parentId: 'baby-collection', subId: 'baby' },
  'বেবি ও কিডস কেয়ার': { parentId: 'baby-collection', subId: 'baby' },

  // 4. Couple & Combo (কাপল এন্ড কম্বো)
  'couple-combo': { parentId: 'couple-combo' },
  'couple-saree': { parentId: 'couple-combo', subId: 'couple-saree' },
  'কাপল শাড়ী': { parentId: 'couple-combo', subId: 'couple-saree' },
  'couple-threepiece': { parentId: 'couple-combo', subId: 'couple-threepiece' },
  'কাপল থ্রীপিস': { parentId: 'couple-combo', subId: 'couple-threepiece' },
  'tshirt-skirt': { parentId: 'couple-combo', subId: 'tshirt-skirt' },
  'টিশার্ট & স্কার্ট': { parentId: 'couple-combo', subId: 'tshirt-skirt' },
  'কম্বো সেট': { parentId: 'couple-combo', subId: 'couple-threepiece' },

  // 5. Home & Living (গৃহ সামগ্রী)
  'home-living': { parentId: 'home-living' },
  'bedsheet': { parentId: 'home-living', subId: 'bedsheet' },
  'regular-bedsheet': { parentId: 'home-living', subId: 'bedsheet' },
  'রেগুলার বেডশীট': { parentId: 'home-living', subId: 'bedsheet' },
  'home-decor': { parentId: 'home-living', subId: 'home-decor' },
  'গৃহ সজ্জা': { parentId: 'home-living', subId: 'home-decor' },
  'waterproof-dining': { parentId: 'home-living', subId: 'waterproof-dining' },
  'ওয়াটারপ্রুফ ডাইনিং': { parentId: 'home-living', subId: 'waterproof-dining' },
  'regular-dining': { parentId: 'home-living', subId: 'regular-dining' },
  'রেগুলার ডাইনিং': { parentId: 'home-living', subId: 'regular-dining' },
  'ac-katha': { parentId: 'home-living', subId: 'ac-katha' },
  'এসি কাথা': { parentId: 'home-living', subId: 'ac-katha' },
  'comforter': { parentId: 'home-living', subId: 'comforter' },
  'কম্ফর্টার': { parentId: 'home-living', subId: 'comforter' },
  'home': { parentId: 'home-living', subId: 'home' },

  // 6. Bag Collection (ব্যাগ কালেকশন)
  'bag-collection': { parentId: 'bag-collection' },
  'girls-bag': { parentId: 'bag-collection', subId: 'girls-bag' },
  'মেয়েদের ব্যাগ': { parentId: 'bag-collection', subId: 'girls-bag' },
  'purse-bag': { parentId: 'bag-collection', subId: 'purse-bag' },
  'পার্স ব্যাগ': { parentId: 'bag-collection', subId: 'purse-bag' },

  // 7. Jewelry & Accessories (জুয়েলারি এন্ড এক্সেসরিজ)
  'jewelry-accessories': { parentId: 'jewelry-accessories' },
  'accessories': { parentId: 'jewelry-accessories', subId: 'accessories' },
  'এক্সেসরিজ': { parentId: 'jewelry-accessories', subId: 'accessories' },

  // 8. Electronics & Gadgets (ইলেকট্রনিক্স এবং গ্যাজেট)
  'electronics-gadgets': { parentId: 'electronics-gadgets' },
  'electronics': { parentId: 'electronics-gadgets', subId: 'electronics' },
  'ইলেকট্রনিক্স ও গ্যাজেট': { parentId: 'electronics-gadgets', subId: 'electronics' },
  'smartphones': { parentId: 'electronics-gadgets', subId: 'smartphones' },
  'স্মার্টফোন': { parentId: 'electronics-gadgets', subId: 'smartphones' },

  // 9. Winter Collection (শীতের কালেকশন)
  'winter-collection': { parentId: 'winter-collection' },
  'hoodie-sweatshirt': { parentId: 'winter-collection', subId: 'hoodie-sweatshirt' },
  'হুডি / সোয়েটশার্ট': { parentId: 'winter-collection', subId: 'hoodie-sweatshirt' },
  'jacket-blazer': { parentId: 'winter-collection', subId: 'jacket-blazer' },
  'জ্যাকেট / ব্লেজার': { parentId: 'winter-collection', subId: 'jacket-blazer' },
  'gents-jacket': { parentId: 'winter-collection', subId: 'gents-jacket' },
  'জেন্টস জ্যাকেট': { parentId: 'winter-collection', subId: 'gents-jacket' },
  'gents-hoodie': { parentId: 'winter-collection', subId: 'gents-hoodie' },
  'জেন্টস হুডি': { parentId: 'winter-collection', subId: 'gents-hoodie' },
  'ladies-hoodie': { parentId: 'winter-collection', subId: 'ladies-hoodie' },
  'লেডিস হুডি': { parentId: 'winter-collection', subId: 'ladies-hoodie' },
  'ladies-overcoat': { parentId: 'winter-collection', subId: 'ladies-overcoat' },
  'লেডিস ওভারকোট': { parentId: 'winter-collection', subId: 'ladies-overcoat' },
  'hoodie-set': { parentId: 'winter-collection', subId: 'hoodie-set' },
  'হুডি সেট': { parentId: 'winter-collection', subId: 'hoodie-set' },

  // 10. Seasonal Products (সিজোনাল প্রোডাক্ট)
  'seasonal-products': { parentId: 'seasonal-products' },
  'world-cup': { parentId: 'seasonal-products', subId: 'world-cup' },
  'ওয়ার্ল্ড কাপ': { parentId: 'seasonal-products', subId: 'world-cup' },

  // 11. Other Categories (অন্যান্য ক্যাটেগরি)
  'other-categories': { parentId: 'other-categories' },
  'grocery': { parentId: 'other-categories', subId: 'grocery' },
  'মুদি ও সুপারমার্কেট': { parentId: 'other-categories', subId: 'grocery' },
  'beauty': { parentId: 'other-categories', subId: 'beauty' },
  'বিউটি ও রূপচর্চা': { parentId: 'other-categories', subId: 'beauty' },
  'books': { parentId: 'other-categories', subId: 'books' },
  'বই ও স্টেশনারি': { parentId: 'other-categories', subId: 'books' },
  'sports': { parentId: 'other-categories', subId: 'sports' },
  'স্পোর্টস ও ফিটনেস': { parentId: 'other-categories', subId: 'sports' },
};

/**
 * Checks if a product matches a selected main category and subcategory
 */
export function isProductInCategory(
  product: Product,
  selectedCategoryId: string,
  selectedSubcategoryId: string = 'all',
  categories: Category[] = []
): boolean {
  if (selectedCategoryId === 'all') {
    return true;
  }

  const pCat = (product.category || '').trim().toLowerCase();
  const pSub = (product.subcategory || '').trim().toLowerCase();

  // 1. Check direct map
  const catMapInfo = CATEGORY_MAP[pCat] || CATEGORY_MAP[pSub];
  const targetParentId = selectedCategoryId.toLowerCase();

  // Find category object in current categories
  const targetCatObj = categories.find(
    (c) => c.id.toLowerCase() === targetParentId || c.slug.toLowerCase() === targetParentId
  );

  const subcats = targetCatObj?.subcategories || [];
  const subcatKeys = new Set(
    subcats.flatMap((s) => [
      s.id.toLowerCase(),
      s.nameBn.toLowerCase(),
      s.nameEn.toLowerCase(),
    ])
  );

  // Check parent match
  let matchesParent = false;
  if (catMapInfo && catMapInfo.parentId.toLowerCase() === targetParentId) {
    matchesParent = true;
  } else if (pCat === targetParentId || pSub === targetParentId) {
    matchesParent = true;
  } else if (subcatKeys.has(pCat) || subcatKeys.has(pSub)) {
    matchesParent = true;
  }

  if (!matchesParent) {
    return false;
  }

  // 2. If subcategory filter is active
  if (selectedSubcategoryId && selectedSubcategoryId !== 'all') {
    const targetSubId = selectedSubcategoryId.toLowerCase();
    const selectedSub = subcats.find(
      (s) => s.id.toLowerCase() === targetSubId || s.nameBn.toLowerCase() === targetSubId
    );

    if (catMapInfo && catMapInfo.subId && catMapInfo.subId.toLowerCase() === targetSubId) {
      return true;
    }

    if (selectedSub) {
      const subId = selectedSub.id.toLowerCase();
      const subBn = selectedSub.nameBn.toLowerCase();
      const subEn = selectedSub.nameEn.toLowerCase();

      return (
        pSub === subId ||
        pSub === subBn ||
        pSub === subEn ||
        pCat === subId ||
        pCat === subBn ||
        pCat === subEn ||
        (Boolean(product.titleBn) && product.titleBn.toLowerCase().includes(subBn)) ||
        (Boolean(product.titleEn) && product.titleEn.toLowerCase().includes(subEn))
      );
    } else {
      return pSub === targetSubId || pCat === targetSubId;
    }
  }

  return true;
}

/**
 * Calculates accurate item counts for each category
 */
export function calculateCategoryCounts(categories: Category[], products: Product[]): Category[] {
  return categories.map((cat) => {
    const count = products.filter((p) => isProductInCategory(p, cat.id, 'all', categories)).length;
    return {
      ...cat,
      itemCount: count > 0 ? count : (cat.itemCount || 10),
    };
  });
}
