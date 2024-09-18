// para crear del 0 al 9
let teclaActual;

function iniciarTeclado(){
    teclaActual = 0;
    let tablero = document.getElementById('tecladoVirtual');
    tablero.innerHTML = '';
        for (let i = 0; i < 3 ; i++) {
            contenedorNumeros = document.createElement('div');
            contenedorNumeros.className ='contenedorNumeros';
            crearTeclas(contenedorNumeros);
            tablero.append(contenedorNumeros);
        }
    }

//Crea las teclas del teclado y a cada una le agrega un eventListener que cuando se cliquea
function crearTeclas(contenedorNumeros){
        for (let j = 0; j < 3 ; j++) {
            teclaActual++;
            teclanumero = document.createElement('button');
            teclanumero.className = 'tecla-numero ';
            teclanumero.id = 'teclanumero' + teclaActual;
            teclanumero.dataset.numero = teclaActual; 
            configurarTecla(teclanumero);
            contenedorNumeros.append(teclanumero);
            
        }
    }

function configurarTecla(tecla){
    tecla.textContent = tecla.dataset.numero;
    tecla.addEventListener('click', () => {
            // para que no se pueda seguir apretando cuando es nill o termino la partida
            if (celdaActual && vidas > 0) {
                modoTeclado(tecla.dataset.numero);
            }
        });
    }

//Oculta la tecla
function removerTecla(numero){
    const tecla = document.getElementById("teclanumero" + numero);
    tecla.classList.add('invisibilizar');
}
