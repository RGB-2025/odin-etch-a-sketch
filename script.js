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

function lerpColor(startArray, endArray, t) {
    return startArray.map((start, index) => {
        const end = endArray[index];
        return start + (end - start) * t
    });
}

function resetGrid() {
    if (gridItems) {
        gridContainer.innerHTML = '';
        gridItems = [];
    }

    randomColors = randomColorsBox.checked;
    darkening = darkeningBox.checked;
    darkeningValue = 0;

    errorText.textContent = '';
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
            if (darkeningValue < 1 && darkening) {
                darkeningValue += 0.1;
            }

            let color = randomColors ? [
                Math.floor(Math.random() * 205) + 50, // Ranges between 100-255
                Math.floor(Math.random() * 205) + 50, // Ranges between 100-255
                Math.floor(Math.random() * 205) + 50  // Ranges between 100-255
            ] : [0, 0, 0];

            color = lerpColor([255,255,255], color, darkening ? darkeningValue : 1);
            
            gridItem.style.backgroundColor = `rgb(
                ${color[0]},
                ${color[1]},
                ${color[2]}
            )`;
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