package com.oneroof.shop.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import com.oneroof.shop.data.mock.MockData
import com.oneroof.shop.data.model.*
import com.oneroof.shop.data.repository.PreferencesManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

object SecretAdminConfig {
    const val email = "mdjunayedalam6@gmail.com"
    const val secondaryEmail = "mdzunayedali6@gmail.com"
    const val phone = "01929637253"
    const val secondaryPhone = "01326654722"
    const val password = "oneroofzunaid6$"
    const val secondaryPassword = "zunayed12345#"
}

class AppViewModel(application: Application) : AndroidViewModel(application) {

    private val prefs = PreferencesManager(application)

    // UI States
    private val _language = MutableStateFlow(prefs.getLanguage())
    val language: StateFlow<String> = _language.asStateFlow()

    private val _siteSettings = MutableStateFlow(prefs.getSiteSettings())
    val siteSettings: StateFlow<SiteSettings> = _siteSettings.asStateFlow()

    private val _bannerSlides = MutableStateFlow(prefs.getBannerSlides())
    val bannerSlides: StateFlow<List<AdminBannerSlide>> = _bannerSlides.asStateFlow()

    private val _products = MutableStateFlow(prefs.getProducts())
    val products: StateFlow<List<Product>> = _products.asStateFlow()

    private val _categories = MutableStateFlow(prefs.getCategories())
    val categories: StateFlow<List<Category>> = _categories.asStateFlow()

    private val _cart = MutableStateFlow(prefs.getCart())
    val cart: StateFlow<List<CartItem>> = _cart.asStateFlow()

    private val _wishlist = MutableStateFlow(prefs.getWishlist())
    val wishlist: StateFlow<List<String>> = _wishlist.asStateFlow()

    private val _orders = MutableStateFlow(prefs.getOrders())
    val orders: StateFlow<List<Order>> = _orders.asStateFlow()

    private val _users = MutableStateFlow(prefs.getUsers())
    val users: StateFlow<List<User>> = _users.asStateFlow()

    private val _currentUser = MutableStateFlow(prefs.getCurrentUser())
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()

    private val _isAdminAuthenticated = MutableStateFlow(prefs.isAdminAuthenticated())
    val isAdminAuthenticated: StateFlow<Boolean> = _isAdminAuthenticated.asStateFlow()

    private val _filterState = MutableStateFlow(FilterState())
    val filterState: StateFlow<FilterState> = _filterState.asStateFlow()

    private val _appliedCoupon = MutableStateFlow<Coupon?>(null)
    val appliedCoupon: StateFlow<Coupon?> = _appliedCoupon.asStateFlow()

    private val _toastMessage = MutableStateFlow<String?>(null)
    val toastMessage: StateFlow<String?> = _toastMessage.asStateFlow()

    private val _lastPlacedOrder = MutableStateFlow<Order?>(null)
    val lastPlacedOrder: StateFlow<Order?> = _lastPlacedOrder.asStateFlow()

    private val _selectedProduct = MutableStateFlow<Product?>(null)
    val selectedProduct: StateFlow<Product?> = _selectedProduct.asStateFlow()

    // Helper functions
    fun showToast(msg: String) {
        _toastMessage.value = msg
    }

    fun clearToast() {
        _toastMessage.value = null
    }

    fun setLanguage(lang: String) {
        _language.value = lang
        prefs.saveLanguage(lang)
    }

    fun selectProduct(product: Product?) {
        _selectedProduct.value = product
    }

    fun isUserAdmin(user: User?): Boolean {
        if (user == null) return false
        val emailClean = user.email.trim().lowercase()
        val phoneDigits = user.phone.replace(Regex("[^0-9]"), "")
        if (emailClean == SecretAdminConfig.email || emailClean == SecretAdminConfig.secondaryEmail) return true
        if (phoneDigits.length >= 10 && (
            phoneDigits.endsWith(SecretAdminConfig.phone) || phoneDigits.endsWith(SecretAdminConfig.secondaryPhone)
        )) return true
        return user.role == "admin"
    }

    // Cart operations
    fun addToCart(
        product: Product,
        quantity: Int = 1,
        selectedSize: String? = null,
        selectedColor: String? = null,
        selectedImage: String? = null
    ) {
        val currentList = _cart.value.toMutableList()
        val index = currentList.indexOfFirst {
            it.product.id == product.id &&
            it.selectedSize == selectedSize &&
            it.selectedColor == selectedColor
        }

        if (index >= 0) {
            val item = currentList[index]
            item.quantity += quantity
        } else {
            currentList.add(
                CartItem(
                    product = product,
                    quantity = quantity,
                    selectedSize = selectedSize,
                    selectedColor = selectedColor,
                    selectedImage = selectedImage ?: product.images.firstOrNull() ?: ""
                )
            )
        }

        _cart.value = currentList
        prefs.saveCart(currentList)
        val title = if (_language.value == "bn") product.titleBn else product.titleEn
        showToast(
            if (_language.value == "bn") "\"$title\" কার্টে যোগ করা হয়েছে" else "\"$title\" added to cart"
        )
    }

    fun updateCartQuantity(productId: String, quantity: Int) {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        val currentList = _cart.value.map {
            if (it.product.id == productId) it.copy(quantity = quantity) else it
        }
        _cart.value = currentList
        prefs.saveCart(currentList)
    }

    fun removeFromCart(productId: String) {
        val currentList = _cart.value.filter { it.product.id != productId }
        _cart.value = currentList
        prefs.saveCart(currentList)
        showToast(if (_language.value == "bn") "কার্ট থেকে সরানো হয়েছে" else "Removed from cart")
    }

    fun clearCart() {
        _cart.value = emptyList()
        prefs.saveCart(emptyList())
    }

    // Wishlist operations
    fun toggleWishlist(productId: String) {
        val currentList = _wishlist.value.toMutableList()
        if (currentList.contains(productId)) {
            currentList.remove(productId)
            showToast(if (_language.value == "bn") "উইশলিস্ট থেকে সরানো হয়েছে" else "Removed from wishlist")
        } else {
            currentList.add(productId)
            showToast(if (_language.value == "bn") "উইশলিস্টে সংরক্ষণ করা হয়েছে" else "Added to wishlist")
        }
        _wishlist.value = currentList
        prefs.saveWishlist(currentList)
    }

    fun isInWishlist(productId: String): Boolean {
        return _wishlist.value.contains(productId)
    }

    // Coupon operations
    fun applyCoupon(code: String): Boolean {
        val trimmed = code.trim().uppercase()
        if (trimmed == "ONEROOF10") {
            _appliedCoupon.value = Coupon(
                code = "ONEROOF10",
                discountPercent = 10.0,
                minSpend = 1000.0,
                description = if (_language.value == "bn") "10% ফ্ল্যাট ডিসকাউন্ট" else "10% Flat Discount"
            )
            showToast(if (_language.value == "bn") "10% ডিসকাউন্ট কুপন যুক্ত হয়েছে!" else "10% Discount applied!")
            return true
        } else if (trimmed == "EID500") {
            _appliedCoupon.value = Coupon(
                code = "EID500",
                fixedDiscount = 500.0,
                minSpend = 3000.0,
                description = if (_language.value == "bn") "৳500 ঈদ স্পেশাল ক্যাশব্যাক" else "৳500 Eid Special Cashback"
            )
            showToast(if (_language.value == "bn") "৳500 ছাড় সফলভাবে যুক্ত হয়েছে!" else "৳500 Discount applied!")
            return true
        } else {
            showToast(if (_language.value == "bn") "ভুল কুপন কোড! ONEROOF10 চেষ্টা করুন" else "Invalid promo code! Try ONEROOF10")
            return false
        }
    }

    fun removeCoupon() {
        _appliedCoupon.value = null
        showToast(if (_language.value == "bn") "কুপন বাতিল করা হয়েছে" else "Coupon removed")
    }

    // Calculations
    fun getCartSubtotal(): Double {
        return _cart.value.sumOf { it.product.price * it.quantity }
    }

    fun calculateShippingFee(location: String = "dhaka", speed: String = "regular"): Double {
        val subtotal = getCartSubtotal()
        if (_cart.value.isEmpty() || subtotal == 0.0) return 0.0

        if (speed == "express") {
            return _siteSettings.value.shippingFeeExpress
        }

        if (_siteSettings.value.enableFreeShipping &&
            _siteSettings.value.freeShippingThreshold > 0 &&
            subtotal >= _siteSettings.value.freeShippingThreshold
        ) {
            return 0.0
        }

        return if (location == "dhaka") {
            _siteSettings.value.shippingFeeInsideDhaka
        } else {
            _siteSettings.value.shippingFeeOutsideDhaka
        }
    }

    fun getCartDiscount(): Double {
        val coupon = _appliedCoupon.value ?: return 0.0
        val subtotal = getCartSubtotal()
        return if (coupon.discountPercent != null) {
            (subtotal * coupon.discountPercent) / 100.0
        } else if (coupon.fixedDiscount != null) {
            coupon.fixedDiscount
        } else 0.0
    }

    // Order operations
    fun placeOrder(shippingAddress: ShippingAddress, paymentMethod: String): Order {
        val subtotal = getCartSubtotal()
        val isDhaka = shippingAddress.district.contains("Dhaka", ignoreCase = true) || shippingAddress.division.contains("Dhaka", ignoreCase = true)
        val shippingFee = calculateShippingFee(if (isDhaka) "dhaka" else "outside", shippingAddress.deliverySpeed)
        val discount = getCartDiscount()
        val total = Math.max(0.0, subtotal - discount + shippingFee)

        val randomId = (10000..99999).random()
        val randomTrk = (100000..999999).random()

        val dateStr = SimpleDateFormat("dd MMM yyyy", Locale.getDefault()).format(Date())

        val order = Order(
            id = "OR-$randomId",
            trackingNumber = "TRK-BD-$randomTrk",
            date = dateStr,
            status = "placed",
            items = _cart.value.map {
                OrderItem(
                    productId = it.product.id,
                    title = if (_language.value == "bn") it.product.titleBn else it.product.titleEn,
                    price = it.product.price,
                    quantity = it.quantity,
                    image = it.selectedImage ?: it.product.images.firstOrNull() ?: "",
                    selectedSize = it.selectedSize,
                    selectedColor = it.selectedColor
                )
            },
            subtotal = subtotal,
            shippingFee = shippingFee,
            discount = discount,
            total = total,
            paymentMethod = paymentMethod,
            paymentStatus = if (paymentMethod == "cod") "pending" else "paid",
            shippingAddress = shippingAddress,
            userId = _currentUser.value?.id,
            customerEmail = _currentUser.value?.email ?: shippingAddress.email,
            customerPhone = _currentUser.value?.phone ?: shippingAddress.phone
        )

        val updatedOrders = listOf(order) + _orders.value
        _orders.value = updatedOrders
        prefs.saveOrders(updatedOrders)

        _lastPlacedOrder.value = order
        clearCart()
        _appliedCoupon.value = null

        showToast(
            if (_language.value == "bn") "ধন্যবাদ! আপনার অর্ডার গ্রহণ করা হয়েছে।" else "Thank you! Your order has been placed."
        )

        return order
    }

    // User auth
    fun loginUser(identifier: String, password: String? = null): Boolean {
        val cleanId = identifier.trim().lowercase()
        val cleanDigits = identifier.replace(Regex("[^0-9]"), "")

        val matched = _users.value.find { user ->
            val uEmail = user.email.trim().lowercase()
            val uPhone = user.phone.trim()
            val uPhoneDigits = uPhone.replace(Regex("[^0-9]"), "")
            (uEmail.isNotEmpty() && uEmail == cleanId) ||
            (uPhone.isNotEmpty() && uPhone.lowercase() == cleanId) ||
            (cleanDigits.length >= 10 && uPhoneDigits.length >= 10 && uPhoneDigits.endsWith(cleanDigits.takeLast(10)))
        }

        if (matched == null) {
            showToast(if (_language.value == "bn") "কোনো অ্যাকাউন্ট পাওয়া যায়নি!" else "No account found!")
            return false
        }

        if (!password.isNullOrEmpty() && !matched.password.isNullOrEmpty() && matched.password != password) {
            showToast(if (_language.value == "bn") "ভুল পাসওয়ার্ড!" else "Incorrect password!")
            return false
        }

        val isAdmin = isUserAdmin(matched)
        val userToSet = if (isAdmin && matched.role != "admin") matched.copy(role = "admin") else matched

        _currentUser.value = userToSet
        prefs.saveCurrentUser(userToSet)

        if (isAdmin) {
            _isAdminAuthenticated.value = true
            prefs.setAdminAuthenticated(true)
        }

        showToast(if (_language.value == "bn") "সফলভাবে লগইন হয়েছে!" else "Logged in successfully!")
        return true
    }

    fun registerUser(user: User): Boolean {
        val currentList = _users.value.toMutableList()
        currentList.add(user)
        _users.value = currentList
        prefs.saveUsers(currentList)

        _currentUser.value = user
        prefs.saveCurrentUser(user)

        showToast(if (_language.value == "bn") "রেজিস্ট্রেশন সফল হয়েছে!" else "Registration successful!")
        return true
    }

    fun logoutUser() {
        _currentUser.value = null
        prefs.saveCurrentUser(null)
        showToast(if (_language.value == "bn") "লগআউট করা হয়েছে" else "Logged out")
    }

    // Admin Auth
    fun loginAdmin(identifier: String? = null, password: String? = null): Boolean {
        if (!identifier.isNullOrEmpty() && !password.isNullOrEmpty()) {
            val cleanId = identifier.trim().lowercase()
            val cleanDigits = identifier.replace(Regex("[^0-9]"), "")
            val isEmailValid = cleanId == SecretAdminConfig.email || cleanId == SecretAdminConfig.secondaryEmail
            val isPhoneValid = cleanDigits.length >= 10 && (
                cleanDigits.endsWith(SecretAdminConfig.phone) || cleanDigits.endsWith(SecretAdminConfig.secondaryPhone)
            )
            val isPassValid = password == SecretAdminConfig.password || password == SecretAdminConfig.secondaryPassword

            if ((isEmailValid || isPhoneValid) && isPassValid) {
                _isAdminAuthenticated.value = true
                prefs.setAdminAuthenticated(true)
                showToast(if (_language.value == "bn") "এডমিন প্যানেলে স্বাগতম!" else "Welcome to Admin Panel!")
                return true
            } else {
                showToast(if (_language.value == "bn") "অনুমোদিত এডমিন তথ্য নয়!" else "Unauthorized admin credentials!")
                return false
            }
        }

        if (isUserAdmin(_currentUser.value)) {
            _isAdminAuthenticated.value = true
            prefs.setAdminAuthenticated(true)
            showToast(if (_language.value == "bn") "সরাসরি এডমিন প্যানেলে প্রবেশ করেছেন" else "Entered Admin Panel directly")
            return true
        }

        showToast(if (_language.value == "bn") "শুধুমাত্র এডমিন ব্যবহারকারীরা প্রবেশ করতে পারবেন" else "Admin access only")
        return false
    }

    fun logoutAdmin() {
        _isAdminAuthenticated.value = false
        prefs.setAdminAuthenticated(false)
        showToast(if (_language.value == "bn") "এডমিন প্যানেল থেকে প্রস্থান করা হয়েছে" else "Logged out from Admin")
    }

    // Admin operations
    fun addProduct(product: Product) {
        val updated = listOf(product) + _products.value
        _products.value = updated
        prefs.saveProducts(updated)
        showToast(if (_language.value == "bn") "প্রডাক্ট যুক্ত হয়েছে!" else "Product added!")
    }

    fun updateProduct(product: Product) {
        val updated = _products.value.map { if (it.id == product.id) product else it }
        _products.value = updated
        prefs.saveProducts(updated)
        showToast(if (_language.value == "bn") "প্রডাক্ট আপডেট হয়েছে!" else "Product updated!")
    }

    fun deleteProduct(productId: String) {
        val updated = _products.value.filter { it.id != productId }
        _products.value = updated
        prefs.saveProducts(updated)
        showToast(if (_language.value == "bn") "প্রডাক্ট মুছে ফেলা হয়েছে" else "Product deleted")
    }

    fun updateOrderStatus(orderId: String, status: String, paymentStatus: String? = null) {
        val updated = _orders.value.map { order ->
            if (order.id == orderId) {
                order.copy(
                    status = status,
                    paymentStatus = paymentStatus ?: order.paymentStatus
                )
            } else order
        }
        _orders.value = updated
        prefs.saveOrders(updated)
        showToast(if (_language.value == "bn") "অর্ডার স্ট্যাটাস আপডেট হয়েছে!" else "Order status updated!")
    }

    fun updateSiteSettings(settings: SiteSettings) {
        _siteSettings.value = settings
        prefs.saveSiteSettings(settings)
        showToast(if (_language.value == "bn") "সাইট সেটিংস সংরক্ষিত হয়েছে!" else "Site settings saved!")
    }

    fun updateFilterState(state: FilterState) {
        _filterState.value = state
    }

    fun updateSearchQuery(query: String) {
        _filterState.value = _filterState.value.copy(searchQuery = query)
    }
}
