package com.oneroof.shop.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.AdminPanelSettings
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.oneroof.shop.data.model.Order
import com.oneroof.shop.data.model.Product
import com.oneroof.shop.data.model.SiteSettings
import com.oneroof.shop.data.model.User
import com.oneroof.shop.ui.theme.OneRoofBlue
import com.oneroof.shop.ui.theme.OneRoofEmerald
import com.oneroof.shop.ui.theme.OneRoofOrange

@Composable
fun AdminScreen(
    isAdminAuthenticated: Boolean,
    currentUser: User?,
    products: List<Product>,
    orders: List<Order>,
    siteSettings: SiteSettings,
    language: String,
    onLoginAdmin: (String?, String?) -> Boolean,
    onLogoutAdmin: () -> Unit,
    onAddProduct: (Product) -> Unit,
    onUpdateProduct: (Product) -> Unit,
    onDeleteProduct: (String) -> Unit,
    onUpdateOrderStatus: (String, String) -> Unit,
    onUpdateSiteSettings: (SiteSettings) -> Unit
) {
    var adminPinInput by remember { mutableStateOf("") }
    var adminIdInput by remember { mutableStateOf("") }

    var selectedTab by remember { mutableIntStateOf(0) } // 0: Products, 1: Orders, 2: Settings
    val scrollState = rememberScrollState()

    // Add/Edit product dialog
    var showProductDialog by remember { mutableStateOf(false) }
    var editingProduct by remember { mutableStateOf<Product?>(null) }
    var pTitleBn by remember { mutableStateOf("") }
    var pTitleEn by remember { mutableStateOf("") }
    var pPrice by remember { mutableStateOf("") }
    var pCategory by remember { mutableStateOf("electronics") }
    var pStock by remember { mutableStateOf("10") }
    var pImage by remember { mutableStateOf("") }

    if (!isAdminAuthenticated) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp),
            contentAlignment = Alignment.Center
        ) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(4.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(
                        imageVector = Icons.Default.AdminPanelSettings,
                        contentDescription = null,
                        tint = OneRoofBlue,
                        modifier = Modifier.size(64.dp)
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = if (language == "bn") "এডমিন অ্যাক্সেস ভেরিফিকেশন" else "Admin Verification",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = adminIdInput,
                        onValueChange = { adminIdInput = it },
                        label = { Text(if (language == "bn") "ইমেইল বা মোবাইল" else "Email or Phone") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = adminPinInput,
                        onValueChange = { adminPinInput = it },
                        label = { Text(if (language == "bn") "পাসওয়ার্ড বা PIN" else "Password or PIN") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp)
                    )
                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = { onLoginAdmin(adminIdInput, adminPinInput) },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = OneRoofBlue),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(text = if (language == "bn") "প্রবেশ করুন" else "Authenticate")
                    }
                }
            }
        }
        return
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Top Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = if (language == "bn") "এডমিন ড্যাশবোর্ড" else "Admin Dashboard",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = OneRoofBlue
            )
            Button(
                onClick = onLogoutAdmin,
                colors = ButtonDefaults.buttonColors(containerColor = Color.Red.copy(alpha = 0.8f)),
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(if (language == "bn") "লগআউট" else "Logout", fontSize = 12.sp)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Tab Selector
        TabRow(selectedTabIndex = selectedTab) {
            Tab(selected = selectedTab == 0, onClick = { selectedTab = 0 }) {
                Text(if (language == "bn") "প্রডাক্টস" else "Products", modifier = Modifier.padding(12.dp), fontWeight = FontWeight.Bold)
            }
            Tab(selected = selectedTab == 1, onClick = { selectedTab = 1 }) {
                Text(if (language == "bn") "অর্ডারস (${orders.size})" else "Orders (${orders.size})", modifier = Modifier.padding(12.dp), fontWeight = FontWeight.Bold)
            }
            Tab(selected = selectedTab == 2, onClick = { selectedTab = 2 }) {
                Text(if (language == "bn") "সেটিংস" else "Settings", modifier = Modifier.padding(12.dp), fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        when (selectedTab) {
            0 -> {
                // Products Admin Tab
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = "মোট প্রডাক্ট: ${products.size}", fontWeight = FontWeight.SemiBold)
                    Button(
                        onClick = {
                            editingProduct = null
                            pTitleBn = ""
                            pTitleEn = ""
                            pPrice = ""
                            pCategory = "electronics"
                            pStock = "10"
                            pImage = ""
                            showProductDialog = true
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = OneRoofOrange),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(if (language == "bn") "নতুন পণ্য" else "Add New", fontSize = 12.sp)
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(products) { prod ->
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(8.dp),
                            colors = CardDefaults.cardColors(containerColor = Color.White),
                            elevation = CardDefaults.cardElevation(1.dp)
                        ) {
                            Row(
                                modifier = Modifier
                                    .padding(10.dp)
                                    .fillMaxWidth(),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(text = prod.titleBn, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                    Text(text = "মূল্য: ৳${prod.price.toInt()} | স্টক: ${prod.stock}", fontSize = 11.sp, color = Color.Gray)
                                }
                                IconButton(onClick = {
                                    editingProduct = prod
                                    pTitleBn = prod.titleBn
                                    pTitleEn = prod.titleEn
                                    pPrice = prod.price.toInt().toString()
                                    pCategory = prod.category
                                    pStock = prod.stock.toString()
                                    pImage = prod.images.firstOrNull() ?: ""
                                    showProductDialog = true
                                }) {
                                    Icon(Icons.Default.Edit, contentDescription = "Edit", tint = OneRoofBlue)
                                }
                                IconButton(onClick = { onDeleteProduct(prod.id) }) {
                                    Icon(Icons.Default.Delete, contentDescription = "Delete", tint = Color.Red)
                                }
                            }
                        }
                    }
                }
            }
            1 -> {
                // Orders Admin Tab
                LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    items(orders) { order ->
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(10.dp),
                            colors = CardDefaults.cardColors(containerColor = Color.White),
                            elevation = CardDefaults.cardElevation(2.dp)
                        ) {
                            Column(modifier = Modifier.padding(12.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text("অর্ডার #${order.id}", fontWeight = FontWeight.Bold, color = OneRoofBlue)
                                    Text("৳${order.total.toInt()}", fontWeight = FontWeight.Bold)
                                }
                                Text("গ্রাহক: ${order.shippingAddress.fullName} (${order.shippingAddress.phone})", fontSize = 12.sp)
                                Text("ঠিকানা: ${order.shippingAddress.address}, ${order.shippingAddress.district}", fontSize = 11.sp, color = Color.Gray)

                                Spacer(modifier = Modifier.height(8.dp))

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                                ) {
                                    listOf("placed", "processing", "shipped", "delivered").forEach { st ->
                                        FilterChip(
                                            selected = order.status == st,
                                            onClick = { onUpdateOrderStatus(order.id, st) },
                                            label = { Text(st.uppercase(), fontSize = 9.sp) }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
            2 -> {
                // Settings Admin Tab
                Column(
                    modifier = Modifier
                        .verticalScroll(scrollState)
                        .padding(bottom = 16.dp)
                ) {
                    var hotline by remember { mutableStateOf(siteSettings.hotlineNumber) }
                    var freeShipThreshold by remember { mutableStateOf(siteSettings.freeShippingThreshold.toInt().toString()) }
                    var dhakaFee by remember { mutableStateOf(siteSettings.shippingFeeInsideDhaka.toInt().toString()) }
                    var outsideFee by remember { mutableStateOf(siteSettings.shippingFeeOutsideDhaka.toInt().toString()) }

                    OutlinedTextField(
                        value = hotline,
                        onValueChange = { hotline = it },
                        label = { Text("হটলাইন নম্বর") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = freeShipThreshold,
                        onValueChange = { freeShipThreshold = it },
                        label = { Text("ফ্রি শিপিং থ্রেশহোল্ড (৳)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    Row(modifier = Modifier.fillMaxWidth()) {
                        OutlinedTextField(
                            value = dhakaFee,
                            onValueChange = { dhakaFee = it },
                            label = { Text("ঢাকা ডেলিভারি (৳)") },
                            modifier = Modifier.weight(1f)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        OutlinedTextField(
                            value = outsideFee,
                            onValueChange = { outsideFee = it },
                            label = { Text("ঢাকার বাইরে (৳)") },
                            modifier = Modifier.weight(1f)
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = {
                            val updated = siteSettings.copy(
                                hotlineNumber = hotline,
                                freeShippingThreshold = freeShipThreshold.toDoubleOrNull() ?: 2000.0,
                                shippingFeeInsideDhaka = dhakaFee.toDoubleOrNull() ?: 60.0,
                                shippingFeeOutsideDhaka = outsideFee.toDoubleOrNull() ?: 120.0
                            )
                            onUpdateSiteSettings(updated)
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = OneRoofOrange)
                    ) {
                        Text(if (language == "bn") "সংরক্ষণ করুন" else "Save Settings")
                    }
                }
            }
        }
    }

    // Product Add/Edit Modal
    if (showProductDialog) {
        AlertDialog(
            onDismissRequest = { showProductDialog = false },
            title = { Text(if (editingProduct == null) "নতুন প্রডাক্ট যোগ করুন" else "প্রডাক্ট এডিট করুন") },
            text = {
                Column {
                    OutlinedTextField(value = pTitleBn, onValueChange = { pTitleBn = it }, label = { Text("নাম (বাংলা)") })
                    OutlinedTextField(value = pTitleEn, onValueChange = { pTitleEn = it }, label = { Text("Name (English)") })
                    OutlinedTextField(value = pPrice, onValueChange = { pPrice = it }, label = { Text("মূল্য (৳)") })
                    OutlinedTextField(value = pStock, onValueChange = { pStock = it }, label = { Text("স্টক পরিমাণ") })
                    OutlinedTextField(value = pImage, onValueChange = { pImage = it }, label = { Text("ইমেজ URL") })
                }
            },
            confirmButton = {
                Button(onClick = {
                    val priceVal = pPrice.toDoubleOrNull() ?: 0.0
                    val stockVal = pStock.toIntOrNull() ?: 10
                    if (editingProduct == null) {
                        val newProd = Product(
                            id = "prod-${System.currentTimeMillis()}",
                            titleBn = pTitleBn,
                            titleEn = pTitleEn.ifEmpty { pTitleBn },
                            descriptionBn = "নতুন প্রডাক্ট বিবরণী",
                            descriptionEn = "New product description",
                            category = pCategory,
                            brand = "OneRoof",
                            price = priceVal,
                            rating = 5.0,
                            reviewCount = 1,
                            images = listOf(pImage.ifEmpty { "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" }),
                            stock = stockVal
                        )
                        onAddProduct(newProd)
                    } else {
                        val updated = editingProduct!!.copy(
                            titleBn = pTitleBn,
                            titleEn = pTitleEn,
                            price = priceVal,
                            stock = stockVal,
                            images = if (pImage.isNotEmpty()) listOf(pImage) else editingProduct!!.images
                        )
                        onUpdateProduct(updated)
                    }
                    showProductDialog = false
                }) {
                    Text("সংরক্ষণ")
                }
            },
            dismissButton = {
                TextButton(onClick = { showProductDialog = false }) { Text("বাতিল") }
            }
        )
    }
}
