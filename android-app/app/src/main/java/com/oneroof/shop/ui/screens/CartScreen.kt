package com.oneroof.shop.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.oneroof.shop.data.model.CartItem
import com.oneroof.shop.data.model.Coupon
import com.oneroof.shop.ui.theme.OneRoofBlue
import com.oneroof.shop.ui.theme.OneRoofOrange

@Composable
fun CartScreen(
    cart: List<CartItem>,
    subtotal: Double,
    discount: Double,
    shippingFee: Double,
    total: Double,
    appliedCoupon: Coupon?,
    language: String,
    onUpdateQuantity: (String, Int) -> Unit,
    onRemoveItem: (String) -> Unit,
    onApplyCoupon: (String) -> Unit,
    onRemoveCoupon: () -> Unit,
    onProceedToCheckout: () -> Unit,
    onNavigateToShop: () -> Unit
) {
    var couponCodeInput by remember { mutableStateOf("") }

    if (cart.isEmpty()) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Icon(
                    imageVector = Icons.Default.ShoppingCart,
                    contentDescription = null,
                    tint = Color.LightGray,
                    modifier = Modifier.size(72.dp)
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = if (language == "bn") "আপনার শপিং কার্ট খালি!" else "Your cart is empty!",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(8.dp))
                Button(
                    onClick = onNavigateToShop,
                    colors = ButtonDefaults.buttonColors(containerColor = OneRoofBlue),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(text = if (language == "bn") "কেনাকাটা শুরু করুন" else "Start Shopping")
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
        Text(
            text = if (language == "bn") "শপিং কার্ট (${cart.sumOf { it.quantity }})" else "Shopping Cart (${cart.sumOf { it.quantity }})",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Cart Items List
        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(cart) { item ->
                val title = if (language == "bn") item.product.titleBn else item.product.titleEn

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(2.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .padding(10.dp)
                            .fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        AsyncImage(
                            model = item.selectedImage ?: item.product.images.firstOrNull(),
                            contentDescription = title,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier
                                .size(70.dp)
                                .background(Color(0xFFF1F5F9), RoundedCornerShape(8.dp))
                        )

                        Spacer(modifier = Modifier.width(10.dp))

                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = title,
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 13.sp,
                                maxLines = 2
                            )
                            if (item.selectedSize != null || item.selectedColor != null) {
                                Text(
                                    text = listOfNotNull(item.selectedSize, item.selectedColor).joinToString(" | "),
                                    fontSize = 11.sp,
                                    color = Color.Gray
                                )
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "৳${item.product.price.toInt()}",
                                fontWeight = FontWeight.Bold,
                                color = OneRoofBlue,
                                fontSize = 14.sp
                            )
                        }

                        // Quantity Control
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier
                                .border(1.dp, Color.LightGray, RoundedCornerShape(6.dp))
                        ) {
                            IconButton(
                                onClick = { onUpdateQuantity(item.product.id, item.quantity - 1) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Remove, contentDescription = null, modifier = Modifier.size(14.dp))
                            }
                            Text(
                                text = item.quantity.toString(),
                                fontWeight = FontWeight.Bold,
                                fontSize = 12.sp,
                                modifier = Modifier.padding(horizontal = 6.dp)
                            )
                            IconButton(
                                onClick = { onUpdateQuantity(item.product.id, item.quantity + 1) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(14.dp))
                            }
                        }

                        IconButton(onClick = { onRemoveItem(item.product.id) }) {
                            Icon(Icons.Default.Delete, contentDescription = "Delete", tint = Color.Red.copy(alpha = 0.7f))
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Coupon Section
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = couponCodeInput,
                onValueChange = { couponCodeInput = it },
                placeholder = { Text(if (language == "bn") "কুপন কোড (ONEROOF10)" else "Coupon (ONEROOF10)", fontSize = 12.sp) },
                modifier = Modifier.weight(1f),
                singleLine = true,
                shape = RoundedCornerShape(8.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Button(
                onClick = { onApplyCoupon(couponCodeInput) },
                colors = ButtonDefaults.buttonColors(containerColor = OneRoofBlue),
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(text = if (language == "bn") "প্রয়োগ" else "Apply", fontSize = 12.sp)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Cart Summary Box
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC))
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(if (language == "bn") "সাবটোটাল" else "Subtotal", fontSize = 13.sp)
                    Text("৳${subtotal.toInt()}", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                }
                if (discount > 0) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(if (language == "bn") "ছাড় (ডিসকাউন্ট)" else "Discount", fontSize = 13.sp, color = OneRoofOrange)
                        Text("-৳${discount.toInt()}", fontWeight = FontWeight.SemiBold, fontSize = 13.sp, color = OneRoofOrange)
                    }
                }
                Divider(modifier = Modifier.padding(vertical = 8.dp))
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(if (language == "bn") "সর্বমোট" else "Total Amount", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                    Text("৳${total.toInt()}", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = OneRoofBlue)
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Button(
            onClick = onProceedToCheckout,
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            colors = ButtonDefaults.buttonColors(containerColor = OneRoofOrange),
            shape = RoundedCornerShape(10.dp)
        ) {
            Text(
                text = if (language == "bn") "চেকআউট এ এগিয়ে যান" else "Proceed to Checkout",
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp
            )
        }
    }
}
