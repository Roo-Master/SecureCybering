document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("container");
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";

    const toLogin = document.getElementById("toLogin");
    const toRegister = document.getElementById("toRegister");

    toLogin.addEventListener("click", () => {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        clearErrors();
    });
    toRegister.addEventListener("click", () => {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "block";
        clearErrors();
    });

});
// script.js

// Keys for localStorage
const USERS_KEY = 'users';
const PEERS_KEY = 'peers';

// Load / Save helpers
function loadJSON(key, defaultVal) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : defaultVal;
    } catch (e) {
        console.error(e);
        return defaultVal;
    }
}

function saveJSON(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Initialize stores
let users = loadJSON(USERS_KEY, {});
let peers = loadJSON(PEERS_KEY, {});

// Generate simple peer ID
function genPeerId() {
    return 'peer_' + Math.random().toString(36).substring(2, 10);
}

// Add a peer when someone registers
function addPeer(username) {
    const id = genPeerId();
    peers[id] = {
        id: id,
        username: username,
        reputation: 50,
        loyaltyCard: false
    };
    saveJSON(PEERS_KEY, peers);
}

// DOM elements
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const toLogin = document.getElementById('toLogin');
const toRegister = document.getElementById('toRegister');

const regUsername = document.getElementById('regUsername');
const regPassword = document.getElementById('regPassword');
const regConfirm = document.getElementById('regConfirmPassword');
const regError = document.getElementById('regError');
const registerBtn = document.getElementById('registerBtn');

const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const loginBtn = document.getElementById('loginBtn');



function clearErrors() {
    regError.textContent = '';
    loginError.textContent = '';
}

// Registration handler
registerBtn.addEventListener('click', () => {
    const username = regUsername.value.trim();
    const password = regPassword.value;
    const confirm = regConfirm.value;
    clearErrors();

    if (!username || !password || !confirm) {
        regError.textContent = 'All fields are required';
        return;
    }
    if (password !== confirm) {
        regError.textContent = 'Passwords do not match';
        return;
    }
    if (users[username]) {
        regError.textContent = 'Username already exists';
        return;
    }

    // Save user
    users[username] = { password: password };
    saveJSON(USERS_KEY, users);

    // Add to peers
    addPeer(username);

    alert('Registration successful! You can now log in.');
    regUsername.value = '';
    regPassword.value = '';
    regConfirm.value = '';
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Login handler
loginBtn.addEventListener('click', () => {
    const username = loginUsername.value.trim();
    const password = loginPassword.value;
    clearErrors();

    if (!username || !password) {
        loginError.textContent = 'All fields are required';
        return;
    }
    const user = users[username];
    if (!user || user.password !== password) {
        loginError.textContent = 'Invalid username or password';
        return;
    }

    alert(`Welcome, ${username}!`);
    // After login, redirect or load your peer system app
    window.location.href = 'gossip.html'; // modify if your main app file is different
});