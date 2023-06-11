let grid_size = 16;
let isDark = 'false';
let isLight = 'true';
let darkenPercent;

const grid_container = document.querySelector('.grid-container');

function initializeSquares() {
    removeSquares();

    for (let i = 0; i < grid_size * grid_size; i++) {
        const grid_box = document.createElement('div');
        grid_box.classList.add('square');
        grid_box.style.width = `${600 / grid_size}px`;
        grid_box.style.height = `${600 / grid_size}px`;
        grid_box.style.borderBottom = '2px solid #A75D5D'
        grid_box.style.borderRight = '2px solid #A75D5D'

        grid_container.appendChild(grid_box);
    }
    hoverSquares();
}


function removeSquares() {
    while (grid_container.childElementCount > 0) {
        grid_container.firstElementChild.remove();
    }
}

function darken(element){
            darkenPercent = Number(element.dataset.darkenpercent) - 10;
            element.style.filter = `brightness(${darkenPercent}%)`;
            element.dataset.darkenpercent = darkenPercent;
}

function hoverSquares(){
    const square = grid_container.querySelectorAll('*');
    square.forEach(element => element.addEventListener('mouseenter', () => {
        if(element.classList.contains('square-hover') && isDark === 'true'){
darken(element);
             }
        else{
        element.classList.add('square-hover')
        element.setAttribute('data-darkenPercent', '100');
             }

    }));
}

function setCanvas() {
    grid_size = parseInt(prompt('Please enter grid size:', '5'));
    initializeSquares();
}

const btn = document.querySelector('.btnCanvas');
btn.addEventListener('click', setCanvas);


const btnDarken = document.querySelector('.btnDarken');

btnDarken.addEventListener('click', () => {
    if(isDark === 'false') {isDark = 'true'}
    else if(isDark === 'true'){
        isDark = 'false';
    }
});



initializeSquares();


