// ===== Elements =====
const logo        = document.getElementById('firefox-logo');
const greetingEl  = document.getElementById('greeting-text');
const switchBtn   = document.getElementById('switchUserBtn');
const overlay     = document.getElementById('modalOverlay');
const nameInput   = document.getElementById('nameInput');
const confirmBtn  = document.getElementById('confirmBtn');
const cancelBtn   = document.getElementById('cancelBtn');

// ===== Logo Toggle =====
logo.addEventListener('click', () => {
    const isDefault = logo.getAttribute('src') === 'images/firefox-logo.png';
    logo.src = isDefault ? 'images/firefox-logo2.png' : 'images/firefox-logo.png';
});

// ===== Greeting =====
function updateGreeting(name) {
    greetingEl.textContent = name
        ? `Mozilla is Cool, ${name}!`
        : 'Hello, World!';
}

// ===== Modal =====
function openModal() {
    const stored = localStorage.getItem('name') || '';
    nameInput.value = stored;
    overlay.classList.remove('hidden');
    // Autofocus after transition
    setTimeout(() => nameInput.focus(), 50);
}

function closeModal() {
    overlay.classList.add('hidden');
}

function saveName() {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('name', name);
        updateGreeting(name);
    }
    closeModal();
}

// Confirm on button click or Enter key
confirmBtn.addEventListener('click', saveName);
nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveName();
    if (e.key === 'Escape') closeModal();
});

// Cancel
cancelBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

switchBtn.addEventListener('click', openModal);

// ===== Init =====
const storedName = localStorage.getItem('name');
if (storedName) {
    updateGreeting(storedName);
} else {
    // First visit: open modal after page animations settle
    setTimeout(openModal, 800);
}
