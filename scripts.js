document.addEventListener('DOMContentLoaded', function() {
    const outputText = document.getElementById('outputText');
    const userInput = document.getElementById('userInput');

    // Set default output message with line break
    const defaultOutput = "Genuinely laughable<br>iliwys text generator";

    // Set the output text to the default message when the page loads
    outputText.innerHTML = defaultOutput;

    function adjustFontSize(text) {
        const maxWidth = window.innerWidth * 0.9; // Set maximum width to 90% of the viewport
        let fontSize = 40; // Set default maximum font size
        const minFontSize = 24; // Minimum font size

        // Create a temporary canvas to measure text width
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `${fontSize}px GothicB`; // Set the initial font size

        // Calculate the width of the text
        let textWidth = context.measureText(text).width;

        // Adjust font size until text fits within the maximum width
        while (textWidth > maxWidth && fontSize > minFontSize) {
            fontSize -= 2; // Decrease font size
            context.font = `${fontSize}px GothicB`; // Update the font size in the context
            textWidth = context.measureText(text).width; // Measure the new text width
        }
        
        // Apply new font size
        outputText.style.fontSize = fontSize + 'px';
    }

    // Update output text and font size when the user types
    userInput.addEventListener('input', function() {
        const text = userInput.value.trim(); // Trim whitespace from input
        outputText.innerHTML = text || defaultOutput; // Display user input or default text
        adjustFontSize(outputText.innerHTML); // Adjust font size
    });

    // Initial adjustment for default output text
    adjustFontSize(outputText.innerHTML);
});
