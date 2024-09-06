let teclasVeces;

function iniciarConteo(){
    teclasVeces = [];

    for (let i = 0; i < 9; i++) {  // Si los números en las celdas van de 1 a 9
        teclasVeces[i] = 0;
    }

    todasLasCeldas =  document.querySelectorAll('.celda')
   
    for (let index = 0; index < todasLasCeldas.length; index++) {
        const element = todasLasCeldas[index];
        let numero = parseInt(element.textContent); // Convierte el textContent en número
        
        // Solo si el número es válido
        if (!isNaN(numero) && numero >= 1 && numero <= 9) {
            teclasVeces[numero - 1]++;  // Incrementa el contador correspondiente a ese número
        }
    }
}

function aumentarContador(numero){
    teclasVeces[numero - 1]++;
    removerTeclas();
}