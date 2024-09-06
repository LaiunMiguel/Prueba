class Tablero{
    constructor(dificultad){
        this.generador = new SudokuGenerator;
        this.tablero = [];  // Inicializar el tablero como un array
        this.generarCeldas();
        this.removerVisibilidadDe(dificultad * 15);
    }



    generarCeldas() {
        const tableroGenerado = this.generador.getTablero();  // Obtener el tablero generado
        let idCelda = 0; // Iniciar el identificador de celda

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const valor = tableroGenerado[i][j];
                this.tablero.push(new Celda(valor, idCelda)); // Crear una nueva Celda y añadirla a la lista
                idCelda++;
            }
        }
    }

    removerVisibilidadDe(cantidadDeCeldasSinNumero) {
        const celdaRemovidas = new Set();

        while (celdaRemovidas.size < cantidadDeCeldasSinNumero) {
            const numero = Math.floor(Math.random() * 81); // Genera un número entre 0 y 80
        
            if (!celdaRemovidas.has(numero)) {
                celdaRemovidas.add(numero);
                this.removerVisibilidad(numero);
            }
        }
    }

    removerVisibilidad(numero) {
        this.tablero[numero].noVisible();
    }

    hacerVisible(numeroDeLaCelda){
        this.tablero[numeroDeLaCelda].hacerVisible();
    }

    getCeldaNumero(numero){
        return this.tablero[numero];
    }

    estaBienParaElNumero(celdaNumero, numero){
        return this.tablero[celdaNumero].sosEsteNumero(numero)
    }

    imprimirTablero(){
         this.generador.imprimirTablero();
         console.log(this.tablero[5]);
    }

}     

class Celda {
    constructor(valor,idCelda) {
        this.valor = valor;      // El número que contiene la celda
        this.idCelda = idCelda;  // el id para comprobaciones
        this.esVisible = true;   // Si la celda es visible para el jugador, se crea visible pero lo cambio con removerVisibilidad 
    }

    //remueveLaVisibilidad
    noVisible(){
        this.esVisible = false;
    }

    isVisible(){
        return this.esVisible;
    }

    hacerVisible(){
        this.esVisible = true;
    }

    getValor(){
        return this.valor;
    }

    sosEsteNumero(numero){
        
        return this.valor == numero;
    }

}
