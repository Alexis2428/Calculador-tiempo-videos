function crearVideo() {
    const indice = $formulario.querySelectorAll('.video').length + 1;

    const $tituloVideo = document.createElement('h5');
    $tituloVideo.textContent = `Video #${indice}`;

    const $video = document.createElement('div');
    $video.classList.add('row');
    $video.classList.add('mb-2');
    $video.classList.add('video');

    $video.appendChild(crearCuadroTiempo('horas'));
    $video.appendChild(crearCuadroTiempo('minutos'));
    $video.appendChild(crearCuadroTiempo('segundos'));

    $formulario.querySelector('#videos').appendChild($tituloVideo);
    $formulario.querySelector('#videos').appendChild($video);
}

function crearCuadroTiempo(tiempo) {
    const $columna = document.createElement('div');
    $columna.className = 'col';

    const $cuadrotiempo = document.createElement('div');
    $cuadrotiempo.classList.add('form-floating');
    $cuadrotiempo.classList.add(tiempo);

    const $cuadroTexto = document.createElement('input');
    $cuadroTexto.type = 'number';
    $cuadroTexto.className = 'form-control';
    $cuadroTexto.id = tiempo;
    $cuadroTexto.setAttribute('placeholder', tiempo);

    const $texto = document.createElement('label');
    $texto.setAttribute('for', tiempo);
    $texto.textContent = `Ingrese la cantidad de ${tiempo} del video`;

    $cuadrotiempo.appendChild($cuadroTexto);
    $cuadrotiempo.appendChild($texto);
    $columna.appendChild($cuadrotiempo);

    return $columna;
}

function borrarUltimoVideo() {
    const $videos = $formulario.querySelectorAll('.video');
    const ultimoIndice = $videos.length - 1;

    if (0 <= ultimoIndice) {
        if (0 === ultimoIndice) {
            ocultarBotonCalcular();
        }

        const $titulosVideos = $formulario.querySelectorAll('#videos h5');
        $videos[ultimoIndice].remove();
        $titulosVideos[ultimoIndice].remove();
    }
}

function mostrarBotonCalcular() {
    $formulario.calcular.classList.remove('oculto');
}

function ocultarBotonCalcular() {
    $formulario.calcular.classList.add('oculto');
}

function mostrarBotonReiniciar() {
    $formulario.reiniciar.classList.remove('oculto');
}

function ocultarBotonReiniciar() {
    $formulario.reiniciar.classList.add('oculto');
}

function mostrarRespuesta() {
    $formulario.querySelector('#respuesta').className = '';
}

function ocultarRespuesta() {
    $formulario.querySelector('#respuesta').className = 'oculto';
}
