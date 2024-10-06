document.addEventListener('DOMContentLoaded', function() {
    const outputText = document.getElementById('outputText');
    const userInput = document.getElementById('userInput');

    // Set default output message with line break
    const defaultOutput = "Genuinely laughable<br>iliwys text generator";
    outputText.innerHTML = defaultOutput;

    // Create a single canvas for text measurement
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Function to adjust the font size and letter spacing based on text and screen width
    function adjustFontSizeAndSpacing(text) {
        const maxWidth = window.innerWidth * 0.9; // Set maximum width to 90% of the viewport
        let fontSize = 36; // Default maximum font size
        const minFontSize = 20; // Minimum font size

        // Set initial font properties in canvas context
        context.font = `${fontSize}px GothicB`;

        // Measure text width
        let textWidth = context.measureText(text).width;

        // Adjust font size to fit within the maxWidth constraint
        while (textWidth > maxWidth && fontSize > minFontSize) {
            fontSize -= 2;
            context.font = `${fontSize}px GothicB`; // Update font size in context
            textWidth = context.measureText(text).width;
        }

        // Calculate proportional letter spacing based on the font size
        const defaultFontSize = 36; // The base font size for desktop
        const defaultLetterSpacing = 6; // The default letter spacing for desktop

        // Calculate new letter spacing relative to the base size
        const newLetterSpacing = (fontSize / defaultFontSize) * defaultLetterSpacing;

        // Apply the calculated font size and letter spacing
        outputText.style.fontSize = fontSize + 'px';
        outputText.style.letterSpacing = newLetterSpacing + 'px';
    }

    // Function to debounce input handling for better performance
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Update output text and adjust font size and letter spacing based on user input
    userInput.addEventListener('input', debounce(function() {
        const text = userInput.value.trim();
        outputText.innerHTML = text || defaultOutput;
        adjustFontSizeAndSpacing(outputText.innerHTML);
    }, 300)); // Debounce with a 300ms delay for smoother updates

    // Initial adjustment for default output text
    adjustFontSizeAndSpacing(outputText.innerHTML);
});
