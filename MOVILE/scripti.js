// Función para cambiar la opacidad y desplazar la vista
document.addEventListener('DOMContentLoaded', () => {
    const siguienteBtn = document.querySelector('.der-btn');

    // Función para cambiar la opacidad y desplazar la vista
    function changeOpacityAndScroll(id, delay, callback) {
        setTimeout(() => {
            const element = document.getElementById(id);
            element.style.opacity = 1;
            element.scrollIntoView({ behavior: 'smooth' });
            if (callback) {
                callback();
            }
        }, delay);
    }



    // Al cargar la página, hacer la secuencia
    document.getElementById('c1').style.opacity = 1; // c1 inicialmente visible

    changeOpacityAndScroll('c2', 2000); // c2 después de 2 segundos
    changeOpacityAndScroll('c3', 7000); // c3 después de 5 segundos
    changeOpacityAndScroll('c4', 11000); // c4 después de 4 segundos
    changeOpacityAndScroll('c5', 15000, () => { // c5 después de 4 segundos
        siguienteBtn.disabled = false; // Habilita el botón después de c5
    });
});
		
		
function siguiente() {

	 localStorage.setItem('bgColor7Enabled', 'true');
	 
	////////////////////////////
	
		// Agregar la clase "clicked" al botón
    document.querySelector('.der-btn').classList.add('clicked');
    // Después de 1 segundo, quitar la clase "clicked" para volver al color original
    setTimeout(function() {
        document.querySelector('.der-btn').classList.remove('clicked');
		 window.location.href = 'juego.html';
    }, 1000); // Tiempo en milisegundos
	
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

