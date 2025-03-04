require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// הגדרת OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// הגדרות בסיסיות
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// הגדרת multer לקבלת קבצים
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // מגבלת גודל קובץ: 5MB
    }
});

// נתיב ראשי
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// API ליצירת תחפושת
app.post('/api/generate-costume', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'לא נשלחה תמונה' });
        }

        const base64Image = req.file.buffer.toString('base64');

        const response = await openai.images.create({
            image: base64Image,
            n: 1,
            size: '1024x1024',
            response_format: 'url'
        });

        res.json({ url: response.data[0].url });
    } catch (error) {
        console.error('Error generating costume:', error);
        res.status(500).json({ error: 'שגיאה ביצירת התחפושת' });
    }
});

// API להבאת תמונת פרופיל מאינסטגרם
app.get('/api/instagram-profile/:username', async (req, res) => {
    try {
        const { username } = req.params;
        // כאן תהיה הלוגיקה להבאת תמונת פרופיל מאינסטגרם
        // זה ידרוש הגדרת Instagram API
        res.status(501).json({ error: 'פונקציונליות זו עדיין בפיתוח' });
    } catch (error) {
        console.error('Error fetching Instagram profile:', error);
        res.status(500).json({ error: 'שגיאה בהבאת תמונת הפרופיל' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 