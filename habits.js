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
let currentWeekStart = null;
let currentDay = new Date();
let currentView = 'month'; // 'month', 'week', or 'day'

// Initialize app
function initializeApp() {
    loadData();
    renderTodayDate();
    renderHabits();
    initializeWeekStart();
    renderCalendar();
    updateProgress();
    setupEventListeners();
    registerServiceWorker();
}

// Register service worker for PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/bungus/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
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

// Initialize week start to current week
function initializeWeekStart() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - dayOfWeek);
    currentWeekStart.setHours(0, 0, 0, 0);
}

// Get start of week for a given date
function getWeekStart(date) {
    const d = new Date(date);
    const dayOfWeek = d.getDay();
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - dayOfWeek);
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
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
    if (currentView === 'month') {
        renderMonthView();
    } else if (currentView === 'week') {
        renderWeekView();
    } else if (currentView === 'day') {
        renderDayView();
    }
}

// Render month view
function renderMonthView() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarTitle = document.getElementById('calendar-title');
    
    if (!calendarGrid || !calendarTitle) return;
    
    // Update header
    const monthOptions = { month: 'long', year: 'numeric' };
    calendarTitle.textContent = currentMonth.toLocaleDateString('en-US', monthOptions);
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    calendarGrid.className = 'calendar-grid';
    
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

// Render week view
function renderWeekView() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarTitle = document.getElementById('calendar-title');
    
    if (!calendarGrid || !calendarTitle) return;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    calendarGrid.className = 'week-view';
    
    // Calculate week range
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    // Update header
    const startMonth = currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endMonth = weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    calendarTitle.textContent = `${startMonth} - ${endMonth}`;
    
    const todayString = getTodayString();
    
    // Render 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(date.getDate() + i);
        const dateString = getDateString(date);
        const isToday = dateString === todayString;
        
        const dayCompletions = completions[dateString] || [];
        const completed = dayCompletions.length;
        const total = habits.length;
        
        const weekDayCard = document.createElement('div');
        weekDayCard.className = 'week-day-card';
        
        if (isToday) {
            weekDayCard.classList.add('today');
        }
        
        // Add completion class
        if (completed > 0 && total > 0) {
            if (completed === total) {
                weekDayCard.classList.add('completed-all');
            } else {
                weekDayCard.classList.add('completed-some');
            }
        } else if (total > 0) {
            const dateMidnight = new Date(date);
            dateMidnight.setHours(0, 0, 0, 0);
            const todayMidnight = new Date();
            todayMidnight.setHours(0, 0, 0, 0);
            if (dateMidnight < todayMidnight && !isToday) {
                weekDayCard.classList.add('completed-none');
            }
        }
        
        const dayInfo = document.createElement('div');
        dayInfo.className = 'week-day-info';
        
        const dayName = document.createElement('div');
        dayName.className = 'week-day-name';
        dayName.textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        const dayDate = document.createElement('div');
        dayDate.className = 'week-day-date';
        dayDate.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        dayInfo.appendChild(dayName);
        dayInfo.appendChild(dayDate);
        
        const dayStats = document.createElement('div');
        dayStats.className = 'week-day-stats';
        
        if (total > 0) {
            const badge = document.createElement('div');
            badge.className = 'week-completion-badge';
            badge.textContent = `${completed}/${total}`;
            
            const progressBar = document.createElement('div');
            progressBar.className = 'week-progress-bar';
            
            const progressFill = document.createElement('div');
            progressFill.className = 'week-progress-fill';
            progressFill.style.width = `${(completed / total) * 100}%`;
            
            progressBar.appendChild(progressFill);
            dayStats.appendChild(badge);
            dayStats.appendChild(progressBar);
        }
        
        weekDayCard.appendChild(dayInfo);
        weekDayCard.appendChild(dayStats);
        calendarGrid.appendChild(weekDayCard);
    }
}

// Render day view
function renderDayView() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarTitle = document.getElementById('calendar-title');
    
    if (!calendarGrid || !calendarTitle) return;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    calendarGrid.className = 'day-view';
    
    // Update header
    calendarTitle.textContent = currentDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const dateString = getDateString(currentDay);
    const dayCompletions = completions[dateString] || [];
    const completed = dayCompletions.length;
    const total = habits.length;
    
    // Day header
    const header = document.createElement('div');
    header.className = 'day-view-header';
    
    const viewDate = document.createElement('div');
    viewDate.className = 'day-view-date';
    viewDate.textContent = currentDay.getDate();
    
    const viewWeekday = document.createElement('div');
    viewWeekday.className = 'day-view-weekday';
    viewWeekday.textContent = currentDay.toLocaleDateString('en-US', { weekday: 'long' });
    
    header.appendChild(viewDate);
    header.appendChild(viewWeekday);
    
    // Summary cards
    if (total > 0) {
        const summary = document.createElement('div');
        summary.className = 'day-view-summary';
        
        const completedCard = document.createElement('div');
        completedCard.className = 'day-summary-card';
        completedCard.innerHTML = `
            <div class="summary-value">${completed}</div>
            <div class="summary-label">Completed</div>
        `;
        
        const totalCard = document.createElement('div');
        totalCard.className = 'day-summary-card';
        totalCard.innerHTML = `
            <div class="summary-value">${total}</div>
            <div class="summary-label">Total Habits</div>
        `;
        
        const percentCard = document.createElement('div');
        percentCard.className = 'day-summary-card';
        const percentage = Math.round((completed / total) * 100);
        percentCard.innerHTML = `
            <div class="summary-value">${percentage}%</div>
            <div class="summary-label">Complete</div>
        `;
        
        summary.appendChild(completedCard);
        summary.appendChild(totalCard);
        summary.appendChild(percentCard);
        header.appendChild(summary);
    }
    
    calendarGrid.appendChild(header);
    
    // Habits list
    if (habits.length > 0) {
        const habitsList = document.createElement('div');
        habitsList.className = 'day-habits-list';
        
        habits.forEach((habit, index) => {
            const isCompleted = dayCompletions.includes(index);
            
            const habitItem = document.createElement('div');
            habitItem.className = `day-habit-item ${isCompleted ? 'completed' : ''}`;
            
            const habitStatus = document.createElement('div');
            habitStatus.className = 'day-habit-status';
            habitStatus.textContent = isCompleted ? '✓' : '';
            
            const habitName = document.createElement('div');
            habitName.className = 'day-habit-name';
            habitName.textContent = habit;
            
            habitItem.appendChild(habitStatus);
            habitItem.appendChild(habitName);
            habitsList.appendChild(habitItem);
        });
        
        calendarGrid.appendChild(habitsList);
    } else {
        const noData = document.createElement('div');
        noData.className = 'no-data-message';
        noData.textContent = 'No habits configured';
        calendarGrid.appendChild(noData);
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
    
    // Normalize dates for comparison (set time to midnight)
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const dateMidnight = new Date(date);
    dateMidnight.setHours(0, 0, 0, 0);
    
    // Add completion class
    if (completed > 0 && total > 0) {
        if (completed === total) {
            dayElement.classList.add('completed-all');
        } else {
            dayElement.classList.add('completed-some');
        }
    } else if (dateMidnight < todayMidnight && !isToday && total > 0) {
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

// Navigate to previous period
function prevPeriod() {
    if (currentView === 'month') {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    } else if (currentView === 'week') {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
    } else if (currentView === 'day') {
        currentDay.setDate(currentDay.getDate() - 1);
    }
    renderCalendar();
}

// Navigate to next period
function nextPeriod() {
    if (currentView === 'month') {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    } else if (currentView === 'week') {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    } else if (currentView === 'day') {
        currentDay.setDate(currentDay.getDate() + 1);
    }
    renderCalendar();
}

// Switch view
function switchView(view) {
    currentView = view;
    
    // Update active button
    const viewButtons = document.querySelectorAll('.view-button');
    viewButtons.forEach(btn => {
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderCalendar();
}

// Setup event listeners
function setupEventListeners() {
    const settingsBtn = document.getElementById('settings-btn');
    const closeSettingsBtn = document.getElementById('close-settings');
    const saveSettingsBtn = document.getElementById('save-settings');
    const addHabitBtn = document.getElementById('add-habit-btn');
    const prevPeriodBtn = document.getElementById('prev-period');
    const nextPeriodBtn = document.getElementById('next-period');
    const modal = document.getElementById('settings-modal');
    const viewButtons = document.querySelectorAll('.view-button');
    
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
    
    if (prevPeriodBtn) {
        prevPeriodBtn.addEventListener('click', prevPeriod);
    }
    
    if (nextPeriodBtn) {
        nextPeriodBtn.addEventListener('click', nextPeriod);
    }
    
    // View switcher buttons
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchView(btn.dataset.view);
        });
    });
    
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
