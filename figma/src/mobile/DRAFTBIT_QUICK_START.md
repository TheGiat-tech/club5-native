# ⚡ Draftbit Export - Quick Start

## 🚀 ייצוא ל-Draftbit ב-3 צעדים

### **צעד 1: הכן את הקבצים**

**Mac/Linux:**
```bash
cd mobile
chmod +x scripts/prepare-draftbit-export.sh
./scripts/prepare-draftbit-export.sh
```

**Windows:**
```bash
cd mobile
scripts\prepare-draftbit-export.bat
```

זה יוצר: `club5-ai-draftbit.zip` ✅

---

### **צעד 2: העלה ל-Draftbit**

1. לך ל-**[Draftbit.com](https://draftbit.com)** → Sign In
2. **New Project** → "Import from Code"
3. **Upload** את `club5-ai-draftbit.zip`
4. המתן 30-60 שניות
5. **Import!** ✨

---

### **צעד 3: התחל לבנות!**

Draftbit יזהה אוטומטית:
- ✅ 5 Screens
- ✅ 9 Components
- ✅ Navigation
- ✅ Theme
- ✅ i18n (6 שפות)

**זהו! עכשיו אפשר לערוך ויזואלית!** 🎨

---

## 📦 מה כלול?

### **5 Screens:**
1. OnboardingScreen
2. HomeScreen
3. MomentumScreen
4. CoachChatScreen
5. SettingsScreen

### **9 Components:**
1. CheckInButton
2. CoachAvatar
3. StatCard
4. MomentumCalendar
5. ConfettiAnimation
6. TimePicker
7. TimeChip
8. LanguageSelector
9. FocusModeBanner

### **Features:**
- 🌍 6 שפות (i18n)
- 🌙 Dark mode
- 🎯 Focus mode
- 💾 AsyncStorage
- 🧭 React Navigation v6
- 🎨 Custom theme

---

## 🎯 מה Draftbit מאפשר?

### **Visual Builder:**
- ערוך UI בגרירה
- שנה צבעים/גופנים
- Preview בזמן אמת
- הוסף components חדשים

### **No-Code + Code:**
- בנה ויזואלית
- ערוך קוד ישירות
- משלב את שניהם!

### **Export:**
- הורד את הקוד המעודכן
- המשך לעבוד מקומית
- או פרסם ישירות

---

## 📱 Preview באפליקציה

אחרי Import:
1. פתח Draftbit Editor
2. לחץ **Preview**
3. סרוק QR ב-**Expo Go**
4. האפליקציה נפתחת!
5. שינויים מתעדכנים בזמן אמת! ✨

---

## 🔧 Troubleshooting

### **בעיה: Import נכשל**
**פתרון:** וודא שה-zip מכיל את כל הקבצים:
```bash
unzip -l club5-ai-draftbit.zip
# צריך לראות: App.tsx, package.json, src/, assets/
```

### **בעיה: Dependencies errors**
**פתרון:** Draftbit תתקין אוטומטית. אם יש בעיה:
- Settings → Dependencies → Reinstall

### **בעיה: Navigation לא עובד**
**פתרון:** וודא שיש `draftbit.config.js` בקובץ

---

## 📚 מדריכים מפורטים

- **`DRAFTBIT_EXPORT_GUIDE.md`** - מדריך מלא
- **`draftbit.config.js`** - תצורה מלאה
- **`README.md`** - הסבר כללי

---

## ✅ Checklist

לפני ייצוא:
- [ ] `npm install` הורץ
- [ ] האפליקציה עובדת
- [ ] הרצת את הסקריפט
- [ ] `club5-ai-draftbit.zip` נוצר

ב-Draftbit:
- [ ] חשבון פתוח
- [ ] העלאת zip
- [ ] Import הצליח
- [ ] 5 screens נראים

---

<div align="center">

## 🎉 זהו!

### **3 צעדים:**
1️⃣ הרץ סקריפט  
2️⃣ העלה ל-Draftbit  
3️⃣ בנה!

**Happy Building!** 🚀✨

</div>
