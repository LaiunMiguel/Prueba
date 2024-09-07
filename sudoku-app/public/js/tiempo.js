let temporizador;


function iniciarTemporizador() {
    
    let segundosFormateados = segundos < 10 ? '0' + segundos : segundos;

    const spanTiempo = document.getElementById('tiempo');
    spanTiempo.textContent = `${minutos}:${segundosFormateados}`;
    temporizador = setInterval(() => {
        segundos++;

        if (segundos === 60) {
            minutos++;
            segundos = 0;
        }

        // Formatear los segundos para que siempre se muestren con dos dígitos
        
        segundosFormateados = segundos < 10 ? '0' + segundos : segundos;
        spanTiempo.textContent = `${minutos}:${segundosFormateados}`;
    }, 1000); // 1000 ms = 1 segundo

}



function detenerTemp() {
    clearInterval(temporizador);
}