/**
 * Asset Conversion Script
 * Converts SVG assets to PNG in the required sizes
 * 
 * Requirements:
 * npm install sharp
 * 
 * Usage:
 * node scripts/convert-assets.js
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Club5 AI - Asset Conversion Tool\n');

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('❌ Sharp is not installed.');
  console.log('📦 Install it with: npm install sharp');
  console.log('Then run this script again.\n');
  process.exit(1);
}

const sharp = require('sharp');

const assetsDir = path.join(__dirname, '../assets');
const conversions = [
  {
    input: 'icon.svg',
    output: 'icon.png',
    size: 1024,
    description: 'App Icon'
  },
  {
    input: 'splash.svg',
    output: 'splash.png',
    width: 2048,
    height: 2732,
    description: 'Splash Screen'
  },
  {
    input: 'adaptive-icon.svg',
    output: 'adaptive-icon.png',
    size: 1024,
    description: 'Adaptive Icon (Android)'
  },
  {
    input: 'notification-icon.svg',
    output: 'notification-icon.png',
    size: 96,
    description: 'Notification Icon'
  },
  {
    input: 'favicon.svg',
    output: 'favicon.png',
    size: 48,
    description: 'Favicon'
  }
];

async function convertAssets() {
  console.log('🔄 Converting SVG assets to PNG...\n');

  for (const conversion of conversions) {
    const inputPath = path.join(assetsDir, conversion.input);
    const outputPath = path.join(assetsDir, conversion.output);

    try {
      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  ${conversion.description}: ${conversion.input} not found, skipping...`);
        continue;
      }

      let sharpInstance = sharp(inputPath);

      if (conversion.size) {
        // Square image
        sharpInstance = sharpInstance.resize(conversion.size, conversion.size);
      } else if (conversion.width && conversion.height) {
        // Custom dimensions
        sharpInstance = sharpInstance.resize(conversion.width, conversion.height);
      }

      await sharpInstance
        .png()
        .toFile(outputPath);

      console.log(`✅ ${conversion.description}: ${conversion.output} created`);
    } catch (error) {
      console.log(`❌ ${conversion.description}: Failed - ${error.message}`);
    }
  }

  console.log('\n✨ Asset conversion complete!\n');
  console.log('📁 Check the /assets folder for your PNG files.');
  console.log('🚀 You can now run: eas build\n');
}

// Alternative: Manual conversion instructions
function printManualInstructions() {
  console.log('\n📋 Manual Conversion Instructions:\n');
  console.log('If you prefer to convert manually, use any of these methods:\n');
  console.log('1. Online tools:');
  console.log('   - https://cloudconvert.com/svg-to-png');
  console.log('   - https://svgtopng.com\n');
  console.log('2. Design tools:');
  console.log('   - Open SVG in Figma/Illustrator/Inkscape');
  console.log('   - Export as PNG at the required sizes\n');
  console.log('3. Command line (ImageMagick):');
  conversions.forEach(c => {
    const size = c.size ? `${c.size}x${c.size}` : `${c.width}x${c.height}`;
    console.log(`   convert -background none -resize ${size} assets/${c.input} assets/${c.output}`);
  });
  console.log('');
}

// Run conversion
convertAssets().catch(error => {
  console.error('❌ Error during conversion:', error);
  printManualInstructions();
  process.exit(1);
});
