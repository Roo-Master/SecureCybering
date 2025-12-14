/* ============================
   SECURECHAIN ANALYTICS ENGINE
   Real-time Chart Controller
============================ */

/* ---------- CHART STORAGE ---------- */
const charts = {};

/* ---------- GLOBAL CONFIG ---------- */
const chartTheme = {
    borderColor: "#4fc1ff",
    backgroundColor: "rgba(79,193,255,0.15)",
    tension: 0.35,
    pointRadius: 2,
    pointBackgroundColor: "#4fc1ff"
};

/* ---------- CREATE CHART ---------- */
function initChart(canvasId, label, initialData = []) {
    const ctx = document.getElementById(canvasId).getContext("2d");

    charts[canvasId] = new Chart(ctx, {
        type: "line",
        data: {
            labels: initialData.map((_, i) => i + 1),
            datasets: [{
                label,
                data: initialData,
                ...chartTheme
            }]
        },
        options: {
            responsive: true,
            animation: false,
            plugins: {
                legend: {
                    labels: { color: "#fff" }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#9ca3af" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                },
                y: {
                    ticks: { color: "#9ca3af" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                }
            }
        }
    });
}

/* ---------- UPDATE CHART ---------- */
function updateChart(chartId, newValue, maxPoints = 12) {
    const chart = charts[chartId];
    if (!chart) return;

    chart.data.labels.push("");
    chart.data.datasets[0].data.push(newValue);

    if (chart.data.datasets[0].data.length > maxPoints) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update();
}

/* ---------- INITIALIZE CHARTS ---------- */
initChart("latencyChart", "Latency (ms)", [130, 140, 150]);
initChart("uptimeChart", "Uptime (%)", [99.2, 99.3, 99.1]);
initChart("finalityChart", "Finality Time (s)", [3.0, 3.1, 2.9]);
initChart("tpsChart", "Throughput TPS", [140, 160, 180]);
initChart("anomalyChart", "Anomaly Score", [0.12, 0.14, 0.16]);

/* ============================
   REST API UPDATES
============================ */
async function fetchMetrics() {
    try {
        const res = await fetch("http://localhost:4000/metrics/network");
        const metrics = await res.json();

        updateChart("latencyChart", metrics.latency);
        updateChart("uptimeChart", metrics.uptime);
        updateChart("finalityChart", metrics.finality);
        updateChart("tpsChart", metrics.tps);
        updateChart("anomalyChart", metrics.anomalyScore);

    } catch (err) {
        console.warn("API unavailable, using simulation mode");
        simulateMetrics();
    }
}

/* ============================
   SIMULATION FALLBACK
============================ */
function simulateMetrics() {
    updateChart("latencyChart", rand(130, 180));
    updateChart("uptimeChart", rand(98.5, 99.9));
    updateChart("finalityChart", rand(2.5, 3.5));
    updateChart("tpsChart", rand(120, 220));
    updateChart("anomalyChart", rand(0.08, 0.25));
}

function rand(min, max) {
    return +(Math.random() * (max - min) + min).toFixed(2);
}

/* Poll REST API every 4 seconds */
setInterval(fetchMetrics, 4000);

/* ============================
   WEBSOCKET LIVE STREAM
============================ */
try {
    const ws = new WebSocket("ws://localhost:4000/ws/live");

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);

        if (data.latency) updateChart("latencyChart", data.latency);
        if (data.uptime) updateChart("uptimeChart", data.uptime);
        if (data.finality) updateChart("finalityChart", data.finality);
        if (data.tps) updateChart("tpsChart", data.tps);
        if (data.anomalyScore) updateChart("anomalyChart", data.anomalyScore);
    };

    ws.onerror = () => {
        console.warn("WebSocket error — switching to REST mode");
    };

} catch (e) {
    console.warn("WebSocket unavailable");
}

/* ============================
   HEATMAP DYNAMIC RENDER
============================ */
const heatCanvas = document.getElementById("heatmapCanvas");
const heatCtx = heatCanvas.getContext("2d");
const cellSize = 50;

function renderHeatmap(matrix) {
    heatCtx.clearRect(0, 0, heatCanvas.width, heatCanvas.height);

    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            const r = Math.floor(255 * value);
            heatCtx.fillStyle = `rgb(${r}, 50, 120)`;
            heatCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        });
    });
}

/* Simulated heatmap updates */
setInterval(() => {
    const matrix = Array.from({ length: 4 }, () =>
        Array.from({ length: 4 }, () => Math.random())
    );
    renderHeatmap(matrix);
}, 5000);
