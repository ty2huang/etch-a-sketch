const DEFAULT_PEN_SIZE = 32;
const DEFAULT_COLOR = '#00008b'

const colorPickDiv = document.querySelector('.color-pick-div');
const colorPickBtn = document.querySelector('#color-picker');
const modeBtns = document.querySelectorAll('.mode');
const clearBoardBtn = document.querySelector('#clear-btn');

const drawingBoardDiv = document.querySelector('.drawing-board-div');

const penSizeSlider = document.querySelector('#size-slider');
const sizeValueTxt = document.querySelector('#size-value');
penSizeSlider.value = -DEFAULT_PEN_SIZE;

let currentPenSize = DEFAULT_PEN_SIZE;
let activeModeId = 'picked-color-btn';

function setDefaultColor() {
    colorPickBtn.value = DEFAULT_COLOR;
}

function changeColor(event) {
    event.preventDefault();
    if (event.which == 0) return;
    let backgroundColor;
    if (activeModeId === 'picked-color-btn') {
        backgroundColor = colorPickBtn.value;
    } else if (activeModeId === 'rainbow-btn') {
        let o = Math.round, r = Math.random, s = 255;
        backgroundColor = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
    } else if (activeModeId === 'eraser-btn') {
        backgroundColor = 'white';
    } else if (activeModeId === 'black-btn') {
        backgroundColor = 'black';
    }
    event.target.style['background-color'] = backgroundColor;
}

function switchMode(event) {
    let currBtn = document.getElementById(activeModeId);
    currBtn.classList.remove('active');
    activeModeId = event.target.id;
    event.target.classList.add('active');
    if (activeModeId === 'picked-color-btn') {
        colorPickDiv.style['display'] = 'flex';
    } else {
        colorPickDiv.style['display'] = 'none';
    }
}

function showGridSize() {
    currentPenSize = -penSizeSlider.value;
    sizeValueTxt.textContent = currentPenSize;
}

function updateGrid() {
    showGridSize()
    drawingBoardDiv.innerHTML = '';
    drawingBoardDiv.style['grid-template-columns'] = `repeat(${currentPenSize}, 1fr)`
    drawingBoardDiv.style['grid-template-rows'] = `repeat(${currentPenSize}, 1fr)`
    for(let i = 0; i < currentPenSize*currentPenSize; i++) {
        let tile = document.createElement('div');
        tile.addEventListener('mousedown', changeColor);
        tile.addEventListener('mouseover', changeColor);
        tile.addEventListener('touchmove', changeColor);
        drawingBoardDiv.appendChild(tile);
    }
}

modeBtns.forEach(btn => btn.addEventListener('click', switchMode));

penSizeSlider.addEventListener('mousemove', showGridSize);
penSizeSlider.addEventListener('change', updateGrid);
penSizeSlider.addEventListener('click', updateGrid);
clearBoardBtn.addEventListener('click', updateGrid);

setDefaultColor();
showGridSize();
updateGrid();
