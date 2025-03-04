const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { image } = JSON.parse(event.body);
        
        if (!image) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'לא נשלחה תמונה' })
            };
        }

        // יצירת תחפושת באמצעות DALL-E
        const response = await openai.images.edit({
            image: image,
            prompt: "Transform this person into a creative and fun Purim costume while maintaining their facial features. Add colorful costume elements, accessories, and themed decorations that create a festive and imaginative Purim character.",
            n: 1,
            size: '1024x1024'
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: response.data[0].url })
        };
    } catch (error) {
        console.error('Error generating costume:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'שגיאה ביצירת התחפושת',
                details: error.message 
            })
        };
    }
}; 