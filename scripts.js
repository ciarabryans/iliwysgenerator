document.addEventListener('DOMContentLoaded', function() {
    const outputText = document.getElementById('outputText');
    const userInput = document.getElementById('userInput');
    const outputTextSelfTitled = document.getElementById('outputTextSelfTitled');

    // Default theme styles
    const defaultTheme = {
        backgroundColor: '#EE9EB5', // Default color for "I like it when you sleep"
        textColor: '#ffffff',
        fontFamily: 'GothicB', // Keeping GothicB for this theme
        fontSize: '36px'
    };

    // Other themes (these will be applied using the buttons)
    const themes = {
        'black-theme': {
            backgroundColor: '#000',
            textColor: '#fff',
            fontFamily: 'GOTHIC', // Changed to GOTHIC
            fontSize: '30px'
        },
        'pink-theme': {
            backgroundColor: '#ff69b4',
            textColor: '#000',
            fontFamily: 'Comic Sans MS',
            fontSize: '28px'
        },
        'blue-theme': {
            backgroundColor: '#1e90ff',
            textColor: '#fff',
            fontFamily: 'Helvetica Neue',
            fontSize: '32px'
        },
        'white-theme': {
            backgroundColor: '#fff',
            textColor: '#000',
            fontFamily: 'Arial',
            fontSize: '34px'
        },
        'yellow-theme': {
            backgroundColor: '#ffeb3b',
            textColor: '#000',
            fontFamily: 'Georgia',
            fontSize: '22px'
        },
        'self-titled': { // New self-titled theme
            backgroundColor: '#000', // Black background
            textColor: '#fff',
            fontFamily: 'GOTHIC', // Use GOTHIC font
            fontSize: '30px'
        }
    };

    // Set default output message for the standard theme
    const defaultOutput = "Genuinely&nbsp;Laughable<br>iliwys meme generator";
    outputText.innerHTML = defaultOutput;

    // Set default output message for the self-titled theme
    const defaultSelfTitledOutput = "self titled better than notes lol";
    outputTextSelfTitled.innerHTML = defaultSelfTitledOutput;

    // Create a single canvas for text measurement
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Function to apply theme styles dynamically
    function applyTheme(theme) {
        document.body.style.backgroundColor = theme.backgroundColor;
        outputText.style.color = theme.textColor;
        outputText.style.fontFamily = theme.fontFamily;
        outputText.style.fontSize = theme.fontSize;
        adjustFontSizeAndSpacing(outputText.innerHTML, theme); // Adjust based on the selected theme
        changeTheme(theme); // Call to change the visibility of self-titled container
    }

    // Apply the default theme on page load
    applyTheme(defaultTheme);

    // Function to adjust the font size and letter spacing based on text and screen width
    function adjustFontSizeAndSpacing(text, theme) {
        const maxWidth = window.innerWidth * 0.9; // Set maximum width to 90% of the viewport
        let fontSize = parseInt(window.getComputedStyle(outputText).fontSize); // Use current font size
        const minFontSize = 12; // Minimum font size

        // Set initial font properties in canvas context
        context.font = `${fontSize}px ${outputText.style.fontFamily}`;

        // Measure text width
        let textWidth = context.measureText(text).width;

        // Only adjust font size for the self-titled theme
        if (theme === themes['self-titled']) {
            // Adjust font size to fit within the maxWidth constraint
            while (textWidth > maxWidth && fontSize > minFontSize) {
                fontSize -= 2;
                context.font = `${fontSize}px ${outputText.style.fontFamily}`; // Update font size in context
                textWidth = context.measureText(text).width;
            }

            // Apply the calculated font size
            outputTextSelfTitled.style.fontSize = fontSize + 'px'; // Apply to self-titled text
        } else {
            // For other themes, keep the font size as is
            outputText.style.fontSize = fontSize + 'px';
        }
    }

    // Function to debounce input handling for better performance
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Update output text and adjust font size based on user input
    userInput.addEventListener('input', debounce(function() {
        const text = userInput.value; // Get user input text
        const formattedText = text.replace(/\n/g, '<br>'); // Replace newlines with <br>

        // Check the current theme and update corresponding output text
        if (outputText.style.fontFamily === 'GOTHIC') {
            // If input is empty, revert to default self-titled output
            if (formattedText.trim() === '') {
                outputTextSelfTitled.innerHTML = defaultSelfTitledOutput; // Set to default self-titled output
            } else {
                outputTextSelfTitled.innerHTML = formattedText; // Update with user input
            }
            adjustFontSizeAndSpacing(outputTextSelfTitled.innerHTML, themes['self-titled']); // Adjust only for self-titled theme
        } else {
            outputText.innerHTML = formattedText || defaultOutput; // Revert to default output if empty
            adjustFontSizeAndSpacing(outputText.innerHTML, themes['default']); // Keep default adjustments for others
        }
    }, 300)); // Debounce with a 300ms delay for smoother updates

    // Function to change theme and manage self-titled visibility
    function changeTheme(theme) {
        const selfTitledContainer = document.getElementById('selfTitledContainer');
        if (theme === themes['self-titled']) {
            // Show the self-titled container
            selfTitledContainer.style.display = 'flex';
            outputText.style.display = 'none'; // Optionally hide the default output text
        } else {
            // Hide the self-titled container
            selfTitledContainer.style.display = 'none';
            outputText.style.display = 'block'; // Show default output text if needed
        }
    }

    // Add event listeners for the color buttons to change themes
    document.querySelectorAll('.color-circle').forEach(button => {
        button.addEventListener('click', function() {
            const selectedTheme = themes[button.id] || defaultTheme; // Get selected theme or default
            applyTheme(selectedTheme);
        });
    });

    // Initial adjustment for default output text
    adjustFontSizeAndSpacing(outputText.innerHTML, defaultTheme);
});
