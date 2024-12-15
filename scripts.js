document.addEventListener('DOMContentLoaded', function () {
    const outputText = document.getElementById('outputText');
    const userInput = document.getElementById('userInput');
    const themeStylesheet = document.getElementById('themeStylesheet');
    const defaultOutputContainer = document.getElementById('defaultOutputContainer');
    const selfTitledContainer = document.getElementById('selfTitledContainer');
    const toggleBoxContainer = document.getElementById('toggleBoxContainer');
    const toggleBox = document.getElementById('toggleBox');
    const outputTextSelfTitled = document.getElementById('outputTextSelfTitled');

    const defaultOutput = "Genuinely&nbsp;Laughable<br>iliwys meme generator";
    const defaultSelfTitledTextWithBreaks = "Go down<br>Soft sound<br>Midnight<br>Car lights";
    const defaultSelfTitledTextNoBreaks = "Go down Soft sound Midnight Car lights";
    const epDefaultText = "// musicforcars //"; // Default text for EP version

    let boxVisible = true;
    let activeTheme = 'default-theme';
    outputText.innerHTML = defaultOutput;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    function adjustFontSizeAndSpacing(text) {
        const container = activeTheme === 'selftitled-theme' ? selfTitledContainer : defaultOutputContainer;
        const maxWidth = container.clientWidth * 0.95;
        const maxHeight = container.clientHeight * 0.95;

        let fontSize = window.innerWidth < 600 ? 18 : 36; // Default scaling
        const minFontSize = 12;

        // Adjust font size and letter spacing dynamically
        context.font = `${fontSize}px GothicB`;
        let textWidth = context.measureText(text).width;
        let lineCount = (text.match(/\n/g) || []).length + 1;
        let textHeight = fontSize * lineCount * 1.2;

        while ((textWidth > maxWidth || textHeight > maxHeight) && fontSize > minFontSize) {
            fontSize -= 1;
            context.font = `${fontSize}px GothicB`;
            textWidth = context.measureText(text).width;
            textHeight = fontSize * lineCount * 1.2;
        }

        const defaultFontSize = window.innerWidth < 600 ? 18 : 36;
        const defaultLetterSpacing = 10;

        let adjustedLetterSpacing;
        let lineHeight = fontSize * 1.2;

        // Specific adjustments for default theme
        if (activeTheme === 'default-theme') {
            fontSize += 2; // Increase font size by 2px
            adjustedLetterSpacing = defaultLetterSpacing - 5; // Decrease letter spacing by 5px
        } else if (activeTheme === 'selftitled-theme') {
            adjustedLetterSpacing = (fontSize / defaultFontSize) * (defaultLetterSpacing - 2); // For Box/EP themes
            lineHeight += 8; // Add 8px for Box/EP modes
        } else {
            adjustedLetterSpacing = defaultLetterSpacing;
        }

        // Apply styles dynamically based on the theme
        if (activeTheme === 'selftitled-theme') {
            outputTextSelfTitled.style.fontSize = `${fontSize}px`;
            outputTextSelfTitled.style.letterSpacing = `${adjustedLetterSpacing}px`;
            outputTextSelfTitled.style.lineHeight = `${lineHeight}px`;
        } else {
            outputText.style.fontSize = `${fontSize}px`;
            outputText.style.letterSpacing = `${adjustedLetterSpacing}px`;
            outputText.style.lineHeight = '1.2'; // Default theme line height
        }
    }

    function formatTextForSelfTitled(text) {
        // Add `//` for EP mode only
        return boxVisible ? text.replace(/\n/g, '<br>') : `// ${text.replace(/<br>/g, ' ')} //`;
    }

    function resetEPFormatting() {
        // Remove `//` formatting when switching back to Box mode
        const text = userInput.value || defaultSelfTitledTextNoBreaks;
        outputTextSelfTitled.innerHTML = text.replace(/^\/\/\s*|\s*\/\/$/g, '');
    }

    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function resetDefaultThemeStyles() {
        // Reset font size and spacing for default theme only
        outputText.style.fontSize = window.innerWidth < 600 ? '20px' : '40px'; // Default font size +4px
        outputText.style.letterSpacing = window.innerWidth < 600 ? '5px' : '7px'; // Letter-spacing -3px
        outputText.style.lineHeight = '1.2';
        outputText.innerHTML = defaultOutput;
    }

    function resetSelfTitledStyles() {
        // Reset font size and spacing for self-titled theme only
        const text = boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks;
        outputTextSelfTitled.innerHTML = formatTextForSelfTitled(text);
        adjustFontSizeAndSpacing(text);
    }

    function resetInputField() {
        userInput.value = ''; // Clear the text area input
    }

    userInput.addEventListener(
        'input',
        debounce(function () {
            const text = userInput.value || (boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks);

            if (activeTheme === 'selftitled-theme') {
                if (userInput.value === "") {
                    resetSelfTitledStyles();
                } else {
                    outputTextSelfTitled.innerHTML = formatTextForSelfTitled(text);
                    adjustFontSizeAndSpacing(text);
                }
            } else {
                if (userInput.value === "") {
                    resetDefaultThemeStyles();
                } else {
                    outputText.innerHTML = text.replace(/\n/g, '<br>') || defaultOutput;
                    adjustFontSizeAndSpacing(text || defaultOutput);
                }
            }
        }, 300)
    );

    const themes = {
        'default-theme': 'css/iliwys-default.css',
        'selftitled-theme': 'css/selftitled.css',
    };

    function switchTheme(theme) {
        resetInputField(); // Clear the input field whenever a theme is switched

        const previousOutput = userInput.value || outputText.innerHTML.replace(/<br>/g, ' ');
        themeStylesheet.href = themes[theme];
        activeTheme = theme;
        document.body.className = theme;

        if (theme === 'selftitled-theme') {
            selfTitledContainer.style.display = 'flex';
            defaultOutputContainer.style.display = 'none';
            toggleBoxContainer.style.display = 'block';
            if (!boxVisible) {
                outputTextSelfTitled.innerHTML = epDefaultText;
            } else {
                resetEPFormatting();
            }
            adjustFontSizeAndSpacing(epDefaultText);
        } else {
            selfTitledContainer.style.display = 'none';
            defaultOutputContainer.style.display = 'flex';
            toggleBoxContainer.style.display = 'none';
            resetDefaultThemeStyles();
        }
    }

    toggleBox.addEventListener('change', function () {
        boxVisible = toggleBox.checked;
        selfTitledContainer.classList.toggle('expanded', !boxVisible);

        if (boxVisible) {
            resetEPFormatting(); // Reset formatting when switching to Box mode
        } else {
            outputTextSelfTitled.innerHTML = epDefaultText;
        }

        adjustFontSizeAndSpacing(epDefaultText);
    });

    document.querySelectorAll('.color-circle').forEach((button) => {
        button.addEventListener('click', () => {
            switchTheme(button.id);
        });
    });

    // Ensure proper formatting on page load
    const initialText = userInput.value || epDefaultText;
    outputTextSelfTitled.innerHTML = formatTextForSelfTitled(initialText);
    adjustFontSizeAndSpacing(initialText);
});
