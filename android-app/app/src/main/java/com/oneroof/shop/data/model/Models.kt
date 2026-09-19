package com.oneroof.shop.data.model

data class Review(
    val id: String,
    val userName: String,
    val userAvatar: String? = null,
    val rating: Double,
    val date: String,
    val comment: String,
    val verifiedPurchase: Boolean = true
)

data class Product(
    val id: String,
    val titleBn: String,
    val titleEn: String,
    val descriptionBn: String,
    val descriptionEn: String,
    val category: String,
    val subcategory: String? = null,
    val brand: String,
    val price: Double,
    val originalPrice: Double? = null,
    val discountPercentage: Int? = null,
    val rating: Double,
    val reviewCount: Int,
    val images: List<String>,
    val stock: Int,
    val isFlashSale: Boolean = false,
    val flashSaleEnds: String? = null,
    val soldCount: Int = 0,
    val isFeatured: Boolean = false,
    val isBestSeller: Boolean = false,
    val isNewArrival: Boolean = false,
    val tags: List<String> = emptyList(),
    val sizes: List<String>? = null,
    val colors: List<String>? = null,
    val specifications: Map<String, String> = emptyMap(),
    val reviews: List<Review> = emptyList(),
    val warranty: String? = null,
    val deliveryTime: String? = null,
    val shippingFee: Double? = null,
    val shippingInside: Double? = null,
    val shippingOutside: Double? = null,
    val isFreeShipping: Boolean = false
)

data class SubCategory(
    val id: String,
    val nameBn: String,
    val nameEn: String
)

data class Category(
    val id: String,
    val nameBn: String,
    val nameEn: String,
    val slug: String,
    val iconName: String,
    val image: String,
    val itemCount: Int = 0,
    val featured: Boolean = false,
    val subcategories: List<SubCategory>? = null
)

data class CartItem(
    val product: Product,
    var quantity: Int,
    val selectedVariant: Map<String, String>? = null,
    val selectedSize: String? = null,
    val selectedColor: String? = null,
    val selectedImage: String? = null
)

data class OrderItem(
    val productId: String,
    val title: String,
    val price: Double,
    val quantity: Int,
    val image: String,
    val selectedSize: String? = null,
    val selectedColor: String? = null
)

data class ShippingAddress(
    val fullName: String,
    val phone: String,
    val division: String,
    val district: String,
    val address: String,
    val deliverySpeed: String = "regular", // "regular" | "express"
    val notes: String? = null,
    val senderNumber: String? = null,
    val trxId: String? = null,
    val email: String? = null
)

data class Order(
    val id: String,
    val trackingNumber: String,
    val date: String,
    val status: String, // "placed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"
    val items: List<OrderItem>,
    val subtotal: Double,
    val shippingFee: Double,
    val discount: Double,
    val total: Double,
    val paymentMethod: String, // "bkash", "nagad", "rocket", "card", "cod"
    val paymentStatus: String, // "paid", "pending"
    val shippingAddress: ShippingAddress,
    val userId: String? = null,
    val customerEmail: String? = null,
    val customerPhone: String? = null
)

data class AddressItem(
    val id: String,
    val title: String,
    val address: String,
    val district: String,
    val isDefault: Boolean = false
)

data class User(
    val id: String,
    val name: String,
    val email: String,
    val phone: String,
    val password: String? = null,
    val role: String = "user", // "admin" | "user"
    val division: String = "",
    val district: String = "",
    val thana: String = "",
    val village: String = "",
    val avatar: String = "",
    val addresses: List<AddressItem> = emptyList()
)

data class Coupon(
    val code: String,
    val discountPercent: Double? = null,
    val fixedDiscount: Double? = null,
    val minSpend: Double = 0.0,
    val description: String
)

data class AdminBannerSlide(
    val id: String,
    val badgeBn: String,
    val badgeEn: String,
    val titleBn: String,
    val titleEn: String,
    val subtitleBn: String,
    val subtitleEn: String,
    val coupon: String? = null,
    val discountTextBn: String,
    val discountTextEn: String,
    val btnTextBn: String,
    val btnTextEn: String,
    val categoryTarget: String,
    val image: String,
    val accentColor: String
)

data class SiteSettings(
    val primaryColor: String = "#003882",
    val accentColor: String = "#FF6B00",
    val themePreset: String = "classic",
    val showAnnouncementBar: Boolean = false,
    val announcementTextBn: String = "",
    val announcementTextEn: String = "",
    val hotlineNumber: String = "01929637253",
    val freeShippingThreshold: Double = 2000.0,
    val shippingFeeInsideDhaka: Double = 60.0,
    val shippingFeeOutsideDhaka: Double = 120.0,
    val shippingFeeExpress: Double = 150.0,
    val enableFreeShipping: Boolean = true,
    val deliveryNoteBn: String = "ঢাকার ভেতরে 60 টাকা, ঢাকার বাইরে 120 টাকা (৳2000 এর বেশি অর্ডারে ফ্রি ডেলিভারি)",
    val taglineBn: String = "সবকিছু এক ছাদের নিচে",
    val taglineEn: String = "Everything Under One Roof",
    val adminPin: String = "123456",
    val layoutStyle: String = "modern",
    val whatsappLink: String = "https://wa.me/1234567890",
    val facebookLink: String = "https://facebook.com",
    val messengerLink: String = "https://m.me/yourpage",
    val appNameBn: String = "OneRoof মোবাইল অ্যাপ",
    val appSubtitleBn: String = "সহজ ও দ্রুত কেনাকাটার জন্য ডাউনলোড করুন"
)

data class FilterState(
    val category: String = "all",
    val subcategory: String = "all",
    val minPrice: Double = 0.0,
    val maxPrice: Double = 60000.0,
    val brand: List<String> = emptyList(),
    val minRating: Double = 0.0,
    val inStockOnly: Boolean = false,
    val isFlashSaleOnly: Boolean = false,
    val searchQuery: String = "",
    val sortBy: String = "featured" // "featured", "price-low", "price-high", "rating", "newest"
)
