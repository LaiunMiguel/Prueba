function guardarPartida() {
    const estado = tableroComportamiento.tablero.map(celda => ({
        valor: celda.valor,
        idCelda: celda.idCelda,
        esVisible: celda.esVisible
    }));
    localStorage.setItem('estadoPartida', JSON.stringify(estado));
    localStorage.setItem('distanciaDeVictoria', JSON.stringify(casillasCompletas));
}


function cargarPartida() {
    const estadoGuardado = JSON.parse(localStorage.getItem('estadoPartida'));
    if (estadoGuardado) {
        const nuevoTablero = new Tablero(); // Crear un nuevo tablero
        nuevoTablero.tablero = estadoGuardado.map(celdaData => {
            const nuevaCelda = new Celda(celdaData.valor, celdaData.idCelda);
            if (!celdaData.esVisible) {
                nuevaCelda.noVisible();
            }
            return nuevaCelda;
        });
        return nuevoTablero; // Devolver el tablero con el estado restaurado
    }
    return null; // No hay estado guardado
}

function cargarCasillasCompletas(){
    const estadoGuardado = JSON.parse(localStorage.getItem('distanciaDeVictoria'));
    console.log(estadoGuardado)
    if (estadoGuardado) {
        return estadoGuardado; // Devolver el tablero con el estado restaurado
    }
    return null; // No hay estado guardado
}

