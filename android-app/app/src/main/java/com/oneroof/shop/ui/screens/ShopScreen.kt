package com.oneroof.shop.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.FilterList
import androidx.compose.material.icons.filled.Sort
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.oneroof.shop.data.model.Category
import com.oneroof.shop.data.model.FilterState
import com.oneroof.shop.data.model.Product
import com.oneroof.shop.ui.components.ProductCard
import com.oneroof.shop.ui.theme.OneRoofBlue
import com.oneroof.shop.ui.theme.OneRoofOrange

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ShopScreen(
    products: List<Product>,
    categories: List<Category>,
    filterState: FilterState,
    wishlist: List<String>,
    language: String,
    onFilterChange: (FilterState) -> Unit,
    onProductClick: (Product) -> Unit,
    onAddToCart: (Product) -> Unit,
    onToggleWishlist: (Product) -> Unit
) {
    var showFilterSheet by remember { mutableStateOf(false) }

    // Filter logic
    val filteredProducts = products.filter { prod ->
        val matchesCategory = filterState.category == "all" || prod.category.equals(filterState.category, ignoreCase = true)
        val matchesSearch = filterState.searchQuery.isEmpty() ||
                prod.titleBn.contains(filterState.searchQuery, ignoreCase = true) ||
                prod.titleEn.contains(filterState.searchQuery, ignoreCase = true)
        val matchesPrice = prod.price in filterState.minPrice..filterState.maxPrice
        val matchesRating = prod.rating >= filterState.minRating
        val matchesStock = !filterState.inStockOnly || prod.stock > 0
        val matchesFlash = !filterState.isFlashSaleOnly || prod.isFlashSale

        matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesStock && matchesFlash
    }.let { list ->
        when (filterState.sortBy) {
            "price-low" -> list.sortedBy { it.price }
            "price-high" -> list.sortedByDescending { it.price }
            "rating" -> list.sortedByDescending { it.rating }
            "newest" -> list.sortedByDescending { it.id }
            else -> list
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Category Filter Chips
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.padding(bottom = 12.dp)
        ) {
            item {
                FilterChip(
                    selected = filterState.category == "all",
                    onClick = { onFilterChange(filterState.copy(category = "all")) },
                    label = { Text(if (language == "bn") "সব পণ্য" else "All") }
                )
            }
            items(categories) { cat ->
                FilterChip(
                    selected = filterState.category == cat.slug,
                    onClick = { onFilterChange(filterState.copy(category = cat.slug)) },
                    label = { Text(if (language == "bn") cat.nameBn else cat.nameEn) }
                )
            }
        }

        // Sub Bar: Result Count & Filter Action
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = if (language == "bn") "মোট ${filteredProducts.size} টি পণ্য পাওয়া গেছে" else "Found ${filteredProducts.size} products",
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.SemiBold,
                color = Color.DarkGray
            )

            Button(
                onClick = { showFilterSheet = true },
                colors = ButtonDefaults.buttonColors(containerColor = OneRoofBlue),
                shape = RoundedCornerShape(8.dp),
                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.FilterList,
                    contentDescription = "Filter",
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = if (language == "bn") "ফিল্টার" else "Filter",
                    fontSize = 12.sp
                )
            }
        }

        // Product Grid
        if (filteredProducts.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(32.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = if (language == "bn") "কোনো পণ্য পাওয়া যায়নি" else "No products found",
                    style = MaterialTheme.typography.bodyLarge,
                    color = Color.Gray
                )
            }
        } else {
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(filteredProducts) { prod ->
                    ProductCard(
                        product = prod,
                        language = language,
                        isInWishlist = wishlist.contains(prod.id),
                        onProductClick = onProductClick,
                        onAddToCart = onAddToCart,
                        onToggleWishlist = { onToggleWishlist(prod) }
                    )
                }
            }
        }
    }

    // Filter Bottom Sheet
    if (showFilterSheet) {
        ModalBottomSheet(
            onDismissRequest = { showFilterSheet = false }
        ) {
            Column(
                modifier = Modifier
                    .padding(20.dp)
                    .fillMaxWidth()
            ) {
                Text(
                    text = if (language == "bn") "ফিল্টার ও সর্টিং" else "Filter & Sorting",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Price Range
                Text(
                    text = if (language == "bn") "সর্বোচ্চ মূল্য: ৳${filterState.maxPrice.toInt()}" else "Max Price: ৳${filterState.maxPrice.toInt()}",
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 14.sp
                )
                Slider(
                    value = filterState.maxPrice.toFloat(),
                    onValueChange = { onFilterChange(filterState.copy(maxPrice = it.toDouble())) },
                    valueRange = 100f..60000f,
                    colors = SliderDefaults.colors(thumbColor = OneRoofOrange, activeTrackColor = OneRoofOrange)
                )

                Spacer(modifier = Modifier.height(12.dp))

                // In Stock Toggle
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = if (language == "bn") "স্টকে আছে এমন পণ্য" else "In Stock Only")
                    Switch(
                        checked = filterState.inStockOnly,
                        onCheckedChange = { onFilterChange(filterState.copy(inStockOnly = it)) }
                    )
                }

                Spacer(modifier = Modifier.height(20.dp))

                Button(
                    onClick = { showFilterSheet = false },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = OneRoofBlue),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(text = if (language == "bn") "আবেদন করুন" else "Apply Filters")
                }
            }
        }
    }
}
