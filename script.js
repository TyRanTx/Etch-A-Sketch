let canvasSize = 16;
let dark = 'false';
let light = 'false';
let eraser = 'false';
let randomCol = 'false';
let currentBrightness;
let mouse_down = 'false';

const canvas = document.querySelector('.canvas');

document.addEventListener('mousedown', () => mouse_down = 'true');
document.addEventListener('mouseup', () => mouse_down = 'false');

initializeSquares();
hoverSquares();

/* Adds squares in container. First it removes old squares that are already present in the canvas, and then goes through loop to add one by one.
Default size is 16x16 */

function initializeSquares() {
    removePreviousSquares();
    for (let i = 0; i < canvasSize * canvasSize; i++) {
        const box = document.createElement('div');
        box.classList.add('square');
        box.style.width = `${600 / canvasSize}px`;
        box.style.height = `${600 / canvasSize}px`;
        box.style.borderBottom = '2px solid #A75D5D'
        box.style.borderRight = '2px solid #A75D5D'
        box.style.filter = 'brightness(100%)';
        canvas.appendChild(box);
    }
}

function hoverSquares() {
    const square = canvas.querySelectorAll('*');
    square.forEach(e => e.addEventListener('mouseover', () => {
        if (mouse_down === 'true') {
            if (!(e.classList.contains('filled'))) {
                fillSquare(e);
            }
            if (e.classList.contains('filled')) {
                changeBrightness(e);
            }
            if (eraser === 'true') {
                erase(e);
            }
        }
    }
    )
    )
}

function erase(e) {
    e.classList.remove('filled');
    e.style.backgroundColor = '';
    e.style.filter = 'brightness(100%)';
}

function fillSquare(e) {
    if (randomCol === 'false') {
        e.classList.add('filled');
        e.style.backgroundColor = '#FF6D60';
    }
    else {
        e.classList.add('filled');
        e.style.backgroundColor = randomColor();
    }
}

function changeBrightness(e) {
    if (dark === 'true') {
        darken(e);
    }
    else if (light === 'true') {
        lighten(e);
    }
}

function removePreviousSquares() {
    while (canvas.childElementCount > 0) {
        canvas.firstElementChild.remove();
    }
}

// Darken square by 10%

function darken(e) {
    currentBrightness = e.style.filter.replace(/\D/g, "");
    if (currentBrightness > 0) {
        e.style.filter = `brightness(${currentBrightness - 10}%)`;
    }
}

// Lighten square by 10%

function lighten(e) {
    currentBrightness = Number(e.style.filter.replace(/\D/g, ""));
    if (currentBrightness < 100) {
        e.style.filter = `brightness(${currentBrightness + 10}%)`;
    }
}

function randomColor() {
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber)
    randomNumber = randomNumber.toString(16);
    let randcolor = randomNumber.padStart(6, 0);
    return `#${randcolor.toUpperCase()}`;
}

// Button functions

const btndark = document.querySelector('#btnDarken');
const btnlight = document.querySelector('#btnLighten');
const btnReset = document.querySelector('#btnReset');
const btn_eraser = document.querySelector('#btnEraser');
const btn_color = document.querySelector('#btnRandomColor');

function setCanvas() {
    let size = prompt('Please enter grid size:', '5');
    if (size === null) {
        console.log(size);
        return;
    }
    else {
        canvasSize = parseInt(size);
        console.log(canvasSize);
        initializeSquares();
        hoverSquares();
    }
}

function toggleDarken() {
    if (dark === 'false' &&
        light === 'false' &&
        eraser === 'false' &&
        randomCol === 'false') {
        btndark.style.backgroundColor = '#D67D3E';
        dark = 'true';
    }
    else if (dark === 'true') {
        btndark.removeAttribute("style");
        dark = 'false';
    }
}

function toggleLighten() {
    if (light === 'false' &&
        dark === 'false' &&
        eraser === 'false' &&
        randomCol === 'false') {
        btnlight.style.backgroundColor = '#D67D3E';
        light = 'true';
        dark = 'false';
    }
    else {
        btnlight.removeAttribute("style");
        light = 'false';
    }
}

// Puts the squares back to their default state

function reset() {
    eraser = 'false';
    dark = 'false';
    light = 'false';
    randomCol = 'false';

    btndark.removeAttribute("style");
    btnlight.removeAttribute("style");
    btn_eraser.removeAttribute("style");
    btn_color.removeAttribute("style");

    let counter = 0;

    while (counter < canvas.childElementCount) {
        canvas.children[counter].classList.remove('filled');
        canvas.children[counter].style.backgroundColor = '';
        canvas.children[counter].style.filter = 'brightness(100%)';
        counter++;
    }
}

function toggleEraser() {
    if (eraser === 'false' &&
        dark === 'false' &&
        light === 'false' &&
        randomCol === 'false') {
        btn_eraser.style.backgroundColor = '#D67D3E';
        eraser = 'true'
    }
    else {
        btn_eraser.removeAttribute("style");
        eraser = 'false';
    }
}

function toggleRandomColor() {
    if (randomCol === 'false' &&
        dark === 'false' &&
        light === 'false' &&
        eraser === 'false') {
        btn_color.style.backgroundColor = '#D67D3E';
        randomCol = 'true'
    }
    else {
        btn_color.removeAttribute("style");
        randomCol = 'false';
    }
}