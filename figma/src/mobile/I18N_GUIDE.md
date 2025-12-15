# 🌍 Internationalization (i18n) Guide - Club5 AI

## תמיכה ברבי-לשוניות מלאה!

Club5 AI תומך כעת ב-**6 שפות**:
- 🇺🇸 English
- 🇮🇱 עברית (Hebrew)
- 🇪🇸 Español (Spanish)
- 🇩🇪 Deutsch (German)
- 🇫🇷 Français (French)
- 🇨🇳 中文 (Chinese)

---

## 📦 מה נוצר?

### 1. **מערכת i18n מלאה**
```
/mobile/src/i18n/
├── index.ts              # Configuration & helpers
└── locales/
    ├── en.json          # English
    ├── he.json          # Hebrew
    ├── es.json          # Spanish
    ├── de.json          # German
    ├── fr.json          # French
    └── zh.json          # Chinese
```

### 2. **Language Selector Component**
```
/mobile/src/components/LanguageSelector.tsx
```
קומפוננטה מעוצבת עם modal לבחירת שפה.

### 3. **עדכון Dependencies**
```json
{
  "i18next": "^23.7.0",
  "react-i18next": "^13.5.0"
}
```

---

## 🚀 התקנה

### 1. התקן packages:
```bash
cd mobile
npm install
```

זה יתקין את:
- `i18next` - ספריית i18n
- `react-i18next` - React bindings

### 2. יבוא i18n ב-App:

בתחילת `App.tsx` (או `App.ts`):

```typescript
import './src/i18n'; // Import i18n configuration
import { useTranslation } from 'react-i18next';
```

### 3. שימוש בקומפוננטות:

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('home.goodMorning')}</Text>
    // Output: "Good Morning" (or translated version)
  );
}
```

---

## 📖 איך להשתמש?

### בסיסי - Translation

```typescript
import { useTranslation } from 'react-i18next';

function HomeScreen() {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('home.goodMorning')}</Text>
      <Text>{t('home.streak')}</Text>
    </View>
  );
}
```

### עם משתנים (Interpolation)

```typescript
const { t } = useTranslation();
const userName = 'John';

return (
  <Text>
    {t('checkIn.success', { name: userName })}
    {/* Output: "Great job, John!" */}
  </Text>
);
```

### שינוי שפה

```typescript
const { i18n } = useTranslation();

// Change language
await i18n.changeLanguage('he'); // Hebrew
await i18n.changeLanguage('es'); // Spanish

// Get current language
const currentLang = i18n.language; // 'en', 'he', etc.
```

### בורר שפה (Language Selector)

```typescript
import { LanguageSelector } from './components/LanguageSelector';

function SettingsScreen() {
  const { i18n } = useTranslation();

  return (
    <LanguageSelector
      value={i18n.language}
      onChange={(lang) => i18n.changeLanguage(lang)}
    />
  );
}
```

---

## 🎨 הוספת שפה חדשה

רוצה להוסיף איטלקית? הנה איך:

### 1. צור קובץ תרגום חדש:

`/mobile/src/i18n/locales/it.json`:

```json
{
  "common": {
    "appName": "Club5 AI",
    "ok": "OK",
    "cancel": "Annulla",
    ...
  },
  "home": {
    "goodMorning": "Buongiorno",
    ...
  }
}
```

**טיפ:** העתק `en.json` והחלף את הערכים.

### 2. יבוא ב-`i18n/index.ts`:

```typescript
import it from './locales/it.json';

i18n.init({
  resources: {
    en: { translation: en },
    he: { translation: he },
    it: { translation: it }, // Add this
  },
});
```

### 3. הוסף ל-AVAILABLE_LANGUAGES:

```typescript
export const AVAILABLE_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }, // Add this
];
```

**זהו!** השפה תופיע בבורר אוטומטית.

---

## 🔑 מפתח Translation Keys

### Common (נפוץ)
```
common.appName
common.ok
common.cancel
common.save
common.delete
common.loading
```

### Home (בית)
```
home.goodMorning
home.goodEvening
home.checkIn
home.streak
home.total
home.success
```

### Check-in (צ'ק-אין)
```
checkIn.success
checkIn.successMessage
checkIn.tooEarly
checkIn.alreadyDone
```

### Coach (מאמן)
```
coach.title
coach.dailyWisdom
coach.deepMode
coach.startSession
```

### Progress (התקדמות)
```
progress.title
progress.calendar
progress.stats
progress.milestones
```

### Settings (הגדרות)
```
settings.title
settings.language
settings.theme
settings.notifications
```

### Tabs (לשוניות)
```
tabs.home
tabs.progress
tabs.coach
tabs.settings
```

**ראה את הקבצים המלאים ב-`/mobile/src/i18n/locales/`**

---

## 🧪 בדיקה

### בדוק שפה ספציפית:

```typescript
// In your component or App.tsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Force a language for testing
    i18n.changeLanguage('he'); // Test Hebrew
  }, []);

  return <MainApp />;
}
```

### בדוק שינוי שפה:

1. פתח Settings
2. לחץ על Language
3. בחר שפה
4. ודא שכל הטקסטים משתנים

---

## 💾 שמירה אוטומטית

השפה נשמרת אוטומטית ב-AsyncStorage!

```typescript
// Automatically saved when you change language
await i18n.changeLanguage('es');

// Next app launch - language restored automatically
```

---

## 🎯 Best Practices

### 1. השתמש במפתחות תיאוריים

❌ **רע:**
```typescript
t('text1')
t('str_3')
```

✅ **טוב:**
```typescript
t('home.goodMorning')
t('checkIn.success')
```

### 2. קיבוץ לפי מסכים

```json
{
  "home": { ... },
  "settings": { ... },
  "coach": { ... }
}
```

### 3. השתמש ב-Interpolation

```typescript
// Translation
"welcome": "Hello {{name}}!"

// Usage
t('welcome', { name: 'John' })
// Output: "Hello John!"
```

### 4. Plurals (רבים)

```json
{
  "days": "day",
  "days_plural": "days"
}
```

```typescript
t('days', { count: 1 }) // "1 day"
t('days', { count: 5 }) // "5 days"
```

### 5. Fallback

אם תרגום לא קיים, i18next יחזור לאנגלית אוטומטית.

---

## 🌐 RTL Support (עברית, ערבית)

אם תרצה תמיכה מלאה ב-RTL:

### 1. התקן expo-localization:

```bash
npx expo install expo-localization
```

### 2. זהה RTL:

```typescript
import * as Localization from 'expo-localization';

const isRTL = Localization.isRTL; // true for Hebrew/Arabic
```

### 3. החל RTL:

```typescript
import { I18nManager } from 'react-native';

if (isRTL) {
  I18nManager.forceRTL(true);
}
```

**שים לב:** דורש restart של האפליקציה.

---

## 📱 Store Listings בשפות נוספות

רוצה לפרסם באפסטור בשפות נוספות?

### Google Play:

1. Play Console → **Store listing**
2. **Add translation** → בחר שפה
3. העתק את התרגומים מ-`/mobile/store-listings/multilingual/`

### App Store:

1. App Store Connect → **App Information**
2. **Add Language** → בחר שפה
3. מלא description, keywords בשפה הזו

---

## 🔧 Troubleshooting

### בעיה: טקסטים לא משתנים

**פתרון:**
```bash
# Clear cache
rm -rf node_modules
npm install
npx expo start --clear
```

### בעיה: Translation key missing

אם רואה: `home.welcome` במקום טקסט מתורגם:

1. בדוק ש-key קיים ב-`en.json`
2. בדוק ש-file מיובא נכון ב-`i18n/index.ts`
3. בדוק שאין typos

### בעיה: שפה לא משתנה

```typescript
// Force change
await i18n.changeLanguage('he', () => {
  console.log('Language changed!');
});

// Check if changed
console.log('Current lang:', i18n.language);
```

---

## 📊 תרגום סטטיסטיקות

| שפה | אחוז השלמה | מתרגם |
|-----|-----------|--------|
| 🇺🇸 English | 100% | Base |
| 🇮🇱 עברית | 100% | ✅ |
| 🇪🇸 Español | 100% | ✅ |
| 🇩🇪 Deutsch | 100% | ✅ |
| 🇫🇷 Français | 100% | ✅ |
| 🇨🇳 中文 | 100% | ✅ |

**כל השפות מוכנות לשימוש!** 🎉

---

## 🎁 Bonus: Testing All Languages

רוצה לראות את כל השפות?

```typescript
import { AVAILABLE_LANGUAGES } from './src/i18n';

function LanguageTest() {
  const { i18n, t } = useTranslation();

  return (
    <ScrollView>
      {AVAILABLE_LANGUAGES.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => i18n.changeLanguage(lang.code)}
        >
          <Text>{lang.flag} {lang.name}</Text>
          <Text>{t('home.goodMorning')}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
```

---

## 🚀 Ready to Go!

**כל מה שצריך כדי להוסיף תמיכה בשפות:**

✅ 6 שפות מוכנות  
✅ Language Selector יפה  
✅ שמירה אוטומטית  
✅ זיהוי שפת מכשיר  
✅ Documentation מלא  

**פשוט תריץ:**
```bash
npm install
npm start
```

**וזה עובד!** 🎊

---

## 📞 Need More Help?

- **i18next Docs:** https://www.i18next.com/
- **React i18next:** https://react.i18next.com/
- **Expo Localization:** https://docs.expo.dev/versions/latest/sdk/localization/

---

**תהנה מתמיכה בריבוי שפות!** 🌍✨
