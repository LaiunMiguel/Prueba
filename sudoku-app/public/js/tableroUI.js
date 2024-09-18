//Variable para  hacer comprobaciones 
let celdaActual;
let numeroCasilla;
const juego   = document.getElementById('juegoTablero')
const tablero = document.getElementById('tablero');



//Creacion de Tablero
function crearTableroUI(){

        numeroCasilla = 0;
        juego.classList.remove('invisibilizar')
        tablero.innerHTML = '';
        for (let i = 0; i < 9; i++) {
                cuadro = document.createElement('div');
                cuadro.className ='cuadro'; 
                cuadro.dataset.posTablero = i;       // Almacena el la pos en su tablero para resaltar la fila y columna
                crearCasillas(cuadro);
                tablero.append(cuadro);            
        }
    }

    //Crea las casillas 
    function crearCasillas(cuadro){
        for (let j = 0; j < 9 ; j++) {
            celda = document.createElement('div');
            celda.className = 'celda';
            celda.id = 'celda' + numeroCasilla;
            celda.dataset.posCuadro = j;        // Almacena el la pos en su cuadro para resaltar la fila y columna
            celda.dataset.numeroValido = tableroComportamiento.getCeldaNumero(numeroCasilla).getValor(); //Guardo el valor del numero que es la casilla privadamente 
            configurarCelda(celda);     
            cuadro.append(celda);
            
        }
    }

    function crearNotas(){
        for (let j = 0; j < 9 ; j++) {
            nota = document.createElement('div');
            nota.className = 'nota';
            nota.textContent = j+1;
            nota.dataset.posCelda = j;    // Almacena el la pos en su cuadro para resaltar la fila y columna 
            celdaActual.classList.add("celdaConNotas");
            celdaActual.append(nota);         
        }
        
    }


    //Configura la tecla , si esta completa o es para completar
    function configurarCelda(celda) {
    
        //Ve si la celda esta completa o hay que completar
        let esVisibleLaCelda = tableroComportamiento.getCeldaNumero(numeroCasilla).isVisible();   

        //todas las celdas son seleccionables
        celda.addEventListener("click", seleccionable);

        if(esVisibleLaCelda){
            celda.textContent = celda.dataset.numeroValido;
            celda.classList.add("celdaCompleta");
            celda.addEventListener("click", noEditable)
        }
        else {
            celda.classList.add("celdaIncompleta")
            celda.addEventListener("click", editable);
        }

        numeroCasilla++;
    }

    //Evente listener por si usas el teclado fisico 
    function editable() {

        //guarda la celda temporalmente
        celdaActual = this;   
        document.addEventListener('keydown', esperarTecla);
    }

    function esperarTecla(event) {
        //me fijo que la tecla este entre el 1-9 
        if(/^[1-9]$/.test(event.key)){
            modoTeclado(event.key);
        } 
    }

    function noEditable(){

        //borro la seleccion de la anterior celda para evitar problemas
        celdaActual = null;
        document.removeEventListener('keydown', esperarTecla);
    }


    
    function estaBienLaTecla(numero) {
        
        celdaActual.classList.remove('celdaConNotas');

        if (celdaActual.dataset.numeroValido == numero) {
            //caso acierto
            
            celdaActual.textContent = numero;
            //Saco indicadores de celdaIncompleta
            celdaActual.classList.remove('celdaIncompleta');
            celdaActual.removeEventListener('click',editable);

            //Remuevo el eventListener activo
            document.removeEventListener('keydown', esperarTecla);

            //borro las notas del mismo numero 
            //funcion lambda para usarla de wrapper ya que solo recibe celda de doEnFilasYColumas y necesito el numero
            const wrapperNota = celda => borrarNota(celda, numero);
            doEnFilasYColumnas(celdaActual,wrapperNota)
            
            //animacion
            celdaActual.classList.add('temblar')
            celdaActual.classList.add("celdaCompleta");
            
            aumentarContadorDeVictoria();
            aumentarContador(numero)

          //la remuevo como celda actual para que no moleste al teclado virtual
            celdaActual = null;
        } else {

            //caso fallo

            celdaActual.addEventListener("click",borrarNumero)
            celdaActual.textContent = numero;
            celdaActual.classList.add('temblar')

            //remuevo la animacion para que se aplique de vuelta
            celdaActual.addEventListener('animationend', () => {
                celdaActual.classList.remove('temblar');   
            }, { once: true });  

            perderVida();
        }
    }


    // funcion para las notas que puede poner el usuario en la casilla
    function notaToggle(numero) {
        let nota = celdaActual.children[numero-1];

        if(!nota){
            celdaActual.textContent = "";
            crearNotas();
            nota = celdaActual.children[numero-1];
            
        }
        nota.classList.toggle('visible'); 
    }


    //borra la nota de un numero que ya se puso en esta fila o columna 
    function borrarNota(celda,numero){

        let nota = celda.children[numero-1];

        if(nota){
            nota.classList.remove('visible'); 
        }
    }



    //poder borrar el error si el usuario quiere
    function borrarNumero(){
        this.textContent = '';
        this.removeEventListener('click', borrarNumero);
    }


    function hechaPorPista(celda){
        //marco la casilla como la actual
        celdaActual = celda;
        //un poco de brute force al hacerlo asi
        estaBienLaTecla(celda.dataset.numeroValido);
    }


    //funcion en el que a cada celda de la misma columna y fila le aplica la funcion pasada por parametro
    function doEnFilasYColumnas(celda,f){
        const celdaSeleccionada = celda;

        //me traigo el cuadro en el que esta la casilla
        const padre = celdaSeleccionada.parentElement;

        const posPadre = parseInt(padre.dataset.posTablero);  // Posición del cuadro (0-8)
        const posHijo = parseInt(celdaSeleccionada.dataset.posCuadro);  // Posición dentro del cuadro (0-8)
    
        //divido las filas y columnas en 0,1,2  
        const filaEnTablero = Math.floor(posPadre / 3) * 3; 

        const columnaTablero = posPadre % 3;             
   
        const listaDeCuadros = document.querySelectorAll('.cuadro');

        doEnFilas(filaEnTablero, listaDeCuadros, posHijo, f);
        doEnColumnas(columnaTablero, listaDeCuadros, posHijo, f);

    }
    
    //sub funcion para las filas
    function doEnFilas(filaEnTablero, listaDeCuadros, posHijo,f) {
        for (let i = filaEnTablero; i < filaEnTablero + 3; i++) {
            cuadro = listaDeCuadros[i];
    
            for (let j = 0; j < cuadro.children.length; j++) {
                let hijo = cuadro.children[j];
                if (estanEnLaMismaFila(hijo.dataset.posCuadro, posHijo)) {
                   f(hijo);
                }
            }
        }
    }
    
    // Lo mismo para las columnas
    function doEnColumnas(columnaTablero, listaDeCuadros, posHijo,f) {
        for (let i = columnaTablero; i < 9; i += 3) {
            cuadro = listaDeCuadros[i];
    
            for (let j = 0; j < cuadro.children.length; j++) {
                let hijo = cuadro.children[j];
                if (estanEnLaMismaColumna(hijo.dataset.posCuadro, posHijo)) {
                    f(hijo);
                }
            }
        }
    }


    function seleccionable(event) {
        const celdaSeleccionada = event.target;

        const listaDeCuadros = document.querySelectorAll('.cuadro');


        // Borrar la selecion anterior
        listaDeCuadros.forEach(cuadro => {
            cuadro.querySelectorAll('.celda-resaltada, .celda-mismoNumero').forEach(celda => {
                celda.classList.remove('celda-resaltada');
                celda.classList.remove('celda-mismoNumero');
            });
        });

        doEnFilasYColumnas(celdaSeleccionada,resaltarColor);
        

        //codicion asi no resalta numeros de errores al borrarlos
        if(celdaSeleccionada.classList.contains("celdaCompleta")){
            resaltarMismosNumeros(listaDeCuadros,celdaSeleccionada.textContent);
        }       
    }


    function resaltarColor(celda){
        celda.classList.add('celda-resaltada')
    }

    function resaltarMismosNumeros(listaDeCuadros,numeroHijo){
        for (let cuadro of listaDeCuadros) {
            for (let j = 0; j < cuadro.children.length; j++) {
                let hijo = cuadro.children[j];
                if (hijo.textContent == numeroHijo && hijo.classList.contains('celdaCompleta')) {
                    hijo.classList.add('celda-mismoNumero');
                }
            }
        }
    }


// Funciones auxiliares para saber si estan en la misma Col o Fila
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
    


    