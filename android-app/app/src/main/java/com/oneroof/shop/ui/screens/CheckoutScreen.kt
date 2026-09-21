package com.oneroof.shop.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.Payment
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.oneroof.shop.data.model.Order
import com.oneroof.shop.data.model.ShippingAddress
import com.oneroof.shop.data.model.User
import com.oneroof.shop.ui.theme.OneRoofBlue
import com.oneroof.shop.ui.theme.OneRoofEmerald
import com.oneroof.shop.ui.theme.OneRoofOrange

@Composable
fun CheckoutScreen(
    currentUser: User?,
    subtotal: Double,
    discount: Double,
    language: String,
    onPlaceOrder: (ShippingAddress, String) -> Order,
    onOrderSuccess: (Order) -> Unit
) {
    val scrollState = rememberScrollState()

    var fullName by remember { mutableStateOf(currentUser?.name ?: "") }
    var phone by remember { mutableStateOf(currentUser?.phone ?: "") }
    var division by remember { mutableStateOf(currentUser?.division?.ifEmpty { "ঢাকা (Dhaka)" } ?: "ঢাকা (Dhaka)") }
    var district by remember { mutableStateOf(currentUser?.district?.ifEmpty { "ঢাকা (Dhaka)" } ?: "ঢাকা (Dhaka)") }
    var address by remember { mutableStateOf(currentUser?.village ?: "") }
    var email by remember { mutableStateOf(currentUser?.email ?: "") }
    var deliverySpeed by remember { mutableStateOf("regular") } // "regular" | "express"
    var paymentMethod by remember { mutableStateOf("cod") } // "cod", "bkash", "nagad", "rocket", "card"

    val isDhaka = district.contains("Dhaka", ignoreCase = true) || division.contains("Dhaka", ignoreCase = true)
    val shippingFee = if (deliverySpeed == "express") 150.0 else if (isDhaka) 60.0 else 120.0
    val total = Math.max(0.0, subtotal - discount + shippingFee)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        Text(
            text = if (language == "bn") "শিপিং ও পেমেন্ট তথ্য" else "Shipping & Payment Details",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Shipping Form Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(2.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.LocalShipping, contentDescription = null, tint = OneRoofBlue)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = if (language == "bn") "ডেলিভারি ঠিকানা" else "Delivery Address",
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                OutlinedTextField(
                    value = fullName,
                    onValueChange = { fullName = it },
                    label = { Text(if (language == "bn") "পূর্ণ নাম *" else "Full Name *") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(8.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = phone,
                    onValueChange = { phone = it },
                    label = { Text(if (language == "bn") "মোবাইল নম্বর *" else "Mobile Number *") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(8.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                Row(modifier = Modifier.fillMaxWidth()) {
                    OutlinedTextField(
                        value = division,
                        onValueChange = { division = it },
                        label = { Text(if (language == "bn") "বিভাগ" else "Division") },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(8.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    OutlinedTextField(
                        value = district,
                        onValueChange = { district = it },
                        label = { Text(if (language == "bn") "জেলা" else "District") },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(8.dp)
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = address,
                    onValueChange = { address = it },
                    label = { Text(if (language == "bn") "বিস্তারিত ঠিকানা (থানা, এলাকা, বাসা নং) *" else "Full Address *") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(8.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Delivery Speed Selection
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(2.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = if (language == "bn") "ডেলিভারি অপশন" else "Delivery Speed",
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp
                )
                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    FilterChip(
                        selected = deliverySpeed == "regular",
                        onClick = { deliverySpeed = "regular" },
                        label = { Text(if (language == "bn") "রেগুলার (৳${if (isDhaka) 60 else 120})" else "Regular") },
                        modifier = Modifier.weight(1f)
                    )
                    FilterChip(
                        selected = deliverySpeed == "express",
                        onClick = { deliverySpeed = "express" },
                        label = { Text(if (language == "bn") "এক্সপ্রেস ২৪ঘণ্টা (৳150)" else "Express 24h") },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Payment Method Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(2.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Payment, contentDescription = null, tint = OneRoofBlue)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = if (language == "bn") "পেমেন্ট মেথড" else "Payment Method",
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                val methods = listOf(
                    "cod" to if (language == "bn") "ক্যাশ অন ডেলিভারি (COD)" else "Cash on Delivery",
                    "bkash" to "bKash (বিকাশ)",
                    "nagad" to "Nagad (নগদ)",
                    "rocket" to "Rocket (রকেট)",
                    "card" to "Card / Online"
                )

                methods.forEach { (key, label) ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { paymentMethod = key }
                            .padding(vertical = 4.dp)
                    ) {
                        RadioButton(
                            selected = paymentMethod == key,
                            onClick = { paymentMethod = key },
                            colors = RadioButtonDefaults.colors(selectedColor = OneRoofOrange)
                        )
                        Text(text = label, fontSize = 14.sp)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Total Summary Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(if (language == "bn") "পণ্য মূল্য:" else "Subtotal:")
                    Text("৳${subtotal.toInt()}", fontWeight = FontWeight.SemiBold)
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(if (language == "bn") "ডেলিভারি চার্জ:" else "Shipping Fee:")
                    Text("৳${shippingFee.toInt()}", fontWeight = FontWeight.SemiBold)
                }
                if (discount > 0) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(if (language == "bn") "ডিসকাউন্ট:" else "Discount:", color = OneRoofOrange)
                        Text("-৳${discount.toInt()}", fontWeight = FontWeight.SemiBold, color = OneRoofOrange)
                    }
                }
                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(if (language == "bn") "মোট দেয়:" else "Total Payable:", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    Text("৳${total.toInt()}", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = OneRoofBlue)
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = {
                if (fullName.isNotEmpty() && phone.isNotEmpty() && address.isNotEmpty()) {
                    val addr = ShippingAddress(
                        fullName = fullName,
                        phone = phone,
                        division = division,
                        district = district,
                        address = address,
                        deliverySpeed = deliverySpeed,
                        email = email
                    )
                    val createdOrder = onPlaceOrder(addr, paymentMethod)
                    onOrderSuccess(createdOrder)
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            colors = ButtonDefaults.buttonColors(containerColor = OneRoofOrange),
            shape = RoundedCornerShape(10.dp)
        ) {
            Text(
                text = if (language == "bn") "অর্ডার নিশ্চিত করুন" else "Confirm & Place Order",
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp
            )
        }
    }
}
