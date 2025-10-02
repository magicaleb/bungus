// Handle screenshot upload and storage
let uploadedScreenshot = null;

function setupFileUpload() {
    const fileInput = document.getElementById('screenshot-upload');
    const uploadLabel = document.getElementById('upload-label');
    const initiateBtn = document.getElementById('initiate-btn');
    
    if (!fileInput) return;
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedScreenshot = e.target.result;
                // Store in localStorage for access on the homescreen page
                localStorage.setItem('homescreenImage', uploadedScreenshot);
                
                // Update UI to show file is uploaded
                if (uploadLabel) {
                    uploadLabel.textContent = '✓ Screenshot Uploaded';
                    uploadLabel.style.background = 'rgba(76, 217, 100, 0.3)';
                }
                
                // Enable the initiate button
                if (initiateBtn) {
                    initiateBtn.style.display = 'inline-block';
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

function initiateHomeScreen() {
    const storedImage = localStorage.getItem('homescreenImage');
    if (storedImage) {
        // Navigate to the homescreen page
        window.location.href = 'homescreen.html';
    } else {
        alert('Please upload a screenshot first!');
    }
}

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupFileUpload();
    
    // Check if there's already an uploaded screenshot in localStorage
    const storedImage = localStorage.getItem('homescreenImage');
    if (storedImage) {
        const uploadLabel = document.getElementById('upload-label');
        const initiateBtn = document.getElementById('initiate-btn');
        
        if (uploadLabel) {
            uploadLabel.textContent = '✓ Screenshot Uploaded';
            uploadLabel.style.background = 'rgba(76, 217, 100, 0.3)';
        }
        
        if (initiateBtn) {
            initiateBtn.style.display = 'inline-block';
        }
    }
});
