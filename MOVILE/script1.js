
function close1() {
	// Agregar la clase "clicked" al botón
    document.querySelector('.close-btn').classList.add('clicked');
    // Después de 1 segundo, quitar la clase "clicked" para volver al color original
    setTimeout(function() {
        document.querySelector('.close-btn').classList.remove('clicked');
    }, 1000); // Tiempo en milisegundos
	
    // Redirigir a la página deseada
    window.location.href = 'index.html';
}


// Función para el botón "anterior"
function anterior() {
    // Agregar la clase "clicked" al botón
    document.querySelector('.izq-btn').classList.add('clicked');
    // Después de 1 segundo, quitar la clase "clicked" para volver al color original
    setTimeout(function() {
        document.querySelector('.izq-btn').classList.remove('clicked');
    }, 1000); // Tiempo en milisegundos
	
	
	window.location.href = 'entero.html';
}



function nextLesson() {
    	
	 localStorage.setItem('bgColor4Enabled', 'true');
	
    setTimeout(function() {
		 window.location.href = 'decimal.html';
    }, 1000); // Tiempo en milisegundos
}



function validateInputs(keywordSelector, varNameSelector, valueSelector, checkSelector, buttonAlts, validValue) {
    const keyword = document.querySelector(keywordSelector);
    const varName = document.querySelector(varNameSelector);
    const value = document.querySelector(valueSelector);
    const check = document.querySelector(checkSelector);

    // Obtener los botones de flecha
    const arrowButtons = document.querySelectorAll('.arrow');

    // Inicialmente ocultar la marca de "visto bueno"
    check.style.display = 'none';
	// Desactivar los botones de flecha al inicio
arrowButtons.forEach(button => {
    button.disabled = true;
});

    // Función para habilitar o deshabilitar los botones de flecha según la validación
    function actualizarBotones() {
        // Verificar si todos los campos son válidos
        const keywordValido = keyword.value.trim().toLowerCase() === 'entero';
        const varNameValido = varName.value.trim() !== '' && !varName.value.includes(' ');
        const valueValido = parseInt(value.value) === validValue;

        // Si todos los campos son válidos, habilitar solo los botones relevantes
        if (keywordValido && varNameValido && valueValido) {
            arrowButtons.forEach(button => {
                const alt = button.querySelector('img').getAttribute('alt');
                if (buttonAlts.includes(alt)) {
                    button.disabled = false;
                } else {
                    button.disabled = true;
                }
            });
        } else {
            // Si algún campo no es válido, deshabilitar todos los botones de flecha
            arrowButtons.forEach(button => {
                button.disabled = true;
            });
        }
    }

    // Validar entrada de keyword
    keyword.addEventListener('input', () => {
        const isValid = keyword.value.trim().toLowerCase() === 'entero';
        if (isValid) {
            keyword.style.color = 'black';
            check.style.display = 'none';
        } else {
            keyword.style.color = 'red';
            check.innerHTML = '&#128078;';
            check.style.color = 'red';
            check.style.display = 'block';
        }
        // Actualizar estado de los botones
        actualizarBotones();
    });

    // Validar entrada de varName
    varName.addEventListener('input', () => {
        const isValid = varName.value.trim() !== '' && !varName.value.includes(' ');
        if (isValid) {
            varName.style.color = 'black';
            check.style.display = 'none';
        } else {
            varName.style.color = 'red';
            check.innerHTML = '&#128078;';
            check.style.color = 'red';
            check.style.display = 'block';
        }
        // Actualizar estado de los botones
        actualizarBotones();
    });

    // Validar entrada de value
    value.addEventListener('input', () => {
        const isValid = parseInt(value.value) === validValue;
        if (isValid) {
            value.style.color = 'black';
            check.style.display = 'none';
        } else {
            value.style.color = 'red';
            check.innerHTML = '&#128078;';
            check.style.color = 'red';
            check.style.display = 'block';
        }
        // Actualizar estado de los botones
        actualizarBotones();
    });
    
    // Validar clic en el botón correspondiente
    buttonAlts.forEach(buttonAlt => {
        const rightButton = document.querySelector(`.arrow img[alt="${buttonAlt}"]`).parentElement;
        rightButton.addEventListener('click', () => {
		
        rightButton.style.backgroundColor = '#2BA2FF';
        
        // Restablecer el color de los demás botones
        arrowButtons.forEach(button => {
            if (button !== rightButton) {
                button.style.backgroundColor = 'white'; // Cambiar el color a azul cuando no está activo
            }
        });	
			
            if (keyword.value.trim().toLowerCase() === 'entero' &&
                varName.value.trim() !== '' && !varName.value.includes(' ') &&
                parseInt(value.value) === validValue) {
                check.innerHTML = '&#128077;';
                check.style.color = 'green';
                check.style.display = 'block';
				scrollToGameBoard();
            } else {
                check.innerHTML = '&#128078;';
                check.style.color = 'red';
                check.style.display = 'block';
            }
        });
    });
}

// Validar el primer grupo
validateInputs('.keyword1', '.var-name1', '.value1', '.check1', ['Botón izquierda1', 'Botón arriba2', 'Botón abajo3', 'Botón derecha4'], 4);

validateInputs('.keyword2', '.var-name2', '.value2', '.check2', ['Botón izquierda5', 'Botón arriba6', 'Botón abajo7', 'Botón derecha8'], 3);

validateInputs('.keyword3', '.var-name3', '.value3', '.check3', ['Botón izquierda9', 'Botón arriba10', 'Botón abajo11', 'Botón derecha12'], 1);

validateInputs('.keyword4', '.var-name4', '.value4', '.check4', ['Botón izquierda13', 'Botón arriba14', 'Botón abajo15', 'Botón derecha16'], 2);


// Función para desplazarse al game-board
function scrollToGameBoard() {
    const gameBoard = document.getElementById('game-board');
    if (gameBoard) {
        gameBoard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}