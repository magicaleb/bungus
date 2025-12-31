// Habit Tracker - JavaScript

// Default habits
const DEFAULT_HABITS = [
    'Exercise',
    'Read',
    'Meditate'
];

// State
let habits = [];
let completions = {}; // { 'YYYY-MM-DD': [habitIndex1, habitIndex2, ...] }
let currentMonth = new Date();

// Initialize app
function initializeApp() {
    loadData();
    renderTodayDate();
    renderHabits();
    renderCalendar();
    updateProgress();
    setupEventListeners();
}

// Load data from localStorage
function loadData() {
    const savedHabits = localStorage.getItem('habits');
    const savedCompletions = localStorage.getItem('completions');
    
    habits = savedHabits ? JSON.parse(savedHabits) : [...DEFAULT_HABITS];
    completions = savedCompletions ? JSON.parse(savedCompletions) : {};
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('completions', JSON.stringify(completions));
}

// Get today's date string
function getTodayString() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

// Get date string from Date object
function getDateString(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// Render today's date
function renderTodayDate() {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);
    
    const todayDateElement = document.getElementById('today-date');
    if (todayDateElement) {
        todayDateElement.textContent = dateString;
    }
}

// Render habits list
function renderHabits() {
    const habitsList = document.getElementById('habits-list');
    
    if (!habitsList) return;
    
    if (habits.length === 0) {
        habitsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎯</div>
                <div class="empty-state-text">No habits yet</div>
                <div class="empty-state-subtext">Tap the settings button to add habits</div>
            </div>
        `;
        return;
    }
    
    const todayString = getTodayString();
    const todayCompletions = completions[todayString] || [];
    
    habitsList.innerHTML = '';
    
    habits.forEach((habit, index) => {
        const isCompleted = todayCompletions.includes(index);
        
        const habitItem = document.createElement('div');
        habitItem.className = `habit-item ${isCompleted ? 'completed' : ''}`;
        habitItem.setAttribute('data-habit-index', index);
        
        const habitName = document.createElement('div');
        habitName.className = 'habit-name';
        habitName.textContent = habit;
        
        const habitCheckbox = document.createElement('div');
        habitCheckbox.className = 'habit-checkbox';
        
        habitItem.appendChild(habitName);
        habitItem.appendChild(habitCheckbox);
        
        habitItem.addEventListener('click', () => toggleHabit(index));
        
        habitsList.appendChild(habitItem);
    });
}

// Toggle habit completion
function toggleHabit(habitIndex) {
    const todayString = getTodayString();
    
    if (!completions[todayString]) {
        completions[todayString] = [];
    }
    
    const index = completions[todayString].indexOf(habitIndex);
    
    if (index > -1) {
        // Remove completion
        completions[todayString].splice(index, 1);
    } else {
        // Add completion
        completions[todayString].push(habitIndex);
    }
    
    saveData();
    renderHabits();
    updateProgress();
    renderCalendar();
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

// Update progress circle
function updateProgress() {
    const progressCircle = document.getElementById('progress-circle');
    const progressCount = document.getElementById('progress-count');
    
    if (!progressCircle || !progressCount) return;
    
    const todayString = getTodayString();
    const todayCompletions = completions[todayString] || [];
    const completed = todayCompletions.length;
    const total = habits.length;
    
    progressCount.textContent = `${completed}/${total}`;
    
    // Calculate percentage for conic gradient
    const percentage = total > 0 ? (completed / total) * 360 : 0;
    
    // Determine color based on completion
    let color = '#FF4444'; // Red
    if (completed === total && total > 0) {
        color = '#4CAF50'; // Green
    } else if (completed > 0) {
        color = '#FFC107'; // Yellow
    }
    
    progressCircle.style.background = `conic-gradient(
        ${color} ${percentage}deg,
        rgba(255, 255, 255, 0.1) ${percentage}deg
    )`;
}

// Render calendar
function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarMonthElement = document.getElementById('calendar-month');
    
    if (!calendarGrid || !calendarMonthElement) return;
    
    // Update month header
    const monthOptions = { month: 'long', year: 'numeric' };
    calendarMonthElement.textContent = currentMonth.toLocaleDateString('en-US', monthOptions);
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });
    
    // Get first day of month and number of days
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const today = new Date();
    const todayString = getTodayString();
    
    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const date = new Date(year, month - 1, day);
        const dayElement = createCalendarDay(date, true);
        calendarGrid.appendChild(dayElement);
    }
    
    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = getDateString(date);
        const isToday = dateString === todayString;
        const dayElement = createCalendarDay(date, false, isToday);
        calendarGrid.appendChild(dayElement);
    }
    
    // Add days from next month to fill the grid
    const totalCells = calendarGrid.children.length - 7; // Subtract day headers
    const remainingCells = Math.ceil(totalCells / 7) * 7 - totalCells;
    
    for (let day = 1; day <= remainingCells; day++) {
        const date = new Date(year, month + 1, day);
        const dayElement = createCalendarDay(date, true);
        calendarGrid.appendChild(dayElement);
    }
}

// Create calendar day element
function createCalendarDay(date, isOtherMonth, isToday = false) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }
    
    if (isToday) {
        dayElement.classList.add('today');
    }
    
    const dateString = getDateString(date);
    const dayCompletions = completions[dateString] || [];
    const completed = dayCompletions.length;
    const total = habits.length;
    
    // Add completion class
    if (completed > 0 && total > 0) {
        if (completed === total) {
            dayElement.classList.add('completed-all');
        } else {
            dayElement.classList.add('completed-some');
        }
    } else if (date < new Date() && !isToday && total > 0) {
        // Only show red for past days if there are habits configured
        dayElement.classList.add('completed-none');
    }
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    
    dayElement.appendChild(dayNumber);
    
    // Add count if there are completions
    if (completed > 0 && total > 0) {
        const dayCount = document.createElement('div');
        dayCount.className = 'day-count';
        dayCount.textContent = `${completed}/${total}`;
        dayElement.appendChild(dayCount);
    }
    
    return dayElement;
}

// Navigate to previous month
function prevMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    renderCalendar();
}

// Navigate to next month
function nextMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    renderCalendar();
}

// Setup event listeners
function setupEventListeners() {
    const settingsBtn = document.getElementById('settings-btn');
    const closeSettingsBtn = document.getElementById('close-settings');
    const saveSettingsBtn = document.getElementById('save-settings');
    const addHabitBtn = document.getElementById('add-habit-btn');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const modal = document.getElementById('settings-modal');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettings);
    }
    
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettings);
    }
    
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }
    
    if (addHabitBtn) {
        addHabitBtn.addEventListener('click', addHabitInput);
    }
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', prevMonth);
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', nextMonth);
    }
    
    // Close modal on background click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeSettings();
            }
        });
    }
}

// Open settings modal
function openSettings() {
    const modal = document.getElementById('settings-modal');
    const habitInputs = document.getElementById('habit-inputs');
    
    if (!modal || !habitInputs) return;
    
    // Clear existing inputs
    habitInputs.innerHTML = '';
    
    // Add input for each existing habit
    habits.forEach((habit, index) => {
        addHabitInput(habit);
    });
    
    // If no habits, add one empty input
    if (habits.length === 0) {
        addHabitInput();
    }
    
    modal.classList.add('show');
}

// Close settings modal
function closeSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Add habit input field
function addHabitInput(value = '') {
    const habitInputs = document.getElementById('habit-inputs');
    const addHabitBtn = document.getElementById('add-habit-btn');
    
    if (!habitInputs) return;
    
    const currentCount = habitInputs.children.length;
    
    // Limit to 5 habits
    if (currentCount >= 5) {
        showToast('Maximum 5 habits allowed');
        return;
    }
    
    const inputGroup = document.createElement('div');
    inputGroup.className = 'habit-input-group';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'habit-input';
    input.placeholder = `Habit ${currentCount + 1}`;
    input.value = value;
    input.maxLength = 30;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-habit-button';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
        inputGroup.remove();
        updateAddButtonVisibility();
    });
    
    inputGroup.appendChild(input);
    inputGroup.appendChild(removeBtn);
    habitInputs.appendChild(inputGroup);
    
    updateAddButtonVisibility();
}

// Update add button visibility
function updateAddButtonVisibility() {
    const habitInputs = document.getElementById('habit-inputs');
    const addHabitBtn = document.getElementById('add-habit-btn');
    
    if (!habitInputs || !addHabitBtn) return;
    
    const currentCount = habitInputs.children.length;
    addHabitBtn.style.display = currentCount >= 5 ? 'none' : 'block';
}

// Save settings
function saveSettings() {
    const habitInputs = document.getElementById('habit-inputs');
    
    if (!habitInputs) return;
    
    const inputs = habitInputs.querySelectorAll('.habit-input');
    const newHabits = [];
    
    inputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            newHabits.push(value);
        }
    });
    
    if (newHabits.length === 0) {
        showToast('Please add at least one habit');
        return;
    }
    
    // Check if habits have changed
    const habitsChanged = JSON.stringify(habits) !== JSON.stringify(newHabits);
    
    if (habitsChanged) {
        // If habits changed, we need to clean up completions
        // Remove indices that are now out of range
        Object.keys(completions).forEach(dateKey => {
            completions[dateKey] = completions[dateKey].filter(index => index < newHabits.length);
            if (completions[dateKey].length === 0) {
                delete completions[dateKey];
            }
        });
    }
    
    habits = newHabits;
    saveData();
    renderHabits();
    updateProgress();
    renderCalendar();
    closeSettings();
    showToast('Habits saved successfully');
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

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
