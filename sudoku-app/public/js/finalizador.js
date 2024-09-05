let casillasCompletas;
let terminoLaPartida;



function finalizar(){
    const mensajeFinal = document.getElementById('mensajeFinal');
    terminoLaPartida = document.getElementById("terminoLaPartida");
    detenerTemp();
    bloquearCasillas();
    if(casillasCompletas == 81){
        modoGanador();
    }
    else{
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
        //remuevo el hinge , oculto el div de finalizacion y hago aparece el de iniciar una nueva partida
        tablero.classList.remove('tada');
        tablero.classList.remove('hinge');
        terminoLaPartida.classList.add('ocultar');   
        this.iniciarTablero(3)
        
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
