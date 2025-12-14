// Sample dynamic data (this could come from an API)
  const dashboardData = {
    totalTransactions: 1250,
    fraudDetected: 34,
    riskScore: 78,
    activeNodes: 12,
    transactionVolume: [120, 150, 170, 140, 180, 200, 220],
    fraudRate: [2, 3, 4, 3, 5, 4, 6],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  // Function to update the text metrics
  function updateMetrics(data) {
    document.getElementById('totalTransactions').textContent = data.totalTransactions;
    document.getElementById('fraudDetected').textContent = data.fraudDetected;
    document.getElementById('riskScore').textContent = data.riskScore;
    document.getElementById('activeNodes').textContent = data.activeNodes;
  }

  // Call the function initially
  updateMetrics(dashboardData);

  // Transaction Volume Chart
  const transactionCtx = document.getElementById('transactionChart').getContext('2d');
  const transactionChart = new Chart(transactionCtx, {
    type: 'line',
    data: {
      labels: dashboardData.labels,
      datasets: [{
        label: 'Transactions',
        data: dashboardData.transactionVolume,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Fraud Detection Rate Chart
  const fraudCtx = document.getElementById('fraudChart').getContext('2d');
  const fraudChart = new Chart(fraudCtx, {
    type: 'bar',
    data: {
      labels: dashboardData.labels,
      datasets: [{
        label: 'Fraud Rate',
        data: dashboardData.fraudRate,
        backgroundColor: 'rgba(220, 38, 38, 0.7)',
        borderColor: 'rgba(220, 38, 38, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Example: Update data dynamically every 5 seconds
  setInterval(() => {
    // Simulate new data
    dashboardData.totalTransactions += Math.floor(Math.random() * 10);
    dashboardData.fraudDetected += Math.floor(Math.random() * 2);
    dashboardData.riskScore = Math.floor(Math.random() * 100);
    dashboardData.activeNodes = Math.floor(Math.random() * 20) + 1;

    dashboardData.transactionVolume.push(Math.floor(Math.random() * 250));
    dashboardData.transactionVolume.shift(); // keep array length fixed

    dashboardData.fraudRate.push(Math.floor(Math.random() * 10));
    dashboardData.fraudRate.shift(); // keep array length fixed

    // Update metrics
    updateMetrics(dashboardData);

    // Update charts
    transactionChart.data.datasets[0].data = dashboardData.transactionVolume;
    transactionChart.update();

    fraudChart.data.datasets[0].data = dashboardData.fraudRate;
    fraudChart.update();
  }, 5000);