# 🚀 Quick Start - פרסום מהיר

## תהליך בן 30 דקות לפרסום ראשוני

### ⚡ שלב 1: התקנה (5 דקות)

```bash
# 1. התקנת EAS CLI
npm install -g eas-cli

# 2. כניסה לחשבון (או הרשמה)
eas login

# 3. כניסה לתיקיית הפרויקט
cd mobile

# 4. התקנת תלויות
npm install

# 5. יצירת פרויקט EAS
eas init
```

---

### 📱 שלב 2: הגדרת הפרויקט (5 דקות)

#### עדכן את `app.json`:

החלף את `YOUR_EAS_PROJECT_ID_HERE` ב-`projectId` שקיבלת מ-`eas init`.

#### עדכן Bundle Identifiers (חשוב!):

**אם אתה רוצה bundle ID משלך:**

ב-`app.json`:
```json
"ios": {
  "bundleIdentifier": "com.yourcompany.club5ai"
},
"android": {
  "package": "com.yourcompany.club5ai"
}
```

החלף `yourcompany` בשם החברה/שם משתמש שלך.

---

### 🎨 שלב 3: הכנת גרפיקה (10 דקות)

צור את התמונות הבאות בתיקיית `assets/`:

1. **icon.png** - 1024×1024px (אייקון האפליקציה)
2. **splash.png** - 2048×2732px (מסך פתיחה)
3. **adaptive-icon.png** - 1024×1024px (אנדרואיד)
4. **notification-icon.png** - 96×96px (התראות)

**כלי מהיר:** [makeappicon.com](https://makeappicon.com)

---

### 🏗️ שלב 4: Build (10 דקות)

#### אנדרואיד (APK לבדיקה):

```bash
eas build --platform android --profile preview
```

#### אנדרואיד (AAB לפרודקשן):

```bash
eas build --platform android --profile production
```

#### iOS (IPA):

```bash
eas build --platform ios --profile production
```

#### שניהם ביחד:

```bash
eas build --platform all --profile production
```

**⏱️ זמן המתנה:** 10-30 דקות

**💡 טיפ:** תוכל לעשות דברים אחרים בזמן ה-build. תקבל הודעה כשמוכן.

---

### 📦 שלב 5: הורדה

```bash
# רשימת builds
eas build:list

# או בדפדפן
# https://expo.dev/accounts/YOUR_USERNAME/projects/club5-ai/builds
```

לחץ על ה-build האחרון והורד:
- **Android:** `app-release.aab` (או `app-release.apk`)
- **iOS:** `app.ipa`

---

### 🤖 שלב 6א: Google Play (אנדרואיד)

1. **הרשמה:** [Google Play Console](https://play.google.com/console) ($25)
2. **Create app** → מלא פרטים בסיסיים
3. **Production** → **Create new release**
4. **Upload AAB** → העלה את הקובץ שהורדת
5. מלא:
   - Store listing (תיאור, צילומי מסך)
   - Content rating (שאלון)
   - Privacy Policy (העלה את `PRIVACY_POLICY.md`)
6. **Submit for review** → המתן 1-7 ימים

---

### 🍎 שלב 6ב: App Store (iOS)

1. **הרשמה:** [Apple Developer](https://developer.apple.com/programs/) ($99/שנה)
2. **App Store Connect** → **New App**
3. **TestFlight (אופציונלי):**
   ```bash
   eas submit --platform ios
   ```
4. מלא:
   - App Information
   - Pricing (Free)
   - Screenshots (3-10 תמונות)
   - Description
   - Privacy Policy URL
5. **Submit for Review** → המתן 24-48 שעות

---

### 🎯 שלב 7: בדיקה

#### בדיקת APK על Android:

```bash
# התקנה על מכשיר מחובר
adb install app-release.apk
```

#### בדיקת IPA על iOS:

השתמש ב-**TestFlight** (אוטומטי אם עשית `eas submit`).

---

## 🔄 עדכונים מהירים (OTA)

אחרי הפרסום הראשוני, עדכונים קלים:

```bash
# עדכון ללא לעבור את החנויות
eas update --branch production --message "Bug fixes"
```

**מגבלות:**
- ✅ שינויי JavaScript/React
- ✅ שינויי UI
- ❌ שינוי Permissions
- ❌ native modules חדשים

---

## 📋 Checklist מהיר

### לפני Build:
- [ ] `eas init` רץ בהצלחה
- [ ] `projectId` מעודכן ב-`app.json`
- [ ] Bundle IDs ייחודיים
- [ ] כל התמונות קיימות ב-`assets/`
- [ ] `npm install` רץ בהצלחה

### לפני Submit:
- [ ] Build הצליח
- [ ] הורדת AAB/IPA
- [ ] צילומי מסך מוכנים (4-8)
- [ ] Privacy Policy מפורסמת
- [ ] תיאורים נכתבו
- [ ] חשבון בחנות פתוח

### אחרי Submit:
- [ ] בדיקה על מכשיר אמיתי
- [ ] מעקב אחרי status באפליקציות החנויות
- [ ] הכנה למענה על שאלות (אם יש)

---

## 🆘 בעיות נפוצות

### Build נכשל?

```bash
# נקה cache
eas build:clear

# נסה שוב
eas build --platform android --profile production --clear-cache
```

### לא מצליח להתחבר ל-EAS?

```bash
# התנתק והתחבר מחדש
eas logout
eas login
```

### Bundle ID כבר בשימוש?

שנה את ה-Bundle ID ב-`app.json`:
```json
"bundleIdentifier": "com.yourname.club5ai"
"package": "com.yourname.club5ai"
```

### שכחתי את ה-projectId?

```bash
# קבל את ה-ID
eas project:info
```

---

## 💡 טיפים

1. **Build בלילה** - אם אתה על Free tier (30 builds/חודש)
2. **שמור קישורים** - כל build מקבל URL ייחודי
3. **בדוק APK לפני AAB** - חסוך זמן
4. **השתמש ב-TestFlight** - iOS testing לפני production
5. **כתוב release notes** - עוזר לסוקרים להבין את האפליקציה

---

## 📞 עזרה

- **מדריך מלא:** ראה `DEPLOYMENT_GUIDE.md`
- **Expo Docs:** https://docs.expo.dev/build/introduction/
- **Discord:** https://chat.expo.dev

---

## 🎉 זהו!

אחרי השלבים האלה, האפליקציה שלך תהיה באוויר! 🚀

**זמן כולל:** 30-60 דקות (+ זמן המתנה לאישור)

**בהצלחה!** 💪
