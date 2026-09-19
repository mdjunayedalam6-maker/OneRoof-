package com.oneroof.shop

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.oneroof.shop.ui.components.AppBottomNav
import com.oneroof.shop.ui.components.AppHeader
import com.oneroof.shop.ui.screens.AdminScreen
import com.oneroof.shop.ui.screens.CartScreen
import com.oneroof.shop.ui.screens.CheckoutScreen
import com.oneroof.shop.ui.screens.HomeScreen
import com.oneroof.shop.ui.screens.ProductDetailScreen
import com.oneroof.shop.ui.screens.ProfileScreen
import com.oneroof.shop.ui.screens.ShopScreen
import com.oneroof.shop.ui.theme.OneRoofTheme
import com.oneroof.shop.ui.viewmodel.AppViewModel

class MainActivity : ComponentActivity() {

    private val viewModel: AppViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            val siteSettings by viewModel.siteSettings.collectAsState()
            val language by viewModel.language.collectAsState()
            val bannerSlides by viewModel.bannerSlides.collectAsState()
            val categories by viewModel.categories.collectAsState()
            val products by viewModel.products.collectAsState()
            val cart by viewModel.cart.collectAsState()
            val wishlist by viewModel.wishlist.collectAsState()
            val orders by viewModel.orders.collectAsState()
            val currentUser by viewModel.currentUser.collectAsState()
            val isAdminAuthenticated by viewModel.isAdminAuthenticated.collectAsState()
            val toastMessage by viewModel.toastMessage.collectAsState()
            val filterState by viewModel.filterState.collectAsState()
            val selectedProduct by viewModel.selectedProduct.collectAsState()
            val appliedCoupon by viewModel.appliedCoupon.collectAsState()

            val navController = rememberNavController()
            val navBackStackEntry by navController.currentBackStackEntryAsState()
            val currentRoute = navBackStackEntry?.destination?.route ?: "home"

            // Toast message side effect
            LaunchedEffect(toastMessage) {
                toastMessage?.let {
                    Toast.makeText(this@MainActivity, it, Toast.LENGTH_SHORT).show()
                    viewModel.clearToast()
                }
            }

            OneRoofTheme {
                Scaffold(
                    topBar = {
                        AppHeader(
                            siteSettings = siteSettings,
                            language = language,
                            cartItemCount = cart.sumOf { it.quantity },
                            searchQuery = filterState.searchQuery,
                            onSearchQueryChange = { query ->
                                viewModel.updateSearchQuery(query)
                                if (currentRoute != "shop") {
                                    navController.navigate("shop")
                                }
                            },
                            onSearchSubmit = {
                                if (currentRoute != "shop") {
                                    navController.navigate("shop")
                                }
                            },
                            onLanguageToggle = {
                                viewModel.setLanguage(if (language == "bn") "en" else "bn")
                            },
                            onCartClick = {
                                navController.navigate("cart")
                            }
                        )
                    },
                    bottomBar = {
                        AppBottomNav(
                            currentRoute = currentRoute,
                            cartCount = cart.sumOf { it.quantity },
                            onNavigate = { route ->
                                navController.navigate(route) {
                                    popUpTo("home") { saveState = true }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        )
                    }
                ) { innerPadding ->
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding)
                    ) {
                        NavHost(
                            navController = navController,
                            startDestination = "home"
                        ) {
                            composable("home") {
                                HomeScreen(
                                    bannerSlides = bannerSlides,
                                    categories = categories,
                                    products = products,
                                    wishlist = wishlist,
                                    language = language,
                                    onCategorySelect = { categorySlug ->
                                        viewModel.updateFilterState(
                                            filterState.copy(category = categorySlug)
                                        )
                                        navController.navigate("shop")
                                    },
                                    onProductClick = { product ->
                                        viewModel.selectProduct(product)
                                        navController.navigate("product_detail")
                                    },
                                    onAddToCart = { product ->
                                        viewModel.addToCart(product)
                                    },
                                    onToggleWishlist = { product ->
                                        viewModel.toggleWishlist(product.id)
                                    },
                                    onNavigateToShop = {
                                        navController.navigate("shop")
                                    }
                                )
                            }

                            composable("shop") {
                                ShopScreen(
                                    products = products,
                                    categories = categories,
                                    filterState = filterState,
                                    wishlist = wishlist,
                                    language = language,
                                    onFilterChange = { newFilter ->
                                        viewModel.updateFilterState(newFilter)
                                    },
                                    onProductClick = { product ->
                                        viewModel.selectProduct(product)
                                        navController.navigate("product_detail")
                                    },
                                    onAddToCart = { product ->
                                        viewModel.addToCart(product)
                                    },
                                    onToggleWishlist = { product ->
                                        viewModel.toggleWishlist(product.id)
                                    }
                                )
                            }

                            composable("product_detail") {
                                ProductDetailScreen(
                                    product = selectedProduct,
                                    language = language,
                                    isInWishlist = selectedProduct?.let { viewModel.isInWishlist(it.id) } ?: false,
                                    onAddToCart = { prod, qty, size, color ->
                                        viewModel.addToCart(
                                            product = prod,
                                            quantity = qty,
                                            selectedSize = size,
                                            selectedColor = color
                                        )
                                    },
                                    onToggleWishlist = { prod ->
                                        viewModel.toggleWishlist(prod.id)
                                    },
                                    onBack = {
                                        navController.popBackStack()
                                    }
                                )
                            }

                            composable("cart") {
                                CartScreen(
                                    cart = cart,
                                    subtotal = viewModel.getCartSubtotal(),
                                    discount = viewModel.getCartDiscount(),
                                    shippingFee = viewModel.calculateShippingFee("dhaka"),
                                    total = Math.max(0.0, viewModel.getCartSubtotal() - viewModel.getCartDiscount() + viewModel.calculateShippingFee("dhaka")),
                                    appliedCoupon = appliedCoupon,
                                    language = language,
                                    onUpdateQuantity = { productId, qty ->
                                        viewModel.updateCartQuantity(productId, qty)
                                    },
                                    onRemoveItem = { productId ->
                                        viewModel.removeFromCart(productId)
                                    },
                                    onApplyCoupon = { code ->
                                        viewModel.applyCoupon(code)
                                    },
                                    onRemoveCoupon = {
                                        viewModel.removeCoupon()
                                    },
                                    onProceedToCheckout = {
                                        navController.navigate("checkout")
                                    },
                                    onNavigateToShop = {
                                        navController.navigate("shop")
                                    }
                                )
                            }

                            composable("checkout") {
                                CheckoutScreen(
                                    currentUser = currentUser,
                                    subtotal = viewModel.getCartSubtotal(),
                                    discount = viewModel.getCartDiscount(),
                                    language = language,
                                    onPlaceOrder = { address, paymentMethod ->
                                        viewModel.placeOrder(address, paymentMethod)
                                    },
                                    onOrderSuccess = { order ->
                                        navController.navigate("profile")
                                    }
                                )
                            }

                            composable("profile") {
                                val userOrders = orders.filter { o ->
                                    currentUser != null && (o.userId == currentUser?.id || o.customerEmail == currentUser?.email || o.customerPhone == currentUser?.phone)
                                }
                                ProfileScreen(
                                    currentUser = currentUser,
                                    userOrders = userOrders,
                                    language = language,
                                    onLogin = { id, pass ->
                                        viewModel.loginUser(id, pass)
                                    },
                                    onRegister = { user ->
                                        viewModel.registerUser(user)
                                    },
                                    onLogout = {
                                        viewModel.logoutUser()
                                    }
                                )
                            }

                            composable("admin") {
                                AdminScreen(
                                    isAdminAuthenticated = isAdminAuthenticated,
                                    currentUser = currentUser,
                                    products = products,
                                    orders = orders,
                                    siteSettings = siteSettings,
                                    language = language,
                                    onLoginAdmin = { id, pass ->
                                        viewModel.loginAdmin(id, pass)
                                    },
                                    onLogoutAdmin = {
                                        viewModel.logoutAdmin()
                                    },
                                    onAddProduct = { prod ->
                                        viewModel.addProduct(prod)
                                    },
                                    onUpdateProduct = { prod ->
                                        viewModel.updateProduct(prod)
                                    },
                                    onDeleteProduct = { id ->
                                        viewModel.deleteProduct(id)
                                    },
                                    onUpdateOrderStatus = { id, status ->
                                        viewModel.updateOrderStatus(id, status)
                                    },
                                    onUpdateSiteSettings = { settings ->
                                        viewModel.updateSiteSettings(settings)
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
