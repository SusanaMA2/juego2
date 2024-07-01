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



function anterior() {
    
    document.querySelector('.izq-btn').classList.add('clicked');
    
    setTimeout(function() {
        document.querySelector('.izq-btn').classList.remove('clicked');
    }, 1000); // Tiempo en milisegundos
	
	
	window.location.href = 'juego.html';
}
function siguiente() {

	 localStorage.setItem('bgColor5Enabled', 'true');
	 
	////////////////////////////
	
		// Agregar la clase "clicked" al botón
    document.querySelector('.der-btn').classList.add('clicked');
    // Después de 1 segundo, quitar la clase "clicked" para volver al color original
    setTimeout(function() {
        document.querySelector('.der-btn').classList.remove('clicked');
		 window.location.href = 'jentero.html';
    }, 1000); // Tiempo en milisegundos
	

	
}




document.addEventListener('DOMContentLoaded', function () {
    const tiposenteroBtn = document.getElementById('tiposentero');
    const tipoBtn = document.getElementById('btn-1');
    const nombreBtn = document.getElementById('btn-2');
    const valorBtn = document.getElementById('btn-3');
    const contents = document.getElementById('contents');
    const contents1 = document.getElementById('contents1');
	const tituloBlanco = document.querySelector('.contents1 .titulo-blanco');


	
	const siguienteBtn = document.querySelector('.der-btn');
	
	////
	const subtst = document.getElementById('subtst');
	const subtsn = document.getElementById('subtsn');
	const subtsv = document.getElementById('subtsv');

	// Mostrar contents0 al cargar la página
	document.getElementById('contents0').classList.remove('hidden');
	

	setTimeout(function() {
		document.getElementById('contents0').classList.add('hidden');
		document.getElementById('contents').classList.remove('hidden');
		document.getElementById('card0').classList.remove('hidden');
	}, 5000);
		
	
	const imgRN = document.querySelector('.img-rn');
	
    tiposenteroBtn.addEventListener('click', function() {
        // Cambiar el texto del botón tipoBtn a 'entero'
        tipoBtn.textContent = 'entero';
			// Mostrar imagen rn.png
			
			setTimeout(function() {
				document.getElementById('contents').classList.add('hidden');
				document.getElementById('contents1').classList.remove('hidden');
			
				imgRN.style.display = 'block'; // Mostrar la imagen
				nombreBtn.removeAttribute('disabled');
				nombreBtn.focus();
				nombreBtn.style.backgroundColor = '#ECCD09';
				subtst.style.color = 'black';
				subtsn.style.color = '#E7BA00';
						
			}, 1000);
			
			
 
    });
	
	const imgRV = document.querySelector('.img-rv');
    let timeoutId1;
		nombreBtn.addEventListener('input', function() {
			nombreBtn.removeAttribute('disabled');
			clearTimeout(timeoutId1); // Limpiar el timeout anterior si existe
			const self = this;
			timeoutId1 = setTimeout(function() {
				const texto = self.value.trim();

				// Verificar condiciones de validación
				if (texto.length === 0 || !isNaN(texto.charAt(0)) || !/^[a-zA-Z]+$/.test(texto)) {
					showFailureIcon(self);
					this.style.color = 'red';
				} else {
					showSuccessIcon(self);
					// Si pasa la validación, esperar 1 segundo y cambiar el texto del nombreBtn
					nombreBtn.textContent = texto;
					setTimeout(function() {
						tituloBlanco.textContent = 'Escribe un valor numerico';
						imgRN.style.display = 'none'; 
												
						imgRV.style.display = 'block'; // Mostrar la imagen
						valorBtn.removeAttribute('disabled');
						valorBtn.focus();
						
						valorBtn.style.backgroundColor = '#ECCD09';
						subtsn.style.color = 'black';
						subtsv.style.color = '#E7BA00';
					}, 2000);
				}
			}, 1000); // Esperar 1 segundo después de que el usuario deje de escribir
		});

		
    let timeoutId;

    // Validación del cuadroTexto2 en contents2
    valorBtn.addEventListener('input', function() {
		
        clearTimeout(timeoutId); // Limpiar el timeout anterior si existe
		const self = this;
        timeoutId = setTimeout(function() {
            const texto = self.value.trim();
		
            // Verificar condiciones de validación
            if (texto.length === 0) {
                // No hacer nada si el campo está vacío
                return;
            }

            // Convertir el texto a número
            const num = parseFloat(texto);

            // Verificar si es un número entero y no contiene decimales
            if (!isNaN(num) && Number.isInteger(num)) {
				showSuccessIcon(self);
                
                setTimeout(function() {
                    
                    valorBtn.textContent = num.toString();
					siguienteBtn.disabled = false;
					subtsv.style.color = 'black';
					imgRV.style.display = 'none'; // Mostrar la imagen
					
                }, 1000);
            } else {
                showFailureIcon(self);
				this.style.color = 'red';
            }
        }, 1000); // Esperar 1 segundo después de que el usuario deje de escribir
    });

//////////////

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

    ///////////
});
