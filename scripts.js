document.addEventListener('DOMContentLoaded', function () {
    const outputText = document.getElementById('outputText');
    const userInput = document.getElementById('userInput');
    const themeStylesheet = document.getElementById('themeStylesheet');
    const defaultOutputContainer = document.getElementById('defaultOutputContainer');
    const selfTitledContainer = document.getElementById('selfTitledContainer');
    const toggleBoxContainer = document.getElementById('toggleBoxContainer');
    const toggleBox = document.getElementById('toggleBox');
    const outputTextSelfTitled = document.getElementById('outputTextSelfTitled');
    const disclaimer = document.querySelector('.disclaimer');

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

        const lineHeight = fontSize * 1.2;

        if (activeTheme === 'selftitled-theme') {
            outputTextSelfTitled.style.fontSize = `${fontSize}px`;
            outputTextSelfTitled.style.letterSpacing = `${adjustedLetterSpacing}px`;
            outputTextSelfTitled.style.lineHeight = `${lineHeight}px`;
        } else {
            outputText.style.fontSize = `${fontSize}px`;
            outputText.style.letterSpacing = `${defaultLetterSpacing}px`;
            outputText.style.lineHeight = `${lineHeight}px`;
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
        // Adjust font size and spacing for mobile
        if (window.innerWidth < 600) {
            outputText.style.fontSize = '16px';
            outputText.style.letterSpacing = '8px';
        } else {
            outputText.style.fontSize = '36px';
            outputText.style.letterSpacing = '10px';
        }
        outputText.style.lineHeight = '1.2';
        outputText.innerHTML = defaultOutput;
    }

    function resetSelfTitledStyles() {
        outputTextSelfTitled.style.fontSize = window.innerWidth < 600 ? '12px' : '16px';
        outputTextSelfTitled.style.letterSpacing = '5px';
        outputTextSelfTitled.style.lineHeight = '1.2';
        outputTextSelfTitled.innerHTML = defaultSelfTitledTextNoBreaks;
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
        outputTextSelfTitled.classList.toggle('expanded-style', !boxVisible);
        outputTextSelfTitled.innerHTML = formatTextForSelfTitled(text);

        if (!boxVisible && window.innerWidth <= 600) {
            document.body.classList.add('no-box');
        } else {
            document.body.classList.remove('no-box');
        }
    });

    document.querySelectorAll('.color-circle').forEach((button) => {
        button.addEventListener('click', () => {
            switchTheme(button.id);
        });
    });
});
