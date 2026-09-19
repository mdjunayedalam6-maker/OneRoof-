package com.oneroof.shop.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExitToApp
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.oneroof.shop.data.model.Order
import com.oneroof.shop.data.model.User
import com.oneroof.shop.ui.theme.OneRoofBlue
import com.oneroof.shop.ui.theme.OneRoofEmerald
import com.oneroof.shop.ui.theme.OneRoofOrange

@Composable
fun ProfileScreen(
    currentUser: User?,
    userOrders: List<Order>,
    language: String,
    onLogin: (String, String?) -> Boolean,
    onRegister: (User) -> Boolean,
    onLogout: () -> Unit
) {
    var showAuthModal by remember { mutableStateOf(false) }
    var isRegisterTab by remember { mutableStateOf(false) }

    // Form inputs
    var identifier by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var regName by remember { mutableStateOf("") }
    var regPhone by remember { mutableStateOf("") }
    var regEmail by remember { mutableStateOf("") }
    var regPass by remember { mutableStateOf("") }

    val scrollState = rememberScrollState()

    if (currentUser == null) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = null,
                    tint = Color.LightGray,
                    modifier = Modifier.size(72.dp)
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = if (language == "bn") "প্রোফাইল দেখতে লগইন করুন" else "Log in to view profile",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(12.dp))
                Button(
                    onClick = { showAuthModal = true },
                    colors = ButtonDefaults.buttonColors(containerColor = OneRoofBlue),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(text = if (language == "bn") "লগইন / রেজিস্টার" else "Login / Register")
                }
            }
        }
    } else {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(16.dp)
        ) {
            // Profile Header Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = OneRoofBlue),
                elevation = CardDefaults.cardElevation(4.dp)
            ) {
                Row(
                    modifier = Modifier.padding(20.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    AsyncImage(
                        model = currentUser.avatar.ifEmpty { "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" },
                        contentDescription = currentUser.name,
                        modifier = Modifier
                            .size(60.dp)
                            .clip(CircleShape)
                            .background(Color.White)
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = currentUser.name,
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Text(
                            text = currentUser.phone.ifEmpty { currentUser.email },
                            fontSize = 12.sp,
                            color = Color.White.copy(alpha = 0.8f)
                        )
                        if (currentUser.role == "admin") {
                            Surface(
                                color = OneRoofOrange,
                                shape = RoundedCornerShape(10.dp),
                                modifier = Modifier.padding(top = 4.dp)
                            ) {
                                Text(
                                    text = "ADMINISTRATOR",
                                    color = Color.White,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }
                    }
                    IconButton(onClick = onLogout) {
                        Icon(Icons.Default.ExitToApp, contentDescription = "Logout", tint = Color.White)
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Recent Orders Header
            Text(
                text = if (language == "bn") "আমার অর্ডারসমূহ (${userOrders.size})" else "My Orders (${userOrders.size})",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(10.dp))

            if (userOrders.isEmpty()) {
                Text(
                    text = if (language == "bn") "আপনার কোনো পূর্ববর্তী অর্ডার নেই" else "No order history found",
                    fontSize = 13.sp,
                    color = Color.Gray
                )
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    userOrders.forEach { order ->
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp),
                            colors = CardDefaults.cardColors(containerColor = Color.White),
                            elevation = CardDefaults.cardElevation(2.dp)
                        ) {
                            Column(modifier = Modifier.padding(12.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = "আইডি: #${order.id}",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 14.sp,
                                        color = OneRoofBlue
                                    )
                                    Surface(
                                        color = if (order.status == "delivered") OneRoofEmerald else OneRoofOrange,
                                        shape = RoundedCornerShape(12.dp)
                                    ) {
                                        Text(
                                            text = order.status.uppercase(),
                                            color = Color.White,
                                            fontSize = 10.sp,
                                            fontWeight = FontWeight.Bold,
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                        )
                                    }
                                }
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    text = "তারিখ: ${order.date} | ট্র্যাকিং: ${order.trackingNumber}",
                                    fontSize = 11.sp,
                                    color = Color.Gray
                                )
                                Divider(modifier = Modifier.padding(vertical = 8.dp))
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = "${order.items.size} টি পণ্য",
                                        fontSize = 12.sp,
                                        color = Color.DarkGray
                                    )
                                    Text(
                                        text = "মোট: ৳${order.total.toInt()}",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 14.sp,
                                        color = OneRoofBlue
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Auth Modal
    if (showAuthModal) {
        AlertDialog(
            onDismissRequest = { showAuthModal = false },
            confirmButton = {},
            dismissButton = {
                TextButton(onClick = { showAuthModal = false }) {
                    Text(if (language == "bn") "বন্ধ করুন" else "Close")
                }
            },
            title = {
                Row {
                    TextButton(onClick = { isRegisterTab = false }) {
                        Text(
                            text = if (language == "bn") "লগইন" else "Login",
                            fontWeight = if (!isRegisterTab) FontWeight.Bold else FontWeight.Normal,
                            color = if (!isRegisterTab) OneRoofBlue else Color.Gray
                        )
                    }
                    TextButton(onClick = { isRegisterTab = true }) {
                        Text(
                            text = if (language == "bn") "রেজিস্টার" else "Register",
                            fontWeight = if (isRegisterTab) FontWeight.Bold else FontWeight.Normal,
                            color = if (isRegisterTab) OneRoofBlue else Color.Gray
                        )
                    }
                }
            },
            text = {
                Column {
                    if (!isRegisterTab) {
                        OutlinedTextField(
                            value = identifier,
                            onValueChange = { identifier = it },
                            label = { Text(if (language == "bn") "মোবাইল নম্বর / ইমেইল" else "Mobile / Email") },
                            modifier = Modifier.fillMaxWidth()
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = password,
                            onValueChange = { password = it },
                            label = { Text(if (language == "bn") "পাসওয়ার্ড" else "Password") },
                            modifier = Modifier.fillMaxWidth()
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(
                            onClick = {
                                if (onLogin(identifier, password)) {
                                    showAuthModal = false
                                }
                            },
                            modifier = Modifier.fillMaxWidth(),
                            colors = ButtonDefaults.buttonColors(containerColor = OneRoofBlue)
                        ) {
                            Text(if (language == "bn") "প্রবেশ করুন" else "Sign In")
                        }
                    } else {
                        OutlinedTextField(
                            value = regName,
                            onValueChange = { regName = it },
                            label = { Text(if (language == "bn") "পূর্ণ নাম *" else "Full Name *") },
                            modifier = Modifier.fillMaxWidth()
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = regPhone,
                            onValueChange = { regPhone = it },
                            label = { Text(if (language == "bn") "মোবাইল নম্বর *" else "Mobile Number *") },
                            modifier = Modifier.fillMaxWidth()
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = regEmail,
                            onValueChange = { regEmail = it },
                            label = { Text(if (language == "bn") "ইমেইল" else "Email") },
                            modifier = Modifier.fillMaxWidth()
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = regPass,
                            onValueChange = { regPass = it },
                            label = { Text(if (language == "bn") "পাসওয়ার্ড" else "Password") },
                            modifier = Modifier.fillMaxWidth()
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(
                            onClick = {
                                if (regName.isNotEmpty() && (regPhone.isNotEmpty() || regEmail.isNotEmpty())) {
                                    val newUser = User(
                                        id = "user-${System.currentTimeMillis()}",
                                        name = regName,
                                        email = regEmail,
                                        phone = regPhone,
                                        password = regPass
                                    )
                                    if (onRegister(newUser)) {
                                        showAuthModal = false
                                    }
                                }
                            },
                            modifier = Modifier.fillMaxWidth(),
                            colors = ButtonDefaults.buttonColors(containerColor = OneRoofOrange)
                        ) {
                            Text(if (language == "bn") "অ্যাকাউন্ট খুলুন" else "Register")
                        }
                    }
                }
            }
        )
    }
}
