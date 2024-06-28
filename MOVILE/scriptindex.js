document.addEventListener('DOMContentLoaded', function() {
    initializeCells();
});

function initializeCells() {
    activateCellType('.bg-color-5', 'bgColor5Enabled', ['.bg-color-0', '.bg-color-1', '.bg-color-2', '.bg-color-3', '.bg-color-4']);
    activateCellType('.bg-color-4', 'bgColor4Enabled', ['.bg-color-0', '.bg-color-1', '.bg-color-2', '.bg-color-3']);
    activateCellType('.bg-color-3', 'bgColor3Enabled', ['.bg-color-0', '.bg-color-1', '.bg-color-2']);
    activateCellType('.bg-color-2', 'bgColor2Enabled', ['.bg-color-0', '.bg-color-1']);
    activateCellType('.bg-color-1', 'bgColor1Enabled', ['.bg-color-0']);
    activateCellType('.bg-color-0', 'bgColor0Enabled', []);
    // Agrega aquí las llamadas a las demás funciones para otros tipos de celdas si es necesario
}

function activateCellType(cellSelector, localStorageKey, deactivateSelectors) {
    var cellToActivate = document.querySelector(cellSelector);

    // Función para activar la celda y ajustar la opacidad del fondo semitransparente
    function activateCell(cell) {
        cell.classList.add('active'); // Añadir la clase 'active' a la celda activada
        cell.style.setProperty('--opacity-before', '1'); // Cambiar la opacidad del fondo semitransparente a 1
    }

    // Verificar y aplicar el estado de activación al cargar la página
    var isEnabled = localStorage.getItem(localStorageKey);
    if (isEnabled && cellToActivate) {
        activateCell(cellToActivate); // Activar la celda si está habilitada en localStorage
    }

    // Manejar clic en los enlaces dentro de la celda
    if (cellToActivate) {
        var links = cellToActivate.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function(event) {
                if (!isEnabled) {
                    event.preventDefault(); // Prevenir la acción por defecto del enlace si no está habilitada
                    // Puedes manejar el comportamiento personalizado aquí, como redireccionar o mostrar un mensaje
                }
            });
        });
    }

    // Desactivar clic en los enlaces de otras celdas que no sean la actual
    deactivateSelectors.forEach(function(deactivateSelector) {
        var cellsToDeactivate = document.querySelectorAll(deactivateSelector);
        cellsToDeactivate.forEach(function(cell) {
            var links = cell.querySelectorAll('a');
            links.forEach(function(link) {
                link.addEventListener('click', function(event) {
                    // Aquí puedes manejar el clic en otras celdas según sea necesario
                });
            });
        });
    });

    // Escuchar cambios en localStorage desde otras partes de la aplicación
    window.addEventListener('storage', function(event) {
        if (event.key === localStorageKey && JSON.parse(event.newValue)) {
            activateCell(cellToActivate); // Activar la celda cuando se actualiza desde localStorage
        }
    });
}

