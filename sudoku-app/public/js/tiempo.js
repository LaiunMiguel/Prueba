let temporizador;

function iniciarTemporizador() {
    

    let minutos = 0;
    let segundos = 0;

    const spanTiempo = document.getElementById('tiempo');
    spanTiempo.textContent = `0:00`;
    temporizador = setInterval(() => {
        segundos++;

        if (segundos === 60) {
            minutos++;
            segundos = 0;
        }

        // Formatear los segundos para que siempre se muestren con dos dígitos
        const segundosFormateados = segundos < 10 ? '0' + segundos : segundos;

        spanTiempo.textContent = `${minutos}:${segundosFormateados}`;
    }, 1000); // 1000 ms = 1 segundo

}

function detenerTemp() {
    clearInterval(temporizador);
}