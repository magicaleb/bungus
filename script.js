// My Tools Hub - JavaScript

// Tool definitions
const tools = [
    {
        id: 'habits',
        name: 'Habit Tracker',
        icon: '📅',
        description: 'Daily habit tracking',
        color: '#667eea',
        link: 'habits.html'
    },
    {
        id: 'notes',
        name: 'Notes',
        icon: '📝',
        description: 'Quick note taking',
        color: '#FFD700',
        link: '#'
    },
    {
        id: 'calculator',
        name: 'Calculator',
        icon: '🧮',
        description: 'Basic calculator',
        color: '#4CAF50',
        link: '#'
    },
    {
        id: 'timer',
        name: 'Timer',
        icon: '⏱️',
        description: 'Stopwatch & countdown',
        color: '#FF6B6B',
        link: '#'
    },
    {
        id: 'tasks',
        name: 'Tasks',
        icon: '✅',
        description: 'To-do list',
        color: '#4ECDC4',
        link: '#'
    },
    {
        id: 'weather',
        name: 'Weather',
        icon: '🌤️',
        description: 'Weather info',
        color: '#95E1D3',
        link: '#'
    },
    {
        id: 'tools',
        name: 'More Tools',
        icon: '🛠️',
        description: 'Additional utilities',
        color: '#9B59B6',
        link: '#'
    }
];

// Initialize app
function initializeApp() {
    checkStandaloneMode();
    renderTools();
    setupEventListeners();
    preventZoom();
    registerServiceWorker();
}

// Register service worker for PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Check if running in standalone mode
function checkStandaloneMode() {
    const statusMode = document.getElementById('status-mode');
    const installPrompt = document.getElementById('install-prompt');
    
    if (!statusMode || !installPrompt) return;
    
    if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
        statusMode.textContent = '📱 Standalone Mode';
        installPrompt.style.display = 'none';
    } else {
        statusMode.textContent = '🌐 Browser Mode';
    }
}

// Render tool cards
function renderTools() {
    const toolsGrid = document.querySelector('.tools-grid');
    
    if (!toolsGrid) return;
    
    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.setAttribute('data-tool-id', tool.id);
        
        // Create icon element
        const toolIcon = document.createElement('div');
        toolIcon.className = 'tool-icon';
        toolIcon.style.background = tool.color;
        toolIcon.textContent = tool.icon;
        
        // Create info container
        const toolInfo = document.createElement('div');
        toolInfo.className = 'tool-info';
        
        // Create name element
        const toolName = document.createElement('h3');
        toolName.className = 'tool-name';
        toolName.textContent = tool.name;
        
        // Create description element
        const toolDescription = document.createElement('p');
        toolDescription.className = 'tool-description';
        toolDescription.textContent = tool.description;
        
        // Assemble the card
        toolInfo.appendChild(toolName);
        toolInfo.appendChild(toolDescription);
        toolCard.appendChild(toolIcon);
        toolCard.appendChild(toolInfo);
        
        toolCard.addEventListener('click', () => handleToolClick(tool));
        toolsGrid.appendChild(toolCard);
    });
}

// Handle tool click
function handleToolClick(tool) {
    // Navigate to tool page if link is provided
    if (tool.link && tool.link !== '#') {
        window.location.href = tool.link;
        return;
    }
    
    // Show coming soon message for tools without pages
    showToast(`${tool.name} - Coming Soon!`);
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    const installBtn = document.getElementById('install-btn');
    
    if (installBtn) {
        installBtn.addEventListener('click', showInstallInstructions);
    }
}

// Show installation instructions
function showInstallInstructions(e) {
    e.preventDefault();
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
        showToast('Tap Share (↑) then "Add to Home Screen"');
    } else {
        showToast("Use your browser's menu to install this app");
    }
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}