function guardarPartida() {
    const estado = tableroComportamiento.tablero.map(celda => ({
        valor: celda.valor,
        idCelda: celda.idCelda,
        esVisible: celda.esVisible
    }));

    const tiempo = {
        
        minutos: minutos,
        segundos: segundos,

    };

    console.log(minutos);
    localStorage.setItem('estadoPartida', JSON.stringify(estado));
    localStorage.setItem('distanciaDeVictoria', JSON.stringify(casillasCompletas));
    localStorage.setItem('tiempo', JSON.stringify(tiempo));
    localStorage.setItem('vidas', JSON.stringify(vidas));
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
    if (estadoGuardado) {
        return estadoGuardado; // Devolver el tablero con el estado restaurado
    }
    return null; // No hay estado guardado
}

function cargarTemporizador(){
    const estadoGuardado = JSON.parse(localStorage.getItem('tiempo'));
    if (estadoGuardado) {
        minutos = estadoGuardado.minutos;
        segundos = estadoGuardado.segundos;
    }

}

function cargarVidas(){
    const estadoGuardado = JSON.parse(localStorage.getItem('vidas'));
    if (estadoGuardado) {
        vidas = estadoGuardado;
    }
    else {vidas = 3}
}




