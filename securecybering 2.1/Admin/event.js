// events.js

document.addEventListener("DOMContentLoaded", () => {
    const activityList = document.querySelector(".activity-list");
    const refreshBtn = document.querySelector(".btn.btn-outline");

    const events = [{
            icon: "fas fa-exclamation-triangle",
            color: "danger",
            title: "High-risk transaction blocked",
            message: (id) => `Transaction ID: TX-${id} was flagged and blocked`,
            time: "Just now",
        },
        {
            icon: "fas fa-user-clock",
            color: "warning",
            title: "Multi-factor authentication required",
            message: () =>
                "User login from new device requires additional verification",
            time: "2 minutes ago",
        },
        {
            icon: "fas fa-check-circle",
            color: "success",
            title: "Behavioral analysis completed",
            message: () =>
                "AI model has completed analysis of transaction patterns",
            time: "5 minutes ago",
        },
        {
            icon: "fas fa-server",
            color: "warning",
            title: "Node synchronization in progress",
            message: () => "Blockchain nodes are synchronizing recent ledger data",
            time: "10 minutes ago",
        },
        {
            icon: "fas fa-lock",
            color: "info",
            title: "System encryption updated",
            message: () => "Security certificates successfully renewed across network",
            time: "30 minutes ago",
        },
        {
            icon: "fas fa-user-shield",
            color: "success",
            title: "Admin login verified",
            message: () => "Admin login confirmed with 2FA authentication",
            time: "1 hour ago",
        },
        {
            icon: "fas fa-bug",
            color: "danger",
            title: "Suspicious API activity detected",
            message: () => "Abnormal request rate from IP 192.168.1.42 detected",
            time: "3 hours ago",
        },
    ];

    // Generate random ID
    const randomId = () => Math.floor(10000 + Math.random() * 90000);

    // Generate random time label
    const randomTime = () => {
        const mins = Math.floor(Math.random() * 59) + 1;
        const hours = Math.floor(Math.random() * 5) + 1;
        const options = [
            `${mins} minutes ago`,
            `${hours} hours ago`,
            "Just now",
            "Yesterday",
        ];
        return options[Math.floor(Math.random() * options.length)];
    };

    // Function to refresh activity items
    const refreshEvents = () => {
        activityList.innerHTML = ""; // clear current list

        // Select random subset of 3–5 events
        const shuffled = events.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);

        selected.forEach((event) => {
            const id = randomId();
            const li = document.createElement("li");
            li.classList.add("activity-item");
            li.innerHTML = `
        <div class="activity-icon ${event.color}">
          <i class="${event.icon}"></i>
        </div>
        <div class="activity-content">
          <h4>${event.title}</h4>
          <p>${event.message(id)}</p>
          <div class="activity-time">${randomTime()}</div>
        </div>
      `;
            activityList.appendChild(li);
        });
    };

    // Refresh manually via button
    refreshBtn.addEventListener("click", () => {
        refreshEvents();
        refreshBtn.querySelector("i").classList.add("fa-spin");
        setTimeout(() => refreshBtn.querySelector("i").classList.remove("fa-spin"), 800);
    });

    // Auto-refresh every 15 seconds
    setInterval(refreshEvents, 15000);

    // Initial load
    refreshEvents();
});
// header-actions.js// header-actions.js// header-actions.js

document.addEventListener('DOMContentLoaded', () => {
    const alertButton = document.querySelector('.btn-outline');
    const newRuleButton = document.querySelector('.btn-primary');

    // Modal elements
    const modal = document.getElementById('alertModal');
    const closeButton = document.querySelector('.close-button');
    const alertList = document.getElementById('alertList');
    const alertBadge = document.getElementById('alertBadge');

    // Dynamic alerts array
    let alerts = [];

    // Function to add a new alert
    function addAlert(message) {
        alerts.push({ message, time: new Date() });
        updateAlertUI();
    }

    // Update the modal and badge
    function updateAlertUI() {
        // Update alert list
        alertList.innerHTML = alerts.map(alert => {
            const time = alert.time.toLocaleTimeString();
            return `<li>[${time}] ${alert.message}</li>`;
        }).join('');

        // Update badge count
        if (alerts.length > 0) {
            alertBadge.textContent = alerts.length;
            alertBadge.style.display = 'inline';
        } else {
            alertBadge.style.display = 'none';
        }
    }

    // Show modal on button click
    alertButton.addEventListener('click', () => {
        modal.style.display = 'flex';
        // Reset badge when modal is opened
        alertBadge.style.display = 'none';
    });

    // Close modal
    closeButton.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });

    // New Rule button (optional)
    newRuleButton.addEventListener('click', () => {
        console.log('New Rule button clicked');
        alert('Redirecting to create a new rule...');
    });

    // Example: Simulate incoming alerts every 5 seconds
    setInterval(() => {
        const messages = [
            'Server backup completed',
            'New user registered',
            'Unauthorized login attempt detected',
            'System update available'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        addAlert(randomMessage);
    }, 5000);
});

// This script initializes interactive charts in the placeholders.

document.addEventListener('DOMContentLoaded', function() {
    // Function to create and render a chart in a placeholder
    function createChart(placeholder, type, data, options) {
        // Clear the placeholder content
        placeholder.innerHTML = '';
        
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        placeholder.appendChild(canvas);
        
        // Initialize the chart
        new Chart(canvas.getContext('2d'), {
            type: type,
            data: data,
            options: options
        });
    }

    // Fraud Detection Trends - Bar Chart
    const fraudPlaceholder = document.querySelector('.chart-card:nth-child(1) .chart-placeholder');
    if (fraudPlaceholder) {
        const fraudData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November','December'],
            datasets: [{
                label: 'Fraud Cases',
                data: [12, 19, 3, 5, 2, 3,7, 17,8,11,2,3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        };
        const fraudOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        createChart(fraudPlaceholder, 'bar', fraudData, fraudOptions);
    }

    // Authentication Methods - Pie Chart
    const authPlaceholder = document.querySelector('.chart-card:nth-child(2) .chart-placeholder');
    if (authPlaceholder) {
        const authData = {
            labels: ['Password', 'Biometric', 'OTP', 'Other'],
            datasets: [{
                label: 'Authentication Methods',
                data: [40, 30, 20, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        };
        const authOptions = {};
        createChart(authPlaceholder, 'pie', authData, authOptions);
    }
});
