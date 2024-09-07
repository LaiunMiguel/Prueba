
    function perderVida(){
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

    function vidasAgotadas() {
        finalizar();
    }