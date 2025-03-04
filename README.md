# תחרות התחפושות של נחמיה 🎭

אפליקציית ווב המאפשרת ליצור תחפושות פורים מגניבות באמצעות AI! העלו תמונה או השתמשו בתמונת פרופיל מאינסטגרם, והאפליקציה תיצור עבורכם תחפושת מיוחדת.

## תכונות עיקריות 🌟

- העלאת תמונה מהמחשב
- שימוש בתמונת פרופיל מאינסטגרם
- יצירת תחפושות באמצעות OpenAI DALL-E
- שיתוף התוצאה באינסטגרם
- הורדת התמונה למחשב

## דרישות מערכת 🔧

- Node.js v14 ומעלה
- חשבון OpenAI עם מפתח API
- חשבון Instagram Developer (אופציונלי, לפונקציונליות אינסטגרם)

## התקנה 🚀

1. שכפלו את המאגר:
```bash
git clone https://github.com/your-username/purim-costume-generator.git
cd purim-costume-generator
```

2. התקינו את התלויות:
```bash
npm install
```

3. צרו קובץ `.env` והגדירו את המשתנים הנדרשים:
```env
OPENAI_API_KEY=your_api_key_here
INSTAGRAM_CLIENT_ID=your_client_id_here
INSTAGRAM_CLIENT_SECRET=your_client_secret_here
```

4. הפעילו את השרת:
```bash
npm start
```

האפליקציה תהיה זמינה בכתובת `http://localhost:3000`

## פיתוח 👩‍💻

להפעלת השרת במצב פיתוח (עם טעינה מחדש אוטומטית):
```bash
npm run dev
```

## מבנה הפרויקט 📁

```
purim-costume-generator/
├── public/
│   └── index.html
├── src/
│   ├── js/
│   │   ├── server.js
│   │   └── main.js
│   ├── styles/
│   │   └── main.css
│   └── components/
├── .env
└── package.json
```

## טכנולוגיות 🛠️

- Node.js & Express
- OpenAI API (DALL-E)
- Instagram Basic Display API
- HTML5 & CSS3
- Vanilla JavaScript

## רישיון 📄

MIT License 