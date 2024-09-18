function pedirPista(event) {
    // Encuentra las celdas vacias
    const celdasVacias = document.querySelectorAll('.celdaIncompleta');
    if (celdasVacias.length === 0) return;
    
    // Aquí selecciona una celda vacia al azar
    const celda = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
    
    // reproduce una animacion
    celda.classList.add('pista');
    setTimeout(() => {
        celda.classList.remove('pista'); // Detiene la animación
    }, 1500); 
    hechaPorPista(celda);
    

}
