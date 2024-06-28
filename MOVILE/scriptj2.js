document.addEventListener('DOMContentLoaded', () => {
    const positionInputs = [
        document.getElementById('position1'),
        document.getElementById('position2'),
        document.getElementById('position3'),
        document.getElementById('position4')
    ];
    const setPositionButtons = [
        document.getElementById('set-position1'),
        document.getElementById('set-position2'),
        document.getElementById('set-position3'),
        document.getElementById('set-position4')
    ];
    const pieces = document.querySelectorAll('.piece');
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const labels = {
        '0-0': document.querySelector('.p1'),
        '0-1': document.querySelector('.p2'),
        '1-0': document.querySelector('.p3'),
        '1-1': document.querySelector('.p4')
    };

    const updatePositionButtons = [
        document.getElementById('actualizar1'),
        document.getElementById('actualizar2'),
        document.getElementById('actualizar3'),
        document.getElementById('actualizar4')
    ];
	 const keywordInputs = [
        document.querySelector('.keyword1'),
        document.querySelector('.keyword2'),
        document.querySelector('.keyword3'),
        document.querySelector('.keyword4')
    ];
	const varNameInputs = [
        document.querySelector('.var-name1'),
        document.querySelector('.var-name2'),
        document.querySelector('.var-name3'),
        document.querySelector('.var-name4')
    ];

    const puzzleCompleteMessage = document.getElementById('puzzle-complete-message');
    const nextLevelButton = document.getElementById('next-level-button');

    const correctPositions = ['0-0', '0-1', '1-0', '1-1'];
    let selectedPosition = null;
    const usedPositions = [];


// Función para validar si el valor es "decimal"
    function validateKeyword(value) {
        return value.trim().toLowerCase() === "decimal";
    }
	
	// Event Listeners para cada campo de entrada de palabra clave
    keywordInputs.forEach(keywordInput => {
        keywordInput.addEventListener('input', () => {
			
            const value = keywordInput.value;
			

            // Validar automáticamente al ingresar algo
            if (validateKeyword(value)) {
                
                // Cambiar el color del texto a su color original
				keywordInput.style.color = 'black';
                
            } else {
                
                keywordInput.style.color = 'red';
            }
			 activateButtonsAndPieces();
		
        });
    });

    // Event Listeners para cada campo de entrada de var-name
    varNameInputs.forEach(varNameInput => {
        varNameInput.addEventListener('input', () => {
            const value = varNameInput.value.trim();

            // Validar automáticamente al ingresar algo
            if (validateVarName(value)) {
                
                // Cambiar el color del texto a su color original
                varNameInput.style.color = 'black';
            } else {
                
                varNameInput.style.color = 'red';
            }
			 activateButtonsAndPieces();
		
        });
    });

    // Función para validar var-name
    function validateVarName(value) {
        // Verificar si el valor no está vacío y no consiste solo en espacios en blanco
        return value !== '' && /^\S+$/.test(value);
    }
	
	    // Event Listeners para cada campo de entrada de value
    positionInputs.forEach(positionInput => {
        positionInput.addEventListener('input', () => {
            const value = positionInput.value.trim();

            // Validar automáticamente al ingresar algo
            if (validateDecimal(value)) {
               
                // Cambiar el color del texto a su color original
                positionInput.style.color = 'black';
            } else {
                
                positionInput.style.color = 'red';
            }
			 activateButtonsAndPieces();

        });
    });

    // Función para validar números decimales
    function validateDecimal(value) {
        return /^\d*\,?\d+$/.test(value);
    }

	
	let allFieldsValid = false;

	// Función para validar todos los campos
	function validateAllFields() {
		let isValid = true;
		keywordInputs.forEach((keywordInput, index) => {
			const keywordValue = keywordInput.value.trim();
			const varNameValue = varNameInputs[index].value.trim();
			const positionValue = positionInputs[index].value.trim();
			if (!validateKeyword(keywordValue) || !validateVarName(varNameValue) || !validateDecimal(positionValue)) {
				isValid = false;
			}
		});
		return isValid;
	}

 

	 // Función para desactivar botones y clases pieces al inicio
    function deactivateButtonsAndPieces() {
        setPositionButtons.forEach(button => {
            button.disabled = true;
        });
        updatePositionButtons.forEach(button => {
            button.disabled = true;
        });
        pieces.forEach(piece => {
            piece.classList.add('disabled');
        });
    }

	// Función para activar botones y piezas una vez que se validan todos los campos
    function activateButtonsAndPieces() {
        keywordInputs.forEach((_, index) => {
            if (validateKeyword(keywordInputs[index].value.trim()) &&
                validateVarName(varNameInputs[index].value.trim()) &&
                validateDecimal(positionInputs[index].value.trim())) {
                setPositionButtons[index].disabled = false;
            }
        });
        if (validateAllFields()) {
            pieces.forEach(piece => {
                piece.classList.remove('disabled');
            });
        }
    }


    // Desactivar botones y clases pieces al inicio
    deactivateButtonsAndPieces();
	


	
	////////////////////
	
	
	
	
    // Manejar la configuración de posiciones
    setPositionButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const position = positionInputs[index].value.trim();
            const [x, y] = position.split(',');
			
			
            // Verificar si la posición es válida
            if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
                selectedPosition = `${x}-${y}`;
                
                // Verificar si la posición ya ha sido utilizada
                if (usedPositions.includes(selectedPosition)) {
                    alert('Esta posición ya ha sido utilizada');
                    selectedPosition = null;
                }else {
                     pieces.forEach(piece => {
                        piece.classList.remove('disabled');
                    });
                    button.disabled = true;
                    updatePositionButtons[index].disabled = false;
                }              
            } else {
                alert('Posición inválida');
            }
        });
    });

    // Manejar la actualización de posiciones
    updatePositionButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const position = positionInputs[index].value.trim();
            const [x, y] = position.split(',');

            if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
                selectedPosition = `${x}-${y}`;
                if (usedPositions.includes(selectedPosition)) {
					
					pieces.forEach(piece => {
                        piece.classList.remove('disabled');
                    });
                    //alert('Ahora puede cambiar la pieza en la posición seleccionada');
                } else {
                    alert('Esta posición no ha sido utilizada aún');
                    selectedPosition = null;
                }
            } else {
                alert('Posición inválida');
            }
        });
    });

    // Agregar un evento de clic a cada pieza en la segunda columna
    pieces.forEach(piece => {
        piece.addEventListener('click', () => {
            // Verificar si se ha seleccionado una posición
            if (selectedPosition) {
                // Encontrar la pieza del rompecabezas correspondiente a la posición seleccionada
                const puzzlePiece = document.querySelector(`.puzzle-piece[data-pos="${selectedPosition}"]`);
                
                // Asignar la imagen de la pieza seleccionada al rompecabezas
                puzzlePiece.style.backgroundImage = piece.style.backgroundImage;
                puzzlePiece.style.backgroundPosition = piece.style.backgroundPosition;
                
                // Restablecer la opacidad
                puzzlePiece.classList.add('active');
				piece.classList.add('active');
                
                // Ocultar gradualmente la etiqueta asociada a la posición
                fadeOut(labels[selectedPosition]);
                
                // Agregar la posición utilizada al array si no está ya incluida
                if (!usedPositions.includes(selectedPosition)) {
                    usedPositions.push(selectedPosition);
                }

                // Verificar si el rompecabezas está completo
                if (usedPositions.length === correctPositions.length && usedPositions.every(pos => correctPositions.includes(pos))) {
                   
					showModal();
                }
                
                // Limpiar la posición seleccionada
                selectedPosition = null;
            } else {
                alert('Por favor, seleccione una posición primero.');
            }
        });
    });

    // Función para ocultar gradualmente un elemento
    function fadeOut(element) {
        var opacity = 1;
        var intervalID = setInterval(function() {
            if (opacity <= 0.1) {
                clearInterval(intervalID);
                element.style.display = 'none';
            }
            element.style.opacity = opacity;
            opacity -= opacity * 0.1;
        }, 50);
    }
});

// Función para mostrar el modal cuando el gato llega a la casa
function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block'; // Mostrar el modal
}



function showSuccessIcon(element) {
    const failureIcon = element.parentNode.querySelector('.failure');
    if (failureIcon) {
        failureIcon.remove();
    }

    let successIcon = element.parentNode.querySelector('.success');
    if (!successIcon) {
        successIcon = document.createElement('i');
        successIcon.classList.add('fas', 'fa-thumbs-up', 'success');
        element.parentNode.appendChild(successIcon);
        setTimeout(function () {
            successIcon.remove();
        }, 2000);
    }
}

function showFailureIcon(element) {
    const successIcon = element.parentNode.querySelector('.success');
    if (successIcon) {
        successIcon.remove();
    }

    let failureIcon = element.parentNode.querySelector('.failure');
    if (!failureIcon) {
        failureIcon = document.createElement('i');
        failureIcon.classList.add('fas', 'fa-thumbs-down', 'failure');
        element.parentNode.appendChild(failureIcon);
        setTimeout(function () {
            failureIcon.remove();
        }, 2000);
    }
}


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
	
	
	window.location.href = 'ddecimal.html';
}

// Función para el botón "anterior"
function siguiente() {
    // Agregar la clase "clicked" al botón
    document.querySelector('.izq-btn').classList.add('clicked');
    // Después de 1 segundo, quitar la clase "clicked" para volver al color original
    setTimeout(function() {
        document.querySelector('.izq-btn').classList.remove('clicked');
    }, 1000); // Tiempo en milisegundos
	
	
	window.location.href = 'caracter.html';
}
