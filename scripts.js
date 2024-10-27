document.addEventListener('DOMContentLoaded', function() {
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
    
        let fontSize = window.innerWidth < 600 ? 18 : 36;
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
        const adjustedLetterSpacing = activeTheme === 'selftitled-theme'
            ? (fontSize / defaultFontSize) * (defaultLetterSpacing + 2)
            : (fontSize / defaultFontSize) * defaultLetterSpacing;
    
        const lineHeight = fontSize * 1.2;
    
        if (activeTheme === 'selftitled-theme') {
            outputTextSelfTitled.style.fontSize = `${fontSize}px`;
            outputTextSelfTitled.style.letterSpacing = `${adjustedLetterSpacing}px`;
            outputTextSelfTitled.style.lineHeight = `${lineHeight}px`;
        } else {
            outputText.style.fontSize = `${fontSize}px`;
            outputText.style.letterSpacing = `${adjustedLetterSpacing}px`;
            outputText.style.lineHeight = `${lineHeight}px`;
        }
    }    

    function formatTextForSelfTitled(text) {
        return boxVisible ? text : `// ${text} //`;
    }

    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function resetDefaultThemeStyles() {
        outputText.style.fontSize = '36px';
        outputText.style.letterSpacing = '10px';
        outputText.style.lineHeight = '1.2';
        outputText.innerHTML = defaultOutput;
    }

    userInput.addEventListener('input', debounce(function() {
        const text = userInput.value;
        if (activeTheme === 'selftitled-theme') {
            outputTextSelfTitled.innerHTML = formatTextForSelfTitled(text || (boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks));
            adjustFontSizeAndSpacing(text || (boxVisible ? defaultSelfTitledTextWithBreaks : defaultSelfTitledTextNoBreaks));
        } else {
            outputText.innerHTML = text.replace(/\n/g, '<br>') || defaultOutput;
            adjustFontSizeAndSpacing(text || defaultOutput);
        }
    }, 300));

    const themes = {
        'default-theme': 'css/iliwys-default.css',
        'selftitled-theme': 'css/selftitled.css',
    };

    function switchTheme(theme) {
        themeStylesheet.href = themes[theme];
        activeTheme = theme;
        document.body.className = theme;

        if (theme === 'selftitled-theme') {
            selfTitledContainer.style.display = 'flex';
            defaultOutputContainer.style.display = 'none';
            toggleBoxContainer.style.display = 'block';
            outputTextSelfTitled.innerHTML = formatTextForSelfTitled(userInput.value || (boxVisible ? defaultSelfTitledTextWithBreaks : `// ${defaultSelfTitledTextNoBreaks} //`));
            adjustFontSizeAndSpacing(userInput.value || (boxVisible ? defaultSelfTitledTextWithBreaks : `// ${defaultSelfTitledTextNoBreaks} //`));
        } else {
            selfTitledContainer.style.display = 'none';
            defaultOutputContainer.style.display = 'flex';
            toggleBoxContainer.style.display = 'none';
            resetDefaultThemeStyles();
        }
    }

    toggleBox.addEventListener('change', function() {
        boxVisible = toggleBox.checked;
        selfTitledContainer.classList.toggle('expanded', !boxVisible);
        
        if (!boxVisible) {
            outputTextSelfTitled.classList.add('expanded-style');
            outputTextSelfTitled.innerHTML = `// ${defaultSelfTitledTextNoBreaks} //`;
            document.querySelector('.toggle-label').textContent = "Turn on for box";
        } else {
            outputTextSelfTitled.classList.remove('expanded-style');
            outputTextSelfTitled.innerHTML = defaultSelfTitledTextWithBreaks;
            document.querySelector('.toggle-label').textContent = "Turn off for EP Text";
        }
    });    

    document.querySelectorAll('.color-circle').forEach(button => {
        button.addEventListener('click', () => {
            switchTheme(button.id);
        });
    });
});
