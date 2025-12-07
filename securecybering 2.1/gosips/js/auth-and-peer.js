// auth-and-peer.js

// Utility to load / save JSON data in localStorage
function loadJSON(key, defaultValue) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    console.error("loadJSON error for key", key, e);
    return defaultValue;
  }
}

function saveJSON(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("saveJSON error for key", key, e);
  }
}

// --- Stores ---
// users: { username -> { password, ... } }
// peers: { peerId -> peerData }  (peerData includes id, username, reputation, etc.)
const USERS_KEY  = 'users';   // for login/registration
const PEERS_KEY  = 'peers';   // for peer system

// Load stores or initialize
let users = loadJSON(USERS_KEY, {});
let peers = loadJSON(PEERS_KEY, {});

// Simple ID generator for peers
function generatePeerId() {
  return 'peer_' + Math.random().toString(36).substring(2, 10);
}

// Add a new peer (used after registration or admin-add)
function addPeer(username) {
  const id = generatePeerId();
  const color = '#'+Math.floor(Math.random()*16777215).toString(16); // random color
  peers[id] = {
    id,
    username,
    color,
    reputation: 50,
    loyaltyCard: false
  };
  saveJSON(PEERS_KEY, peers);
  console.log('Peer added', peers[id]);
  return peers[id];
}

// Check credentials for login
function checkCredentials(username, password) {
  if (users[username] && users[username].password === password) {
    return true;
  }
  return false;
}

// Handle registration
function register(username, password, confirmPassword) {
  if (!username || !password || !confirmPassword) {
    throw new Error("All fields required");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  if (users[username]) {
    throw new Error("Username already exists");
  }

  // Save user credentials
  users[username] = { password };
  saveJSON(USERS_KEY, users);

  // Add to peers
  const newPeer = addPeer(username);

  return newPeer;
}

// Handle login
function login(username, password) {
  if (!username || !password) {
    throw new Error("All fields required");
  }
  if (!checkCredentials(username, password)) {
    throw new Error("Invalid username or password");
  }
  return true;
}

// Expose functions to global (for hooking into your HTML)
window.AuthPeer = {
  register,
  login,
  getAllPeers: () => loadJSON(PEERS_KEY, {}),
  getAllUsers: () => loadJSON(USERS_KEY, {})
};
