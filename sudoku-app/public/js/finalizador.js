let terminoLaPartida;
let mensajeFinal;

function finalizar(){

    terminoLaPartida = document.getElementById("terminoLaPartida");
    mensajeFinal = document.getElementById('mensajeFinal');
    detenerTemp();
    bloquearCasillas();
    deshabilitarGuardar();
    if(casillasCompletas == 81){
        modoGanador();
    }
    else{
        casillasCompletas = 0;
        modoPerder() ;
    }
}


function modoGanador() {
    
    mensajeFinal.textContent = "Ganasteeeeeeeee :)"
    tablero.classList.add('tada');
    terminoLaPartida.classList.remove('ocultar'); 
    

}

function modoPerder() {
        mensajeFinal.textContent = "Perdisteeeee :("
        tablero.classList.add('hinge');
        terminoLaPartida.classList.remove('ocultar');   

        // Eliminar para que el  teclado ya no tenga efecto 
        document.removeEventListener('keydown', esperarTecla);

    }
    

    function nuevoJuego() {
        //remuevo el hinge , oculto el div de finalizacion y hago aparecer el de iniciar una nueva partida
        tablero.classList.remove('tada');
        tablero.classList.remove('hinge');
        juego.style.display = 'none';
        terminoLaPartida.classList.add('ocultar');   
        menuFinDelJuegoNuevaPartida.classList.remove('ocultar');
        
    }
    
    function verTablero() {
        tablero.classList.remove('hinge');
        tablero.classList.remove('tada');
        terminoLaPartida.classList.add('ocultar');
        
    }


function aumentarContadorDeVictoria(){
    casillasCompletas++
    if(casillasCompletas === 81){
        finalizar();
    }
}

    

function bloquearCasillas() {
    const celdas = document.querySelectorAll('.celda'); // Selecciona todas las celdas
    celdas.forEach(celda => {
        celda.removeEventListener('click', editable); // Remueve el eventListener de cada celda
    });
}

function deshabilitarGuardar(){
    const boton = document.getElementById("botonGuardar");
        boton.disabled = true; // Deshabilitar el botón

}

function habilitarGuardado(){
    const boton = document.getElementById("botonGuardar");
        boton.disabled = false;
}