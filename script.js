'use strict';

const WORDS = [
    { word: 'javascript', hint: 'Programming Language' },
    { word: 'algorithm',  hint: 'Computer Science' },
    { word: 'keyboard',   hint: 'Computer Hardware' },
    { word: 'elephant',   hint: 'Animal' },
    { word: 'mountain',   hint: 'Geography' },
    { word: 'library',    hint: 'Place / Programming' },
    { word: 'python',     hint: 'Programming Language' },
    { word: 'umbrella',   hint: 'Everyday Object' },
    { word: 'chocolate',  hint: 'Food' },
    { word: 'telescope',  hint: 'Science' },
    { word: 'penguin',    hint: 'Animal' },
    { word: 'notebook',   hint: 'Everyday Object' },
    { word: 'developer',  hint: 'Profession' },
    { word: 'browser',    hint: 'Technology' },
    { word: 'function',   hint: 'Programming' },
    { word: 'variable',   hint: 'Programming' },
    { word: 'database',   hint: 'Technology' },
    { word: 'interface',  hint: 'Programming' },
    { word: 'network',    hint: 'Technology' },
    { word: 'hospital',   hint: 'Place' },
    { word: 'furniture',  hint: 'Home' },
    { word: 'sandwich',   hint: 'Food' },
    { word: 'sunshine',   hint: 'Weather' },
    { word: 'waterfall',  hint: 'Nature' },
    { word: 'dinosaur',   hint: 'Animal' },
    { word: 'calendar',   hint: 'Everyday Object' },
    { word: 'computer',   hint: 'Technology' },
    { word: 'universe',   hint: 'Science' },
    { word: 'adventure',  hint: 'Concept' },
];

const MAX_WRONG = 6;

const BODY_PART_IDS = ['head', 'body', 'arm-l', 'arm-r', 'leg-l', 'leg-r'];

const state = {
    word: '',
    hint: '',
    guessed: new Set(),
    wrongCount: 0,
    wins: 0,
    losses: 0,
    gameOver: false,
};

// DOM refs
const wordDisplay    = document.getElementById('word-display');
const wrongList      = document.getElementById('wrong-list');
const hintEl         = document.getElementById('hint');
const keyboard       = document.getElementById('keyboard');
const overlay        = document.getElementById('message-overlay');
const messageTitle   = document.getElementById('message-title');
const messageWord    = document.getElementById('message-word');
const playAgainBtn   = document.getElementById('play-again-btn');
const winsEl         = document.getElementById('wins');
const lossesEl       = document.getElementById('losses');

function pickWord() {
    const entry = WORDS[Math.floor(Math.random() * WORDS.length)];
    return entry;
}

function initGame() {
    const entry = pickWord();
    state.word      = entry.word.toLowerCase();
    state.hint      = entry.hint;
    state.guessed   = new Set();
    state.wrongCount = 0;
    state.gameOver  = false;

    overlay.classList.add('hidden');
    renderGallows();
    renderWord();
    renderWrong();
    renderKeyboard();
    hintEl.textContent = `Hint: ${state.hint}`;
    updateScore();
}

function renderGallows() {
    BODY_PART_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        el.classList.toggle('hidden', i >= state.wrongCount);
    });
}

function renderWord() {
    wordDisplay.innerHTML = '';
    for (const ch of state.word) {
        const slot = document.createElement('div');
        if (ch === ' ') {
            slot.className = 'letter-slot space';
        } else {
            slot.className = 'letter-slot';
            if (state.guessed.has(ch)) {
                slot.textContent = ch;
                slot.classList.add('revealed');
            }
        }
        wordDisplay.appendChild(slot);
    }
}

function renderWrong() {
    const wrong = [...state.guessed].filter(ch => !state.word.includes(ch));
    wrongList.textContent = wrong.join(' ') || '';
}

function renderKeyboard() {
    keyboard.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const ch = String.fromCharCode(97 + i);
        const btn = document.createElement('button');
        btn.className = 'key';
        btn.textContent = ch;
        btn.setAttribute('aria-label', `Guess letter ${ch}`);
        btn.dataset.letter = ch;

        if (state.guessed.has(ch)) {
            btn.disabled = true;
            btn.classList.add(state.word.includes(ch) ? 'correct' : 'wrong');
        }

        btn.addEventListener('click', () => guess(ch));
        keyboard.appendChild(btn);
    }
}

function updateKeyButton(ch) {
    const btn = keyboard.querySelector(`[data-letter="${ch}"]`);
    if (!btn) return;
    btn.disabled = true;
    btn.classList.add(state.word.includes(ch) ? 'correct' : 'wrong');
}

function guess(ch) {
    if (state.gameOver || state.guessed.has(ch)) return;

    state.guessed.add(ch);

    if (!state.word.includes(ch)) {
        state.wrongCount++;
    }

    renderGallows();
    renderWord();
    renderWrong();
    updateKeyButton(ch);
    checkEndCondition();
}

function isWordComplete() {
    return [...state.word].every(ch => ch === ' ' || state.guessed.has(ch));
}

function checkEndCondition() {
    if (isWordComplete()) {
        state.wins++;
        endGame(true);
    } else if (state.wrongCount >= MAX_WRONG) {
        state.losses++;
        endGame(false);
    }
}

function endGame(won) {
    state.gameOver = true;
    updateScore();

    messageTitle.textContent = won ? '🎉 You Won!' : '💀 Game Over';
    messageTitle.style.color = won ? 'var(--correct)' : 'var(--wrong)';
    messageWord.innerHTML = `The word was: <span>${state.word}</span>`;
    overlay.classList.remove('hidden');
    playAgainBtn.focus();
}

function updateScore() {
    winsEl.textContent   = state.wins;
    lossesEl.textContent = state.losses;
}

// Keyboard input
document.addEventListener('keydown', (e) => {
    if (state.gameOver) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            initGame();
        }
        return;
    }
    const ch = e.key.toLowerCase();
    if (/^[a-z]$/.test(ch)) {
        guess(ch);
    }
});

playAgainBtn.addEventListener('click', initGame);

initGame();
