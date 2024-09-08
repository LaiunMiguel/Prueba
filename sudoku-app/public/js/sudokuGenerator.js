class SudokuGenerator {
    constructor() {
        this.cantCasillas = 9;
        this.tablero = this.crearMatrizVacia(this.cantCasillas);
        this.tableroReordenado = this.crearMatrizVacia(this.cantCasillas);
        


        //creo el tablero fila por fila ya que es mas eficiente de esta manera 
        if (!this.completarTablero(0, 0)) {
            console.log("No se pudo generar un tablero válido.");
        }
        this.reordenarTablero();
    }

    //reordeno para que cada lista represente un cuadrado
    reordenarTablero(){  
            // Recorremos cada fila y columna 
            for (let fila = 0; fila < 9; fila++) {
                for (let columna = 0; columna < 9; columna++) {
                    // Determinamos el índice del cuadro (0-8)
                    let cuadro = Math.floor(fila / 3) * 3 + Math.floor(columna / 3);
                    // Determinamos la posición dentro del cuadro
                    let posDentroDelCuadro = (fila % 3) * 3 + (columna % 3);
                    // Asignamos el valor al nuevo tablero por cuadros
                    this.tableroReordenado[cuadro][posDentroDelCuadro] = this.tablero[fila][columna];
                }
            }
     }
        

    
    crearMatrizVacia(tamaño) {
        // Crea una matriz
        return Array.from({ length: tamaño }, () => Array(tamaño).fill(0));
    }

    completarTablero(fila, columna) {

        //caso base 
        if (fila === this.cantCasillas) {
            return true;
        }
        
        //caso llegado al final de la columna 
        if (columna === this.cantCasillas) {
            return this.completarTablero(fila + 1, 0);
        }

        //caso llegado al final de la fila 
        if (this.tablero[fila][columna] !== 0) {
            return this.completarTablero(fila, columna + 1);
        }


        //genero numeros para probar
        let numeros = this.generarNumerosAleatorios();
        for (let num of numeros) {
            if (this.esValido(fila, columna, num)) {
                this.tablero[fila][columna] = num;
                if (this.completarTablero(fila, columna + 1)) {
                    return true;
                }
                this.tablero[fila][columna] = 0; // Deshacer si no se pudo resolver
            }
        }

        return false;
    }

    

    //Logica para comprar si lo puedo poner en la fila o el cuadro 
    esValido(fila, columna, numero) {
        return this.puedePonerElNumeroLineas(fila, columna, numero) &&
               this.esValidoCuadro(fila, columna, numero);
    }

    esValidoCuadro(fila, columna, numero) {
        let startRow = Math.floor(fila / 3) * 3;
        let startCol = Math.floor(columna / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (this.tablero[i][j] === numero) {
                    return false;
                }
            }
        }
        return true;
    }

    puedePonerElNumeroLineas(fila, columna, numeroAPoner) {
        for (let i = 0; i < 9; i++) {
            if (this.tablero[fila][i] === numeroAPoner || this.tablero[i][columna] === numeroAPoner) {
                return false;
            }
        }
        return true;
    }


    //Algoritmo Fisher-Yates Shuffle:
    generarNumerosAleatorios() {
        let numeros = Array.from({ length: 9 }, (_, i) => i + 1);
        for (let i = numeros.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
        }
        return numeros;
    }


    //Devuelve el tablero en formato cada cuadro como un lista 
    getTablero() {
        return this.tableroReordenado;
    }

}
