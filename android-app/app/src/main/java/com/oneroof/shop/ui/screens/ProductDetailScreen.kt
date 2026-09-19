package com.oneroof.shop.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.oneroof.shop.data.model.Product
import com.oneroof.shop.ui.theme.OneRoofBlue
import com.oneroof.shop.ui.theme.OneRoofEmerald
import com.oneroof.shop.ui.theme.OneRoofOrange

@Composable
fun ProductDetailScreen(
    product: Product?,
    language: String,
    isInWishlist: Boolean,
    onAddToCart: (Product, Int, String?, String?) -> Unit,
    onToggleWishlist: (Product) -> Unit,
    onBack: () -> Unit
) {
    if (product == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text(if (language == "bn") "পণ্যটি পাওয়া যায়নি" else "Product not found")
        }
        return
    }

    var selectedImage by remember { mutableStateOf(product.images.firstOrNull() ?: "") }
    var selectedSize by remember { mutableStateOf(product.sizes?.firstOrNull()) }
    var selectedColor by remember { mutableStateOf(product.colors?.firstOrNull()) }
    var quantity by remember { mutableIntStateOf(1) }

    val scrollState = rememberScrollState()
    val title = if (language == "bn") product.titleBn else product.titleEn
    val description = if (language == "bn") product.descriptionBn else product.descriptionEn

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        // Main Image Display
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(280.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(Color(0xFFF1F5F9))
        ) {
            AsyncImage(
                model = selectedImage,
                contentDescription = title,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )

            // Wishlist Button
            IconButton(
                onClick = { onToggleWishlist(product) },
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(12.dp)
                    .background(Color.White.copy(alpha = 0.9f), CircleShape)
            ) {
                Icon(
                    imageVector = if (isInWishlist) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                    contentDescription = "Wishlist",
                    tint = if (isInWishlist) Color.Red else Color.Gray
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Thumbnail Row
        if (product.images.size > 1) {
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(product.images) { img ->
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier
                            .size(60.dp)
                            .border(
                                width = if (selectedImage == img) 2.dp else 1.dp,
                                color = if (selectedImage == img) OneRoofOrange else Color.LightGray,
                                shape = RoundedCornerShape(8.dp)
                            )
                            .clickable { selectedImage = img }
                    ) {
                        AsyncImage(
                            model = img,
                            contentDescription = null,
                            contentScale = ContentScale.Crop
                        )
                    }
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Title and Brand
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp
        )

        Spacer(modifier = Modifier.height(6.dp))

        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFFFB800), modifier = Modifier.size(16.dp))
            Spacer(modifier = Modifier.width(4.dp))
            Text(text = "${product.rating} (${product.reviewCount} ${if (language == "bn") "রিভিউ" else "reviews"})", fontSize = 12.sp, color = Color.Gray)
            Spacer(modifier = Modifier.width(12.dp))
            Text(text = "ব্র্যান্ড: ${product.brand}", fontSize = 12.sp, color = OneRoofBlue, fontWeight = FontWeight.SemiBold)
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Price Row
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(
                text = "৳${product.price.toInt()}",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = OneRoofBlue
            )
            if (product.originalPrice != null && product.originalPrice > product.price) {
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "৳${product.originalPrice.toInt()}",
                    fontSize = 14.sp,
                    color = Color.Gray,
                    textDecoration = TextDecoration.LineThrough
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Sizes Selection
        if (!product.sizes.isNullOrEmpty()) {
            Text(text = if (language == "bn") "সাইজ নির্বাচন করুন:" else "Select Size:", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
            Spacer(modifier = Modifier.height(6.dp))
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(product.sizes) { size ->
                    FilterChip(
                        selected = selectedSize == size,
                        onClick = { selectedSize = size },
                        label = { Text(size) }
                    )
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Colors Selection
        if (!product.colors.isNullOrEmpty()) {
            Text(text = if (language == "bn") "কালার নির্বাচন করুন:" else "Select Color:", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
            Spacer(modifier = Modifier.height(6.dp))
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(product.colors) { color ->
                    FilterChip(
                        selected = selectedColor == color,
                        onClick = { selectedColor = color },
                        label = { Text(color) }
                    )
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Quantity Selector & Add to Cart Action
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .border(1.dp, Color.LightGray, RoundedCornerShape(8.dp))
                    .padding(horizontal = 4.dp, vertical = 2.dp)
            ) {
                IconButton(onClick = { if (quantity > 1) quantity-- }, modifier = Modifier.size(32.dp)) {
                    Icon(Icons.Default.Remove, contentDescription = "Decrease")
                }
                Text(
                    text = quantity.toString(),
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(horizontal = 12.dp)
                )
                IconButton(onClick = { quantity++ }, modifier = Modifier.size(32.dp)) {
                    Icon(Icons.Default.Add, contentDescription = "Increase")
                }
            }

            Button(
                onClick = { onAddToCart(product, quantity, selectedSize, selectedColor) },
                colors = ButtonDefaults.buttonColors(containerColor = OneRoofOrange),
                shape = RoundedCornerShape(8.dp),
                modifier = Modifier
                    .weight(1f)
                    .padding(start = 16.dp)
            ) {
                Icon(Icons.Default.ShoppingCart, contentDescription = null, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text(text = if (language == "bn") "কার্টে যোগ করুন" else "Add to Cart")
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Description
        Text(text = if (language == "bn") "পণ্য বিবরণী:" else "Description:", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        Spacer(modifier = Modifier.height(4.dp))
        Text(text = description, fontSize = 13.sp, color = Color.DarkGray, lineHeight = 20.sp)
    }
}
