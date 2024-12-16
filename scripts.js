document.addEventListener('DOMContentLoaded', function () {
    const outputText = document.getElementById('outputText');
    const userInput = document.getElementById('userInput');
    const themeStylesheet = document.getElementById('themeStylesheet');
    const defaultOutputContainer = document.getElementById('defaultOutputContainer');
    const selfTitledContainer = document.getElementById('selfTitledContainer');
    const toggleBoxContainer = document.getElementById('toggleBoxContainer');
    const outputTextSelfTitled = document.getElementById('outputTextSelfTitled');

    const defaultOutput = "Genuinely&nbsp;Laughable<br>iliwys meme generator";
    const defaultSelfTitledTextWithBreaks = "Go down<br>Soft sound<br>Midnight<br>Car lights";
    const defaultSelfTitledTextNoBreaks = "Go down Soft sound Midnight Car lights";
    const epDefaultText = "musicforcars"; // Raw text without `//`

    let boxVisible = true;
    let activeTheme = 'default-theme';
    outputText.innerHTML = defaultOutput;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    function adjustFontSizeAndSpacing(text) {
        const container = activeTheme === 'selftitled-theme' || activeTheme === 'ep-theme'
            ? selfTitledContainer
            : defaultOutputContainer;

        const maxWidth = container.clientWidth * 0.95;
        const maxHeight = container.clientHeight * 0.95;

        let fontSize = window.innerWidth < 600 ? 18 : 36; // Default scaling
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

        let adjustedLetterSpacing;
        let lineHeight = fontSize * 1.2;

        if (activeTheme === 'default-theme') {
            fontSize += 2; // Increase font size by 2px for default theme
            adjustedLetterSpacing = window.innerWidth < 600 ? '5px' : '7px'; // Mobile: 5px, Desktop: 7px
            outputText.style.fontSize = `${fontSize}px`;
            outputText.style.letterSpacing = adjustedLetterSpacing;
            outputText.style.lineHeight = '1.2';
        } else if (activeTheme === 'ep-theme') {
            adjustedLetterSpacing = (fontSize / defaultFontSize) * (defaultLetterSpacing - 2 + (window.innerWidth >= 600 ? 3 : 0)); 
            lineHeight += 8; // Add 8px for EP theme
            outputTextSelfTitled.style.fontSize = `${fontSize}px`;
            outputTextSelfTitled.style.letterSpacing = `${adjustedLetterSpacing}px`;
            outputTextSelfTitled.style.lineHeight = `${lineHeight}px`;
        } else if (activeTheme === 'selftitled-theme') {
            adjustedLetterSpacing = (fontSize / defaultFontSize) * (defaultLetterSpacing - 2);
            lineHeight += 8; // Add 8px for Self-Titled theme
            outputTextSelfTitled.style.fontSize = `${fontSize}px`;
            outputTextSelfTitled.style.letterSpacing = `${adjustedLetterSpacing}px`;
            outputTextSelfTitled.style.lineHeight = `${lineHeight}px`;
        }
    }

    function formatTextForSelfTitled(text) {
        return boxVisible ? text.replace(/\n/g, '<br>') : `//${text.replace(/<br>/g, ' ')}//`;
    }

    function formatTextForEP(text) {
        const styledSlashes = '<span class="slash">//</span>';
        const styledText = text.startsWith('//') && text.endsWith('//')
            ? text
            : `${styledSlashes}${text}${styledSlashes}`;
        return styledText.replace(/\/\/(.*?)\/\//g, `${styledSlashes}$1${styledSlashes}`);
    }

    function resetEPFormatting() {
        const formattedText = formatTextForEP(epDefaultText); // Format only once
        outputTextSelfTitled.innerHTML = formattedText;
        adjustFontSizeAndSpacing(epDefaultText);
    }

    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function resetDefaultThemeStyles() {
        const fontSize = window.innerWidth < 600 ? '20px' : '40px';
        const letterSpacing = window.innerWidth < 600 ? '5px' : '7px'; // Synced values
        outputText.style.fontSize = fontSize;
        outputText.style.letterSpacing = letterSpacing;
        outputText.style.lineHeight = '1.2';
        outputText.innerHTML = defaultOutput;
    }

    function resetSelfTitledStyles() {
        const text = boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks;
        outputTextSelfTitled.innerHTML = formatTextForSelfTitled(text);
        adjustFontSizeAndSpacing(text);
    }

    function resetInputField() {
        userInput.value = '';
    }

    userInput.addEventListener(
        'input',
        debounce(function () {
            const text =
                userInput.value ||
                (activeTheme === 'ep-theme'
                    ? epDefaultText
                    : activeTheme === 'selftitled-theme'
                    ? defaultSelfTitledTextWithBreaks
                    : defaultOutput);

            if (activeTheme === 'ep-theme') {
                outputTextSelfTitled.innerHTML = formatTextForEP(text); // Format with `//` for EP theme
                adjustFontSizeAndSpacing(text);
            } else if (activeTheme === 'selftitled-theme') {
                outputTextSelfTitled.innerHTML = formatTextForSelfTitled(text);
                adjustFontSizeAndSpacing(text);
            } else {
                outputText.innerHTML = text.replace(/\n/g, '<br>');
                adjustFontSizeAndSpacing(text);
            }
        }, 300)
    );

    const themes = {
        'default-theme': 'css/iliwys-default.css',
        'selftitled-theme': 'css/selftitled.css',
        'ep-theme': 'css/ep.css',
    };

    function switchTheme(theme) {
        resetInputField();
        themeStylesheet.href = themes[theme];
        activeTheme = theme;
        document.body.className = theme;
    
        if (theme === 'selftitled-theme') {
            selfTitledContainer.style.display = 'flex';
            defaultOutputContainer.style.display = 'none';
            toggleBoxContainer.style.display = 'none';
            resetSelfTitledStyles();
        } else if (theme === 'ep-theme') {
            selfTitledContainer.style.display = 'flex';
            defaultOutputContainer.style.display = 'none';
            toggleBoxContainer.style.display = 'none';
            resetEPFormatting();
        } else {
            selfTitledContainer.style.display = 'none';
            defaultOutputContainer.style.display = 'flex';
            toggleBoxContainer.style.display = 'none';
            resetDefaultThemeStyles();
        }
    }
    
    document.querySelectorAll('.color-circle').forEach((button) => {
        button.addEventListener('click', () => {
            switchTheme(button.id);
        });
    });

    const initialText = formatTextForEP(epDefaultText); // Format once on initialization
    outputTextSelfTitled.innerHTML = initialText;
    adjustFontSizeAndSpacing(epDefaultText);
});
