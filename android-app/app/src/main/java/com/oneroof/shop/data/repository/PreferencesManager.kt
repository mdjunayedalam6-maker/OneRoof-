package com.oneroof.shop.data.repository

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.oneroof.shop.data.mock.MockData
import com.oneroof.shop.data.model.*

class PreferencesManager(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences("oneroof_prefs", Context.MODE_PRIVATE)
    private val gson = Gson()

    // Language
    fun getLanguage(): String {
        return prefs.getString("oneroof_lang", "bn") ?: "bn"
    }

    fun saveLanguage(lang: String) {
        prefs.edit().putString("oneroof_lang", lang).apply()
    }

    // Site Settings
    fun getSiteSettings(): SiteSettings {
        val json = prefs.getString("oneroof_site_settings", null) ?: return MockData.defaultSiteSettings
        return try {
            gson.fromJson(json, SiteSettings::class.java) ?: MockData.defaultSiteSettings
        } catch (e: Exception) {
            MockData.defaultSiteSettings
        }
    }

    fun saveSiteSettings(settings: SiteSettings) {
        prefs.edit().putString("oneroof_site_settings", gson.toJson(settings)).apply()
    }

    // Banner Slides
    fun getBannerSlides(): List<AdminBannerSlide> {
        val json = prefs.getString("oneroof_banner_slides", null) ?: return MockData.defaultBannerSlides
        return try {
            val type = object : TypeToken<List<AdminBannerSlide>>() {}.type
            val result: List<AdminBannerSlide>? = gson.fromJson(json, type)
            if (!result.isNullOrEmpty()) result else MockData.defaultBannerSlides
        } catch (e: Exception) {
            MockData.defaultBannerSlides
        }
    }

    fun saveBannerSlides(slides: List<AdminBannerSlide>) {
        prefs.edit().putString("oneroof_banner_slides", gson.toJson(slides)).apply()
    }

    // Products
    fun getProducts(): List<Product> {
        val json = prefs.getString("oneroof_products", null) ?: return MockData.products
        return try {
            val type = object : TypeToken<List<Product>>() {}.type
            val result: List<Product>? = gson.fromJson(json, type)
            if (!result.isNullOrEmpty()) result else MockData.products
        } catch (e: Exception) {
            MockData.products
        }
    }

    fun saveProducts(products: List<Product>) {
        prefs.edit().putString("oneroof_products", gson.toJson(products)).apply()
    }

    // Categories
    fun getCategories(): List<Category> {
        val json = prefs.getString("oneroof_categories", null) ?: return MockData.categories
        return try {
            val type = object : TypeToken<List<Category>>() {}.type
            val result: List<Category>? = gson.fromJson(json, type)
            if (!result.isNullOrEmpty()) result else MockData.categories
        } catch (e: Exception) {
            MockData.categories
        }
    }

    fun saveCategories(categories: List<Category>) {
        prefs.edit().putString("oneroof_categories", gson.toJson(categories)).apply()
    }

    // Cart
    fun getCart(): List<CartItem> {
        val json = prefs.getString("oneroof_cart", null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<CartItem>>() {}.type
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun saveCart(cart: List<CartItem>) {
        prefs.edit().putString("oneroof_cart", gson.toJson(cart)).apply()
    }

    // Wishlist
    fun getWishlist(): List<String> {
        val json = prefs.getString("oneroof_wishlist", null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<String>>() {}.type
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun saveWishlist(wishlist: List<String>) {
        prefs.edit().putString("oneroof_wishlist", gson.toJson(wishlist)).apply()
    }

    // Orders
    fun getOrders(): List<Order> {
        val json = prefs.getString("oneroof_orders", null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<Order>>() {}.type
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun saveOrders(orders: List<Order>) {
        prefs.edit().putString("oneroof_orders", gson.toJson(orders)).apply()
    }

    // Users
    fun getUsers(): List<User> {
        val json = prefs.getString("oneroof_users", null) ?: return listOf(MockData.initialUser)
        return try {
            val type = object : TypeToken<List<User>>() {}.type
            val result: List<User>? = gson.fromJson(json, type)
            if (!result.isNullOrEmpty()) result else listOf(MockData.initialUser)
        } catch (e: Exception) {
            listOf(MockData.initialUser)
        }
    }

    fun saveUsers(users: List<User>) {
        prefs.edit().putString("oneroof_users", gson.toJson(users)).apply()
    }

    // Current User
    fun getCurrentUser(): User? {
        val json = prefs.getString("oneroof_current_user", null) ?: return null
        return try {
            gson.fromJson(json, User::class.java)
        } catch (e: Exception) {
            null
        }
    }

    fun saveCurrentUser(user: User?) {
        if (user == null) {
            prefs.edit().remove("oneroof_current_user").apply()
        } else {
            prefs.edit().putString("oneroof_current_user", gson.toJson(user)).apply()
        }
    }

    // Admin Session
    fun isAdminAuthenticated(): Boolean {
        return prefs.getBoolean("oneroof_admin_auth", false)
    }

    fun setAdminAuthenticated(auth: Boolean) {
        prefs.edit().putBoolean("oneroof_admin_auth", auth).apply()
    }
}
