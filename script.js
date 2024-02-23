// Datos de alumnos (por ahora en memoria)
let alumnos = [];

// Función para agregar un alumno
function agregarAlumno(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;

    const alumno = {
        nombre: nombre,
        apellidos: apellidos,
        edad: edad,
        materias: [],
        calificaciones: []
    };

    alumnos.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    mostrarListaAlumnos();
    document.getElementById('alumno-form').reset();
}

// Función para mostrar la lista de alumnos
function mostrarListaAlumnos() {
    const listaAlumnos = document.getElementById('lista-alumnos');
    listaAlumnos.innerHTML = '';

    const alumnosGuardados = JSON.parse(localStorage.getItem('alumnos'));
    if (alumnosGuardados) {
        alumnos = alumnosGuardados;
    }

    alumnos.forEach((alumno, index) => {
        const item = document.createElement('div');
        item.classList.add('alumno');
        item.innerHTML = `
            <h3>${alumno.nombre} ${alumno.apellidos}</h3>
            <p>Edad: ${alumno.edad}</p>
            <button onclick="inscribirClase(${index})">Inscribir a Clase</button>
            <button onclick="asignarCalificaciones(${index})">Asignar Calificaciones</button>
        `;
        listaAlumnos.appendChild(item);
    });
}

// Función para inscribir un alumno a una clase
function inscribirClase(index) {
    const materia = prompt('Ingrese la materia a inscribir:');
    if (materia) {
        const alumno = alumnos[index];
        alumno.materias.push(materia);
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
        mostrarListaAlumnos();
    }
}

// Función para asignar calificaciones a un alumno
function asignarCalificaciones(index) {
    const calificacion = prompt('Ingrese la calificación:');
    if (!isNaN(calificacion)) {
        const alumno = alumnos[index];
        alumno.calificaciones.push(parseFloat(calificacion));
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
        mostrarListaAlumnos();
    } else {
        alert('Por favor ingrese una calificación válida.');
    }
}

// Evento para agregar alumno cuando se envía el formulario
document.getElementById('alumno-form').addEventListener('submit', agregarAlumno);

// Mostrar la lista de alumnos al cargar la página
mostrarListaAlumnos();
