let vidas = 3;

    function restaurarVidas(){
        vidas = 3;
        actualizarVidas()
    }

    function perderVida(){
        console.log(vidas)
        vidas--;
        corazon = document.getElementById('corazon' + vidas);
        corazon.classList.add('romper');
        juegoTablero = document.getElementById('juegoTablero');
        juegoTablero.classList.add('temblar');
        juegoTablero.classList.remove('temblar');

        if(vidas === 0){
            vidasAgotadas();
        }
    }

    function actualizarVidas() {

        const corazonesElement = document.getElementById('vidas');
        corazonesElement.innerHTML = '<span>Vidas: </span>';
        for (let i = 0; i < vidas; i++) {
            corazon = document.createElement('div')
            corazon.className = 'corazon';
            corazon.id = 'corazon'+ i;
            corazonesElement.appendChild(corazon);

        }
    }

    

    function bloquearCasillas() {
        const celdas = document.querySelectorAll('.celda'); // Selecciona todas las celdas
        celdas.forEach(celda => {
            celda.removeEventListener('click', ingresarValor); // Remueve el eventListener de cada celda
        });
    }

    function vidasAgotadas() {
        modoPerder()
    }