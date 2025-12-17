// -------------------------
// Load existing reports on page load
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    loadReports();
});


// -------------------------
// Handle Report Submission
// -------------------------
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const type = document.getElementById("report-type").value;
    const description = document.getElementById("report-description").value.trim();

    if (description === "") {
        alert("Please enter a description before submitting.");
        return;
    }

    const report = {
        type,
        description,
        date: new Date().toLocaleString()
    };

    saveReport(report);
    addReportToUI(report);

    alert("Your report has been submitted anonymously!");

    form.reset();
});


// -------------------------
// Save report to Local Storage
// -------------------------
function saveReport(report) {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));
}


// -------------------------
// Display reports on page
// -------------------------
function loadReports() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.forEach(addReportToUI);
}


// -------------------------
// Add report to HTML
// -------------------------
function addReportToUI(report) {
    const section = document.getElementById("anonymized-data").querySelector("ul");

    const li = document.createElement("li");
    li.textContent = `${report.date} — [${report.type}] ${report.description}`;

    section.appendChild(li);
}


// -------------------------
// Add community tips dynamically
// -------------------------
const tipsSection = document.querySelector(".tips");

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.target.id === "new-tip") {
        addNewTip();
    }
});

function addNewTip() {
    const input = document.getElementById("new-tip");
    const value = input.value.trim();

    if (value === "") {
        alert("Enter a tip first!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = value;
    tipsSection.appendChild(li);

    input.value = "";

    alert("New community tip added!");
}