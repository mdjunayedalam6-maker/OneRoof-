const fs = require('fs');
const path = require('path');

const srcLogo = path.join(__dirname, 'src/assets/images/oneroof_logo_v3.png');

if (!fs.existsSync(srcLogo)) {
  console.error('Source logo does not exist:', srcLogo);
  process.exit(1);
}

const destinations = [
  'public/favicon.png',
  'public/apple-touch-icon.png',
  'public/pwa-192x192.png',
  'public/pwa-512x512.png',
  'public/pwa-maskable-512x512.png',

  // Android launcher icons
  'android/app/src/main/res/mipmap-mdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png',
  'android/app/src/main/res/mipmap-hdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png',
  'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png',
  'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png',
  'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png',

  // Android splash screen images
  'android/app/src/main/res/drawable/splash.png',
  'android/app/src/main/res/drawable-land-mdpi/splash.png',
  'android/app/src/main/res/drawable-port-hdpi/splash.png',
  'android/app/src/main/res/drawable-port-xxxhdpi/splash.png',
  'android/app/src/main/res/drawable-port-xhdpi/splash.png',
  'android/app/src/main/res/drawable-port-mdpi/splash.png',
  'android/app/src/main/res/drawable-land-hdpi/splash.png',
  'android/app/src/main/res/drawable-land-xxxhdpi/splash.png',
  'android/app/src/main/res/drawable-land-xxhdpi/splash.png',
  'android/app/src/main/res/drawable-port-xxhdpi/splash.png',
  'android/app/src/main/res/drawable-land-xhdpi/splash.png'
];

destinations.forEach((dest) => {
  const destPath = path.join(__dirname, dest);
  const destDir = path.dirname(destPath);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  try {
    fs.copyFileSync(srcLogo, destPath);
    console.log(`Copied logo to: ${dest}`);
  } catch (err) {
    console.warn(`Could not copy to ${dest}:`, err.message);
  }
});

console.log('All branding assets synchronized successfully!');
