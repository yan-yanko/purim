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
                
                // שליחת התמונה לשרת
                const formData = new FormData();
                formData.append('image', file);
                
                const response = await fetch('/api/generate-costume', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if (data.url) {
                    showCostumeImage(data.url);
                    resultSection.style.display = 'block';
                    costumeDescription.textContent = 'הנה התחפושת המושלמת בשבילך! מה דעתך?';
                } else {
                    throw new Error(data.error || 'שגיאה ביצירת התחפושת');
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
            const response = await fetch(`/api/instagram-profile/${username}`);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            showOriginalImage(data.profileImageUrl);
            const costumeResponse = await fetch('/api/generate-costume', {
                method: 'POST',
                body: JSON.stringify({ imageUrl: data.profileImageUrl }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const costumeData = await costumeResponse.json();
            if (costumeData.url) {
                showCostumeImage(costumeData.url);
                resultSection.style.display = 'block';
                costumeDescription.textContent = 'הנה התחפושת המושלמת בשבילך! מה דעתך?';
            } else {
                throw new Error(costumeData.error || 'שגיאה ביצירת התחפושת');
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
});

function shareOnInstagram() {
    const costumeImage = document.getElementById('costume-preview').src;
    // בעתיד - הוספת אינטגרציה עם Instagram Sharing API
    alert('פונקציונליות השיתוף לאינסטגרם בפיתוח');
}

function downloadImage() {
    const costumeImage = document.getElementById('costume-preview');
    const link = document.createElement('a');
    link.download = 'purim-costume.png';
    link.href = costumeImage.src;
    link.click();
} 