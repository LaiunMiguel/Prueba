let teclasVeces;


//Script para remover las teclas del teclado virtual 

function iniciarConteo(){
    teclasVeces = [];

    for (let i = 0; i < 9; i++) {  
        teclasVeces[i] = 0;
    }

    todasLasCeldas =  document.querySelectorAll('.celda')
   

    for (let i = 0; i < todasLasCeldas.length; i++) {
        const element = todasLasCeldas[i];
        let numero = parseInt(element.textContent); // Convierte el textContent en número
        
        //Texteo que es un numero , siempre va ser de un solo dijito por la logica 
        if (!isNaN(numero)) {
            aumentarContador(numero); // Incrementa el contador correspondiente a ese número
        }
    }
}


//cada vez que completa una casilla se llama esta funcion
function aumentarContador(numero){
    let numeroPrueba = teclasVeces[numero - 1]++;
    if(numeroPrueba == 8){
        removerTecla(numero);
    }
    
}