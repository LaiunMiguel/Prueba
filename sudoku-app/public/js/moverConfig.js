//Script hecho para poder mover el config y el tablero 

document.addEventListener('DOMContentLoaded', () => {
    function initDraggable(element) {

        //flag de movimiente 
        let seEstaMoviendo = false;

        //cordenadas iniciales 
        let xInicial, yInicial, initialLeft, initialTop;


        //se activa al holdDelMouse
        function startDrag(evento) {
            seEstaMoviendo = true;

            //cordenadas del touch o mouse 
            xInicial = evento.clientX || evento.touches[0].clientX;
            yInicial = evento.clientY || evento.touches[0].clientY;
            initialLeft = parseInt(window.getComputedStyle(element).left, 10);
            initialTop = parseInt(window.getComputedStyle(element).top, 10);

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchmove', onMouseMove, { passive: true });
            document.addEventListener('touchend', onMouseUp);
        }

        function onMouseMove(evento) {
            //setea la posicion del config a donde este el mouse
            if (!seEstaMoviendo) return;
            const clientX = evento.clientX || evento.touches[0].clientX;
            const clientY = evento.clientY || evento.touches[0].clientY;

            //distancia recorrida
            const dx = clientX - xInicial;
            const dy = clientY - yInicial;
            element.style.left = `${initialLeft + dx}px`;
            element.style.top = `${initialTop + dy}px`;
        }

        function onMouseUp() {
            seEstaMoviendo = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', onMouseUp);
        }

        //eventListeners
        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', startDrag, { passive: true });
    }

    // Inicializa el elemento `.configMenu` como movible
    const configMenu = document.querySelector('.configMenu');
    initDraggable(configMenu);
    initDraggable(juego);
});
