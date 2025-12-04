// script.js - Handles user login and integrates with gossip.html

(function() {
    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        // User is logged in, proceed to integrate with gossip app
        integrateWithGossip(loggedInUser);
        return;
    }

    // If not logged in, show login form
    showLoginForm();

    function showLoginForm() {
        // Add CSS for login overlay
        const style = document.createElement('style');
        style.textContent = `
            .login-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .login-form {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                width: 300px;
                text-align: center;
            }
            .login-form input {
                width: 100%;
                padding: 8px;
                margin: 10px 0;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .login-form button {
                width: 100%;
                padding: 10px;
                background: #2563eb;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .login-form button:hover {
                background: #1d4ed8;
            }
        `;
        document.head.appendChild(style);

        // Create login overlay
        const overlay = document.createElement('div');
        overlay.className = 'login-overlay';
        overlay.innerHTML = `
            <div class="login-form">
                <h2>Login to Gossip Hub</h2>
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button id="loginBtn">Login</button>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">For demo purposes, any username/password is accepted.</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Handle login
        document.getElementById('loginBtn').addEventListener('click', function() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            if (!username || !password) {
                alert('Please enter both username and password.');
                return;
            }
            // For demo, accept any login
            localStorage.setItem('loggedInUser', username);
            overlay.remove();
            integrateWithGossip(username);
        });
    }

    function integrateWithGossip(username) {
        // Wait for the gossip app to load (since script.js is loaded after the inline script)
        // The inline script sets window._app, so we can hook into it
        const checkApp = setInterval(() => {
            if (window._app && window._app.peers) {
                clearInterval(checkApp);
                // Check if a peer with this username exists, else create one
                let peerId = null;
                for (const [id, peer] of Object.entries(window._app.peers)) {
                    if (peer.name.toLowerCase() === username.toLowerCase()) {
                        peerId = id;
                        break;
                    }
                }
                if (!peerId) {
                    // Create new peer
                    peerId = window._app.createPeer(username);
                }
                // Set as active peer
                window.activePeerId = peerId;
                localStorage.setItem('activePeerId', peerId);
                // Re-render UI
                if (typeof renderUI === 'function') {
                    renderUI();
                }
                // Update the activePeer select
                const sel = document.getElementById('activePeer');
                if (sel) {
                    sel.value = peerId;
                }
            }
        }, 100);
    }
})();