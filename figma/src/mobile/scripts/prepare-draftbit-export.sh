#!/bin/bash

# Draftbit Export Preparation Script for Club5 AI
# This script prepares the project for Draftbit export

echo "🚀 Preparing Club5 AI for Draftbit Export..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean up
echo -e "${BLUE}📦 Step 1: Cleaning up...${NC}"
rm -rf node_modules
rm -rf .expo
rm -rf .expo-shared
rm -rf ios
rm -rf android
rm -rf club5-ai-export
rm -f club5-ai-draftbit.zip
echo -e "${GREEN}✅ Cleanup complete${NC}"
echo ""

# Step 2: Create export directory
echo -e "${BLUE}📁 Step 2: Creating export directory...${NC}"
mkdir -p club5-ai-export
echo -e "${GREEN}✅ Directory created${NC}"
echo ""

# Step 3: Copy essential files
echo -e "${BLUE}📋 Step 3: Copying files...${NC}"

# Copy main files
cp App.tsx club5-ai-export/
cp babel.config.js club5-ai-export/
cp tsconfig.json club5-ai-export/

# Copy Draftbit configs
cp package.draftbit.json club5-ai-export/package.json
cp app.draftbit.json club5-ai-export/app.json
cp draftbit.config.js club5-ai-export/

# Copy directories
cp -r src club5-ai-export/
cp -r assets club5-ai-export/

echo -e "${GREEN}✅ Files copied${NC}"
echo ""

# Step 4: Create README for export
echo -e "${BLUE}📝 Step 4: Creating README...${NC}"
cat > club5-ai-export/README.md << 'EOF'
# Club5 AI - Draftbit Ready Export

## 🎉 Welcome to Club5 AI!

This is a **Draftbit-ready** export of Club5 AI mobile app.

### 📱 What's Included:

- **5 Screens:** Onboarding, Home, Momentum, Coach, Settings
- **9 Components:** CheckInButton, CoachAvatar, StatCard, MomentumCalendar, and more
- **6 Languages:** English, Hebrew, Spanish, German, French, Chinese
- **Features:** Dark mode, Focus mode, i18n, AsyncStorage
- **Navigation:** React Navigation v6 (Stack + Bottom Tabs)

### 🚀 Import to Draftbit:

1. Go to [Draftbit.com](https://draftbit.com)
2. Create New Project → Import from Code
3. Upload this entire folder (or zip it first)
4. Draftbit will detect Expo 51 + TypeScript
5. Start building!

### 📦 First Install:

```bash
npm install
npm start
```

### 📚 Documentation:

- See `draftbit.config.js` for full configuration
- See `DRAFTBIT_EXPORT_GUIDE.md` for detailed instructions

### 🎨 Theme:

- Primary: #FF7A00 (Orange)
- Secondary: #6A5AE0 (Purple)
- Background: #FFF9F5 (Cream)

### ✨ Made with ❤️ for Draftbit

**Happy Building!** 🚀
EOF
echo -e "${GREEN}✅ README created${NC}"
echo ""

# Step 5: Create .draftbitrc
echo -e "${BLUE}⚙️  Step 5: Creating .draftbitrc...${NC}"
cat > club5-ai-export/.draftbitrc << 'EOF'
{
  "version": "1.0.0",
  "projectName": "Club5 AI",
  "projectSlug": "club5-ai",
  "expoSdkVersion": "51.0.0",
  "compatibility": "2024.1",
  "entryPoint": "App.tsx",
  "platform": {
    "ios": true,
    "android": true,
    "web": false
  },
  "features": {
    "navigation": "react-navigation-v6",
    "stateManagement": "context-api",
    "storage": "async-storage",
    "i18n": true,
    "darkMode": true,
    "typescript": true
  },
  "screens": {
    "count": 5,
    "list": [
      "OnboardingScreen",
      "HomeScreen",
      "MomentumScreen",
      "CoachChatScreen",
      "SettingsScreen"
    ]
  },
  "components": {
    "count": 9,
    "list": [
      "CheckInButton",
      "CoachAvatar",
      "StatCard",
      "MomentumCalendar",
      "ConfettiAnimation",
      "TimePicker",
      "TimeChip",
      "LanguageSelector",
      "FocusModeBanner"
    ]
  }
}
EOF
echo -e "${GREEN}✅ .draftbitrc created${NC}"
echo ""

# Step 6: Create import instructions
echo -e "${BLUE}📖 Step 6: Creating import instructions...${NC}"
cat > club5-ai-export/IMPORT_TO_DRAFTBIT.md << 'EOF'
# 🚀 Import to Draftbit - Quick Guide

## Method 1: Upload Folder

1. Zip this folder:
   ```bash
   zip -r club5-ai-draftbit.zip .
   ```

2. Go to Draftbit.com → New Project

3. Choose "Import from Code"

4. Upload `club5-ai-draftbit.zip`

5. Draftbit will scan and import (30-60 seconds)

6. Done! Start editing in visual builder

## Method 2: GitHub

1. Create new repo and push:
   ```bash
   git init
   git add .
   git commit -m "Initial Draftbit import"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

2. In Draftbit → Import from Git

3. Enter your GitHub URL

4. Draftbit syncs automatically

## What Draftbit Will Detect:

- ✅ Expo SDK 51
- ✅ TypeScript
- ✅ React Navigation v6
- ✅ 5 Screens
- ✅ 9 Components
- ✅ AsyncStorage
- ✅ i18n (6 languages)
- ✅ Dark mode
- ✅ Custom theme

## Next Steps:

1. Open any screen in visual editor
2. Drag & drop to customize UI
3. Preview in Expo Go
4. Export or publish!

**Happy Building!** 🎉
EOF
echo -e "${GREEN}✅ Import instructions created${NC}"
echo ""

# Step 7: Validate structure
echo -e "${BLUE}🔍 Step 7: Validating structure...${NC}"

validate_file() {
    if [ -f "club5-ai-export/$1" ]; then
        echo -e "  ${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "  ${RED}✗${NC} $1 ${RED}(missing)${NC}"
        return 1
    fi
}

validate_dir() {
    if [ -d "club5-ai-export/$1" ]; then
        echo -e "  ${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "  ${RED}✗${NC} $1/ ${RED}(missing)${NC}"
        return 1
    fi
}

echo "Files:"
validate_file "App.tsx"
validate_file "package.json"
validate_file "app.json"
validate_file "draftbit.config.js"
validate_file "babel.config.js"
validate_file "tsconfig.json"
validate_file "README.md"
validate_file ".draftbitrc"

echo ""
echo "Directories:"
validate_dir "src"
validate_dir "src/screens"
validate_dir "src/components"
validate_dir "src/navigation"
validate_dir "src/context"
validate_dir "src/utils"
validate_dir "src/constants"
validate_dir "src/types"
validate_dir "src/i18n"
validate_dir "assets"

echo ""

# Step 8: Create zip
echo -e "${BLUE}📦 Step 8: Creating zip archive...${NC}"
cd club5-ai-export
zip -r ../club5-ai-draftbit.zip . > /dev/null 2>&1
cd ..
echo -e "${GREEN}✅ Zip created: club5-ai-draftbit.zip${NC}"
echo ""

# Step 9: Summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Draftbit Export Ready!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📦 Export Package:${NC} club5-ai-draftbit.zip"
echo -e "${BLUE}📁 Export Folder:${NC} club5-ai-export/"
echo ""
echo -e "${YELLOW}📤 Next Steps:${NC}"
echo "  1. Go to Draftbit.com"
echo "  2. New Project → Import from Code"
echo "  3. Upload: club5-ai-draftbit.zip"
echo "  4. Start building!"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "  - See: DRAFTBIT_EXPORT_GUIDE.md"
echo "  - See: club5-ai-export/IMPORT_TO_DRAFTBIT.md"
echo ""
echo -e "${GREEN}✨ Happy Building with Draftbit! ✨${NC}"
echo ""
