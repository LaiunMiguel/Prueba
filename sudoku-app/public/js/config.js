const menu = document.getElementById("configMenu");
let coloresPrevios = {};
const colorMarco  =document.getElementById('colorMarco');
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
    colorMarco.addEventListener('input', (event) => {
        actualizarColorCSS('--colorMarco', event.target.value);
    });


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
        marco: atajo.getPropertyValue('--colorMarco'),
        tablero: atajo.getPropertyValue('--colorTablero'),
        cuadros: atajo.getPropertyValue('--colorCuadro'),
        celdas: atajo.getPropertyValue('--colorCelda'),
        celdasCompletadas: atajo.getPropertyValue('--colorCeldaCompleta'),
        numeros: atajo.getPropertyValue('--colorNumeros'),
        resaltado: atajo.getPropertyValue('--colorResalte'),
        numerosResaltados: atajo.getPropertyValue('--colorNumerosResaltados')
    };
    colorMarco.value   = coloresPrevios.marco;
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

    estilos.setProperty('--colorMarco', coloresPrevios.marco);
    estilos.setProperty('--colorTablero', coloresPrevios.tablero);
    estilos.setProperty('--colorCuadro', coloresPrevios.cuadros);
    estilos.setProperty('--colorCelda', coloresPrevios.celdas);
    estilos.setProperty('--colorNumeros', coloresPrevios.numeros);
    estilos.setProperty('--colorResalte', coloresPrevios.resaltado);
    estilos.setProperty('--colorNumerosResaltados', coloresPrevios.numerosResaltados);
    estilos.setProperty('--colorCeldaCompleta', coloresPrevios.celdasCompletadas);

    menu.classList.add('ocultar');
}

function guardarColoresEnLocalStorage() {
    const colores = {
        marco: atajo.getPropertyValue('--colorMarco'),
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
        estilos.setProperty('--colorMarco', colores.marco)
        estilos.setProperty('--colorTablero', colores.tablero);
        estilos.setProperty('--colorCuadro', colores.cuadros);
        estilos.setProperty('--colorCelda', colores.celdas);
        estilos.setProperty('--colorCeldaCompletadas', colores.celdasCompletadas);
        estilos.setProperty('--colorNumeros', colores.numeros);
        estilos.setProperty('--colorResalte', colores.resaltado);
        estilos.setProperty('--colorNumerosResaltados', colores.numerosResaltados);

        // También actualiza los valores de los inputs de color
        colorMarco.value   = coloresPrevios.marco;
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
    estilos.setProperty('--colorMarco', '#171c61')
    estilos.setProperty('--colorTablero', '#001f33');
    estilos.setProperty('--colorCuadro', '#003366'); 
    estilos.setProperty('--colorCelda', '#004080'); 
    estilos.setProperty('--colorCeldaCompleta', '#00264d'); 
    estilos.setProperty('--colorNumeros', '#ffffff');
    estilos.setProperty('--colorResalte', '#0066cc'); 
    estilos.setProperty('--colorNumerosResaltados', '#80d4ff'); 
    
    guardarColoresEnLocalStorage();
}
