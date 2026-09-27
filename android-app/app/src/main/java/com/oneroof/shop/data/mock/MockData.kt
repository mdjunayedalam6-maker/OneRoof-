package com.oneroof.shop.data.mock

import com.oneroof.shop.data.model.*

object MockData {

    val defaultSiteSettings = SiteSettings(
        primaryColor = "#003882",
        accentColor = "#FF6B00",
        themePreset = "classic",
        showAnnouncementBar = false,
        announcementTextBn = "",
        announcementTextEn = "",
        hotlineNumber = "01929637253",
        freeShippingThreshold = 2000.0,
        shippingFeeInsideDhaka = 60.0,
        shippingFeeOutsideDhaka = 120.0,
        shippingFeeExpress = 150.0,
        enableFreeShipping = true,
        deliveryNoteBn = "ঢাকার ভেতরে 60 টাকা, ঢাকার বাইরে 120 টাকা (৳2000 এর বেশি অর্ডারে ফ্রি ডেলিভারি)",
        taglineBn = "সবকিছু এক ছাদের নিচে",
        taglineEn = "Everything Under One Roof",
        adminPin = "123456",
        layoutStyle = "modern",
        whatsappLink = "https://wa.me/1234567890",
        facebookLink = "https://facebook.com",
        messengerLink = "https://m.me/yourpage",
        appNameBn = "OneRoof Mart মোবাইল অ্যাপ",
        appSubtitleBn = "সহজ ও দ্রুত কেনাকাটায় সরাসরি ডাউনলোড ও ইনস্টল করুন"
    )

    val defaultBannerSlides = listOf(
        AdminBannerSlide(
            id = "slide-eid",
            badgeBn = "মেগা ফেস্টিভ অফার",
            badgeEn = "Mega Festive Offer",
            titleBn = "ঈদ ও বৈশাখী মহোৎসব স্পেশাল ধামাকা",
            titleEn = "Eid & Festive Grand Celebration",
            subtitleBn = "উৎসবের সেরা পোশাক, লাক্সারি পারফিউম, গিফট আইটেম ও হোম ডেকোরে অভাবনীয় ছাড়!",
            subtitleEn = "Exclusive designer wear, premium perfumes, festive gifts and home styling at unbeatable prices!",
            coupon = "EID500",
            discountTextBn = "70% পর্যন্ত মূল্যছাড়",
            discountTextEn = "Up to 70% Off",
            btnTextBn = "উৎসবের অফার উপভোগ করুন",
            btnTextEn = "Explore Festive Deals",
            categoryTarget = "fashion",
            image = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&h=500&auto=format&fit=crop&q=85",
            accentColor = "from-amber-500 to-amber-600"
        ),
        AdminBannerSlide(
            id = "slide-tech",
            badgeBn = "100% অফিসিয়াল ওয়ারেন্টি",
            badgeEn = "100% Official Warranty",
            titleBn = "ফ্ল্যাগশিপ গ্যাজেট ও স্মার্ট টেক কার্নিভাল",
            titleEn = "Flagship Tech & Gadgets Carnival",
            subtitleBn = "স্যামসাং, শাওমি, সনি ও অ্যাপলের স্মার্টফোন, ওয়্যারলেস হেডফোন এবং স্মার্টওয়াচে বিশেষ ক্যাশব্যাক।",
            subtitleEn = "Official smartphones, noise-cancelling headphones, laptops & smartwatches with easy EMI.",
            coupon = "ONEROOF10",
            discountTextBn = "ফ্ল্যাট 15% ক্যাশব্যাক",
            discountTextEn = "Flat 15% Cashback",
            btnTextBn = "টেক অফার দেখুন",
            btnTextEn = "Discover Gadgets",
            categoryTarget = "electronics",
            image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&h=500&auto=format&fit=crop&q=85",
            accentColor = "from-emerald-500 to-teal-600"
        ),
        AdminBannerSlide(
            id = "slide-grocery",
            badgeBn = "1 ঘণ্টায় এক্সপ্রেস হোম ডেলিভারি",
            badgeEn = "1-Hour Express Delivery",
            titleBn = "খাঁটি দেশীয় পণ্য ও তাজা গ্রোসারি বাজার",
            titleEn = "Fresh Organic Staples & Groceries",
            subtitleBn = "সুন্দরবনের প্রাকৃতিক মধু, ঘানিভাঙা সরিষার তেল, প্রিমিয়াম পোলাও চাল ও ফ্রেশ নিত্যপ্রয়োজনীয় বাজার।",
            subtitleEn = "Pure natural honey, authentic cold-pressed mustard oil, aromatic rice & daily groceries delivered fast.",
            coupon = "FRESH100",
            discountTextBn = "৳200 এর বেশি ক্যাশ ডিসকাউন্ট",
            discountTextEn = "Up to ৳200 Off",
            btnTextBn = "মুদি বাজার অর্ডার করুন",
            btnTextEn = "Shop Grocery Mart",
            categoryTarget = "grocery",
            image = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=500&auto=format&fit=crop&q=85",
            accentColor = "from-green-500 to-emerald-600"
        )
    )

    val categories = listOf(
        Category(
            id = "cat-electronics",
            nameBn = "ইলেকট্রনিক্স ও গ্যাজেট",
            nameEn = "Electronics & Gadgets",
            slug = "electronics",
            iconName = "Smartphone",
            image = "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=80",
            featured = true,
            subcategories = listOf(
                SubCategory("sub-elec-1", "স্মার্টফোন", "Smartphones"),
                SubCategory("sub-elec-2", "স্মার্টওয়াচ", "Smartwatches"),
                SubCategory("sub-elec-3", "হেডফোন ও অডিও", "Headphones & Audio"),
                SubCategory("sub-elec-4", "ল্যাপটপ ও অ্যাকসেসরিজ", "Laptops & Accessories")
            )
        ),
        Category(
            id = "cat-fashion",
            nameBn = "ফ্যাশন ও লাইফস্টাইল",
            nameEn = "Fashion & Lifestyle",
            slug = "fashion",
            iconName = "Shirt",
            image = "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80",
            featured = true,
            subcategories = listOf(
                SubCategory("sub-fash-1", "পুরুষদের পোশাক", "Men's Wear"),
                SubCategory("sub-fash-2", "নারীদের পোশাক", "Women's Wear"),
                SubCategory("sub-fash-3", "ঘড়ি ও জুয়েলারি", "Watches & Jewelry"),
                SubCategory("sub-fash-4", "ব্যাগ ও জুতা", "Bags & Shoes")
            )
        ),
        Category(
            id = "cat-grocery",
            nameBn = "গ্রোসারি ও তাজা বাজার",
            nameEn = "Grocery & Daily Needs",
            slug = "grocery",
            iconName = "ShoppingBag",
            image = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
            featured = true,
            subcategories = listOf(
                SubCategory("sub-groc-1", "চাল, ডাল ও তেল", "Rice, Pulses & Oil"),
                SubCategory("sub-groc-2", "খাঁটি মধু ও ঘি", "Pure Honey & Ghee"),
                SubCategory("sub-groc-3", "মশলা ও ড্রাই ফ্রুটস", "Spices & Dry Fruits"),
                SubCategory("sub-groc-4", "স্ন্যাক্স ও বেভারেজ", "Snacks & Beverages")
            )
        ),
        Category(
            id = "cat-home",
            nameBn = "হোম ও কিচেন অ্যাপ্লায়েন্স",
            nameEn = "Home & Kitchen Appliances",
            slug = "home",
            iconName = "Home",
            image = "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
            featured = true,
            subcategories = listOf(
                SubCategory("sub-home-1", "রান্নাঘরের সরঞ্জাম", "Kitchen Appliances"),
                SubCategory("sub-home-2", "ঘর সাজানোর আইটেম", "Home Decor"),
                SubCategory("sub-home-3", "বেড ও বাথ", "Bed & Bath")
            )
        ),
        Category(
            id = "cat-beauty",
            nameBn = "বিউটি ও পার্সোনাল কেয়ার",
            nameEn = "Beauty & Personal Care",
            slug = "beauty",
            iconName = "Sparkles",
            image = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80",
            featured = true,
            subcategories = listOf(
                SubCategory("sub-beau-1", "স্কিনকেয়ার", "Skincare"),
                SubCategory("sub-beau-2", "হেয়ারকেয়ার", "Haircare"),
                SubCategory("sub-beau-3", "পারফিউম ও বডি স্প্রে", "Perfumes & Fragrances")
            )
        )
    )

    val products = listOf(
        Product(
            id = "prod-1",
            titleBn = "স্যামসাং গ্যালাক্সি A55 5G (8GB/256GB) - অফিশিয়াল",
            titleEn = "Samsung Galaxy A55 5G (8GB/256GB) - Official",
            descriptionBn = "স্যামসাং গ্যালাক্সি A55 5G নিয়ে এলো ১২০ হার্জ সুপার অ্যামোলেড ডিসপ্লে, ৫০ মেগাপিক্সেল ট্রিপল ক্যামেরা ও ৫০০০ মিলিঅ্যাম্পিয়ার ব্যাটারি।",
            descriptionEn = "Samsung Galaxy A55 5G features a 120Hz Super AMOLED display, 50MP triple camera system, and 5000mAh long battery.",
            category = "electronics",
            subcategory = "sub-elec-1",
            brand = "Samsung",
            price = 48999.0,
            originalPrice = 54999.0,
            discountPercentage = 11,
            rating = 4.8,
            reviewCount = 124,
            images = listOf(
                "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
            ),
            stock = 15,
            isFlashSale = true,
            flashSaleEnds = "2026-12-31T23:59:59Z",
            soldCount = 89,
            isFeatured = true,
            isBestSeller = true,
            tags = listOf("5G", "Samsung", "OLED"),
            sizes = listOf("8GB/128GB", "8GB/256GB", "12GB/256GB"),
            colors = listOf("Awesome Navy", "Awesome Iceblue", "Awesome Lilac"),
            specifications = mapOf(
                "Display" to "6.6\" Super AMOLED, 120Hz",
                "Processor" to "Exynos 1480 (4 nm)",
                "Main Camera" to "50 MP + 12 MP + 5 MP",
                "Battery" to "5000 mAh, 25W Charging"
            ),
            reviews = listOf(
                Review("r-1", "আরিফুল ইসলাম", null, 5.0, "২ দিন আগে", "অসাধারণ মোবাইল! সার্ভিস খুব দ্রুত পেয়েছি।"),
                Review("r-2", "সাব্বির আহমেদ", null, 4.5, "১ সপ্তাহ আগে", "ক্যামেরা কোয়ালিটি চমৎকার। খুব ভালো অভিজ্ঞতা।")
            ),
            warranty = "1 Year Official Warranty",
            deliveryTime = "1-3 Days"
        ),
        Product(
            id = "prod-2",
            titleBn = "প্রিমিয়াম ম্যানস ট্র্যাডিশনাল কটন কাবলি সেট",
            titleEn = "Premium Men's Traditional Cotton Kabli Set",
            descriptionBn = "১০০% প্রিমিয়াম সুতি কাপড়ে তৈরি আরামদায়ক ও প্রিমিয়াম ডিজাইনার কাবলি পাঞ্জাবি সেট। উৎসবের জন্য সেরা পছন্দ।",
            descriptionEn = "100% Premium cotton, comfortable and stylish designer traditional Kabli set for men.",
            category = "fashion",
            subcategory = "sub-fash-1",
            brand = "OneRoof Fashion",
            price = 2450.0,
            originalPrice = 3200.0,
            discountPercentage = 23,
            rating = 4.9,
            reviewCount = 86,
            images = listOf(
                "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80"
            ),
            stock = 40,
            isFlashSale = true,
            soldCount = 130,
            isFeatured = true,
            sizes = listOf("M", "L", "XL", "XXL"),
            colors = listOf("Navy Blue", "Maroon", "Olive Green", "Black"),
            reviews = listOf(
                Review("r-3", "কামরুল হাসান", null, 5.0, "৩ দিন আগে", "কাপড়ের কোয়ালিটি মাশাল্লাহ খুব ভালো। সাইজ একদম পারফেক্ট।")
            ),
            deliveryTime = "2-4 Days"
        ),
        Product(
            id = "prod-3",
            titleBn = "সুন্দরবনের খাঁটি প্রিমিয়াম প্রাকৃতিক মধু (১ কেজি)",
            titleEn = "Sundarban Pure Premium Natural Honey (1 kg)",
            descriptionBn = "সুন্দরবনের গভীর জঙ্গল থেকে সংগৃহীত ১০০% খাঁটি ও প্রক্রিয়াজাতহীন প্রাকৃতিক র মধু। অ্যান্টিঅক্সিডেন্ট ও পুষ্টিতে ভরপুর।",
            descriptionEn = "100% Unprocessed organic natural honey directly harvested from Sundarbans mangrove forest.",
            category = "grocery",
            subcategory = "sub-groc-2",
            brand = "Pure Natural",
            price = 1150.0,
            originalPrice = 1400.0,
            discountPercentage = 18,
            rating = 5.0,
            reviewCount = 210,
            images = listOf(
                "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&auto=format&fit=crop&q=80"
            ),
            stock = 60,
            isBestSeller = true,
            isFeatured = true,
            reviews = listOf(
                Review("r-4", "নাসরিন আক্তার", null, 5.0, "গতকাল", "খুবই খাঁটি মধু! স্বাদ ও ঘ্রাণ দারুণ।")
            ),
            isFreeShipping = true,
            deliveryTime = "1-2 Days"
        ),
        Product(
            id = "prod-4",
            titleBn = "স্মার্ট ডিজিটাল ওয়াটারপ্রুফ ব্লুটুথ স্মার্টওয়াচ",
            titleEn = "Smart Waterproof Bluetooth Calling Smartwatch",
            descriptionBn = "হার্ট রেট মনিটর, ব্লুটুথ কলিং, ১০০+ স্পোর্টস মোড ও ৭ দিনের ব্যাটারি লাইফ সম্বলিত আধুনিক ওয়াটারপ্রুফ স্মার্টওয়াচ।",
            descriptionEn = "Waterproof smartwatch featuring HD display, Bluetooth calling, health tracking, and 7-day battery life.",
            category = "electronics",
            subcategory = "sub-elec-2",
            brand = "Haylou",
            price = 2850.0,
            originalPrice = 3800.0,
            discountPercentage = 25,
            rating = 4.7,
            reviewCount = 92,
            images = listOf(
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            ),
            stock = 22,
            isFlashSale = true,
            colors = listOf("Black", "Silver", "Rose Gold"),
            deliveryTime = "1-3 Days"
        ),
        Product(
            id = "prod-5",
            titleBn = "মাল্টিফাংশনাল ডিজিটাল এয়ার ফ্রায়ার (৫.৫ লিটার)",
            titleEn = "Multifunctional Digital Air Fryer (5.5L)",
            descriptionBn = "৮০% কম তেলে স্বাস্থ্যকর উপায়ে পছন্দের খাবার ভাজার জন্য সেরা মডার্ন ডিজিটাল এয়ার ফ্রায়ার।",
            descriptionEn = "Healthier oil-free cooking with 360 degree rapid hot air circulation and digital touch screen.",
            category = "home",
            subcategory = "sub-home-1",
            brand = "Miyako",
            price = 6800.0,
            originalPrice = 8500.0,
            discountPercentage = 20,
            rating = 4.9,
            reviewCount = 48,
            images = listOf(
                "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80"
            ),
            stock = 10,
            isFeatured = true,
            warranty = "1 Year Warranty",
            deliveryTime = "2-4 Days"
        )
    )

    val initialUser = User(
        id = "user-admin-1",
        name = "Md Junayed Alam",
        email = "mdjunayedalam6@gmail.com",
        phone = "01929637253",
        role = "admin",
        division = "ঢাকা (Dhaka)",
        district = "ঢাকা (Dhaka)",
        thana = "ধানমন্ডি (Dhanmondi)",
        village = "রোড #২৭, ধানমন্ডি",
        avatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
        addresses = listOf(
            AddressItem(
                id = "addr-1",
                title = "বাসার ঠিকানা (Home)",
                address = "হাউজ #১২, রোড #২৭, ধানমন্ডি, ঢাকা",
                district = "Dhaka",
                isDefault = true
            )
        )
    )
}
