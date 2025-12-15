/**
 * Pre-Deployment Checklist
 * Verifies that everything is ready for EAS build
 * 
 * Usage:
 * node scripts/pre-deployment-check.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Club5 AI - Pre-Deployment Check\n');
console.log('═══════════════════════════════════════\n');

let allChecksPassed = true;
const warnings = [];

// Helper function
function checkFile(filePath, description, required = true) {
  const exists = fs.existsSync(filePath);
  const icon = exists ? '✅' : (required ? '❌' : '⚠️ ');
  console.log(`${icon} ${description}: ${path.basename(filePath)}`);
  
  if (!exists && required) {
    allChecksPassed = false;
  } else if (!exists && !required) {
    warnings.push(description);
  }
  
  return exists;
}

function checkFileContent(filePath, searchString, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const found = content.includes(searchString);
    const icon = found ? '✅' : '❌';
    console.log(`${icon} ${description}`);
    if (!found) allChecksPassed = false;
    return found;
  } catch (e) {
    console.log(`❌ ${description} - File not found`);
    allChecksPassed = false;
    return false;
  }
}

// 1. Configuration Files
console.log('📋 Configuration Files:');
checkFile(path.join(__dirname, '../app.json'), 'app.json', true);
checkFile(path.join(__dirname, '../eas.json'), 'eas.json', true);
checkFile(path.join(__dirname, '../package.json'), 'package.json', true);
console.log('');

// 2. Required Assets
console.log('🎨 Required Assets:');
const requiredAssets = [
  { file: 'icon.png', desc: 'App Icon (1024×1024)', required: true },
  { file: 'splash.png', desc: 'Splash Screen (2048×2732)', required: true },
  { file: 'adaptive-icon.png', desc: 'Adaptive Icon (1024×1024)', required: true },
  { file: 'notification-icon.png', desc: 'Notification Icon (96×96)', required: true },
  { file: 'favicon.png', desc: 'Favicon (48×48)', required: false }
];

requiredAssets.forEach(asset => {
  checkFile(
    path.join(__dirname, '../assets', asset.file),
    asset.desc,
    asset.required
  );
});
console.log('');

// 3. App Configuration
console.log('⚙️  App Configuration:');
const appJsonPath = path.join(__dirname, '../app.json');
if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  
  // Check project ID
  const hasProjectId = appJson.expo?.extra?.eas?.projectId && 
                       !appJson.expo.extra.eas.projectId.includes('YOUR_');
  console.log(hasProjectId ? '✅' : '❌', 'EAS Project ID configured');
  if (!hasProjectId) {
    allChecksPassed = false;
    console.log('   💡 Run: eas init');
  }
  
  // Check bundle identifiers
  const iosBundleId = appJson.expo?.ios?.bundleIdentifier;
  const androidPackage = appJson.expo?.android?.package;
  
  console.log(iosBundleId ? '✅' : '❌', `iOS Bundle ID: ${iosBundleId || 'NOT SET'}`);
  console.log(androidPackage ? '✅' : '❌', `Android Package: ${androidPackage || 'NOT SET'}`);
  
  if (!iosBundleId || !androidPackage) {
    allChecksPassed = false;
  }
  
  // Check versions
  console.log('✅', `Version: ${appJson.expo?.version || 'NOT SET'}`);
  console.log('✅', `iOS Build Number: ${appJson.expo?.ios?.buildNumber || 'NOT SET'}`);
  console.log('✅', `Android Version Code: ${appJson.expo?.android?.versionCode || 'NOT SET'}`);
}
console.log('');

// 4. Dependencies
console.log('📦 Dependencies:');
const packageJsonPath = path.join(__dirname, '../package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const deps = packageJson.dependencies || {};
  
  const requiredDeps = [
    'expo',
    'react',
    'react-native',
    'expo-notifications',
    '@react-native-async-storage/async-storage'
  ];
  
  requiredDeps.forEach(dep => {
    const installed = deps[dep] !== undefined;
    console.log(installed ? '✅' : '❌', dep);
    if (!installed) allChecksPassed = false;
  });
}
console.log('');

// 5. Documentation
console.log('📚 Documentation:');
checkFile(path.join(__dirname, '../PRIVACY_POLICY.md'), 'Privacy Policy', true);
checkFile(path.join(__dirname, '../README.md'), 'README', false);
checkFile(path.join(__dirname, '../DEPLOYMENT_GUIDE.md'), 'Deployment Guide', false);
console.log('');

// 6. EAS CLI
console.log('🛠️  Tools:');
try {
  const { execSync } = require('child_process');
  const easVersion = execSync('eas --version', { encoding: 'utf8' }).trim();
  console.log('✅', `EAS CLI installed: ${easVersion}`);
} catch (e) {
  console.log('❌', 'EAS CLI not installed');
  console.log('   💡 Run: npm install -g eas-cli');
  allChecksPassed = false;
}
console.log('');

// 7. Git
console.log('📝 Version Control:');
if (fs.existsSync(path.join(__dirname, '../.git'))) {
  console.log('✅', 'Git repository initialized');
} else {
  console.log('⚠️ ', 'Git repository not initialized (optional)');
  warnings.push('Git not initialized');
}
console.log('');

// Summary
console.log('═══════════════════════════════════════\n');

if (warnings.length > 0) {
  console.log('⚠️  Warnings:');
  warnings.forEach(w => console.log(`   - ${w}`));
  console.log('');
}

if (allChecksPassed) {
  console.log('✅ ✅ ✅  ALL CHECKS PASSED! ✅ ✅ ✅\n');
  console.log('🚀 Your project is ready for deployment!\n');
  console.log('Next steps:');
  console.log('   1. eas login');
  console.log('   2. eas build --platform android --profile production');
  console.log('   3. eas build --platform ios --profile production\n');
} else {
  console.log('❌ SOME CHECKS FAILED\n');
  console.log('Please fix the issues above before deploying.\n');
  console.log('💡 Common fixes:');
  console.log('   - Missing assets? Run: node scripts/convert-assets.js');
  console.log('   - No EAS project? Run: eas init');
  console.log('   - Missing EAS CLI? Run: npm install -g eas-cli\n');
  process.exit(1);
}
