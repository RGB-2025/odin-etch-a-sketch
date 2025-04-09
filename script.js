let gridContainer = document.querySelector('.grid-container');
let gridItems = [];

let widthField = document.getElementById('width');
let heightField = document.getElementById('height');
let errorText = document.getElementById('error');
let makeGridButton = document.getElementById('make-grid');

function resetGrid() {
    if (gridItems) {
        gridContainer.innerHTML = '';
        gridItems = [];
    }
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
            gridItem.classList.add('colored');
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