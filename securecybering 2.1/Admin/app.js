// app.js

// ------------------------
// Login and Role Handling
// ------------------------
function login() {
    const roleSelect = document.getElementById('roleSelect');
    const selectedRole = roleSelect.value;

    // Show dashboard and hide login modal
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    // Display role in header
    document.getElementById('userRole').textContent = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);
}

// Logout function
function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginModal').classList.remove('hidden');
}

// ------------------------
// Tab Navigation
// ------------------------
const tabs = document.querySelectorAll('.nav-tab');
const contents = document.querySelectorAll('.tab-content');

function showTab(tabName) {
    contents.forEach(content => {
        if (content.id === tabName + '-tab') {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    tabs.forEach(tab => {
        if (tab.textContent.replace(/\s/g, '').toLowerCase() === tabName.replace(/-/g, '').toLowerCase()) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Animate grid cards in the Overview tab
    if (tabName === 'overview') {
        animateGridCards();
    }
}

// ------------------------
// Animate Overview Cards
// ------------------------
function animateGridCards() {
    const cards = document.querySelectorAll('#overview-tab .grid > div');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 150); // staggered animation
    });
}



// ------------------------
// Initialize all charts
// ------------------------
function createCharts() {
    // Transaction Chart
    initChart(
        'transactionChart',
        'line', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [120, 150, 170, 160, 190, 200], ['#5D5CDE'], { plugins: { legend: { display: false } } }
    );

    // Fraud Chart
    initChart(
        'fraudChart',
        'bar', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [5, 8, 4, 10, 6, 9], ['#FF6B6B'], { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    );

    // Risk Chart
    initChart(
        'riskChart',
        'doughnut', ['Low', 'Medium', 'High'], [60, 30, 10], ['#4ECDC4', '#FFE66D', '#FF6B6B'], { plugins: { legend: { position: 'bottom' } } }
    );
}


// Fraud Chart
new Chart(fraudCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Fraud Detected',
            data: [5, 8, 4, 10, 6, 9],
            backgroundColor: '#FF6B6B'
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Risk Chart (if exists)
if (riskCtx) {
    new Chart(riskCtx, {
        type: 'doughnut',
        data: {
            labels: ['Low', 'Medium', 'High'],
            datasets: [{
                data: [60, 30, 10],
                backgroundColor: ['#4ECDC4', '#FFE66D', '#FF6B6B']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}


// ------------------------
// Initialize Dashboard
// ------------------------
document.addEventListener('DOMContentLoaded', () => {
    createCharts();
    showTab('overview'); // default tab
});

// ------------------------
// Optional: Node Grid Coloring
// ------------------------
function updateNodeStatus(nodes) {
    const grid = document.getElementById('nodesGrid');
    grid.innerHTML = ''; // clear previous

    nodes.forEach(node => {
        const div = document.createElement('div');
        div.className = `p-4 rounded-lg text-white text-center ${node.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`;
        div.textContent = node.name;
        grid.appendChild(div);
    });
}

// Example usage:
// updateNodeStatus([
//     {name: 'Node 1', status: 'active'},
//     {name: 'Node 2', status: 'inactive'},
//     {name: 'Node 3', status: 'active'}
// ]);