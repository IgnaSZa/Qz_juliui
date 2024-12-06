// Configuration
const CORRECT_USERNAME = 'admin';
const CORRECT_PASSWORD = 'secret123';
const HINTS = [
    'Think about something you might find in a library',
    'This word is often used to describe hidden information',
    'Consider a common word for keeping something private'
];

// Application state
let loginAttempts = 0;
let currentHintIndex = 0;
let isLoggedIn = false;

// Render functions
function renderLoginForm(errorMessage = '') {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <h2>Prisijunk ir gauk dovaną!</h2>
        <form id="login-form" class="login-form">
            <input 
                type="text" 
                id="username" 
                placeholder="Įveskite vartotojo vardą" 
                required
            >
            <input 
                type="password" 
                id="password" 
                placeholder="Įveskite slaptažodį" 
                required
            >
            ${errorMessage ? `<div class="error-message">${errorMessage}</div>` : ''}
            <button type="submit">Prisijungti</button>
            <p>Bandymai prisijungti: ${loginAttempts}</p>
        </form>
    `;

    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

function renderPDFView() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="pdf-container">
            <h2>Sveikinu su gimtadieniu!!!</h2>
            <iframe 
                src="/Untitled-Scanned-29-1.jpg" 
                class="pdf-iframe" 
                title="PDF Viewer"
            ></iframe>
            <button id="download-btn" class="download-btn">
                Atsisiųsti dovaną
            </button>
        </div>
    `;

    document.getElementById('download-btn').addEventListener('click', handleDownload);
}

// Event Handlers
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    loginAttempts++;

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        isLoggedIn = true;
        renderPDFView();
    } else {
        let errorMessage = 'Neteisingas naudotojo vardas arba slaptažodis';

        // Check if a new hint should be added
        if (loginAttempts % 5 === 0 && currentHintIndex < HINTS.length) {
            // Add a new hint to the active hints
            activeHints.push(HINTS[currentHintIndex]);
            currentHintIndex = Math.min(currentHintIndex + 1, HINTS.length - 1);
        }

        // Render login form with current error message and active hints
        renderLoginForm(errorMessage, activeHints);
    }
}

function handleDownload() {
    const link = document.createElement('a');
    link.href = '/Untitled-Scanned-29-1.jpg';
    link.download = 'Untitled-Scanned-29-1.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initial render
renderLoginForm();