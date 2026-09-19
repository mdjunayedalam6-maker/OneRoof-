package com.oneroof.shop.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.oneroof.shop.data.model.Product
import com.oneroof.shop.data.model.SiteSettings
import com.oneroof.shop.ui.theme.OneRoofBlue
import com.oneroof.shop.ui.theme.OneRoofOrange

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppHeader(
    siteSettings: SiteSettings,
    language: String,
    cartItemCount: Int,
    searchQuery: String,
    onSearchQueryChange: (String) -> Unit,
    onSearchSubmit: () -> Unit,
    onLanguageToggle: () -> Unit,
    onCartClick: () -> Unit
) {
    Surface(
        color = Color(android.graphics.Color.parseColor(siteSettings.primaryColor.ifEmpty { "#003882" })),
        contentColor = Color.White,
        shadowElevation = 4.dp
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 10.dp)
        ) {
            // Top branding row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = Color(android.graphics.Color.parseColor(siteSettings.accentColor.ifEmpty { "#FF6B00" })),
                            modifier = Modifier.size(32.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Icon(
                                    imageVector = Icons.Default.HomeWork,
                                    contentDescription = null,
                                    tint = Color.White,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "OneRoof",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                    }
                    Text(
                        text = if (language == "bn") siteSettings.taglineBn else siteSettings.taglineEn,
                        fontSize = 11.sp,
                        color = Color.White.copy(alpha = 0.8f)
                    )
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    // Language Switcher
                    Surface(
                        shape = RoundedCornerShape(20.dp),
                        color = Color.White.copy(alpha = 0.2f),
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .clickable { onLanguageToggle() }
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Language,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = if (language == "bn") "English" else "বাংলা",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        }
                    }

                    Spacer(modifier = Modifier.width(8.dp))

                    // Cart Icon Button with Badge
                    Box {
                        IconButton(onClick = onCartClick) {
                            Icon(
                                imageVector = Icons.Outlined.ShoppingCart,
                                contentDescription = "Cart",
                                tint = Color.White
                            )
                        }
                        if (cartItemCount > 0) {
                            Surface(
                                shape = CircleShape,
                                color = Color(android.graphics.Color.parseColor(siteSettings.accentColor.ifEmpty { "#FF6B00" })),
                                modifier = Modifier
                                    .align(Alignment.TopEnd)
                                    .size(18.dp)
                            ) {
                                Box(contentAlignment = Alignment.Center) {
                                    Text(
                                        text = cartItemCount.toString(),
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White
                                    )
                                }
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Search Bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = onSearchQueryChange,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                placeholder = {
                    Text(
                        text = if (language == "bn") "ইলেকট্রনিক্স, গ্যাজেট বা ফ্যাশন খুঁজুন..." else "Search electronics, gadgets, fashion...",
                        fontSize = 13.sp,
                        color = Color.Gray
                    )
                },
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Search,
                        contentDescription = "Search",
                        tint = OneRoofBlue
                    )
                },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { onSearchQueryChange("") }) {
                            Icon(
                                imageVector = Icons.Default.Clear,
                                contentDescription = "Clear",
                                tint = Color.Gray
                            )
                        }
                    }
                },
                shape = RoundedCornerShape(12.dp),
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = Color.White,
                    unfocusedContainerColor = Color.White,
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent
                ),
                singleLine = true
            )
        }
    }
}

@Composable
fun AppBottomNav(
    currentRoute: String,
    cartCount: Int,
    onNavigate: (String) -> Unit
) {
    NavigationBar(
        containerColor = Color.White,
        tonalElevation = 8.dp
    ) {
        NavigationBarItem(
            selected = currentRoute == "home",
            onClick = { onNavigate("home") },
            icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
            label = { Text("হোম", fontSize = 11.sp) }
        )
        NavigationBarItem(
            selected = currentRoute == "shop",
            onClick = { onNavigate("shop") },
            icon = { Icon(Icons.Default.Storefront, contentDescription = "Shop") },
            label = { Text("শপ", fontSize = 11.sp) }
        )
        NavigationBarItem(
            selected = currentRoute == "cart",
            onClick = { onNavigate("cart") },
            icon = {
                BadgedBox(
                    badge = {
                        if (cartCount > 0) {
                            Badge { Text(cartCount.toString()) }
                        }
                    }
                ) {
                    Icon(Icons.Default.ShoppingCart, contentDescription = "Cart")
                }
            },
            label = { Text("কার্ট", fontSize = 11.sp) }
        )
        NavigationBarItem(
            selected = currentRoute == "profile",
            onClick = { onNavigate("profile") },
            icon = { Icon(Icons.Default.Person, contentDescription = "Profile") },
            label = { Text("প্রোফাইল", fontSize = 11.sp) }
        )
        NavigationBarItem(
            selected = currentRoute == "admin",
            onClick = { onNavigate("admin") },
            icon = { Icon(Icons.Default.AdminPanelSettings, contentDescription = "Admin") },
            label = { Text("এডমিন", fontSize = 11.sp) }
        )
    }
}
