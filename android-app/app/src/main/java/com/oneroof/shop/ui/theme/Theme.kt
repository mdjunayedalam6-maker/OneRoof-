package com.oneroof.shop.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val LightColorScheme = lightColorScheme(
    primary = OneRoofBlue,
    secondary = OneRoofOrange,
    tertiary = OneRoofEmerald,
    background = OneRoofLightBg,
    surface = OneRoofCardBg,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Color.White,
    onBackground = OneRoofTextPrimary,
    onSurface = OneRoofTextPrimary,
    outline = OneRoofBorder
)

@Composable
fun OneRoofTheme(
    primaryColor: Color = OneRoofBlue,
    accentColor: Color = OneRoofOrange,
    content: @Composable () -> Unit
) {
    val colorScheme = LightColorScheme.copy(
        primary = primaryColor,
        secondary = accentColor
    )
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = primaryColor.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
