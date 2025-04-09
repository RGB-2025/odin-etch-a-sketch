let gridContainer = document.querySelector('.grid-container');
let gridItems = [];

function makeGrid(rows, columns) {
    for (let i = 0; i < rows*columns; i++) {
        let item = document.createElement('div');
        item.style.flex = `0 0 ${100/(columns)}%`;
        item.classList.add('grid-item');
        gridItems.push(item);
        gridContainer.appendChild(item);
    }
}

makeGrid(20, 20);

