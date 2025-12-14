// ==============================
// NETWORK BACKGROUND ANIMATION
// ==============================
const canvas = document.getElementById('networkBg');
const ctx = canvas.getContext('2d');

let nodes = [];
const nodeCount = 50;
const maxDistance = 150;

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create nodes
for (let i = 0; i < nodeCount; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: 'rgba(93, 92, 222, 0.8)' // glowing node color
    });
}

// Animation loop
function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let dx = nodes[i].x - nodes[j].x;
            let dy = nodes[i].y - nodes[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < maxDistance) {
                ctx.strokeStyle = `rgba(93, 92, 222, ${1 - dist / maxDistance})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }

    // Draw nodes
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    });

    requestAnimationFrame(animateNetwork);
}

animateNetwork();

// detector.js

// Global variables
let currentRole = '';
let transactionCount = 0;
let fraudCount = 0;
let riskScore = 0;
let activeNodes = 0;
let blockHeight = 0;

// Chart instances
let transactionChart;
let fraudChart;
let riskChart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupTabNavigation();
    setupNetworkBackground();
    startDataSimulation();
});

// Login functionality
function login() {
    const roleSelect = document.getElementById('roleSelect');
    currentRole = roleSelect.value;
    
    if (currentRole) {
        document.getElementById('loginModal').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('userRole').textContent = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
        
        // Role-based access control (simplified)
        if (currentRole === 'admin') {
            // Admin has full access
        } else if (currentRole === 'manager') {
            // Manager can access monitoring and detection
            document.querySelector('[data-tab="blockchain"]').style.display = 'none';
        } else if (currentRole === 'ceo') {
            // CEO has overview access
            document.querySelector('[data-tab="monitoring"]').style.display = 'none';
            document.querySelector('[data-tab="ai-detection"]').style.display = 'none';
            document.querySelector('[data-tab="blockchain"]').style.display = 'none';
            document.querySelector('[data-tab="nodes"]').style.display = 'none';
        }
    }
}

// Logout functionality
function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginModal').classList.remove('hidden');
    currentRole = '';
    resetData();
}

// Tab navigation
function setupTabNavigation() {
    const tabs = document.querySelectorAll('#navTabs button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.id.replace('Btn', '-tab');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Show selected tab content
            document.getElementById(tabId).classList.remove('hidden');
            
            // Update active tab styling
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Set default active tab
    document.getElementById('overviewBtn').click();
}

// Initialize charts
function initializeCharts() {
    // Transaction Volume Chart
    const transactionCtx = document.getElementById('transactionChart').getContext('2d');
    transactionChart = new Chart(transactionCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Transactions',
                data: [1200, 1900, 3000, 5000, 2000, 3000],
                borderColor: '#5D5CDE',
                backgroundColor: 'rgba(93, 92, 222, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Fraud Detection Rate Chart
    const fraudCtx = document.getElementById('fraudChart').getContext('2d');
    fraudChart = new Chart(fraudCtx, {
        type: 'doughnut',
        data: {
            labels: ['Legitimate', 'Suspicious', 'Fraudulent'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: ['#4ECDC4', '#FFE66D', '#FF6B6B']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Risk Scoring Chart
    const riskCtx = document.getElementById('riskChart').getContext('2d');
    riskChart = new Chart(riskCtx, {
        type: 'radar',
        data: {
            labels: ['Velocity', 'Amount', 'Location', 'Device', 'Behavior'],
            datasets: [{
                label: 'Risk Factors',
                data: [20, 40, 60, 30, 80],
                borderColor: '#FF6B6B',
                backgroundColor: 'rgba(255, 107, 107, 0.2)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Network background animation
function setupNetworkBackground() {
    const canvas = document.getElementById('networkBg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const nodes = [];
    const numNodes = 50;
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(93, 92, 222, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#5D5CDE';
            ctx.fill();
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Simulate real-time data
function startDataSimulation() {
    setInterval(() => {
        // Update metrics
        transactionCount += Math.floor(Math.random() * 10) + 1;
        fraudCount += Math.random() > 0.95 ? 1 : 0;
        riskScore = Math.floor(Math.random() * 100);
        activeNodes = Math.floor(Math.random() * 20) + 80;
        blockHeight += Math.floor(Math.random() * 5) + 1;
        
        updateMetrics();
        
        // Add transaction to feed
        addTransactionToFeed();
        
        // Add alert occasionally
        if (Math.random() > 0.9) {
            addAlertToFeed();
        }
        
        // Update blockchain log
        addBlockchainEntry();
        
        // Update nodes
        updateNodesGrid();
        
        // Update charts
        updateCharts();
    }, 2000);
}

function updateMetrics() {
    document.getElementById('totalTransactions').textContent = transactionCount.toLocaleString();
    document.getElementById('fraudDetected').textContent = fraudCount;
    document.getElementById('riskScore').textContent = riskScore;
    document.getElementById('activeNodes').textContent = activeNodes;
    document.getElementById('blockHeight').textContent = blockHeight.toLocaleString();
}

function addTransactionToFeed() {
    const feed = document.getElementById('transactionFeed');
    const transaction = document.createElement('div');
    transaction.className = 'p-3 bg-gray-50 dark:bg-gray-700 rounded-lg';
    transaction.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <span class="font-medium">TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">$${Math.floor(Math.random() * 10000) + 100}</span>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-xs px-2 py-1 rounded-full ${Math.random() > 0.9 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                    ${Math.random() > 0.9 ? 'High Risk' : 'Low Risk'}
                </span>
                <span class="text-xs text-gray-500">${new Date().toLocaleTimeString()}</span>
            </div>
        </div>
    `;
    
    feed.insertBefore(transaction, feed.firstChild);
    
    // Limit feed to 20 items
    if (feed.children.length > 20) {
        feed.removeChild(feed.lastChild);
    }
}

function addAlertToFeed() {
    const feed = document.getElementById('alertsFeed');
    const alert = document.createElement('div');
    alert.className = 'p-3 bg-red-50 dark:bg-red-900 rounded-lg border-l-4 border-red-500';
    alert.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="text-red-600">⚠️</span>
            <div>
                <p class="font-medium text-red-800 dark:text-red-200">Suspicious Activity Detected</p>
                <p class="text-sm text-red-600 dark:text-red-400">Unusual transaction pattern from IP: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}</p>
            </div>
        </div>
    `;
    
    feed.insertBefore(alert, feed.firstChild);
    
    // Limit feed to 10 items
    if (feed.children.length > 10) {
        feed.removeChild(feed.lastChild);
    }
}

function addBlockchainEntry() {
    const log = document.getElementById('blockchainLog');
    const entry = document.createElement('div');
    entry.className = 'text-xs';
    entry.innerHTML = `
        <span class="text-gray-500">[${new Date().toISOString()}]</span>
        <span class="text-green-600">Block ${blockHeight} mined</span>
        <span class="text-gray-400">Hash: ${Math.random().toString(16).substr(2, 16)}</span>
    `;
    
    log.insertBefore(entry, log.firstChild);
    
    // Limit log to 20 entries
    if (log.children.length > 20) {
        log.removeChild(log.lastChild);
    }
}

function updateNodesGrid() {
    const grid = document.getElementById('nodesGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center';
        const status = Math.random() > 0.1 ? 'Active' : 'Inactive';
        node.innerHTML = `
            <div class="w-8 h-8 mx-auto mb-2 rounded-full ${status === 'Active' ? 'bg-green-500' : 'bg-red-500'}"></div>
            <p class="text-sm font-medium">Node ${i + 1}</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">${status}</p>
        `;
        grid.appendChild(node);
    }
}

function updateCharts() {
    // Update transaction chart with new data
    transactionChart.data.datasets[0].data.push(Math.floor(Math.random() * 5000) + 1000);
    if (transactionChart.data.datasets[0].data.length > 6) {
        transactionChart.data.datasets[0].data.shift();
    }
    transactionChart.update();
    
    // Update fraud chart
    const fraudData = [85 + Math.floor(Math.random() * 10), 10 + Math.floor(Math.random() * 5), 5 + Math.floor(Math.random() * 3)];
    fraudChart.data.datasets[0].data = fraudData;
    fraudChart.update();
    
    // Update risk chart
    riskChart.data.datasets[0].data = [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
    ];
    riskChart.update();
}

function resetData() {
    transactionCount = 0;
    fraudCount = 0;
    riskScore = 0;
    activeNodes = 0;
    blockHeight = 0;
    updateMetrics();
    
    // Clear feeds
    document.getElementById('transactionFeed').innerHTML = '';
    document.getElementById('alertsFeed').innerHTML = '';
    document.getElementById('blockchainLog').innerHTML = '';
}
function setupTabNavigation() {
    const tabs = document.querySelectorAll('#navTabs button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        // Dynamically assign data-tab attribute for role-based access (e.g., 'overview', 'monitoring', etc.)
        const tabName = tab.id.replace('Btn', '').replace('Tab', ''); // Handles 'overviewBtn' -> 'overview', 'dashboardTab' -> 'dashboard'
        tab.setAttribute('data-tab', tabName);
        
        tab.addEventListener('click', function() {
            const tabId = this.id.replace('Btn', '-tab').replace('Tab', '-tab'); // Handles 'overviewBtn' -> 'overview-tab', 'dashboardTab' -> 'dashboard-tab'
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Show selected tab content (if it exists)
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.remove('hidden');
            }
            
            // Update active tab styling
            tabs.forEach(t => t.classList.remove('active', 'bg-primary', 'text-white'));
            this.classList.add('active', 'bg-primary', 'text-white');
        });
    });
    
    // Set default active tab (Overview)
    const defaultTab = document.getElementById('overviewBtn');
    if (defaultTab) {
        defaultTab.click();
    }
}// Inject CSS for tab navigation if not in detector.css
const tabNavStyle = document.createElement('style');
tabNavStyle.textContent = `
    #navTabs button {
        transition: all 0.3s ease;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: transparent;
        color: #6b7280;
    }
    #navTabs button.active {
        background-color: #5D5CDE;
        color: white;
        box-shadow: 0 0 10px rgba(93, 92, 222, 0.3);
    }
    #navTabs button:hover {
        background-color: rgba(93, 92, 222, 0.1);
        color: #5D5CDE;
    }
`;
document.head.appendChild(tabNavStyle);