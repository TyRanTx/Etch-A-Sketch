

const grid_container = document.querySelector('.grid-container');

for(let i = 0; i <256; i++){
    const grid_box = document.createElement('div');
    grid_box.classList.add('square');

    grid_container.appendChild(grid_box);
}

const square = document.querySelectorAll('.square');



function color(){

        this.style.backgroundColor = 'yellow';
    
    
}

square.forEach(element => element.addEventListener('mouseenter', color));




