// DOM References
const loginModal = document.getElementById('loginModal');
const dashboard = document.getElementById('dashboard');
const roleSelect = document.getElementById('roleSelect');
const userRoleDisplay = document.getElementById('userRole');
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

// Dashboard Metrics
const metrics = {
    totalTransactions: document.getElementById('totalTransactions'),
    fraudDetected: document.getElementById('fraudDetected'),
    riskScore: document.getElementById('riskScore'),
    activeNodes: document.getElementById('activeNodes'),
    blockHeight: document.getElementById('blockHeight')
};

// Charts
let transactionChart, fraudChart, riskChart;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    loginModal.classList.remove('hidden');
    dashboard.classList.add('hidden');
    
    // Initialize charts
    initCharts();
    
    // Set up tab navigation
    setupTabNavigation();
});

// Login function
function login() {
    const role = roleSelect.value;
    const roleNames = {
        'admin': 'System Administrator',
        'manager': 'Fraud Manager',
        'ceo': 'Chief Executive Officer'
    };
    
    // Update UI with role
    userRoleDisplay.textContent = roleNames[role] || 'User';
    
    // Hide login, show dashboard
    loginModal.classList.add('hidden');
    dashboard.classList.remove('hidden');
    
    // Start dashboard functionality
    startDashboard(role);
    
    // Show welcome notification
    showNotification(`Welcome, ${roleNames[role]}! Dashboard initialized.`, 'success');
}

// Logout function
function logout() {
    // Hide dashboard, show login
    dashboard.classList.add('hidden');
    loginModal.classList.remove('hidden');
    
    // Reset UI
    document.querySelector('.nav-tab.active').classList.remove('active');
    document.getElementById('overview-tab').classList.remove('hidden');
    document.querySelector('[onclick="showTab(\'overview\')"]').classList.add('active');
    
    // Reset metrics
    resetMetrics();
    
    // Show logout notification
    showNotification('You have been logged out successfully.', 'info');
}

// Show tab function
function showTab(tabId) {
    // Update active tab
    navTabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
    
    // Show selected tab content
    tabContents.forEach(tab => tab.classList.add('hidden'));
    document.getElementById(`${tabId}-tab`).classList.remove('hidden');
    
    // Special handling for certain tabs
    if (tabId === 'monitoring') {
        startLiveFeed();
    }
}

// Initialize charts
function initCharts() {
    // Transaction Volume Chart
    const transactionCtx = document.getElementById('transactionChart').getContext('2d');
    transactionChart = new Chart(transactionCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Transactions',
                data: [120, 190, 140, 160, 156, 155, 180, 190, 210, 230, 240, 245],
                borderColor: '#5D5CDE',
                backgroundColor: 'rgba(93, 92, 222, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Fraud Detection Chart
    const fraudCtx = document.getElementById('fraudChart').getContext('2d');
    fraudChart = new Chart(fraudCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Fraud Cases',
                data: [12, 19, 14, 16, 15, 15, 18, 19, 21, 23, 24, 24],
                backgroundColor: '#FF6B6B',
                borderColor: '#FF6B6B',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Risk Scoring Chart
    const riskCtx = document.getElementById('riskChart').getContext('2d');
    riskChart = new Chart(riskCtx, {
        type: 'radar',
        data: {
            labels: ['Transaction Size', 'Location', 'Behavior', 'Frequency', 'History'],
            datasets: [{
                label: 'Risk Score',
                data: [75, 60, 85, 45, 70],
                fill: true,
                backgroundColor: 'rgba(78, 205, 196, 0.2)',
                borderColor: '#4ECDC4',
                pointBackgroundColor: '#4ECDC4',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#4ECDC4'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    });
}

// Start dashboard functionality
function startDashboard(role) {
    // Set up tab navigation
    setupTabNavigation();
    
    // Initialize metrics
    updateMetrics();
    
    // Set up periodic updates
    setInterval(updateMetrics, 5000);
    
    // Start live feed if on monitoring tab
    if (document.getElementById('monitoring-tab').classList.contains('hidden') === false) {
        startLiveFeed();
    }
    
    // Show role-specific welcome message
    const welcomeMessages = {
        'admin': 'System configuration unlocked. You have full access.',
        'manager': 'Fraud oversight tools activated. Monitor transactions in real-time.',
        'ceo': 'Strategic overview dashboard ready. Key metrics available.'
    };
    
    showNotification(welcomeMessages[role] || 'Dashboard initialized.', 'success');
}

// Update dashboard metrics
function updateMetrics() {
    // Simulate live data updates
    metrics.totalTransactions.textContent = Math.floor(Math.random() * 10000 + 5000);
    metrics.fraudDetected.textContent = Math.floor(Math.random() * 50 + 10);
    metrics.riskScore.textContent = Math.floor(Math.random() * 20 + 30);
    metrics.activeNodes.textContent = Math.floor(Math.random() * 5 + 10);
    metrics.blockHeight.textContent = Math.floor(Math.random() * 1000 + 5000);
    
    // Update charts with new data points
    if (transactionChart) {
        const newData = [...transactionChart.data.datasets[0].data.slice(1), Math.floor(Math.random() * 100 + 200)];
        transactionChart.data.datasets[0].data = newData;
        transactionChart.update();
    }
    
    if (fraudChart) {
        const newData = [...fraudChart.data.datasets[0].data.slice(1), Math.floor(Math.random() * 10 + 15)];
        fraudChart.data.datasets[0].data = newData;
        fraudChart.update();
    }
    
    if (riskChart) {
        const newData = riskChart.data.datasets[0].data.map(() => Math.floor(Math.random() * 30 + 50));
        riskChart.data.datasets[0].data = newData;
        riskChart.update();
    }
}

// Reset metrics to zero
function resetMetrics() {
    metrics.totalTransactions.textContent = '0';
    metrics.fraudDetected.textContent = '0';
    metrics.riskScore.textContent = '0';
    metrics.activeNodes.textContent = '0';
    metrics.blockHeight.textContent = '0';
}

// Set up tab navigation
function setupTabNavigation() {
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            tabContents.forEach(tab => tab.classList.add('hidden'));
            document.getElementById(`${tabId}-tab`).classList.remove('hidden');
            
            // Start live feed if monitoring tab is selected
            if (tabId === 'monitoring') {
                startLiveFeed();
            }
        });
    });
}

// Start live transaction feed
function startLiveFeed() {
    const transactionFeed = document.getElementById('transactionFeed');
    const alertsFeed = document.getElementById('alertsFeed');
    
    // Clear existing content
    transactionFeed.innerHTML = '';
    alertsFeed.innerHTML = '';
    
    // Generate initial transactions
    for (let i = 0; i < 8; i++) {
        addRandomTransaction(transactionFeed);
    }
    
    // Generate initial alerts
    for (let i = 0; i < 3; i++) {
        addRandomAlert(alertsFeed);
    }
    
    // Set up periodic updates
    const transactionInterval = setInterval(() => {
        if (transactionFeed.children.length > 15) {
            transactionFeed.removeChild(transactionFeed.firstChild);
        }
        addRandomTransaction(transactionFeed);
    }, 2000);
    
    const alertInterval = setInterval(() => {
        if (alertsFeed.children.length > 5) {
            alertsFeed.removeChild(alertsFeed.firstChild);
        }
        
        // Randomly add alerts (20% chance)
        if (Math.random() < 0.2) {
            addRandomAlert(alertsFeed);
        }
    }, 5000);
    
    // Store intervals for cleanup
    transactionFeed.dataset.interval = transactionInterval;
    alertsFeed.dataset.interval = alertInterval;
}

// Add random transaction to feed
function addRandomTransaction(feed) {
    const transaction = document.createElement('div');
    transaction.className = 'p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center';
    
    // Random transaction data
    const types = ['Payment', 'Transfer', 'Withdrawal', 'Deposit', 'Purchase'];
    const statuses = ['Completed', 'Pending', 'Processing'];
    const amounts = (Math.random() * 5000 + 10).toFixed(2);
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    
    // Create transaction HTML
    transaction.innerHTML = `
        <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                ${type === 'Payment' ? '💰' : type === 'Transfer' ? '↔️' : type === 'Withdrawal' ? '↓' : type === 'Deposit' ? '↑' : '🛒'}
            </div>
            <div>
                <div class="font-medium">${type}</div>
                <div class="text-xs text-gray-500">${new Date().toLocaleTimeString()}</div>
            </div>
        </div>
        <div class="text-right">
            <div class="font-medium ${status === 'Completed' ? 'text-green-600' : status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'}">${status}</div>
            <div class="text-sm">${currency} ${amounts}</div>
        </div>
    `;
    
    // Add to feed with animation
    feed.appendChild(transaction);
    setTimeout(() => {
        transaction.style.opacity = '1';
        transaction.style.transform = 'translateY(0)';
    }, 10);
}

// Add random alert to feed
function addRandomAlert(feed) {
    const alert = document.createElement('div');
    alert.className = 'p-3 rounded-lg border-l-4 flex items-start';
    
    // Random alert data
    const severities = ['high', 'medium', 'low'];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    // Set alert styling based on severity
    if (severity === 'high') {
        alert.classList.add('bg-red-50', 'dark:bg-red-900', 'border-red-500');
    } else if (severity === 'medium') {
        alert.classList.add('bg-yellow-50', 'dark:bg-yellow-900', 'border-yellow-500');
    } else {
        alert.classList.add('bg-blue-50', 'dark:bg-blue-900', 'border-blue-500');
    }
    
    // Alert types
    const types = [
        'Suspicious Transaction Pattern',
        'Multiple Failed Login Attempts',
        'Unusual Location Activity',
        'High-Risk Transaction',
        'Potential Account Takeover'
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Create alert HTML
    alert.innerHTML = `
        <div class="mr-3 mt-1">
            ${severity === 'high' ? '⚠️' : severity === 'medium' ? '🔍' : 'ℹ️'}
        </div>
        <div>
            <div class="font-medium">${type}</div>
            <div class="text-sm mt-1">Detected at ${new Date().toLocaleTimeString()}</div>
            <div class="mt-2 flex space-x-2">
                <button class="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Investigate</button>
                <button class="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Dismiss</button>
            </div>
        </div>
    `;
    
    // Add to feed with animation
    feed.appendChild(alert);
    setTimeout(() => {
        alert.style.opacity = '1';
        alert.style.transform = 'translateY(0)';
    }, 10);
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white max-w-md z-50 transform transition-all duration-300 translate-x-24 opacity-0`;
    
    // Set notification styling based on type
    if (type === 'success') {
        notification.classList.add('bg-green-600');
    } else if (type === 'error') {
        notification.classList.add('bg-red-600');
    } else if (type === 'warning') {
        notification.classList.add('bg-yellow-600');
    } else {
        notification.classList.add('bg-blue-600');
    }
    
    // Add content
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="mr-3 mt-0.5">
                ${type === 'success' ? '✓' : type === 'error' ? '⚠️' : type === 'warning' ? '⚠️' : 'ℹ️'}
            </div>
            <div>${message}</div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-24', 'opacity-0');
        notification.classList.add('translate-x-0', 'opacity-100');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('translate-x-0', 'opacity-100');
        notification.classList.add('translate-x-24', 'opacity-0');
        
        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Initialize blockchain log
function initBlockchainLog() {
    const blockchainLog = document.getElementById('blockchainLog');
    
    // Add some initial log entries
    for (let i = 0; i < 5; i++) {
        addBlockchainLogEntry(blockchainLog);
    }
    
    // Periodically add new entries
    setInterval(() => {
        if (blockchainLog.children.length > 8) {
            blockchainLog.removeChild(blockchainLog.firstChild);
        }
        addBlockchainLogEntry(blockchainLog);
    }, 8000);
}

// Add blockchain log entry
function addBlockchainLogEntry(logElement) {
    const logEntry = document.createElement('div');
    logEntry.className = 'text-xs p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors';
    
    // Random blockchain data
    const actions = ['Transaction', 'Validation', 'Consensus', 'Block Creation', 'Smart Contract'];
    const statuses = ['Verified', 'Pending', 'Confirmed', 'Rejected'];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const hash = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    
    logEntry.innerHTML = `
        <span class="text-gray-500">[${new Date().toLocaleTimeString()}]</span>
        <span class="${status === 'Verified' || status === 'Confirmed' ? 'text-green-500' : status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}">${status}</span>
        <span>${action} -</span>
        <span class="text-blue-400">${hash}</span>
    `;
    
    logElement.appendChild(logEntry);
}

// Initialize nodes grid
function initNodesGrid() {
    const nodesGrid = document.getElementById('nodesGrid');
    nodesGrid.innerHTML = '';
    
    // Create nodes
    for (let i = 1; i <= 12; i++) {
        const status = Math.random() > 0.2 ? 'active' : 'inactive';
        const load = Math.floor(Math.random() * 80 + 10);
        
        const node = document.createElement('div');
        node.className = `p-4 rounded-lg flex flex-col items-center justify-center ${
            status === 'active' ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700'
        }`;
        
        node.innerHTML = `
            <div class="text-lg font-medium mb-2">Node ${i}</div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                status === 'active' ? 'bg-green-500' : 'bg-red-500'
            }">
                ${status === 'active' ? '✓' : '✗'}
            </div>
            <div class="text-sm">${status === 'active' ? `Load: ${load}%` : 'Offline'}</div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                <div class="${status === 'active' ? 'bg-green-500' : 'bg-red-500'} h-1.5 rounded-full" style="width: ${status === 'active' ? load : 0}%"></div>
            </div>
        `;
        
        nodesGrid.appendChild(node);
    }
}