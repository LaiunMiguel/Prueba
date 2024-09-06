document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.configMenu');

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    function startDrag(e) {
        isDragging = true;
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;
        initialLeft = parseInt(window.getComputedStyle(menu).left, 10);
        initialTop = parseInt(window.getComputedStyle(menu).top, 10);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onMouseMove, { passive: true });
        document.addEventListener('touchend', onMouseUp);
    }

    function onMouseMove(e) {
        if (!isDragging) return;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;
        menu.style.left = `${initialLeft + dx}px`;
        menu.style.top = `${initialTop + dy}px`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', onMouseUp);
    }

    menu.addEventListener('mousedown', startDrag);
    menu.addEventListener('touchstart', startDrag, { passive: true });
});
