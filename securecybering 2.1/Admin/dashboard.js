document.getElementsByClassName("login-btn").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // 🔹 Example role assignment logic
    let role = "User";
    if (username === "manager") role = "Manager";
    else if (username === "admin") role = "Admin";
    else if (username === "ceo") role = "CEO";

    // 🔹 Store data in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify({ username, role }));

    // 🔹 Redirect to dashboard
    window.location.href = "decentralized.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem("loggedInUser");

    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById("userName").textContent = user.username;
        document.getElementById("userRole").textContent = user.role;

        // Optional: color-code the role
        const roleEl = document.getElementById("userRole");
        switch (user.role.toLowerCase()) {
            case "admin":
                roleEl.style.color = "#e74c3c"; // Red
                break;
            case "manager":
                roleEl.style.color = "#f39c12"; // Orange
                break;
            case "ceo":
                roleEl.style.color = "#2ecc71"; // Green
                break;
            default:
                roleEl.style.color = "#3498db"; // Blue for regular user
        }
    } else {
        // Redirect to login if no user is found
        window.location.href = "login.html";
    }
});

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeMatrix();
window.addEventListener("resize", resizeMatrix);

const letters = "010101 ABCDEF $%#@*&";
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffcc";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

const pCanvas = document.getElementById("particleCanvas");
const pCtx = pCanvas.getContext("2d");

function resizeParticles() {
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
}
resizeParticles();
window.addEventListener("resize", resizeParticles);

const particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7
    });
}

function drawParticles() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > pCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > pCanvas.height) p.vy *= -1;

        pCtx.fillStyle = "#38bdf8";
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        pCtx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                pCtx.strokeStyle = `rgba(56,189,248,${1 - dist / 120})`;
                pCtx.lineWidth = 0.6;
                pCtx.beginPath();
                pCtx.moveTo(particles[i].x, particles[i].y);
                pCtx.lineTo(particles[j].x, particles[j].y);
                pCtx.stroke();
            }
        }
    }

    requestAnimationFrame(drawParticles);
}
drawParticles();



let fraudThreshold = 60;

function checkFraudLevel() {
    const fraudCard = document.querySelectorAll(".stat-value")[1];
    let fraudValue = parseInt(fraudCard.textContent);

    if (fraudValue >= fraudThreshold) {
        document.body.classList.add("alert-mode");

        if (!window.alertTriggered) {
            alert("🚨 CRITICAL ALERT 🚨\nFraud spike detected! System is in RED ALERT MODE.");
            window.alertTriggered = true;
        }
    } else {
        document.body.classList.remove("alert-mode");
        window.alertTriggered = false;
    }
}

// Simulate fraud increase
setInterval(() => {
    const fraudCard = document.querySelectorAll(".stat-value")[1];
    let value = parseInt(fraudCard.textContent);
    value += Math.floor(Math.random() * 3);
    fraudCard.textContent = value;
    checkFraudLevel();
}, 4000);