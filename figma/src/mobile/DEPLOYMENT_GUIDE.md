# 🚀 Club5 AI - מדריך פרסום מלא

## 📋 תוכן עניינים
1. [הכנה ראשונית](#הכנה-ראשונית)
2. [הגדרת EAS](#הגדרת-eas)
3. [יצירת גרפיקה](#יצירת-גרפיקה)
4. [פרסום לאנדרואיד](#פרסום-לאנדרואיד)
5. [פרסום ל-iOS](#פרסום-ל-ios)
6. [עדכונים OTA](#עדכונים-ota)
7. [FAQ](#faq)

---

## 🎯 הכנה ראשונית

### 1. התקנת EAS CLI
```bash
npm install -g eas-cli
```

### 2. התחברות לחשבון Expo
```bash
eas login
```

אם אין לך חשבון:
```bash
eas register
```

### 3. התקנת Dependencies
```bash
cd mobile
npm install
```

### 4. יצירת פרויקט EAS
```bash
eas init
```

זה יוצר `projectId` ומעדכן את `app.json`.

---

## ⚙️ הגדרת EAS

### עדכון app.json

החלף את `YOUR_EAS_PROJECT_ID_HERE` ב-`projectId` שקיבלת:

```json
"extra": {
  "eas": {
    "projectId": "abc123-def456-ghi789"
  }
}
```

### הגדרת Bundle Identifiers

**iOS:**
- `bundleIdentifier`: `com.club5ai.app` (או `com.yourcompany.club5ai`)

**Android:**
- `package`: `com.club5ai.app` (או `com.yourcompany.club5ai`)

⚠️ **חשוב:** אלה צריכים להיות ייחודיים ולא להשתנות אחרי פרסום!

---

## 🎨 יצירת גרפיקה

### נדרש:

#### 1. App Icon - `assets/icon.png`
- **גודל:** 1024×1024px
- **פורמט:** PNG (ללא שקיפות)
- **עיצוב:** לוגו Club5 AI על רקע מוצק

#### 2. Splash Screen - `assets/splash.png`
- **גודל:** 2048×2732px
- **פורמט:** PNG
- **עיצוב:** לוגו מרכזי על רקע גרדיאנט (#FFF9F5)

#### 3. Adaptive Icon (Android) - `assets/adaptive-icon.png`
- **גודל:** 1024×1024px
- **פורמט:** PNG (ללא שקיפות)
- **עיצוב:** רק האייקון המרכזי (ללא רקע)

#### 4. Notification Icon - `assets/notification-icon.png`
- **גודל:** 96×96px
- **פורמט:** PNG (שקוף)
- **עיצוב:** סמל פשוט בלבן

#### 5. Favicon (Web) - `assets/favicon.png`
- **גודל:** 48×48px
- **פורמט:** PNG

### כלים מומלצים:
- [Figma](https://figma.com) - עיצוב
- [makeappicon.com](https://makeappicon.com) - יצירת כל הגדלים
- [appicon.co](https://appicon.co) - אלטרנטיבה

---

## 🤖 פרסום לאנדרואיד (Google Play)

### שלב 1: יצירת חשבון Google Play Console

1. כניסה ל-[Google Play Console](https://play.google.com/console)
2. תשלום חד-פעמי: **$25**
3. אישור מפתח (24-48 שעות)

### שלב 2: בניית AAB

```bash
# בנייה לפרודקשן
eas build --platform android --profile production

# או רק לבדיקה (APK)
eas build --platform android --profile preview
```

תהליך ה-build לוקח ~10-20 דקות.

### שלב 3: הורדת AAB

כשה-build מסתיים, תקבל:
- Link להורדת `.aab`
- או הרץ: `eas build:list`

### שלב 4: יצירת אפליקציה ב-Play Console

1. **Create app**
2. פרטים בסיסיים:
   - שם: **Club5 AI**
   - שפה ברירת מחדל: **עברית**
   - אפליקציה/משחק: **אפליקציה**
   - חינם/בתשלום: **חינם**

### שלב 5: Store Listing

#### טקסטים:

**כותרת קצרה** (80 תווים):
```
Club5 AI - בן לוויה מוטיבציוני להשכמה ב-5:00
```

**תיאור מלא** (4000 תווים):
```
🌅 התעוררו למציאות חדשה עם Club5 AI

Club5 AI הוא בן הלוויה המוטיבציוני שלכם להצטרפות למועדון האקסקלוסיבי של מי שמתעוררים ב-5:00 בבוקר. 

✨ פיצ'רים עיקריים:

🔥 צ'ק-אין יומי פשוט
- לחצו "I'm Awake" בכל בוקר
- קבלו אנימציות מוטיבציוניות
- בנו רצף (streak) מרשים

🤖 מאמן AI אישי
- בחרו בין נטלי למקס
- קבלו הדרכה אמפתית ומותאמת אישית
- סשני Deep Mode לרגעים קשים

📊 מעקב התקדמות
- לוח שנה חזותי של 30 יום
- מדדי הצלחה ואבני דרך
- תובנות ממוקדות

⚙️ התאמה אישית מלאה
- בחירת שעת השכמה
- תמות Light/Dark/Auto
- התראות חכמות

💪 למה 5:00 בבוקר?
מחקרים מוכיחים שהתעוררות מוקדמת משפרת פרודוקטיביות, בריאות נפשית ותחושת שליטה ביום.

הצטרפו אלפי אנשים שכבר שינו את חייהם עם Club5 AI!

---

🔒 פרטיות מובטחת
כל המידע שלכם נשמר מקומית במכשיר. אנחנו לא שולחים או משתפים שום מידע אישי.

📧 תמיכה: support@club5ai.com
🌐 אתר: www.club5ai.com
```

**תיאור קצר** (80 תווים):
```
בן לוויה מוטיבציוני להשכמה ב-5:00 עם מאמן AI אישי
```

#### גרפיקה:

**צילומי מסך** (לפחות 2, מומלץ 4-8):
1. מסך הבית עם כפתור "I'm Awake"
2. מסך המאמן עם Deep Mode
3. מסך ההתקדמות עם calendar
4. מסך ה-Settings

**Feature Graphic** (1024×500):
- תמונת כיסוי עם לוגו ו-tagline

**אייקון** (512×512):
- זהה לאייקון האפליקציה

#### קטגוריה:
- ראשית: **Productivity**
- משנית: **Health & Fitness**

### שלב 6: Content Rating

1. לחץ על **Start questionnaire**
2. ענה על השאלות:
   - אלימות? **לא**
   - תוכן מיני? **לא**
   - שפה בוטה? **לא**
   - סמים/אלכוהול? **לא**
   - משחקי הימורים? **לא**

### שלב 7: Privacy Policy

**חובה!** צור דף Privacy Policy ופרסם אותו.

**טמפלייט פשוט:**
```
Privacy Policy for Club5 AI

All user data is stored locally on your device using AsyncStorage.
We do not collect, transmit, or share any personal information.
No third-party analytics or tracking.

Contact: privacy@club5ai.com
Last updated: [TODAY'S DATE]
```

העלה ל-GitHub Pages או כל אתר אחר וקבל URL.

### שלב 8: Upload AAB

1. **Production** → **Create new release**
2. Upload את ה-`.aab` שהורדת
3. **Release name:** `1.0.0 - Initial Release`
4. **Release notes:**
```
🎉 First release of Club5 AI!

✨ Features:
- Daily check-in tracking
- AI life coach (Natalie & Max)
- 30-day momentum calendar
- Customizable wake time
- Dark mode support
```

### שלב 9: שליחה לאישור

1. **Review** → **Start rollout to Production**
2. אישור Google: **1-7 ימים**

---

## 🍎 פרסום ל-iOS (App Store)

### שלב 1: חשבון Apple Developer

1. הרשמה ל-[Apple Developer Program](https://developer.apple.com/programs/)
2. עלות: **$99/שנה**
3. אישור: 24-48 שעות

### שלב 2: בניית IPA

```bash
eas build --platform ios --profile production
```

EAS ישאל:
- **Generate a new Apple Distribution Certificate?** → YES
- **Generate a new Apple Provisioning Profile?** → YES

### שלב 3: App Store Connect

1. כניסה ל-[App Store Connect](https://appstoreconnect.apple.com)
2. **My Apps** → **+ (New App)**
3. מלא:
   - **Platforms:** iOS
   - **Name:** Club5 AI
   - **Primary Language:** Hebrew
   - **Bundle ID:** com.club5ai.app
   - **SKU:** club5-ai-001

### שלב 4: App Information

**Category:**
- Primary: **Productivity**
- Secondary: **Health & Fitness**

**Privacy Policy URL:**
- הזן את ה-URL של ה-Privacy Policy שלך

**Support URL:**
- www.club5ai.com/support

### שלב 5: Upload IPA

**אופציה 1 - דרך Terminal:**
```bash
eas submit --platform ios
```

**אופציה 2 - דרך Transporter:**
1. הורד [Transporter](https://apps.apple.com/app/transporter/id1450874784)
2. הורד את ה-IPA מ-EAS
3. גרור ל-Transporter

### שלב 6: מלא מידע באפליקציה

#### Screenshots

צריך לספק צילומי מסך ל:
- **6.7" Display** (iPhone 15 Pro Max) - חובה
- **6.5" Display** (iPhone 11 Pro Max) - חובה
- **5.5" Display** (iPhone 8 Plus) - אופציונלי

**גדלים:**
- 6.7": 1290×2796
- 6.5": 1242×2688
- 5.5": 1242×2208

**כלי:** השתמש בסימולטור של Xcode או [screenshots.pro](https://screenshots.pro)

#### App Preview Video (אופציונלי)

וידאו קצר (15-30 שניות) שמציג את האפליקציה.

#### Promotional Text (170 תווים)

```
🌅 הצטרפו למועדון ה-5:00! בנו משמעת עם מאמן AI אישי שמלווה אתכם כל בוקר.
```

#### Description (4000 תווים)

```
🌅 התעוררו למציאות חדשה עם Club5 AI

Club5 AI הוא בן הלוויה המוטיבציוני שלכם להצטרפות למועדון האקסקלוסיבי של מי שמתעוררים ב-5:00 בבוקר.

✨ פיצ'רים עיקריים:

🔥 צ'ק-אין יומי פשוט
לחצו "I'm Awake" בכל בוקר וקבלו אנימציות מוטיבציוניות. בנו רצף (streak) מרשים ועקבו אחרי ההתקדמות שלכם.

🤖 מאמן AI אישי
בחרו בין נטלי למקס - שני מאמנים AI עם גישות שונות. קבלו הדרכה אמפתית ומותאמת אישית, עם סשני Deep Mode מיוחדים לרגעים קשים.

📊 מעקב התקדמות חזותי
לוח שנה של 30 יום, מדדי הצלחה, אבני דרך, ותובנות ממוקדות שעוזרות לכם להבין את הדפוסים שלכם.

⚙️ התאמה אישית
בחרו את שעת ההשכמה המועדפת, החליפו בין תמות בהירה/כהה/אוטומטית, וקבלו התראות חכמות.

💪 למה 5:00 בבוקר?
מחקרים מוכיחים שהתעוררות מוקדמת משפרת:
• פרודוקטיביות ביום
• בריאות נפשית
• תחושת שליטה
• איכות שינה
• הצלחה בכלל

הצטרפו לאלפי אנשים שכבר שינו את חייהם עם Club5 AI!

---

🔒 פרטיות מובטחת
כל המידע שלכם נשמר מקומית במכשיר. אנחנו לא שולחים או משתפים שום מידע אישי.
```

#### Keywords (100 תווים)

```
wake up,5am,habit,productivity,coach,motivation,morning,routine,discipline,streak
```

### שלב 7: Age Rating

**עבור Club5 AI:**
- 4+ (מתאים לכולם)

### שלב 8: App Privacy

1. **Does this app collect data from users?** → NO
2. (כי הכל נשמר מקומית)

### שלב 9: Pricing and Availability

- **Price:** Free
- **Availability:** All countries

### שלב 10: Submit for Review

1. לחץ **Add for Review**
2. ענה על שאלות:
   - **Export Compliance:** No encryption (או עדכן ב-app.json)
   - **Advertising Identifier:** No

3. **Submit to App Review**

**⏱️ זמן אישור:** 24-48 שעות (בדרך כלל)

---

## 🔄 עדכונים OTA (Over-The-Air)

אחד היתרונות הגדולים של Expo - שליחת עדכונים בלי לעבור את החנויות!

### מתי להשתמש ב-OTA?

✅ **כן:**
- תיקוני באגים בקוד JavaScript
- שינויי UI/UX
- תוכן חדש
- שיפורי פרפורמנס

❌ **לא:**
- שינויים ב-native modules
- הוספת permissions חדשות
- שינוי ב-app.json
- עדכוני SDK

### שליחת עדכון

```bash
# עדכון לפרודקשן
eas update --branch production --message "Fixed check-in bug"

# עדכון ל-preview
eas update --branch preview --message "Testing new feature"
```

### בדיקת עדכונים

משתמשים יקבלו את העדכון:
- בפתיחה הבאה של האפליקציה
- או מיידית (תלוי בהגדרות)

---

## 📊 Analytics & Monitoring (אופציונלי)

### Expo Analytics

```bash
npm install expo-analytics
```

### Firebase (מומלץ)

```bash
npx expo install @react-native-firebase/app
npx expo install @react-native-firebase/analytics
```

### Sentry (Error tracking)

```bash
npx expo install @sentry/react-native
```

---

## 💰 מחירון

| שירות | עלות |
|-------|------|
| **Google Play Console** | $25 חד-פעמי |
| **Apple Developer** | $99/שנה |
| **Expo (Free)** | חינם (30 builds/חודש) |
| **Expo Pro** | $29/חודש (unlimited builds) |
| **Domיין (.com)** | ~$12/שנה |
| **Hosting (Privacy Policy)** | חינם (GitHub Pages) |

**סה"כ להתחלה:** ~$124-153

---

## 🆘 FAQ

### שאלה: הבנייה נכשלת, מה עושים?

```bash
# נקה cache
eas build:clear

# נסה שוב
eas build --platform android --profile production --clear-cache
```

### שאלה: איך לבדוק APK לפני פרסום?

```bash
# בנה APK
eas build --platform android --profile preview

# הורד והתקן על מכשיר אמיתי
adb install app.apk
```

### שאלה: איפה רואים את ה-builds?

```bash
# Terminal
eas build:list

# או באתר
# https://expo.dev/accounts/YOUR_USERNAME/projects/club5-ai/builds
```

### שאלה: איך לשנות Bundle ID אחרי build?

אי אפשר! צריך ליצור אפליקציה חדשה בחנויות.

### שאלה: כמה זמן לוקח build?

- **Android:** 10-20 דקות
- **iOS:** 15-30 דקות

### שאלה: מה זה "usesNonExemptEncryption"?

זה אומר לאפל שאתה לא משתמש בהצפנה מיוחדת. עבור רוב האפליקציות → `false`.

---

## 📞 תמיכה

- **Expo Docs:** https://docs.expo.dev
- **Expo Discord:** https://chat.expo.dev
- **Stack Overflow:** [expo] tag

---

## ✅ Checklist לפני פרסום

### קוד:
- [ ] הסר כל `console.log` בייצור
- [ ] בדוק על Android אמיתי
- [ ] בדוק על iPhone אמיתי
- [ ] בדוק כל הזרימות (onboarding, check-in, settings)
- [ ] בדוק Dark Mode
- [ ] בדוק notifications

### נכסים:
- [ ] icon.png (1024×1024)
- [ ] splash.png (2048×2732)
- [ ] adaptive-icon.png (1024×1024)
- [ ] notification-icon.png (96×96)
- [ ] צילומי מסך (4-8)
- [ ] Feature graphic (1024×500)

### משפטי:
- [ ] Privacy Policy מפורסמת
- [ ] Terms of Service (אופציונלי)
- [ ] Support email/URL

### חנויות:
- [ ] חשבון Google Play ($25)
- [ ] חשבון Apple Developer ($99)
- [ ] Bundle IDs ייחודיים
- [ ] תיאורים מלאים
- [ ] Keywords/קטגוריות

### בדיקות:
- [ ] APK preview עובד
- [ ] IPA preview עובד (TestFlight)
- [ ] OTA updates עובדים
- [ ] Crash reporting מוגדר

---

🎉 **בהצלחה עם הפרסום!**

אם יש שאלות - אני כאן לעזור! 🚀
