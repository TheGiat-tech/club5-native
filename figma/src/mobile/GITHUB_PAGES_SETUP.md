# 🌐 GitHub Pages Setup - Privacy Policy Hosting

## למה צריך את זה?

גוגל ואפל **דורשים** URL לפרטיות (Privacy Policy URL) כשמפרסמים אפליקציה.
GitHub Pages זה דרך **חינמית** ופשוטה לפרסם את ה-Privacy Policy שלך באינטרנט.

---

## ⚡ Quick Setup (10 דקות)

### שלב 1: צור Repository חדש ב-GitHub

1. כנס ל-[GitHub](https://github.com)
2. לחץ **New repository**
3. שם: `club5-ai` (או כל שם שאתה רוצה)
4. **Public** (חשוב!)
5. ✓ Add a README file
6. לחץ **Create repository**

---

### שלב 2: העלה את קובץ ה-Privacy Policy

#### אופציה A: דרך GitHub Web UI (קל יותר)

1. בתוך ה-repository, לחץ **Add file** → **Upload files**
2. גרור את הקובץ `privacy-policy.html` מ-`/mobile/privacy-policy.html`
3. או העתק את התוכן וצור קובץ חדש
4. לחץ **Commit changes**

#### אופציה B: דרך Git (למתקדמים)

```bash
# Clone the repo
git clone https://github.com/yourusername/club5-ai.git
cd club5-ai

# Copy the privacy policy
cp /path/to/mobile/privacy-policy.html .

# Commit and push
git add privacy-policy.html
git commit -m "Add privacy policy"
git push
```

---

### שלב 3: הפעל GitHub Pages

1. בתוך ה-repository, לחץ **Settings**
2. בצד שמאל, לחץ **Pages**
3. תחת **Source**, בחר:
   - **Branch:** `main` (או `master`)
   - **Folder:** `/ (root)`
4. לחץ **Save**

**המתן 1-2 דקות...**

---

### שלב 4: קבל את ה-URL

אחרי ~2 דקות, תראה הודעה:

```
✅ Your site is live at https://yourusername.github.io/club5-ai/privacy-policy.html
```

**זהו ה-URL שלך!** 🎉

העתק אותו - תצטרך אותו ב-Google Play ו-App Store.

---

## 🔗 השתמש ב-URL

### Google Play Console:
1. **Store listing** → **Privacy policy**
2. הדבק: `https://yourusername.github.io/club5-ai/privacy-policy.html`
3. שמור

### App Store Connect:
1. **App Information** → **Privacy Policy URL**
2. הדבק: `https://yourusername.github.io/club5-ai/privacy-policy.html`
3. שמור

---

## 🎨 Customization (אופציונלי)

רוצה לשנות את העיצוב? ערוך את `privacy-policy.html`:

### שנה צבעים:
```css
background: linear-gradient(135deg, #FF7A00 0%, #FF2E9B 100%);
/* שנה ל: */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### שנה לוגו:
```html
<div class="logo">🌅</div>
<!-- שנה ל-emoji אחר או הוסף תמונה -->
```

### הוסף לינק לאפליקציה:
```html
<p>Download the app:</p>
<p>
  <a href="https://play.google.com/store/apps/details?id=com.club5ai.app">
    Google Play
  </a> | 
  <a href="https://apps.apple.com/app/club5-ai/YOUR_APP_ID">
    App Store
  </a>
</p>
```

---

## 📱 הוסף דפים נוספים (אופציונלי)

### Terms of Service:

1. צור `terms-of-service.html`
2. העלה ל-GitHub
3. URL: `https://yourusername.github.io/club5-ai/terms-of-service.html`

### Support Page:

1. צור `support.html`
2. הוסף:
   - FAQ
   - Contact form
   - Email: support@club5ai.com
3. URL: `https://yourusername.github.io/club5-ai/support.html`

### Landing Page:

צור `index.html` עם:
- הסבר על האפליקציה
- Screenshots
- Download links
- Testimonials

---

## 🎯 טמפלייט Landing Page פשוט

```html
<!DOCTYPE html>
<html>
<head>
    <title>Club5 AI - Wake Up at 5AM</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, sans-serif;
            text-align: center;
            padding: 50px 20px;
            background: linear-gradient(135deg, #FFF9F5, #FFFFFF);
        }
        h1 { font-size: 3em; color: #FF7A00; }
        .cta {
            display: inline-block;
            margin: 20px 10px;
            padding: 15px 30px;
            background: #FF7A00;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🌅 Club5 AI</h1>
    <p>Wake up at 5AM. Transform your life.</p>
    
    <a href="https://play.google.com/store/apps/details?id=com.club5ai.app" class="cta">
        Download on Google Play
    </a>
    
    <a href="https://apps.apple.com/app/club5-ai/YOUR_APP_ID" class="cta">
        Download on App Store
    </a>
    
    <p style="margin-top: 50px;">
        <a href="/privacy-policy.html">Privacy Policy</a> | 
        <a href="mailto:support@club5ai.com">Support</a>
    </p>
</body>
</html>
```

שמור כ-`index.html` ו-URL יהיה: `https://yourusername.github.io/club5-ai/`

---

## 🔧 Troubleshooting

### הדף לא נטען?
- המתן 5 דקות נוספות
- ודא ש-repository הוא **Public**
- ודא שהקובץ נקרא בדיוק `privacy-policy.html`
- נסה לגשת ב-incognito mode

### 404 Error?
- בדוק שהשם נכון: `privacy-policy.html` (ולא `.htm`)
- ודא שהקובץ ב-root של ה-repository
- רענן את הדף אחרי כמה דקות

### רוצה custom domain?
1. קנה דומיין (club5ai.com)
2. ב-GitHub Pages settings, הוסף **Custom domain**
3. עדכן DNS records אצל ספק הדומיין
4. URL יהיה: `https://club5ai.com/privacy-policy.html`

---

## ✅ Checklist

- [ ] Repository נוצר ב-GitHub
- [ ] privacy-policy.html הועלה
- [ ] GitHub Pages הופעל
- [ ] URL עובד (בדוק בדפדפן)
- [ ] URL הועתק ל-Google Play Console
- [ ] URL הועתק ל-App Store Connect

---

## 🎉 סיימת!

עכשיו יש לך:
- ✅ Privacy Policy מפורסמת באינטרנט
- ✅ URL חינמי וקבוע
- ✅ עמוד מעוצב ומקצועי
- ✅ עומד בדרישות Google & Apple

**URL שלך:**
```
https://yourusername.github.io/club5-ai/privacy-policy.html
```

השתמש בו בכל מקום שצריך Privacy Policy URL! 🚀

---

## 💡 Tips

- שמור את ה-URL במקום בטוח (password manager)
- בדוק שהוא עובד לפני submit לחנויות
- עדכן את התאריך "Last Updated" אם משנה משהו
- אפשר להוסיף Google Analytics (אופציונלי)

---

**צריך עזרה?** 
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Support](https://support.github.com)
