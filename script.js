let gridContainer = document.querySelector('.grid-container');
let gridItems = [];

let widthField = document.getElementById('width');
let heightField = document.getElementById('height');
let errorText = document.getElementById('error');
let makeGridButton = document.getElementById('make-grid');
let randomColorsBox = document.getElementById('rand-color');
let darkeningBox = document.getElementById('darkening');

let randomColors = randomColorsBox.checked;
let darkening = randomColors.checked;

let darkeningValue = 0;

function resetGrid() {
    if (gridItems) {
        gridContainer.innerHTML = '';
        gridItems = [];
    }

    randomColors = randomColorsBox.checked;
    darkening = darkeningBox.checked;
    darkeningValue = 0;

    console.log(randomColors, darkening)
}

function makeGrid(rows, columns) {
    resetGrid();
    for (let i = 0; i < rows*columns; i++) {
        let item = document.createElement('div');

        let borderSize = Math.max(50/(Math.max(rows, columns)), 0.05);
        item.style.outline = `${borderSize}px solid #eeee`;
        item.style.flex = `0 0 ${100/rows}%`;  
        item.classList.add('grid-item');
        gridItems.push(item);
        gridContainer.appendChild(item);
    }

    gridItems.forEach(gridItem => {
        gridItem.addEventListener('mouseover', () => {
            if (darkeningValue != 1 && darkening) {
                darkeningValue += 0.1;
            }
            
            if (randomColors) {
                ['r', 'g', 'b'].forEach(channel => {
                    if (!gridItem.dataset[channel]) {
                        gridItem.dataset[channel] = Math.floor(Math.random() * 256);
                    }
                });
            
                const [r, g, b] = ['r', 'g', 'b'].map(channel =>
                    Math.floor(255 - (255 - gridItem.dataset[channel]) * darkeningValue)
                );
            
                gridItem.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            
                if (darkening && darkeningValue < 1) darkeningValue += 0.1;
            } else {
                const value = Math.floor(255 * (1 - (darkening ? darkeningValue : 1)));
                gridItem.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;
            }
        });        
    });
}

makeGrid(widthField.value, heightField.value);

makeGridButton.addEventListener('click', () => {
    if (widthField.value < 1 || widthField.value > 100 ||
        heightField.value < 1 || heightField.value > 100
    ) {
        // throw error
        errorText.textContent = 'Please input a value between 1 and 100.';
        return;
    }

    makeGrid(widthField.value, heightField.value);
})