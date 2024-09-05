//Variable para  hacer comprobaciones 
let celdaActual;

function crearTableroUI(){
        let juego   = document.getElementById('juegoTablero')
        juego.style.display = 'block';
        let tablero = document.getElementById('tablero');
        tablero.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            cuadro = document.createElement('div');
            cuadro.className ='cuadro';
            crearCasillas(cuadro);
            tablero.append(cuadro);
        }
    }
    //Crea las casillas y a cada una le agrega un eventListener que cuando se cliqueak
    function crearCasillas(cuadro){
        for (let j = 0; j < 9 ; j++) {
            celda = document.createElement('div');
            celda.className = 'celda';
            celda.id = 'celda' + numeroCasilla;
            celda.dataset.numero = numeroCasilla; // Almacena el número en un atributo de datos
            numeroCasilla++;
            //aumento el numero de casilla para la siguiente
            configurarCelda(celda);
            cuadro.append(celda);
            
        }
    }

    function configurarCelda(celda) {

        let celdaDelTableroBack = tableroComportamiento.getCeldaNumero(celda.dataset.numero);   
        let boolean = celdaDelTableroBack.isVisible();

        if(boolean){
            celda.textContent = celdaDelTableroBack.getValor();
        }
        else {
            celda.addEventListener("click", ingresarValor);
        }
    }


    function ingresarValor() {
        if (celdaActual) {
            document.removeEventListener('keydown', esperarTecla);
        }

        celdaActual = this;

        // Escuchar la próxima tecla que el usuario presione
        document.addEventListener('keydown', esperarTecla);
    }

    function esperarTecla(event) {
        estaBienLaTecla(event.key);
        
    }

    function estaBienLaTecla(numero) {

        let celdaNumero = celdaActual.dataset.numero

        let comprobacion = tableroComportamiento.estaBienParaElNumero(celdaNumero,numero);

        if (comprobacion) {
            //caso acierto
            celdaActual.textContent = numero;
            celdaActual.style.color = 'rgb(255, 255, 255)';
            celdaActual.removeEventListener('click',ingresarValor);
            celdaActual.classList.add('temblar')
            celdaActual = null;
            aumentarContadorDeVictoria();
            document.removeEventListener('keydown', esperarTecla);

        } else {
            //caso fallo
            celdaActual.classList.add('temblar')
            celdaActual.textContent = numero;
            celdaActual.style.color = 'rgb(255, 0, 0)';
            celdaActual.addEventListener('animationend', () => {
                celdaActual.classList.remove('temblar');   
            }, { once: true });
            

            perderVida();


        }
    }
