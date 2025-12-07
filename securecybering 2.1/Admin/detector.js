// ----- SIMULATED METRICS -----
function initDashboard() {
    // Metrics
    let totalTx = 0;
    let fraudDetected = 0;
    let riskScore = 0;
    let activeNodes = 0;

    setInterval(() => {
        totalTx += Math.floor(Math.random() * 5);
        fraudDetected = Math.floor(totalTx * Math.random() * 0.1);
        riskScore = Math.floor(Math.random() * 100);
        activeNodes = 5 + Math.floor(Math.random() * 5);

        document.getElementById('totalTransactions').innerText = totalTx;
        document.getElementById('fraudDetected').innerText = fraudDetected;
        document.getElementById('riskScore').innerText = riskScore;
        document.getElementById('activeNodes').innerText = activeNodes;

        addTransaction(totalTx, fraudDetected);
        addAlert(fraudDetected);
        updateCharts();
    }, 3000);
}

// ----- TRANSACTION FEED -----
function addTransaction(txCount, fraudCount) {
    const feed = document.getElementById('transactionFeed');
    if (!feed) return;

    const div = document.createElement('div');
    div.classList.add('p-2', 'border-b', 'border-gray-200', 'dark:border-gray-700', 'rounded', 'flex', 'justify-between');
    div.innerHTML = `
        <span>Transaction #${txCount}</span>
        <span class="${fraudCount > 0 ? 'text-red-500' : 'text-green-500'}">${fraudCount > 0 ? 'Fraud ⚠️' : 'Valid ✅'}</span>
    `;
    feed.prepend(div);

    if (feed.children.length > 20) feed.removeChild(feed.lastChild);
}

// ----- ALERTS FEED -----s


function updateCharts() {
    const now = new Date().toLocaleTimeString();

    if (transactionChart) {
        transactionChart.data.labels.push(now);
        transactionChart.data.datasets[0].data.push(parseInt(document.getElementById('totalTransactions').innerText));
        if (transactionChart.data.labels.length > 20) {
            transactionChart.data.labels.shift();
            transactionChart.data.datasets[0].data.shift();
        }
        transactionChart.update();
    }

    if (fraudChart) {
        fraudChart.data.labels.push(now);
        fraudChart.data.datasets[0].data.push(parseInt(document.getElementById('fraudDetected').innerText));
        if (fraudChart.data.labels.length > 20) {
            fraudChart.data.labels.shift();
            fraudChart.data.datasets[0].data.shift();
        }
        fraudChart.update();
    }

    if (riskChart) {
        const score = parseInt(document.getElementById('riskScore').innerText);
        riskChart.data.datasets[0].data = [score, 100 - score];
        riskChart.update();
    }
}

// ----- DISTRIBUTED NODES -----
function initNodes() {
    const nodesGrid = document.getElementById('nodesGrid');
    if (!nodesGrid) return;

    nodesGrid.innerHTML = ''; // clear previous nodes if any

    const nodeCount = 12;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.classList.add('w-16', 'h-16', 'rounded-full', 'flex', 'items-center', 'justify-center', 'text-white', 'font-bold', 'shadow-lg', 'transition-all');
        node.style.backgroundColor = getRandomNodeColor();
        node.textContent = `N${i + 1}`;
        nodesGrid.appendChild(node);
        nodes.push(node);
    }

    setInterval(() => {
        nodes.forEach(node => {
            const online = Math.random() > 0.3;
            node.style.backgroundColor = online ? '#4ECDC4' : '#FF6B6B';
            node.style.transform = online ? 'scale(1.1)' : 'scale(0.9)';
            node.style.boxShadow = online ? '0 0 15px #4ECDC4' : '0 0 5px #FF6B6B';
        });
    }, 2000); // 2-second interval
}

function getRandomNodeColor() {
    return Math.random() > 0.5 ? '#4ECDC4' : '#FF6B6B';
}

// ----- INITIALIZATION -----
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});


function updateCharts() {
    const now = new Date().toLocaleTimeString();

    if (transactionChart) {
        transactionChart.data.labels.push(now);
        transactionChart.data.datasets[0].data.push(parseInt(document.getElementById('totalTransactions').innerText));
        if (transactionChart.data.labels.length > 20) {
            transactionChart.data.labels.shift();
            transactionChart.data.datasets[0].data.shift();
        }
        transactionChart.update();
    }

    if (fraudChart) {
        fraudChart.data.labels.push(now);
        fraudChart.data.datasets[0].data.push(parseInt(document.getElementById('fraudDetected').innerText));
        if (fraudChart.data.labels.length > 20) {
            fraudChart.data.labels.shift();
            fraudChart.data.datasets[0].data.shift();
        }
        fraudChart.update();
    }

    if (riskChart) {
        const score = parseInt(document.getElementById('riskScore').innerText);
        riskChart.data.datasets[0].data = [score, 100 - score];
        riskChart.update();
    }
}

// ----- DISTRIBUTED NODES -----
function initNodes() {
    const nodesGrid = document.getElementById('nodesGrid');
    if (!nodesGrid) return;

    nodesGrid.innerHTML = ''; // clear previous nodes if any

    const nodeCount = 12;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.classList.add('w-16', 'h-16', 'rounded-full', 'flex', 'items-center', 'justify-center', 'text-white', 'font-bold', 'shadow-lg', 'transition-all');
        node.style.backgroundColor = getRandomNodeColor();
        node.textContent = `N${i + 1}`;
        nodesGrid.appendChild(node);
        nodes.push(node);
    }

    setInterval(() => {
        nodes.forEach(node => {
            const online = Math.random() > 0.3;
            node.style.backgroundColor = online ? '#4ECDC4' : '#FF6B6B';
            node.style.transform = online ? 'scale(1.1)' : 'scale(0.9)';
            node.style.boxShadow = online ? '0 0 15px #4ECDC4' : '0 0 5px #FF6B6B';
        });
    }, 2000); // 2-second interval
}

function getRandomNodeColor() {
    return Math.random() > 0.5 ? '#4ECDC4' : '#FF6B6B';
}

// ----- INITIALIZATION -----
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});

function getRandomNodeColor() {
    return Math.random() > 0.5 ? '#4ECDC4' : '#FF6B6B';
}

// ----- INITIALIZATION -----
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});
