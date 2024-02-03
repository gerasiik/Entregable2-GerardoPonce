document.addEventListener('DOMContentLoaded', () => {
    let boton = document.querySelector('#agregar');
    let tareas = document.querySelector('#lista-tareas');
    let campoInput = document.querySelector('#campo');

    // Cargar tareas desde localStorage al cargar la página
    cargarTareasDesdeLocalStorage();

    // Agregar un event listener al contenedor principal
    tareas.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('check')) {
            // Si se hizo clic en el icono de check
            const tareaElemento = target.closest('.tareas').querySelector('.tarea');
            tareaElemento.style.textDecoration = 'line-through';
            guardarTareasEnLocalStorage();
        } else if (target.classList.contains('trash')) {
            // Si se hizo clic en el icono de trash
            const tareaElemento = target.closest('.tareas');
            tareaElemento.remove();
            guardarTareasEnLocalStorage();
        }
    });

    boton.addEventListener('click', (e) => {
        e.preventDefault();

        let campo = campoInput.value;

        if (campo === '') {
            return alert('Todos los campos son obligatorios');
        }

        // Verifica si la tarea ya está presente
        if (contieneTarea(campo)) {
            return alert('Esta tarea ya está en la lista');
        }

        function contieneTarea(campo) {
            // Verifica si la tarea ya está presente en la lista
            const tareasActuales = tareas.querySelectorAll('.alert p.tarea');
            for (let tarea of tareasActuales) {
                if (tarea.textContent === campo) {
                    return true;
                }
            }
            return false;
        }

        tareas.innerHTML += `
            <div class="alert alert-primary tareas" role="alert">
                <span><i class="fa-solid fa-list-ol"></i></span>
                <p class="tarea">${campo}</p>
                <div class="acciones">
                    <span><i class="fa-solid fa-check check"></i></span>
                    <span><i class="fa-solid fa-trash trash"></i></span>
                </div>
            </div>`;

        // Guardar tareas en localStorage después de agregar una nueva tarea
        guardarTareasEnLocalStorage();

        // Limpiar el campo después de agregar la tarea
        campoInput.value = '';
    });

    // Función para cargar tareas desde localStorage
    function cargarTareasDesdeLocalStorage() {
        const tareasGuardadas = localStorage.getItem('tareas');
        if (tareasGuardadas) {
            tareas.innerHTML = tareasGuardadas;
        }
    }

    // Función para guardar tareas en localStorage
    function guardarTareasEnLocalStorage() {
        localStorage.setItem('tareas', tareas.innerHTML);
    }
});
