// Configuration
var CORRECT_USERNAME = 'GŽIJ';
var CORRECT_PASSWORD = '10553264813';
var HINTS = [
    'User: Svarbiausi tavo žmonės Pass: Tavo ir tik tavo diena',
    'User: Tai yra 4 vardai Pass: Svarbi kiekviena minutė!',
    'User: Vardų inicialai pagal amžių Pass: Padalink visą data iš savo amžiaus'
];

// Application state
var loginAttempts = 0;
var currentHintIndex = 0;
var activeHints = [];
var isLoggedIn = false;
var validationPerformed = false;

// Render login form function
function renderLoginForm(errorMessage, hints) {
    // Default parameters
    errorMessage = errorMessage || '';
    hints = hints || [];

    var hintsHTML = hints.map(function(hint, index) {
        return '<div class="hint-message">Hint ' + (index + 1) + ': ' + hint + '</div>';
    }).join('');

    var appContainer = document.getElementById('app');
    appContainer.innerHTML = 
        '<h2>Prisijunk ir pasiimk dovaną!</h2>' +
        '<form id="login-form" class="login-form">' +
            '<input type="text" id="username" placeholder="Username" required ' + 
            (validationPerformed ? (checkUsername() ? 'class="correct"' : 'class="incorrect"') : '') + '>' +
            '<input type="password" id="password" placeholder="Password" required ' + 
            (validationPerformed ? (checkPassword() ? 'class="correct"' : 'class="incorrect"') : '') + '>' +
            (errorMessage ? '<div class="error-message">' + errorMessage + '</div>' : '') +
            hintsHTML +
            '<button type="submit">Atsiimti dovaną</button>' +
            '<p>Bandymų skaičius: ' + loginAttempts + '</p>' +
        '</form>';

    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Check username
function checkUsername() {
    var usernameInput = document.getElementById('username');
    return usernameInput.value === CORRECT_USERNAME;
}

// Check password
function checkPassword() {
    var passwordInput = document.getElementById('password');
    return passwordInput.value === CORRECT_PASSWORD;
}

// Login handler
function handleLogin(e) {
    e.preventDefault();
    
    // Set validation flag
    validationPerformed = true;

    // Increment login attempts
    loginAttempts++;

    // Check if username and password are correct
    if (checkUsername() && checkPassword()) {
        isLoggedIn = true;
        renderPDFView();
    } else {
        var errorMessage = 'Neatspėjai';

        // Check if a new hint should be added
        if (loginAttempts % 15 === 0 && currentHintIndex < HINTS.length) {
            // Add a new hint to the active hints
            activeHints.push(HINTS[currentHintIndex]);
            currentHintIndex = Math.min(currentHintIndex + 1, HINTS.length - 1);
        }

        // Render login form with current error message and active hints
        renderLoginForm(errorMessage, activeHints);
    }
}

// Render PDF view function
function renderPDFView() {
    var appContainer = document.getElementById('app');
    appContainer.innerHTML = 
        '<div class="pdf-container">' +
            '<h2>Ignas ir Gabija sveikina tave su gimtadieniu!</h2>' +
            '<p>Linkim daug garso, šviesų ir gerų įspūdžių!!!</p>' +
            '<iframe src="/Qz_juliui/Jaručio_koncertas.pdf" class="pdf-iframe" title="Jaručio koncas"></iframe>' +
            '<button id="download-btn" class="download-btn">Atsisiųsti bilietą</button>' +
        '</div>';

    document.getElementById('download-btn').addEventListener('click', handleDownload);
}

// Download handler
function handleDownload() {
    var link = document.createElement('a');
    link.href = '/Qz_juliui/Jaručio_koncertas.pdf';
    link.download = 'Jaručio koncertas.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initial render
renderLoginForm();