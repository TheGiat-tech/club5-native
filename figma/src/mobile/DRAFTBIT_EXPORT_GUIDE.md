# 🚀 Draftbit Export Guide - Club5 AI

## 📦 הכנת הפרויקט לייצוא ל-Draftbit

האפליקציה **מוכנה לייצוא מלא ל-Draftbit**! מדריך זה יעזור לך לייצא את הפרויקט.

---

## ✅ מה כלול?

### **🎯 תצורה מלאה:**
- `draftbit.config.js` - תצורת Draftbit
- `package.draftbit.json` - package.json מותאם
- `app.draftbit.json` - app.json מותאם

### **📱 5 מסכים:**
1. **OnboardingScreen** - Onboarding flow
2. **HomeScreen** - Check-in & daily stats
3. **MomentumScreen** - Streak & momentum tracking
4. **CoachChatScreen** - AI coach chat
5. **SettingsScreen** - Settings & preferences

### **🧩 9 Components:**
1. **CheckInButton** - Animated check-in button
2. **CoachAvatar** - Coach avatar display
3. **StatCard** - Statistics card
4. **MomentumCalendar** - 7-day calendar
5. **ConfettiAnimation** - Celebration animation
6. **TimePicker** - Time selection
7. **TimeChip** - Time display chip
8. **LanguageSelector** - Language picker
9. **FocusModeBanner** - Focus mode banner

### **🌍 6 שפות:**
- 🇺🇸 English
- 🇮🇱 עברית
- 🇪🇸 Español
- 🇩🇪 Deutsch
- 🇫🇷 Français
- 🇨🇳 中文

---

## 📋 שלבי הייצוא

### **שלב 1: הכנת הפרויקט**

```bash
cd mobile

# התקן dependencies
npm install

# וודא שהכל עובד
npm start
```

### **שלב 2: ניקוי הפרויקט**

```bash
# נקה node_modules (לא צריך לייצא)
rm -rf node_modules

# נקה .expo cache
rm -rf .expo
rm -rf .expo-shared

# נקה builds (אם יש)
rm -rf ios
rm -rf android
```

### **שלב 3: יצירת ארכיון ייצוא**

צור תיקייה חדשה עם הקבצים הנדרשים:

```bash
# יצירת תיקיית export
mkdir -p club5-ai-export

# העתק את הקבצים החשובים
cp -r src club5-ai-export/
cp -r assets club5-ai-export/
cp App.tsx club5-ai-export/
cp package.draftbit.json club5-ai-export/package.json
cp app.draftbit.json club5-ai-export/app.json
cp draftbit.config.js club5-ai-export/
cp babel.config.js club5-ai-export/
cp tsconfig.json club5-ai-export/

# יצירת zip
zip -r club5-ai-draftbit.zip club5-ai-export/
```

---

## 🎨 Draftbit Import Process

### **Option 1: ייבוא ידני ב-Draftbit**

1. **פתח Draftbit** → New Project
2. **בחר:** "Import from Code"
3. **העלה:** `club5-ai-draftbit.zip`
4. **Draftbit יזהה אוטומטית:**
   - Expo SDK 51
   - React Navigation v6
   - TypeScript
   - כל ה-screens וה-components

### **Option 2: Git Repository**

1. **צור Git repo:**
```bash
cd club5-ai-export
git init
git add .
git commit -m "Initial Draftbit export"
```

2. **העלה ל-GitHub:**
```bash
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

3. **ב-Draftbit:**
   - New Project → Import from Git
   - הזן את ה-GitHub URL
   - Draftbit יסנכרן אוטומטית

---

## 🔧 התאמות נדרשות ב-Draftbit

### **1. API Keys (אם יש)**

אין צורך! האפליקציה עובדת **local-only** ללא backend.

### **2. AsyncStorage**

Draftbit תומך ב-AsyncStorage מתוך הקופסה. הכל יעבוד!

### **3. Navigation**

Navigation מוגדר ב-`draftbit.config.js`:
- Stack Navigator לאונבורדינג
- Bottom Tabs למסכים הראשיים

### **4. i18n**

מערכת ה-i18n מוכנה:
- 6 שפות ב-`src/i18n/locales/`
- Auto-detection של שפת מכשיר
- Switching ב-Settings

---

## 📂 מבנה הפרויקט ל-Draftbit

```
club5-ai-export/
├── App.tsx                         ← Entry point
├── app.json                        ← Expo config
├── package.json                    ← Dependencies
├── draftbit.config.js              ← Draftbit config
├── babel.config.js                 ← Babel config
├── tsconfig.json                   ← TypeScript config
│
├── assets/                         ← Images & fonts
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
│
└── src/
    ├── screens/                    ← 5 Screens
    │   ├── OnboardingScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── MomentumScreen.tsx
    │   ├── CoachChatScreen.tsx
    │   └── SettingsScreen.tsx
    │
    ├── components/                 ← 9 Components
    │   ├── CheckInButton.tsx
    │   ├── CoachAvatar.tsx
    │   ├── StatCard.tsx
    │   ├── MomentumCalendar.tsx
    │   ├── ConfettiAnimation.tsx
    │   ├── TimePicker.tsx
    │   ├── TimeChip.tsx
    │   ├── LanguageSelector.tsx
    │   └── FocusModeBanner.tsx
    │
    ├── navigation/
    │   └── MainNavigator.tsx
    │
    ├── context/
    │   └── AppContext.tsx          ← Global state
    │
    ├── i18n/
    │   ├── index.ts
    │   └── locales/
    │       ├── en.json
    │       ├── he.json
    │       ├── es.json
    │       ├── de.json
    │       ├── fr.json
    │       └── zh.json
    │
    ├── utils/
    │   ├── dateUtils.ts
    │   ├── coachAI.ts
    │   └── validation.ts
    │
    ├── constants/
    │   └── theme.ts
    │
    └── types/
        └── index.ts
```

---

## 🎯 Draftbit Compatibility

### ✅ **תואם לחלוטין:**
- ✅ Expo SDK 51
- ✅ React Native 0.74
- ✅ React Navigation v6
- ✅ TypeScript
- ✅ AsyncStorage
- ✅ Expo Linear Gradient
- ✅ Expo Vector Icons
- ✅ React Native SVG
- ✅ React Native Reanimated
- ✅ i18next

### ⚠️ **דורש התאמה קלה:**
- ⚠️ Notifications - Draftbit תומך, אבל צריך להגדיר
- ⚠️ Expo Updates - לא נדרש ל-MVP

### ❌ **לא תואם (לא בשימוש):**
- ❌ Native Modules מותאמים אישית (אין)
- ❌ Backend/API (לא בשימוש - local only)

---

## 🔑 Features ב-Draftbit

### **Drag & Drop Editor:**
Draftbit תאפשר לך:
- ✏️ לערוך את ה-UI ויזואלית
- 🎨 לשנות צבעים/גופנים
- 📱 לראות preview בזמן אמת
- 🧩 להוסיף components חדשים

### **Data Sources:**
כרגע: AsyncStorage (local)  
אפשר להוסיף:
- REST API
- GraphQL
- Firebase
- Supabase

### **Visual Builder:**
- Screen builder
- Component builder
- Navigation builder
- Theme builder

---

## 🎨 תצורת Theme ב-Draftbit

ה-theme מוגדר ב-`draftbit.config.js`:

```javascript
theme: {
  colors: {
    light: {
      primary: '#FF7A00',
      secondary: '#6A5AE0',
      background: '#FFF9F5',
      // ... עוד צבעים
    },
    dark: {
      primary: '#FF7A00',
      secondary: '#8B7EF0',
      background: '#1A1A1A',
      // ... עוד צבעים
    },
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32
  },
  borderRadius: {
    sm: 8, md: 12, lg: 16, xl: 24, full: 9999
  },
}
```

Draftbit תזהה את זה ותיצור **Design System** אוטומטי!

---

## 📝 Checklist לייצוא

### **לפני ייצוא:**
- [x] `npm install` הורץ
- [x] האפליקציה עובדת (`npm start`)
- [x] כל ה-dependencies מותקנים
- [x] אין errors ב-console
- [x] TypeScript עובר (`tsc --noEmit`)

### **קבצי תצורה:**
- [x] `draftbit.config.js` קיים
- [x] `package.draftbit.json` קיים
- [x] `app.draftbit.json` קיים

### **מבנה:**
- [x] `src/` directory מאורגן
- [x] `assets/` directory מאורגן
- [x] `App.tsx` entry point
- [x] Navigation מוגדר

### **ניקוי:**
- [x] `node_modules/` נמחק
- [x] `.expo/` נמחק
- [x] `ios/` `android/` נמחקו (אם יש)

---

## 🚀 Import ב-Draftbit - שלב אחר שלב

### **1. הכן את הארכיון:**
```bash
# מתוך /mobile
bash scripts/prepare-draftbit-export.sh
```

זה יצור: `club5-ai-draftbit.zip`

### **2. ב-Draftbit:**

1. **לך ל-Draftbit.com** → Sign In
2. **New Project** → "Import from Code"
3. **Upload** את `club5-ai-draftbit.zip`
4. **Draftbit יסרוק** את הקוד (30-60 שניות)
5. **אישור:** Structure detected ✅
6. **Import** → לחץ "Import Project"

### **3. אחרי Import:**

Draftbit תראה:
- 📱 5 Screens
- 🧩 9 Components
- 🎨 Theme System
- 🧭 Navigation
- 🌍 i18n (6 שפות)

### **4. בניית UI ב-Draftbit:**

עכשיו אפשר:
- לפתוח כל screen
- לערוך בעורך ויזואלי
- לשנות צבעים/סגנונות
- להוסיף components חדשים
- לבדוק ב-Preview

---

## 🎁 Bonus: Draftbit Features

### **Live Preview:**
```
Draftbit Editor → Preview (iOS/Android)
↓
סרוק QR code ב-Expo Go
↓
התצוגה משתנה בזמן אמת!
```

### **Collaboration:**
- שתף את הפרויקט
- עבוד עם צוות
- Comments & Reviews

### **Export מ-Draftbit:**
אם תרצה לחזור לקוד:
- Export → Download Code
- תקבל את כל הקוד מעודכן
- ניתן להמשיך מקומית

---

## 🐛 Troubleshooting

### **בעיה 1: Import נכשל**

**סיבה:** קבצים חסרים

**פתרון:**
```bash
# וודא שכל הקבצים קיימים:
ls club5-ai-export/App.tsx
ls club5-ai-export/package.json
ls club5-ai-export/app.json
ls -la club5-ai-export/src/
```

### **בעיה 2: Dependencies errors**

**סיבה:** גרסאות לא תואמות

**פתרון:**
השתמש ב-`package.draftbit.json` שכבר מוכן!

### **בעיה 3: Navigation לא עובד**

**סיבה:** Navigation config

**פתרון:**
וודא ש-`draftbit.config.js` כלול בייצוא.

---

## 📚 משאבים

### **Draftbit Docs:**
- [Import Guide](https://docs.draftbit.com/docs/importing-code)
- [Expo Projects](https://docs.draftbit.com/docs/expo)
- [TypeScript Support](https://docs.draftbit.com/docs/typescript)

### **Club5 AI Docs:**
- `README.md` - הסבר כללי
- `QUICK_START.md` - התחלה מהירה
- `DEPLOYMENT_GUIDE.md` - פריסה
- `I18N_GUIDE.md` - i18n מדריך

---

## ✅ סיכום

### **האפליקציה מוכנה לייצוא!**

```bash
# 1. הכן:
cd mobile
npm install

# 2. נקה:
rm -rf node_modules .expo

# 3. ייצא:
bash scripts/prepare-draftbit-export.sh

# 4. ייבא ב-Draftbit:
# Upload → club5-ai-draftbit.zip
```

### **מה תקבל ב-Draftbit:**
- ✅ 5 screens מוכנים
- ✅ 9 components מעוצבים
- ✅ Navigation מוגדר
- ✅ Theme system מלא
- ✅ i18n (6 שפות)
- ✅ AsyncStorage
- ✅ Dark mode
- ✅ Focus mode

---

<div align="center">

## 🚀 הכל מוכן לייצוא!

**Draftbit → Import → Upload → Done!**

### 🎨 Build with Draftbit's Visual Editor

**Made for Draftbit** ✨

</div>
