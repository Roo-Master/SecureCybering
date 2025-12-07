// ======== Login & Logout ========
function login() {
    const role = document.getElementById("roleSelect").value;

    if (!role) {
        alert("Please select a role");
        return;
    }

    // Save login state
    localStorage.setItem("loggedInUser", role);

    // Hide login modal & show dashboard
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    // Display user role
    document.getElementById("userRole").textContent = role.charAt(0).toUpperCase() + role.slice(1);
}

// Check login state on page load
function checkLogin() {
    const role = localStorage.getItem("loggedInUser");
    if (!role) {
        // Show login modal
        document.getElementById("loginModal").classList.remove("hidden");
        document.getElementById("dashboard").classList.add("hidden");
    } else {
        // Show dashboard
        document.getElementById("loginModal").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
        document.getElementById("userRole").textContent = role.charAt(0).toUpperCase() + role.slice(1);
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    // Redirect to login modal
    document.getElementById("loginModal").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
    alert("You have been logged out. Please login again to access the system.");
}

// ======== Tab Navigation ========
function showTab(tabId) {
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.add("hidden"));

    const targetTab = document.getElementById(`${tabId}-tab`);
    if (targetTab) targetTab.classList.remove("hidden");

    // Update active tab button
    const tabButtons = document.querySelectorAll(".nav-tab");
    tabButtons.forEach(btn => btn.classList.remove("active"));

    const activeBtn = Array.from(tabButtons).find(btn => btn.getAttribute("onclick")?.includes(tabId));
    if (activeBtn) activeBtn.classList.add("active");
}

// ======== Dashboard Tab Loader ========
document.addEventListener("DOMContentLoaded", () => {
    // Check login state
    checkLogin();

    const dashboardTab = document.getElementById('dashboardTab');
    if (dashboardTab) {
        dashboardTab.addEventListener('click', function(e) {
            e.preventDefault();
            alert("Redirecting to Decentralized Dashboard...");

            // Loader overlay
            const loader = document.createElement('div');
            loader.id = "loaderOverlay";
            loader.innerHTML = `
                <div class="spinner"></div>
                <p>Loading Decentralized Dashboard...</p>
            `;
            document.body.appendChild(loader);

            const style = document.createElement('style');
            style.textContent = `
                #loaderOverlay {
                    position: fixed;
                    top:0; left:0;
                    width:100vw; height:100vh;
                    background: rgba(255,255,255,0.9);
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center;
                    z-index:9999;
                }
                .spinner {
                    width: 60px;
                    height: 60px;
                    border: 6px solid #ddd;
                    border-top: 6px solid #4070f4;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                #loaderOverlay p {
                    margin-top: 15px;
                    font-size:16px;
                    color:#333;
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                window.location.href = 'decentralized.html';
            }, 2000);
        });
    }
});
