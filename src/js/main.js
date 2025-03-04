document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const instagramUsername = document.getElementById('instagram-username');
    const fetchInstagramBtn = document.getElementById('fetch-instagram');
    const originalPreview = document.getElementById('original-preview');
    const costumePreview = document.getElementById('costume-preview');
    const loadingOverlay = document.getElementById('loading-overlay');
    const errorMessage = document.getElementById('error-message');
    const resultSection = document.getElementById('result-section');
    const costumeDescription = document.getElementById('costume-description');

    // טיפול בהעלאת תמונה
    imageUpload.addEventListener('change', async function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            showLoading(true);
            try {
                // הצגת התמונה המקורית
                const imageUrl = URL.createObjectURL(file);
                showOriginalImage(imageUrl);
                
                // המרת התמונה ל-base64
                const base64Image = await convertToBase64(file);
                
                // שליחת התמונה לפונקציית נטליפי
                const response = await fetch('/.netlify/functions/generate-costume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        image: base64Image
                    })
                });
                
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                
                if (data.url) {
                    showCostumeImage(data.url);
                    resultSection.style.display = 'block';
                    costumeDescription.textContent = 'הנה התחפושת המושלמת בשבילך! מה דעתך?';
                } else {
                    throw new Error('שגיאה ביצירת התחפושת');
                }
            } catch (error) {
                showError(error.message);
            } finally {
                showLoading(false);
            }
        }
    });

    // טיפול בהבאת תמונה מאינסטגרם
    fetchInstagramBtn.addEventListener('click', async function() {
        const username = instagramUsername.value.trim();
        if (!username) {
            showError('אנא הכנס/י שם משתמש באינסטגרם');
            return;
        }

        showLoading(true);
        try {
            const response = await fetch(`/.netlify/functions/instagram-profile?username=${encodeURIComponent(username)}`);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            if (data.profileImageUrl) {
                showOriginalImage(data.profileImageUrl);
                
                // המרת תמונת URL ל-base64
                const base64Image = await convertUrlToBase64(data.profileImageUrl);
                
                // שליחת התמונה לפונקציית נטליפי
                const costumeResponse = await fetch('/.netlify/functions/generate-costume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        image: base64Image 
                    })
                });
                
                const costumeData = await costumeResponse.json();
                if (costumeData.error) {
                    throw new Error(costumeData.error);
                }
                
                if (costumeData.url) {
                    showCostumeImage(costumeData.url);
                    resultSection.style.display = 'block';
                    costumeDescription.textContent = 'הנה התחפושת המושלמת בשבילך! מה דעתך?';
                } else {
                    throw new Error('שגיאה ביצירת התחפושת');
                }
            } else {
                throw new Error('לא נמצאה תמונת פרופיל');
            }
        } catch (error) {
            showError(error.message);
        } finally {
            showLoading(false);
        }
    });

    function showOriginalImage(url) {
        originalPreview.src = url;
        originalPreview.style.display = 'block';
    }

    function showCostumeImage(url) {
        costumePreview.src = url;
        costumePreview.style.display = 'block';
    }

    function showLoading(show) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    async function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    async function convertUrlToBase64(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return await convertToBase64(blob);
    }
});

function shareOnInstagram() {
    const costumeImage = document.getElementById('costume-preview').src;
    alert('פונקציונליות השיתוף לאינסטגרם בפיתוח');
}

function downloadImage() {
    const costumeImage = document.getElementById('costume-preview');
    const link = document.createElement('a');
    link.download = 'purim-costume.png';
    link.href = costumeImage.src;
    link.click();
} 