
let teclaActual;

function iniciarTeclado(){
    teclaActual = 0;
    let juego   = document.getElementById('juegoTablero');
        let tablero = document.getElementById('tecladoVirtual');
        tablero.innerHTML = '';
        for (let i = 0; i < 3 ; i++) {
            contenedorNumeros = document.createElement('div');
            contenedorNumeros.className ='contenedorNumeros';
            crearTeclas(contenedorNumeros);
            tablero.append(contenedorNumeros);
        }
    }

    //Crea las casillas y a cada una le agrega un eventListener que cuando se cliqueak
function crearTeclas(contenedorNumeros){
        for (let j = 0; j < 3 ; j++) {
            teclaActual++;
            teclanumero = document.createElement('button');
            teclanumero.className = 'tecla-numero ';
            teclanumero.id = 'teclanumero' + j;
            teclanumero.dataset.numero = teclaActual; 
            configurarTecla(teclanumero);
            contenedorNumeros.append(teclanumero);
            
        }
    }

function configurarTecla(tecla){
    tecla.textContent = tecla.dataset.numero;
    tecla.textContent = tecla.dataset.numero;
    tecla.addEventListener('click', () => {
            if (celdaActual && vidas > 0) {
                estaBienLaTecla(tecla.dataset.numero);
            }
        });
    }
