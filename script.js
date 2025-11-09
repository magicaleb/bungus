// D&D Helper - Progressive Web App JavaScript

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    setupNavigation();
    setupDiceRoller();
    setupNotes();
    setupInfoButtons();
    preventZoom();
    loadRollHistory();
    loadNotes();
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPage = btn.dataset.page;
            
            // Update active states
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show target page
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
        });
    });
}

// ===== DICE ROLLER =====
let rollHistory = [];

function setupDiceRoller() {
    const diceButtons = document.querySelectorAll('.dice-btn');
    
    diceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const diceType = parseInt(btn.dataset.dice);
            rollDice(diceType);
        });
    });
}

function rollDice(sides) {
    const result = Math.floor(Math.random() * sides) + 1;
    displayRollResult(result, sides);
    addToHistory(result, sides);
}

function displayRollResult(result, sides) {
    const resultDiv = document.getElementById('roll-result');
    
    // Check for critical results
    let resultClass = '';
    let resultMessage = '';
    
    if (sides === 20) {
        if (result === 20) {
            resultClass = 'critical-success';
            resultMessage = '🎉 CRITICAL SUCCESS! 🎉';
        } else if (result === 1) {
            resultClass = 'critical-fail';
            resultMessage = '💥 CRITICAL FAIL! 💥';
        }
    }
    
    resultDiv.innerHTML = `
        <div class="result-number ${resultClass}">${result}</div>
        <div class="result-dice-type">d${sides}</div>
        ${resultMessage ? `<div class="result-text">${resultMessage}</div>` : ''}
    `;
}

function addToHistory(result, sides) {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    rollHistory.unshift({
        result,
        sides,
        timestamp
    });
    
    // Keep only last 10 rolls
    if (rollHistory.length > 10) {
        rollHistory = rollHistory.slice(0, 10);
    }
    
    saveRollHistory();
    displayRollHistory();
}

function displayRollHistory() {
    const historyList = document.getElementById('history-list');
    
    if (rollHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No rolls yet</p>';
        return;
    }
    
    historyList.innerHTML = rollHistory.map(roll => `
        <div class="history-item">
            <span class="roll-info">d${roll.sides} at ${roll.timestamp}</span>
            <span class="roll-value">${roll.result}</span>
        </div>
    `).join('');
}

function saveRollHistory() {
    localStorage.setItem('dnd_rollHistory', JSON.stringify(rollHistory));
}

function loadRollHistory() {
    const saved = localStorage.getItem('dnd_rollHistory');
    if (saved) {
        try {
            rollHistory = JSON.parse(saved);
            displayRollHistory();
        } catch (e) {
            console.error('Error loading roll history:', e);
            rollHistory = [];
        }
    }
}

// ===== NOTES =====
let notes = [];

function setupNotes() {
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteContent = document.getElementById('note-content');
    const noteTitle = document.getElementById('note-title');
    
    addNoteBtn.addEventListener('click', () => {
        const content = noteContent.value.trim();
        const title = noteTitle.value.trim();
        
        if (content) {
            addNote(title, content);
            noteContent.value = '';
            noteTitle.value = '';
        }
    });
}

function addNote(title, content) {
    const note = {
        id: Date.now(),
        title: title || 'Untitled Note',
        content,
        timestamp: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    };
    
    notes.unshift(note);
    saveNotes();
    displayNotes();
}

function deleteNote(id) {
    if (confirm('Delete this note?')) {
        notes = notes.filter(note => note.id !== id);
        saveNotes();
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    
    if (notes.length === 0) {
        notesList.innerHTML = '<p class="empty-state">No notes yet. Start writing!</p>';
        return;
    }
    
    notesList.innerHTML = notes.map(note => `
        <div class="note-item">
            <div class="note-item-header">
                <div>
                    <div class="note-item-title">${escapeHtml(note.title)}</div>
                    <div class="note-item-date">${note.timestamp}</div>
                </div>
                <button class="note-delete-btn" onclick="deleteNote(${note.id})">Delete</button>
            </div>
            <div class="note-item-content">${escapeHtml(note.content)}</div>
        </div>
    `).join('');
}

function saveNotes() {
    localStorage.setItem('dnd_notes', JSON.stringify(notes));
}

function loadNotes() {
    const saved = localStorage.getItem('dnd_notes');
    if (saved) {
        try {
            notes = JSON.parse(saved);
            displayNotes();
        } catch (e) {
            console.error('Error loading notes:', e);
            notes = [];
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== INFO BUTTONS & MODAL =====
function setupInfoButtons() {
    const infoButtons = document.querySelectorAll('.info-btn');
    const modal = document.getElementById('info-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    
    infoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const infoType = btn.dataset.info;
            showInfoModal(infoType);
        });
    });
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    function showInfoModal(type) {
        const content = getInfoContent(type);
        modalBody.innerHTML = content;
        modal.classList.add('active');
    }
}

function getInfoContent(type) {
    const infoData = {
        dice: `
            <h3>🎲 Dice Roller Help</h3>
            <p>Tap any die to roll it! Each die has a different number of sides:</p>
            <ul>
                <li><strong>d4:</strong> Used for small weapons and minor spells</li>
                <li><strong>d6:</strong> Common weapons and basic damage</li>
                <li><strong>d8:</strong> Medium weapons and healing spells</li>
                <li><strong>d10:</strong> Heavy weapons and strong effects</li>
                <li><strong>d12:</strong> Very heavy weapons like greataxes</li>
                <li><strong>d20:</strong> The most important! Used for attack rolls, ability checks, and saving throws</li>
                <li><strong>d100:</strong> Percentile rolls for special situations</li>
            </ul>
            <p><strong>Critical Rolls (d20 only):</strong></p>
            <ul>
                <li>Rolling a 20 = Critical Success! 🎉</li>
                <li>Rolling a 1 = Critical Fail! 💥</li>
            </ul>
        `,
        history: `
            <h3>📜 Roll History</h3>
            <p>Your last 10 dice rolls are saved here so you can review them during gameplay.</p>
            <p>Each entry shows:</p>
            <ul>
                <li>The type of die rolled (d4, d6, d20, etc.)</li>
                <li>The time you rolled it</li>
                <li>The result of the roll</li>
            </ul>
            <p>This helps you keep track of your rolls if the DM asks "what did you roll?"</p>
        `,
        notes: `
            <h3>📝 Notes Help</h3>
            <p>Use this page to take notes during your adventure!</p>
            <p><strong>Tips for what to note:</strong></p>
            <ul>
                <li>Important NPCs (characters) you meet</li>
                <li>Quest objectives and goals</li>
                <li>Clues and mysteries</li>
                <li>Locations you've visited</li>
                <li>Items you've found</li>
                <li>Things your DM says are important</li>
            </ul>
            <p>Your notes are saved automatically and will be here next time you open the app!</p>
        `,
        character: `
            <h3>⚔️ Character Sheet</h3>
            <p>This is where your character information will go once you provide it!</p>
            <p><strong>What will be here:</strong></p>
            <ul>
                <li>Your character's name, race, and class</li>
                <li>Ability scores (Strength, Dexterity, etc.)</li>
                <li>Hit points and armor class</li>
                <li>Skills and proficiencies</li>
                <li>Spells (if you're a spellcaster)</li>
                <li>Equipment and inventory</li>
            </ul>
            <p>Once you share your character details, this page will be customized just for you!</p>
        `,
        guide: `
            <h3>📚 Quick Reference Guide</h3>
            <p>This guide contains helpful information for D&D beginners!</p>
            <p><strong>What you'll find here:</strong></p>
            <ul>
                <li>Basic D&D concepts and rules</li>
                <li>Common actions you can take</li>
                <li>When to use each type of die</li>
                <li>Important terminology explained</li>
                <li>Tips for the Crooked Moon campaign</li>
            </ul>
            <p>Check back here whenever you're confused or need a quick reminder!</p>
        `
    };
    
    return infoData[type] || '<p>Information not available.</p>';
}

// ===== UTILITY FUNCTIONS =====
function preventZoom() {
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Prevent pinch zoom
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
}

// Make deleteNote globally accessible
window.deleteNote = deleteNote;