// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Set default output when the page loads
    const outputText = document.getElementById('outputText');
    outputText.textContent = "iliwys generator"; // Default output

    document.getElementById('generateButton').addEventListener('click', function() {
        const userInput = document.getElementById('userInput').value;
        outputText.textContent = userInput || "iliwys generator"; // Display user input or default text
    });
});
