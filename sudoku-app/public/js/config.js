const menu = document.getElementById("configMenu");
let coloresPrevios = {};
const colorTablero = document.getElementById('colorTablero');
const colorCuadros = document.getElementById('colorCuadros');
const colorCeldas = document.getElementById('colorCeldas');
const colorCeldasCompletadas = document.getElementById('colorCeldasCompletadas');
const colorNumeros = document.getElementById('colorNumeros');
const colorFyC = document.getElementById('colorFyC');
const colorResalteNumeros = document.getElementById('colorResalteNumeros');

colorCeldasCompletadas
const atajo = getComputedStyle(document.documentElement);
const estilos = document.documentElement.style;

function cargarConfiguarcion(){
    // Función para actualizar la variable CSS
    function actualizarColorCSS(variable, color) {
        document.documentElement.style.setProperty(variable, color);
    }

    // Asignar eventos de cambio a cada input de color
    colorTablero.addEventListener('input', (event) => {
        actualizarColorCSS('--colorTablero', event.target.value);
    });

    colorCuadros.addEventListener('input', (event) => {
        actualizarColorCSS('--colorCuadro', event.target.value);
    });

    colorCeldas.addEventListener('input', (event) => {
        actualizarColorCSS('--colorCelda', event.target.value);
    });

    colorCeldasCompletadas.addEventListener('input', (event) => {
        actualizarColorCSS('--colorCeldaCompleta', event.target.value);
    });

    colorNumeros.addEventListener('input', (event) => {
        actualizarColorCSS('--colorNumeros', event.target.value);
    });

    colorFyC.addEventListener('input', (event) => {
        actualizarColorCSS('--colorResalte', event.target.value);
    });

    colorResalteNumeros.addEventListener('input', (event) => {
        actualizarColorCSS('--colorNumerosResaltados', event.target.value);
    });

}

function abrirConfiguracion() {
    // Guardar los colores actuales antes de hacer cambios
    coloresPrevios = {
        tablero: atajo.getPropertyValue('--colorTablero'),
        cuadros: atajo.getPropertyValue('--colorCuadro'),
        celdas: atajo.getPropertyValue('--colorCelda'),
        celdasCompletadas: atajo.getPropertyValue('--colorCeldaCompleta'),
        numeros: atajo.getPropertyValue('--colorNumeros'),
        resaltado: atajo.getPropertyValue('--colorResalte'),
        numerosResaltados: atajo.getPropertyValue('--colorNumerosResaltados')
    };
    colorTablero.value = coloresPrevios.tablero;
    colorCuadros.value = coloresPrevios.cuadros;
    colorCeldas.value = coloresPrevios.celdas;
    colorCeldasCompletadas.value = coloresPrevios.celdasCompletadas;
    colorNumeros.value = coloresPrevios.numeros;
    colorFyC.value = coloresPrevios.resaltado;
    colorResalteNumeros.value = coloresPrevios.numerosResaltados;
    menu.classList.remove('ocultar');
}

function guardarMenuConfig (){
    guardarColoresEnLocalStorage();
    menu.classList.add('ocultar');
}

function cancelarMenuConfig() {

    estilos.setProperty('--colorCuadro', coloresPrevios.cuadros);
    estilos.setProperty('--colorCelda', coloresPrevios.celdas);
    estilos.setProperty('--colorNumeros', coloresPrevios.numeros);
    estilos.setProperty('--colorResalte', coloresPrevios.resaltado);
    estilos.setProperty('--colorNumerosResaltados', coloresPrevios.numerosResaltados);
    estilos.setProperty('--colorTablero', coloresPrevios.tablero);
    estilos.setProperty('--colorCeldaCompleta', coloresPrevios.celdasCompletadas);

    menu.classList.add('ocultar');
}

function guardarColoresEnLocalStorage() {
    const colores = {
        tablero: atajo.getPropertyValue('--colorTablero'),
        cuadros: atajo.getPropertyValue('--colorCuadro'),
        celdas: atajo.getPropertyValue('--colorCelda'),
        celdasCompletadas: atajo.getPropertyValue('--colorCeldaCompleta'),
        numeros: atajo.getPropertyValue('--colorNumeros'),
        resaltado: atajo.getPropertyValue('--colorResalte'),
        numerosResaltados: atajo.getPropertyValue('--colorNumerosResaltados')
    };
    localStorage.setItem('colores', JSON.stringify(colores));
}

function cargarColoresDesdeLocalStorage() {
    const colores = JSON.parse(localStorage.getItem('colores'));
    if (colores) {
        estilos.setProperty('--colorTablero', colores.tablero);
        estilos.setProperty('--colorCuadro', colores.cuadros);
        estilos.setProperty('--colorCelda', colores.celdas);
        estilos.setProperty('--colorCeldaCompletadas', colores.celdasCompletadas);
        estilos.setProperty('--colorNumeros', colores.numeros);
        estilos.setProperty('--colorResalte', colores.resaltado);
        estilos.setProperty('--colorNumerosResaltados', colores.numerosResaltados);

        // También actualiza los valores de los inputs de color
        colorTablero.value = colores.tablero;
        colorCuadros.value = colores.cuadros;
        colorCeldas.value = colores.celdas;
        colorNumeros.value = colores.numeros;
        colorFyC.value = colores.resaltado;
        colorResalteNumeros.value = colores.numerosResaltados;
    }
}

function reiniciarDeFabrica() {
    // Restablecer los colores a los valores predeterminados
    estilos.setProperty('--colorTablero', '#1c1c1c');
    estilos.setProperty('--colorCuadro', '#2e2e2e');
    estilos.setProperty('--colorCelda', '#3a3a3a'); //
    estilos.setProperty('--colorCeldaCompleta', '#4b3a5d'); 
    estilos.setProperty('--colorNumeros', '#e8e8e8'); 
    estilos.setProperty('--colorResalte', '#5c2a8d'); 
    estilos.setProperty('--colorNumerosResaltados', '#9b7f9f');
    
    guardarColoresEnLocalStorage();
}