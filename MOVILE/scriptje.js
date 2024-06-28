// Variables globales
let catPosition = { x: 0, y: 0 }; // Posición inicial del gato
const housePosition = { x: 3, y: 5 }; // Posición de la casa
const boardSize = 6; // Tamaño del tablero

// Coordenadas de los cuadros a pintar
const pathCoordinates = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 4 },
    { x: 3, y: 5 }
];

// Función para crear el tablero
function createBoard() {
    const board = document.getElementById('game-board');
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Colocar el gato al inicio del camino
            if (i === catPosition.y && j === catPosition.x) {
                const catImg = document.createElement('img');
                catImg.src = 'imagenes/gato1.png'; // Ruta de la imagen del gato
                cell.appendChild(catImg);
            }

            // Colocar la casa en la posición (housePosition.x, housePosition.y)
            if (i === housePosition.y && j === housePosition.x) {
                const houseImg = document.createElement('img');
                houseImg.src = 'imagenes/casa2.jpg'; // Ruta de la imagen de la casa
                houseImg.alt = 'Casa';
                cell.appendChild(houseImg);
            }

            // Pintar los cuadros según las coordenadas especificadas
            if (pathCoordinates.some(coord => coord.x === j && coord.y === i)) {
                cell.classList.add('path'); // Marcar como parte del camino
            }

            board.appendChild(cell);
        }
    }
}

// Función para actualizar la posición del gato en el tablero
function updateCatPosition() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerHTML = ''); // Limpiar todas las celdas
    const catIndex = catPosition.y * boardSize + catPosition.x;
    const catImg = document.createElement('img');
    catImg.src = 'imagenes/gato1.png'; // Ruta de la imagen del gato
    cells[catIndex].appendChild(catImg); // Colocar el gato en su nueva posición

    const houseIndex = housePosition.y * boardSize + housePosition.x;
    const houseImg = document.createElement('img');
    houseImg.src = 'imagenes/casa2.jpg'; // Ruta de la imagen del gato
    cells[houseIndex].appendChild(houseImg); // Colocar el gato en su nueva posición
}

// Función para mostrar el modal cuando el gato llega a la casa
function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block'; // Mostrar el modal
}

// Función para verificar si el gato ha llegado a la casa
function checkWin() {
    if (catPosition.x === housePosition.x && catPosition.y === housePosition.y) {
        showModal(); // Mostrar el modal cuando el gato llega a la casa
    }
}

// Función para mover el gato
function move(direction, stepsId) {
    const steps = parseInt(document.getElementById(stepsId).value);
    let newX = catPosition.x;
    let newY = catPosition.y;

    switch (direction) {
        case 'up':
            newY -= steps;
            break;
        case 'down':
            newY += steps;
            break;
        case 'left':
            newX -= steps;
            break;
        case 'right':
            newX += steps;
            break;
    }

    // Verificar si la nueva posición está dentro del tablero y del camino
    if (
        newX >= 0 && newX < boardSize &&
        newY >= 0 && newY < boardSize &&
        pathCoordinates.some(coord => coord.x === newX && coord.y === newY)
    ) {
        catPosition.x = newX;
        catPosition.y = newY;

        // Verificar si el gato ha llegado a la casa
        checkWin();
    }

    // Actualizar la posición del gato en el tablero
    updateCatPosition();
}

// Inicializar el tablero al cargar la página
createBoard();
