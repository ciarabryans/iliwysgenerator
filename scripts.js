document.addEventListener('DOMContentLoaded', function() {
    const outputText = document.getElementById('outputText');
    const userInput = document.getElementById('userInput');

    // Default output text
    const defaultOutput = "Genuinely laughable iliwys text generator";
    
    // Set default output when the page loads
    outputText.textContent = defaultOutput; // Default output
    userInput.value = defaultOutput; // Set default value in textarea

    function adjustFontSize(text) {
        const maxWidth = window.innerWidth * 0.9; // Set maximum width to 90% of the viewport
        let fontSize = 48; // Set default maximum font size
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
        outputText.textContent = text || defaultOutput; // Display user input or default text
        adjustFontSize(outputText.textContent); // Adjust font size
    });

    // Clear the default placeholder text when the user clicks on the textarea
    userInput.addEventListener('focus', function() {
        if (userInput.value === defaultOutput) {
            userInput.value = ""; // Clear the default output
        }
    });

    // Reset placeholder if the user leaves the textarea empty
    userInput.addEventListener('blur', function() {
        if (userInput.value.trim() === "") {
            userInput.value = defaultOutput; // Reset to default output
        }
    });

    // Initial adjustment for default output text
    adjustFontSize(outputText.textContent);
});
