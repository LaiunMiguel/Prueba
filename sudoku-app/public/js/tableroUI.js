//Variable para  hacer comprobaciones 
let celdaActual;
let filasOcupadas    = 0;
let columnasOcupadas = 0;

function crearTableroUI(){

        
        let juego   = document.getElementById('juegoTablero')
        juego.style.display = 'block';
        let tablero = document.getElementById('tablero');
        tablero.innerHTML = '';
        for (let i = 0; i < 9; i++) {
                cuadro = document.createElement('div');
                cuadro.className ='cuadro'; 
                cuadro.dataset.posTablero = i;       // Almacena el la pos en su tablero para resaltar la fila y columna
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
            celda.dataset.posCuadro = j;        // Almacena el la pos en su cuadro para resaltar la fila y columna
            celda.dataset.numero = numeroCasilla; // Almacena el número para comprobaciones
            configurarCelda(celda);          
            cuadro.append(celda);
            
        }
    }

    function configurarCelda(celda) {
    
        let celdaDelTableroBack = tableroComportamiento.getCeldaNumero(numeroCasilla);   
        let boolean = celdaDelTableroBack.isVisible();

        celda.addEventListener("click", seleccionable);
        if(boolean){
            celda.textContent = celdaDelTableroBack.getValor();
        }
        else {
            celda.addEventListener("click", editable);
        }

        numeroCasilla++;
    }


    function editable() {
        if (celdaActual) {
            document.removeEventListener('keydown', esperarTecla);
        }

        celdaActual = this;
        document.addEventListener('keydown', esperarTecla);
    }

    function esperarTecla(event) {
        estaBienLaTecla(event.key);
        
    }

    function seleccionable(event) {
        const celdaSeleccionada = event.target;
        const padre = celdaSeleccionada.parentElement;

        const posPadre = parseInt(padre.dataset.posTablero);  // Posición del cuadro (0-8)
        const posHijo = parseInt(celdaSeleccionada.dataset.posCuadro);  // Posición dentro del cuadro (0-8)
    
        const filaEnTablero = Math.floor(posPadre / 3) * 3; 
        const columnaTablero = posPadre % 3;             
   
        const listaDeCuadros = document.querySelectorAll('.cuadro');


        // Borrar la selecion anterior
        listaDeCuadros.forEach(cuadro => {
            cuadro.querySelectorAll('.celda-resaltada, .celda-mismoNumero').forEach(celda => {
                celda.classList.remove('celda-resaltada');
                celda.classList.remove('celda-mismoNumero');
            });
        });
        remarcarFilas(filaEnTablero, listaDeCuadros, posHijo);
        remarcarColumnas(columnaTablero, listaDeCuadros, posHijo);
        remarcarMismoNumero(listaDeCuadros,celdaSeleccionada.textContent);
    }


function remarcarFilas(filaEnTablero, listaDeCuadros, posHijo) {
    for (let i = filaEnTablero; i < filaEnTablero + 3; i++) {
        cuadro = listaDeCuadros[i];

        for (let j = 0; j < cuadro.children.length; j++) {
            let hijo = cuadro.children[j];
            if (estanEnLaMismaFila(hijo.dataset.posCuadro, posHijo)) {
                hijo.classList.add('celda-resaltada');
            }
        }
    }
}

function remarcarColumnas(columnaTablero, listaDeCuadros, posHijo) {
    for (let i = columnaTablero; i < 9; i += 3) {
        cuadro = listaDeCuadros[i];

        for (let j = 0; j < cuadro.children.length; j++) {
            let hijo = cuadro.children[j];
            if (estanEnLaMismaColumna(hijo.dataset.posCuadro, posHijo)) {
                hijo.classList.add('celda-resaltada');
            }
        }
    }
}

function remarcarMismoNumero(listaDeCuadros,numeroHijo){
    for (let cuadro of listaDeCuadros) {
        for (let j = 0; j < cuadro.children.length; j++) {
            let hijo = cuadro.children[j];
            if (hijo.textContent == numeroHijo && hijo.textContent != "") {
                hijo.classList.add('celda-mismoNumero');
            }
        }
    }
}

    function estanEnLaMismaColumna(pos1,pos2){
        col1 = pos1 % 3 
        col2 = pos2 % 3 
        return col1 == col2;
    }
    


    function estanEnLaMismaFila(pos1,pos2){
        fila1 = Math.floor(pos1 / 3); 
        fila2 = Math.floor(pos2 / 3); 
        return fila1 == fila2;
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

    function pista(event) {
        
    }
    
