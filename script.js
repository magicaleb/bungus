// Bungus - Dummy Home Screen JavaScript

// Global variables
let currentImageData = null;

// DOM elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const previewImage = document.getElementById('preview-image');
const changeImageBtn = document.getElementById('change-image');
const createFakeScreenBtn = document.getElementById('create-fake-screen');
const fakeHomeScreen = document.getElementById('fake-home-screen');
const fakeScreenImage = document.getElementById('fake-screen-image');
const closeFakeScreenBtn = document.getElementById('close-fake-screen');

// Initialize app
function initializeApp() {
    displayScreenInfo();
    checkStandaloneMode();
    setupEventListeners();
    loadSavedImage();
    preventZoom();
}

// Display screen dimensions
function displayScreenInfo() {
    document.getElementById('screen-size').textContent = 
        window.innerWidth + ' × ' + window.innerHeight;
}

// Check if running in standalone mode
function checkStandaloneMode() {
    if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
        document.getElementById('standalone').textContent = 'Standalone App';
        document.getElementById('install-btn').style.display = 'none';
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Install button
    document.getElementById('install-btn').addEventListener('click', showInstallInstructions);
    
    // Upload functionality
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);
    
    // Preview actions
    changeImageBtn.addEventListener('click', changeImage);
    createFakeScreenBtn.addEventListener('click', showFakeScreen);
    
    // Fake screen controls
    closeFakeScreenBtn.addEventListener('click', closeFakeScreen);
    
    // Prevent interactions on fake screen
    fakeScreenImage.addEventListener('contextmenu', preventDefault);
    fakeHomeScreen.addEventListener('selectstart', preventDefault);
}

// Load saved image on app start
function loadSavedImage() {
    const savedImage = localStorage.getItem('homeScreenImage');
    if (savedImage) {
        displayPreview(savedImage);
    }
}

// Show installation instructions
function showInstallInstructions(e) {
    e.preventDefault();
    alert('To add to Home Screen:\n\n1. Tap the Share button (⎋)\n2. Scroll and tap "Add to Home Screen"\n3. Tap "Add"');
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

// Handle file drop
function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        handleImageFile(files[0]);
    }
}

// Handle file selection
function handleFileSelect(e) {
    if (e.target.files.length > 0) {
        handleImageFile(e.target.files[0]);
    }
}

// Process uploaded image file
function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        displayPreview(imageData);
        saveImageToStorage(imageData);
    };
    reader.readAsDataURL(file);
}

// Display image preview
function displayPreview(imageData) {
    currentImageData = imageData;
    previewImage.src = imageData;
    uploadArea.style.display = 'none';
    previewContainer.style.display = 'block';
}

// Save image to local storage
function saveImageToStorage(imageData) {
    localStorage.setItem('homeScreenImage', imageData);
}

// Change image functionality
function changeImage() {
    uploadArea.style.display = 'block';
    previewContainer.style.display = 'none';
    fileInput.click();
}

// Show fake home screen
function showFakeScreen() {
    if (currentImageData) {
        fakeScreenImage.src = currentImageData;
        fakeHomeScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close fake home screen
function closeFakeScreen() {
    fakeHomeScreen.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Prevent default event
function preventDefault(e) {
    e.preventDefault();
}

// Prevent zoom on double tap
function preventZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}