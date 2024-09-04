class SudokuGenerator {
    constructor() {
        this.cantCasillas = 9;
        this.tablero = this.crearMatrizVacia(this.cantCasillas);
        
        if (!this.completarTablero(0, 0)) {
            console.log("No se pudo generar un tablero válido.");
        }
    }
    
    crearMatrizVacia(tamaño) {
        // Crea una matriz 2D de tamaño `tamaño x tamaño` llena de ceros
        return Array.from({ length: tamaño }, () => Array(tamaño).fill(0));
    }
/*
    completarTablero(fila, columna) {
        if (fila === this.cantCasillas) {
            return true;
        }

        if (columna === this.cantCasillas) {
            return this.completarTablero(fila + 1, 0);
        }

        if (this.tablero[fila][columna] !== 0) {
            return this.completarTablero(fila, columna + 1);
        }

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
*/
    completarTablero(cuadro, celdaEnCuadro) {
        if (cuadro === 9) {
            return true; // Hemos llenado todos los cuadros
        }

        if (celdaEnCuadro === 9) {
            return this.completarTablero(cuadro + 1, 0); // Pasar al siguiente cuadro
        }

        // Convertir la celda del cuadro en coordenadas de tablero
        const fila = Math.floor(cuadro / 3) * 3 + Math.floor(celdaEnCuadro / 3);
        const columna = (cuadro % 3) * 3 + (celdaEnCuadro % 3);

        if (this.tablero[fila][columna] !== 0) {
            return this.completarTablero(cuadro, celdaEnCuadro + 1); // Pasar a la siguiente celda del cuadro
        }

        let numeros = this.generarNumerosAleatorios();
        for (let num of numeros) {
            if (this.esValido(fila, columna, num)) {
                this.tablero[fila][columna] = num;
                if (this.completarTablero(cuadro, celdaEnCuadro + 1)) {
                    return true;
                }
                this.tablero[fila][columna] = 0; // Deshacer si no se pudo resolver
            }
        }

        return false;
    }


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

    generarNumerosAleatorios() {
        let numeros = Array.from({ length: 9 }, (_, i) => i + 1);
        for (let i = numeros.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
        }
        return numeros;
    }

    getTablero() {
        return this.tablero;
    }

    imprimirTablero() {
        this.tablero.forEach(fila => console.log(fila.join(" ")));
    }
}
