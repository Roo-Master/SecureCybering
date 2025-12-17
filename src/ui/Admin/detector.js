
// Cyber animated binary background
const canvas = document.getElementById('cyberCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const binaryChars = '01';
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(0);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ffea'; // Neon cyan
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    requestAnimationFrame(draw);
}

draw();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
// syncDashboard.js

// ====== Utility Functions ======

// Convert peer table rows to peer objects
function getPeers() {
    const peers = [];
    const rows = document.querySelectorAll("#peerTable tbody tr");
    rows.forEach(row => {
        const cells = row.cells;
        peers.push({
            name: cells[0].innerText,
            role: cells[1].innerText,
            addedAt: cells[2].innerText
        });
    });
    return peers;
}

// Convert auth log table rows to log objects
function getAuthLogs() {
    const logs = [];
    const rows = document.querySelectorAll("#logTable tbody tr");
    rows.forEach(row => {
        const cells = row.cells;
        logs.push({
            user: cells[0].innerText,
            method: cells[1].innerText,
            status: cells[2].innerText,
            time: cells[3].innerText
        });
    });
    return logs;
}

// ====== API Simulations ======

// Add peers to Gossip hub
function addPeersToGossipHub(peers) {
    // Replace this with your actual API call
    console.log("Adding peers to Gossip hub:", peers);
    // Example using fetch:

    fetch('/api/gossip/addPeers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(peers)
    })
    .then(res => res.json())
    .then(data => console.log("Gossip hub updated:", data))
    .catch(err => console.error(err));

}

// Add auth logs to audit logs
function addLogsToAudit(logs) {
    // Replace this with your actual API call
    console.log("Adding auth logs to audit:", logs);
    // Example using fetch:
  
    fetch('/api/audit/addLogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logs)
    })
    .then(res => res.json())
    .then(data => console.log("Audit logs updated:", data))
    .catch(err => console.error(err));
  
}

// ====== Main Sync Function ======
function syncDashboardData() {
    const peers = getPeers();
    const logs = getAuthLogs();

    if (peers.length > 0) addPeersToGossipHub(peers);
    if (logs.length > 0) addLogsToAudit(logs);
}

// ====== Optional: Auto-sync every 5 minutes ======
setInterval(syncDashboardData, 5 * 60 * 1000); // 5 minutes

// ====== Optional: Sync on page load ======
document.addEventListener("DOMContentLoaded", () => {
    syncDashboardData();
});
