function pedirPista(event) {
    // Encuentra una celda vacía con una posible solución y resáltala
    const celdasVacias = document.querySelectorAll('.celdaIncompleta');
    if (celdasVacias.length === 0) return;
    
    // Aquí seleccionas una celda vacía al azar (o usa otro criterio)
    const celda = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
    
    // Puedes cambiar el estilo de la celda para resaltar la pista
    celda.classList.add('pista');
    setTimeout(() => {
        celda.classList.remove('pista'); // Detiene la animación
    }, 1500); 
    hechaPorPista(celda);
    

}
