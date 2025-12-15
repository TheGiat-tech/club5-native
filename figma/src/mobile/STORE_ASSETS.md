# 📱 Store Assets - נכסים לחנויות

מדריך מלא ליצירת כל הגרפיקה הנדרשת לפרסום ב-App Store ו-Google Play.

---

## 🎨 דרישות גרפיקה

### 1. App Icon (אייקון אפליקציה)

**קובץ:** `assets/icon.png`

**מפרט:**
- גודל: **1024×1024px**
- פורמט: PNG
- ללא שקיפות (רקע מוצק)
- ללא פינות מעוגלות (המערכת תוסיף אוטומטית)

**עיצוב מומלץ:**
```
- רקע: גרדיאנט #FF7A00 → #FF2E9B
- לוגו: "5" גדול במרכז
- טקסט: "Club5 AI" (אופציונלי)
- סגנון: מינימליסטי, בולט
```

---

### 2. Splash Screen (מסך פתיחה)

**קובץ:** `assets/splash.png`

**מפרט:**
- גודל: **2048×2732px** (iPad Pro 12.9")
- פורמט: PNG
- יכול להכיל שקיפות
- Safe zone: 1284×2778px (iPhone area)

**עיצוב מומלץ:**
```
- רקע: גרדיאנט רך #FFF9F5 → #FFFFFF
- לוגו מרכזי: אייקון + "Club5 AI"
- טקסט תחתון: "Your 5AM companion" (אופציונלי)
```

---

### 3. Adaptive Icon (אנדרואיד בלבד)

**קובץ:** `assets/adaptive-icon.png`

**מפרט:**
- גודל: **1024×1024px**
- פורמט: PNG
- ללא שקיפות
- **Safe zone:** מעגל בקוטר 640px במרכז
- הרקע יילקח מ-`backgroundColor` ב-`app.json`

**עיצוב:**
```
- רק האלמנט המרכזי של האייקון
- בלי רקע (או רקע שקוף)
- אנדרואיד תוסיף צורות שונות (מעגל, מרבע מעוגל)
```

---

### 4. Notification Icon (אייקון התראות)

**קובץ:** `assets/notification-icon.png`

**מפרט:**
- גודל: **96×96px**
- פורמט: PNG עם שקיפות
- **צבע:** לבן בלבד (#FFFFFF)
- רקע: שקוף
- סגנון: פשוט, ללא פרטים קטנים

**עיצוב:**
```
- סמל פעמון או שעון מעורר פשוט
- או האות "5" במתאר
- בלבן בלבד
```

**למה לבן?** אנדרואיד צובע את האייקון באופן דינמי לפי ערכת הצבעים של המכשיר.

---

### 5. Favicon (Web בלבד)

**קובץ:** `assets/favicon.png`

**מפרט:**
- גודל: **48×48px**
- פורמט: PNG
- גרסה מוקטנת של האייקון

---

## 📸 Screenshots (צילומי מסך)

### Google Play (Android)

**דרישות מינימום:**
- לפחות **2 screenshots**
- מקסימום **8 screenshots**

**מידות נפוצות:**
- **Phone:** 1080×1920px עד 1080×2340px
- **7-inch Tablet:** 1200×1920px
- **10-inch Tablet:** 1600×2560px

**מה לצלם:**
1. **Home Screen** - כפתור "I'm Awake" + confetti
2. **Coach Screen** - Deep Mode sessions
3. **Progress Screen** - Calendar ו-stats
4. **Settings Screen** - personalization options
5. **Onboarding** - מסך בחירת מאמן (אופציונלי)

**טיפים:**
- השתמש במכשיר עם notch (iPhone 14, Pixel 6+)
- רקע נקי
- הוסף טקסט הסבר (overlay) אם רוצה
- גודל קובץ: מקס 8MB

---

### App Store (iOS)

**דרישות:**

חייב לספק screenshots עבור **לפחות 2 גדלים**:

#### 6.7" Display (iPhone 15 Pro Max, 14 Pro Max)
- **מידות:** 1290×2796px
- **פורמט:** PNG או JPG
- **כמות:** 3-10 screenshots

#### 6.5" Display (iPhone 11 Pro Max, XS Max)
- **מידות:** 1242×2688px
- **פורמט:** PNG או JPG
- **כמות:** 3-10 screenshots

#### אופציונלי - 5.5" Display (iPhone 8 Plus)
- **מידות:** 1242×2208px

**מה לצלם (סדר מומלץ):**
1. **Hero Screen** - הכי מרשים, עם ערך מוצע ברור
2. **Main Feature** - Check-in button וממשק ראשי
3. **AI Coach** - מסך המאמן עם chat
4. **Progress Tracking** - Calendar ו-stats
5. **Personalization** - Settings/Customization

**טיפים:**
- סדר חשוב! הראשון הוא הכי חשוב
- השתמש בסימולטור Xcode לקבלת גדלים מדויקים
- או כלי כמו [screenshots.pro](https://screenshots.pro)

---

## 🎬 App Preview Video (אופציונלי אבל מומלץ!)

### App Store

**מפרט:**
- **אורך:** 15-30 שניות
- **מידות:** זהה ל-screenshots (1290×2796 וכו')
- **פורמט:** .mov, .mp4, .m4v
- **גודל מקס:** 500MB
- **FPS:** 30fps מינימום

**תוכן מומלץ:**
```
0:00-0:05 - פתיחה: "Wake up at 5AM with Club5 AI"
0:05-0:10 - תכונה 1: Daily check-in
0:10-0:15 - תכונה 2: AI coaching
0:15-0:20 - תכונה 3: Progress tracking
0:20-0:25 - סגירה: "Join the 5AM club today"
```

### Google Play

**מפרט:**
- **אורך:** 30 שניות מקסימום
- **מידות:** 1920×1080 (landscape) או 1080×1920 (portrait)
- **פורמט:** WebM, MPEG-4, 3GPP
- **גודל מקס:** 100MB

**טיפ:** ניתן להעלות אותו וידאו כמו ל-App Store.

---

## 🖼️ Feature Graphic (Google Play בלבד)

**קובץ:** Feature graphic / Banner image

**מפרט:**
- **מידות:** 1024×500px
- **פורמט:** PNG או JPG
- **גודל מקס:** 1MB

**עיצוב מומלץ:**
```
- רקע: גרדיאנט מתאים למותג (#FF7A00 → #FF2E9B)
- שמאל: לוגו/אייקון גדול
- ימין: Tagline - "Wake up at 5AM. Change your life."
- פונט: Bold, קריא, מינימליסטי
```

**לדוגמה:**
```
[Logo]     Club5 AI
           Wake up at 5AM
           Build discipline with AI coaching
```

---

## 🎨 כלים מומלצים ליצירה

### עיצוב גרפי:
- **Figma** - עיצוב מקצועי (חינם)
- **Canva** - תבניות מוכנות
- **Adobe Express** - אלטרנטיבה

### יצירת אייקונים:
- [makeappicon.com](https://makeappicon.com) - אוטומטי, כל הגדלים
- [appicon.co](https://appicon.co) - חלופה
- [iconkitchen.com](https://icon.kitchen) - adaptive icons

### Screenshots:
- **Xcode Simulator** - iOS (Mac בלבד)
- **Android Studio Emulator** - Android
- [screenshots.pro](https://screenshots.pro) - מחולל screenshots
- [Figma Mockups](https://www.figma.com) - תבניות מכשירים

### וידאו:
- **Screen Recording** (מובנה ב-iOS/Android)
- **CapCut** - עריכה פשוטה וחינמית
- **DaVinci Resolve** - עריכה מתקדמת
- **Canva Video** - תבניות App Preview

### אנימציות:
- **Lottie** - אנימציות JSON
- **After Effects** - אנימציות מקצועיות

---

## 📐 טמפלייט Figma מוכן

צור פריים בפיגמה עם הגדלים הבאים:

```
Frame 1: "App Icon" - 1024×1024
Frame 2: "Splash Screen" - 2048×2732
Frame 3: "Adaptive Icon" - 1024×1024 + Circle guide (640px)
Frame 4: "Notification Icon" - 96×96
Frame 5: "Screenshot 1 (iOS)" - 1290×2796
Frame 6: "Screenshot 2 (iOS)" - 1290×2796
...
Frame 10: "Feature Graphic" - 1024×500
```

**ייצוא:**
- Export as PNG
- 1x scale (אל תשנה!)
- שמור ב-`assets/`

---

## ✅ Checklist

### קבצים חובה:
- [ ] `assets/icon.png` (1024×1024)
- [ ] `assets/splash.png` (2048×2732)
- [ ] `assets/adaptive-icon.png` (1024×1024)
- [ ] `assets/notification-icon.png` (96×96)

### Screenshots:
- [ ] לפחות 4 screenshots ל-iOS (1290×2796)
- [ ] לפחות 4 screenshots ל-Android (1080×1920)

### Google Play:
- [ ] Feature graphic (1024×500)

### אופציונלי אבל מומלץ:
- [ ] App Preview Video (15-30 שניות)
- [ ] 8 screenshots (במקום 4)
- [ ] Tablet screenshots (אנדרואיד)

---

## 🎯 דוגמאות תוכן ל-Screenshots

### Screenshot 1: Hero
**טקסט overlay:**
```
Wake up at 5AM
Build discipline that lasts
```

### Screenshot 2: Check-in
**טקסט overlay:**
```
Simple Daily Check-in
Just tap "I'm Awake" every morning
```

### Screenshot 3: AI Coach
**טקסט overlay:**
```
Your Personal AI Coach
Empathetic guidance when you need it
```

### Screenshot 4: Progress
**טקסט overlay:**
```
Track Your Journey
Visualize your 30-day momentum
```

---

## 💡 טיפים לעיצוב מנצח

1. **עקביות** - השתמש באותם צבעים/פונטים בכל הנכסים
2. **פשטות** - פחות זה יותר
3. **ניגודיות** - ודא שהטקסט קריא
4. **מסר ברור** - בתוך 3 שניות המשתמש צריך להבין מה האפליקציה עושה
5. **CTA חזק** - "Join the 5AM club", "Start today"
6. **Social proof** - אם יש (כמו "Join 10,000+ early risers")

---

## 📞 צריך עזרה?

- **Figma Community:** תבניות חינמיות ל-app screenshots
- **Dribbble:** השראה לעיצובים
- **Behance:** דוגמאות store listings מצוינות

---

🎨 **בהצלחה ביצירת הנכסים!**
