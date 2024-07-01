document.addEventListener('DOMContentLoaded', () => {
	const siguienteBtn = document.querySelector('.der-btn');
	
    const draggables = document.querySelectorAll('.draggable');
    const storage = document.getElementById('storage-content');
    const cloud = document.getElementById('cloud');
	
	 const overlay = document.getElementById('overlay');
    const startImage = document.getElementById('startImage');

    // Mostrar overlay al inicio
    overlay.style.display = 'flex'; // Mostrar overlay como flexbox

    // Ocultar overlay después de 5 segundos
    setTimeout(() => {
        overlay.style.display = 'none';
        // Llamar función para iniciar el juego o habilitar interacciones
        enableGame(); // Esta función debería habilitar eventos de drag and drop, etc.
    }, 6000);
	

    // Imágenes de advertencia y éxito
    const letterImage = new Image();
    letterImage.src = 'imagenes/r1.png';
    letterImage.alt = 'Solo se permiten números enteros';
    letterImage.classList.add('warning-image');

    const decimalImage = new Image();
    decimalImage.src = 'imagenes/r2.png';
    decimalImage.alt = 'No se permiten números decimales';
    decimalImage.classList.add('warning-image');

    const successImage = new Image();
    successImage.src = 'imagenes/rb.png';
    successImage.alt = '¡Todos los números enteros han sido almacenados!';
    successImage.classList.add('warning-image');

// Contador de números enteros almacenados
    let integerCount = 0;
	// Contador de números enteros en la nube (cloud)
    const totalIntegers = Array.from(cloud.children).filter(child => isInteger(child.textContent.trim())).length;


    // Función para mostrar la imagen de advertencia o éxito
     function showImage(image) {
        storage.appendChild(image);
        image.style.display = 'block'; // Mostrar la imagen
        setTimeout(() => {
            image.style.display = 'none'; // Ocultar la imagen después de 5 segundos
        }, 5000);
    }


    // Agregar eventos de arrastrar a los elementos con la clase 'draggable'
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    // Permitir soltar elementos sobre el área de almacenamiento
    storage.addEventListener('dragover', dragOver);
    storage.addEventListener('drop', drop);

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        
        // Validar si el dato arrastrado es un número entero
        if (isInteger(data.trim())) {
            const newElement = document.createElement('span');
            newElement.classList.add('draggable');
            newElement.textContent = data.trim();
            storage.appendChild(newElement);
			// Incrementar contador de números enteros
            integerCount++;
			
            // Verificar si se han colocado todos los enteros
            checkAllIntegers();
        } else if (/^\d+\,\d+$/.test(data.trim())) { // Verificar números decimales
            showImage(decimalImage);
        } else { // Si no es un número entero ni decimal, asumimos que es una letra
            showImage(letterImage);
        }
    }

    function isInteger(value) {
        return /^-?\d+$/.test(value);
    }
	 function checkAllIntegers() {
			const draggableCount = storage.querySelectorAll('.draggable').length;

			if (draggableCount === totalIntegers) {
				showImage(successImage);
				siguienteBtn.disabled = false;
			}
		}

});


function siguiente() {

	 localStorage.setItem('bgColor6Enabled', 'true');
	 
	////////////////////////////
	
		// Agregar la clase "clicked" al botón
    document.querySelector('.der-btn').classList.add('clicked');
    // Después de 1 segundo, quitar la clase "clicked" para volver al color original
    setTimeout(function() {
        document.querySelector('.der-btn').classList.remove('clicked');
		 window.location.href = 'entero.html';
    }, 1000); // Tiempo en milisegundos
	
}
function anterior() {

	
		 window.location.href = 'introduccion.html';
  
}