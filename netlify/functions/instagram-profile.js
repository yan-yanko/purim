const axios = require('axios');

exports.handler = async function(event, context) {
    // וודא שזו בקשת GET
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // קבל את שם המשתמש מהפרמטרים
        const username = event.queryStringParameters.username;
        if (!username) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'נדרש שם משתמש' })
            };
        }

        // נקה את הקישור מתווים מיוחדים
        const cleanUsername = username.replace(/[^a-zA-Z0-9._]/g, '');

        // בנה את כתובת ה-URL של תמונת הפרופיל
        const profileUrl = `https://www.instagram.com/${cleanUsername}/`;

        return {
            statusCode: 200,
            body: JSON.stringify({
                error: 'פונקציונליות זו דורשת הרשאות מיוחדות מאינסטגרם. אנא השתמש בהעלאת תמונה מהמחשב בשלב זה.'
            })
        };
    } catch (error) {
        console.error('Error fetching Instagram profile:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'שגיאה בהבאת תמונת הפרופיל',
                details: error.message 
            })
        };
    }
}; 