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

    let boxVisible = true;
    let activeTheme = 'default-theme';
    outputText.innerHTML = defaultOutput;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    function adjustFontSizeAndSpacing(text) {
        const container = activeTheme === 'selftitled-theme' ? selfTitledContainer : defaultOutputContainer;
        const maxWidth = container.clientWidth * 0.95;
        const maxHeight = container.clientHeight * 0.95;

        let fontSize = window.innerWidth < 600 ? 18 : 36; // Mobile vs. larger screens
        const minFontSize = 12;

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
        const adjustedLetterSpacing =
            activeTheme === 'selftitled-theme'
                ? (fontSize / defaultFontSize) * (defaultLetterSpacing - 2) // Reduce by 2px dynamically for Box/EP
                : defaultLetterSpacing;

        let lineHeight = fontSize * 1.2;

        // Increase line height for both Box and EP themes dynamically
        if (activeTheme === 'selftitled-theme') {
            lineHeight += 8; // Add 8px for both Box and EP modes
        }

        if (activeTheme === 'selftitled-theme') {
            outputTextSelfTitled.style.fontSize = `${fontSize}px`;
            outputTextSelfTitled.style.letterSpacing = `${adjustedLetterSpacing}px`;
            outputTextSelfTitled.style.lineHeight = `${lineHeight}px`;
        } else {
            // Reset to exact default values for the default theme
            outputText.style.fontSize = window.innerWidth < 600 ? '16px' : '36px';
            outputText.style.letterSpacing = window.innerWidth < 600 ? '8px' : '10px';
            outputText.style.lineHeight = '1.2';
        }
    }

    function formatTextForSelfTitled(text) {
        return boxVisible ? text.replace(/\n/g, '<br>') : `// ${text.replace(/<br>/g, ' ')} //`;
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
        outputText.style.fontSize = window.innerWidth < 600 ? '16px' : '36px';
        outputText.style.letterSpacing = window.innerWidth < 600 ? '8px' : '10px';
        outputText.style.lineHeight = '1.2';
        outputText.innerHTML = defaultOutput;
    }

    function resetSelfTitledStyles() {
        // Reset font size and spacing for self-titled theme only
        const text = userInput.value || (boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks);
        outputTextSelfTitled.innerHTML = formatTextForSelfTitled(text);
        adjustFontSizeAndSpacing(text);
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
        themeStylesheet.href = themes[theme];
        activeTheme = theme;
        document.body.className = theme;

        const text = userInput.value || (boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks);
        if (theme === 'selftitled-theme') {
            selfTitledContainer.style.display = 'flex';
            defaultOutputContainer.style.display = 'none';
            toggleBoxContainer.style.display = 'block';
            outputTextSelfTitled.innerHTML = formatTextForSelfTitled(text);
            adjustFontSizeAndSpacing(text);
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

        const text = userInput.value || (boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks);
        adjustFontSizeAndSpacing(text);
    });

    document.querySelectorAll('.color-circle').forEach((button) => {
        button.addEventListener('click', () => {
            switchTheme(button.id);
        });
    });

    // Ensure line height adjustment applies immediately when page loads
    const initialText = userInput.value || (boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks);
    adjustFontSizeAndSpacing(initialText);
});
