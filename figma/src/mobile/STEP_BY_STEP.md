# 🚀 Step-by-Step Deployment Guide

## כל מה שצריך לעשות - שלב אחר שלב

---

## 📅 לוח זמנים משוער

| שלב | זמן | תיאור |
|-----|-----|--------|
| **הכנה** | 2-3 שעות | יצירת גרפיקה, הגדרת פרויקט |
| **Build** | 30-60 דקות | בנייה ב-EAS |
| **הגשה** | 1-2 שעות | מילוי טפסים, העלאה |
| **אישור Google** | 1-7 ימים | המתנה |
| **אישור Apple** | 1-2 ימים | המתנה |

**סה"כ:** 3-14 ימים מהתחלה ועד שהאפליקציה באוויר!

---

## ✅ לפני שמתחילים

### דברים שאתה צריך:

#### 💳 חשבונות וכסף:
- [ ] חשבון Google ($25 חד-פעמי)
- [ ] חשבון Apple Developer ($99/שנה) - אם רוצה iOS
- [ ] כרטיס אשראי לתשלומים

#### 💻 תוכנה:
- [ ] Node.js מותקן (גרסה 18+)
- [ ] Git מותקן
- [ ] Code editor (VS Code מומלץ)

#### 🎨 כלים לגרפיקה:
- [ ] Figma / Photoshop / Canva - לעיצוב
- [ ] אפשרות: שכר מעצב ב-Fiverr ($15-50)

---

## 📋 השלבים

### 🎨 שלב 1: יצירת גרפיקה (2-3 שעות)

#### אופציה A: עשה בעצמך

1. **פתח Figma (חינם):**
   - https://figma.com
   - צור חשבון חינם

2. **צור את האייקונים:**
   
   כבר יש לך SVGs ב-`/mobile/assets/`. עכשיו המר אותם ל-PNG:

   ```bash
   cd mobile
   
   # התקן sharp (כלי להמרה)
   npm install sharp
   
   # הרץ המרה
   node scripts/convert-assets.js
   ```

   זה יצור:
   - ✅ `icon.png` (1024×1024)
   - ✅ `splash.png` (2048×2732)
   - ✅ `adaptive-icon.png` (1024×1024)
   - ✅ `notification-icon.png` (96×96)
   - ✅ `favicon.png` (48×48)

3. **בדוק שהכל נראה טוב:**
   - פתח את הקבצים ב-Preview/Photos
   - ודא שהגדלים נכונים
   - ודא שהאייקון ברור וקריא

#### אופציה B: שכור מעצב

1. כנס ל-[Fiverr](https://fiverr.com)
2. חפש "app icon design"
3. בחר מעצב עם ביקורות טובות ($15-50)
4. תן לו:
   - שם האפליקציה: Club5 AI
   - צבעים: #FF7A00 (כתום), #FF2E9B (ורוד)
   - סגנון: מינימליסטי, מודרני
   - אלמנטים: המספר "5", סמל שמש
5. בקש את כל הגדלים הנדרשים (ראה STORE_ASSETS.md)

#### אופציה C: השתמש ב-generator

1. כנס ל-https://makeappicon.com
2. העלה את icon.svg או icon.png שלך
3. הורד את כל הגדלים אוטומטית

---

### 📸 שלב 2: צילומי מסך (30 דקות)

אתה צריך 4-8 screenshots של האפליקציה.

#### דרך A: על מכשיר אמיתי

1. **הפעל את האפליקציה:**
   ```bash
   cd mobile
   npm start
   # Scan QR with Expo Go app
   ```

2. **צלם screenshots:**
   - iOS: לחץ Volume Up + Power
   - Android: לחץ Volume Down + Power

3. **צלם את המסכים הבאים:**
   - Home Screen (עם כפתור I'm Awake)
   - Home Screen (עם confetti)
   - Coach Screen (Deep Mode)
   - Progress Screen (calendar)
   - Settings Screen

#### דרך B: שימוש בסימולטור

**iOS (Mac בלבד):**
```bash
# פתח Xcode simulator
open -a Simulator

# או דרך Expo:
npm run ios

# צלם screenshot:
# Cmd + S (שומר בשולחן העבודה)
```

**Android:**
```bash
# פתח Android Studio emulator
# או דרך Expo:
npm run android

# Screenshot: ה-toolbar של האמולטור
```

#### דרך C: שימוש בכלי אונליין

1. כנס ל-https://screenshots.pro
2. העלה screenshots רגילים
3. בחר device frame (iPhone 15 Pro Max)
4. הורד בגדלים הנכונים

---

### 🔧 שלב 3: הגדרת EAS (15 דקות)

1. **התקן EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **התחבר/הרשם:**
   ```bash
   eas login
   # או
   eas register
   ```

3. **אתחל פרויקט:**
   ```bash
   cd mobile
   eas init
   ```
   
   זה ישאל:
   - שם הפרויקט → `club5-ai`
   - Slug → `club5-ai`
   
   ויעדכן את `app.json` עם `projectId`.

4. **בדוק שהכל מוכן:**
   ```bash
   node scripts/pre-deployment-check.js
   ```
   
   אם יש ❌ - תקן לפני שממשיכים.

---

### 🏗️ שלב 4: Build ראשון (30-60 דקות)

#### אנדרואיד:

1. **Build לבדיקה (APK):**
   ```bash
   npm run build:android:preview
   ```
   
   זה לוקח ~15-20 דקות.

2. **כשמוכן:**
   - תקבל link להורדה
   - או: `eas build:list` → לחץ על ה-build
   - הורד את ה-APK
   - התקן על Android device לבדוק

3. **Build לפרודקשן (AAB):**
   ```bash
   npm run build:android:production
   ```
   
   זה לוקח ~20 דקות.
   
   הורד את ה-`.aab` כשמוכן.

#### iOS (צריך חשבון Apple Developer):

1. **Build:**
   ```bash
   npm run build:ios:production
   ```
   
   EAS ישאל:
   - Generate certificate? → **YES**
   - Generate provisioning profile? → **YES**
   
   זה לוקח ~20-30 דקות.

2. **כשמוכן:**
   - הורד את ה-`.ipa`

---

### 🤖 שלב 5: Google Play (1-2 שעות + 1-7 ימים אישור)

#### A. יצירת חשבון

1. כנס ל-https://play.google.com/console
2. לחץ **Create Developer Account**
3. שלם $25 (חד-פעמי)
4. אשר מייל
5. המתן 24-48 שעות לאישור

#### B. יצירת אפליקציה

1. **Create app**
   - App name: `Club5 AI`
   - Default language: `Hebrew` או `English`
   - App or game: `App`
   - Free or paid: `Free`
   - Declarations: ✓ סמן הכל

2. **לחץ Create app**

#### C. Dashboard - מלא את כל הסעיפים

##### 1. Store Listing (פרטי החנות)

פתח את `/mobile/store-listings/google-play-listing.md` והעתק:

- **App name:** Club5 AI - 5AM Wake Up Coach
- **Short description:** (80 תווים מהקובץ)
- **Full description:** (העתק את הטקסט המלא)
- **App icon:** העלה `icon.png` (512×512)
- **Feature graphic:** תצטרך ליצור (1024×500)
  - פתח Figma/Canva
  - צור באנר 1024×500
  - שים לוגו + tagline
- **Screenshots:** העלה 4-8 screenshots
  - Phone: לפחות 2
  - Tablet: אופציונלי
- **Category:** Productivity
- **Email:** support@club5ai.com
- **Privacy policy:** העלה את PRIVACY_POLICY.md ל-GitHub Pages
  - קישור מהיר: https://pages.github.com

##### 2. Main Store Listing (עברית/אנגלית)

אם אתה רוצה עברית:
- לחץ **Add translation**
- בחר Hebrew
- מלא את כל השדות בעברית (יש ב-listing.md)

##### 3. Content Rating

- לחץ **Start questionnaire**
- ענה **No** לכל השאלות
- דירוג: **Everyone** (PEGI 3)
- שמור

##### 4. Target audience and content

- **Target age:** 13+
- **Appeals to children:** No
- **Store listing ads:** No

##### 5. App access

- All functionality available without restrictions
- לחץ **Save**

##### 6. Ads

- **Contains ads:** No
- לחץ **Save**

##### 7. Data safety

זה **חשוב מאוד**:

- **Does your app collect or share user data?** → **NO**
- **Is all data encrypted in transit?** → Not applicable
- **Can users request data deletion?** → Not applicable

אחרי זה תקבל badge של "No data collected" 🎉

שמור.

##### 8. Select countries

- **Available in:** All countries
- או בחר ידנית: Israel, United States, etc.

##### 9. Pricing

- **Free**
- לחץ **Save**

#### D. Release (העלאת AAB)

1. **Production** → **Create new release**

2. **Upload AAB:**
   - לחץ **Upload**
   - גרור את הקובץ `.aab` שהורדת מ-EAS
   - המתן להעלאה

3. **Release name:**
   ```
   1.0.0 - Initial Release
   ```

4. **Release notes:**
   ```
   🎉 First release of Club5 AI!
   
   ✨ Features:
   - Daily 5AM check-in tracking
   - AI life coaches (Natalie & Max)
   - Deep Mode coaching sessions
   - 30-day momentum calendar
   - Achievement milestones
   - Dark mode support
   
   🔒 Privacy: All data stored locally. No tracking.
   
   💪 Your 5AM journey starts now!
   ```

5. **לחץ Next → Review → Start rollout to Production**

6. **המתן לאישור:** 1-7 ימים (בדרך כלל 2-3)

---

### 🍎 שלב 6: App Store (2-3 שעות + 1-2 ימים אישור)

#### A. חשבון Apple Developer

1. כנס ל-https://developer.apple.com/programs/
2. **Enroll** → $99/שנה
3. מלא פרטים (דרכון/ת"ז, כרטיס אשראי)
4. המתן 24-48 שעות לאישור

#### B. App Store Connect

1. כנס ל-https://appstoreconnect.apple.com
2. **My Apps** → **+ (New App)**

3. **מלא:**
   - Platform: iOS
   - Name: Club5 AI
   - Primary Language: English (או Hebrew)
   - Bundle ID: com.club5ai.app (צריך להיות זהה ל-app.json)
   - SKU: club5-ai-001
   - User Access: Full Access

4. **לחץ Create**

#### C. App Information

פתח את `/mobile/store-listings/app-store-listing.md` והעתק:

1. **General Information:**
   - Subtitle: Your 5AM Wake Companion
   - Category: Productivity (Primary), Health & Fitness (Secondary)

2. **Privacy Policy URL:**
   - העלה את `PRIVACY_POLICY.md` ל-GitHub Pages
   - הדבק URL

3. **Support URL:**
   - www.club5ai.com/support
   - (או GitHub Pages)

#### D. Pricing and Availability

- **Price:** Free
- **Availability:** All countries

#### E. Prepare for Submission

##### 1. Build

**אופציה A - EAS Submit (מומלץ):**
```bash
npm run submit:ios
```

זה יעלה את ה-IPA אוטומטית.

**אופציה B - Transporter:**
1. הורד [Transporter](https://apps.apple.com/app/transporter/id1450874784)
2. פתח Transporter
3. גרור את ה-IPA שהורדת
4. Sign in עם Apple ID
5. לחץ Deliver

##### 2. Screenshots

צריך screenshots עבור:
- **6.7" Display (iPhone 15 Pro Max):** 1290×2796 - חובה
- **6.5" Display (iPhone 11 Pro Max):** 1242×2688 - חובה

העלה לפחות 3, מומלץ 5-8.

השתמש ב-https://screenshots.pro אם צריך להתאים גדלים.

##### 3. App Description

העתק מ-`app-store-listing.md`:
- Promotional Text (170 תווים)
- Description (4000 תווים)
- Keywords (100 תווים)

##### 4. App Preview Video (אופציונלי)

אם יצרת וידאו:
- העלה כאן
- 15-30 שניות
- 1290×2796

##### 5. Version Information

**What's New in This Version:**
```
🎉 Welcome to Club5 AI!

Join the 5AM club with your personal AI coach.

✨ Features:
• Daily check-in tracking
• AI coaches Natalie & Max
• Deep Mode sessions
• 30-day calendar
• Achievement milestones
• Dark mode

🔒 All data stored locally.

Your 5AM journey starts now! 💪
```

**Build:** בחר את ה-build האחרון שהעלית

##### 6. General App Information

- **Age Rating:** 4+
- ענה No לכל השאלות

##### 7. App Privacy

- **Does this app collect data?** → **NO**

זה יתן לך badge של "No Data Collected"!

##### 8. App Review Information

**Notes for Reviewer:**
```
This app helps users wake up at 5AM daily.

TESTING:
1. Complete onboarding
2. Tap "I'm Awake" on home screen
3. Explore AI coach sessions
4. Check progress calendar
5. Customize in settings

All data is stored locally. No backend required.

Contact: support@club5ai.com
```

**Contact:** שלך
- First Name
- Last Name
- Phone
- Email

##### 9. Submit!

1. לחץ **Add for Review**
2. **Submit to App Review**

3. **המתן:** 24-48 שעות (בדרך כלל)

---

### 🎉 שלב 7: הושלם!

#### כשהאפליקציה אושרה:

**Google Play:**
- תקבל מייל
- האפליקציה תהיה זמינה תוך 2-3 שעות
- קישור: `https://play.google.com/store/apps/details?id=com.club5ai.app`

**App Store:**
- תקבל מייל
- האפליקציה תהיה זמינה תוך 24 שעות
- קישור: `https://apps.apple.com/app/club5-ai/[APP_ID]`

---

## 🔄 עדכונים עתידיים

### עדכון קטן (JavaScript בלבד):

```bash
# OTA Update - ללא צורך באישור מחדש
eas update --branch production --message "Bug fixes"
```

משתמשים יקבלו עדכון בפתיחה הבאה!

### עדכון גדול (native code):

```bash
# Build חדש
npm run build:android:production
npm run build:ios:production

# Submit
npm run submit:android
npm run submit:ios
```

צריך לעבור אישור מחדש (1-2 ימים).

---

## 💡 טיפים לאורך הדרך

### בזמן הבנייה:
- ✅ Build בלילה (אם יש הרבה builds בתור)
- ✅ שמור את ה-build logs
- ✅ בדוק APK/IPA לפני העלאה לחנות

### בזמן ההגשה:
- ✅ קרא שוב את כל הטקסטים (איות, דקדוק)
- ✅ וודא ש-Privacy Policy נגיש (URL עובד)
- ✅ בדוק screenshots על מכשירים שונים
- ✅ כתוב release notes ברורים

### אחרי הפרסום:
- ✅ שלח לחברים/משפחה לבדיקה
- ✅ עקוב אחרי reviews
- ✅ ענה לביקורות (טובות ורעות!)
- ✅ שמור analytics (installs, retention)

---

## 🆘 מה עושים אם...

### הבנייה נכשלת?
```bash
eas build:clear
eas build --platform android --profile production --clear-cache
```

### Google דחה את האפליקציה?
- קרא את הסיבה במייל
- תקן את הבעיה
- Upload AAB חדש
- Submit שוב

### Apple דחה את האפליקציה?
- קרא ב-Resolution Center
- בדרך כלל: metadata/screenshots/privacy
- תקן
- Submit שוב

### משתמש דיווח על bug?
- תקן את הקוד
- `eas update` (אם זה JS בלבד)
- או build חדש (אם זה native)

---

## 📞 עזרה נוספת

- **Expo Docs:** https://docs.expo.dev
- **Google Play Help:** https://support.google.com/googleplay/android-developer
- **App Store Help:** https://developer.apple.com/support/
- **Discord:** https://chat.expo.dev

---

## ✅ Final Checklist

לפני submit, וודא:

### קבצים:
- [ ] כל ה-assets קיימים (icons, splash, etc.)
- [ ] Screenshots מוכנים (4-8)
- [ ] Privacy Policy מפורסמת
- [ ] Build הצליח (AAB/IPA הורדו)

### חשבונות:
- [ ] Google Play ($25 שולם)
- [ ] Apple Developer ($99 שולם) - אם iOS
- [ ] EAS חשבון פעיל

### טקסטים:
- [ ] App name
- [ ] Description (עברית + אנגלית)
- [ ] Keywords
- [ ] Release notes
- [ ] Screenshots captions

### בדיקות:
- [ ] APK עובד על Android
- [ ] IPA עובד ב-TestFlight (iOS)
- [ ] כל הזרימות עובדות
- [ ] Dark mode עובד
- [ ] Notifications עובדות

---

🎉 **זהו! אתה מוכן לפרסם!**

**זמן משוער:** 3-14 ימים מהתחלה ועד App Store

**בהצלחה!** 🚀
