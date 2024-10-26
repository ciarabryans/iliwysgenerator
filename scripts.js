document.addEventListener('DOMContentLoaded', function() {
    const outputText = document.getElementById('outputText');
    const userInput = document.getElementById('userInput');
    const themeStylesheet = document.getElementById('themeStylesheet');
    const defaultOutputContainer = document.getElementById('defaultOutputContainer');
    const selfTitledContainer = document.getElementById('selfTitledContainer');
    const defaultOutput = "Genuinely&nbsp;Laughable<br>iliwys meme generator";
    outputText.innerHTML = defaultOutput;

    // Variable to track the active theme
    let activeTheme = 'default-theme';

    // Create a single canvas for text measurement
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Function to adjust font size and letter spacing based on text and screen width
    function adjustFontSizeAndSpacing(text) {
        const maxWidth = window.innerWidth * 0.9;
        
        // Set starting font size based on active theme
        let fontSize = activeTheme === 'selftitled-theme' ? 32 : 36; // 4px smaller for self-titled
        const minFontSize = 20;

        context.font = `${fontSize}px GothicB`;
        let textWidth = context.measureText(text).width;

        while (textWidth > maxWidth && fontSize > minFontSize) {
            fontSize -= 2;
            context.font = `${fontSize}px GothicB`;
            textWidth = context.measureText(text).width;
        }

        // Calculate default letter spacing
        const defaultFontSize = 36;
        const defaultLetterSpacing = 10;

        // Increase letter spacing by 2px for self-titled theme
        const adjustedLetterSpacing = activeTheme === 'selftitled-theme' 
            ? (fontSize / defaultFontSize) * (defaultLetterSpacing + 2) 
            : (fontSize / defaultFontSize) * defaultLetterSpacing;

        // Apply font size and letter spacing
        outputText.style.fontSize = fontSize + 'px';
        outputText.style.letterSpacing = adjustedLetterSpacing + 'px';
        document.getElementById('outputTextSelfTitled').style.fontSize = fontSize + 'px';
        document.getElementById('outputTextSelfTitled').style.letterSpacing = adjustedLetterSpacing + 'px';
    }

    // Function to debounce input handling for better performance
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Update output text based on user input
    userInput.addEventListener('input', debounce(function() {
        const text = userInput.value;
        if (activeTheme === 'selftitled-theme') {
            document.getElementById('outputTextSelfTitled').innerHTML = text || "Self Titled Better Than Notes LOL";
        } else {
            outputText.innerHTML = text.replace(/\n/g, '<br>') || defaultOutput;
        }
        adjustFontSizeAndSpacing(text);
    }, 300));

    // Initial adjustment for default output text
    adjustFontSizeAndSpacing(outputText.innerHTML);

    // Theme buttons with album-specific stylesheets
    const themes = {
        'default-theme': 'css/iliwys-default.css',
        'selftitled-theme': 'css/selftitled.css',
        'abiiors-theme': 'css/abiior.css',
        'noacf-theme': 'css/noacf.css',
        'bfiafl-theme': 'css/bfiafl.css'
    };

    // Function to switch themes
    function switchTheme(theme) {
        themeStylesheet.href = themes[theme];
        activeTheme = theme; // Update the active theme

        // Toggle visibility of the self-titled container based on the selected theme
        if (theme === 'selftitled-theme') {
            selfTitledContainer.style.display = 'flex';
            defaultOutputContainer.style.display = 'none';
        } else {
            selfTitledContainer.style.display = 'none';
            defaultOutputContainer.style.display = 'flex';
        }

        // Adjust font size and spacing immediately after theme switch
        adjustFontSizeAndSpacing(userInput.value || defaultOutput);
    }

    // Add event listeners to each theme button for switching themes
    document.querySelectorAll('.color-circle').forEach(button => {
        button.addEventListener('click', () => {
            switchTheme(button.id);
        });
    });
});
