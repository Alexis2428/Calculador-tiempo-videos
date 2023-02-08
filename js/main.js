const $formulario = document.formulario;

const $agregar = $formulario.agregar;
$agregar.onclick = agregar;

const $borrar = $formulario.borrar;
$borrar.onclick = borrarUltimoVideo;

const $calcular = $formulario.calcular;
$calcular.onclick = obtenerRespuesta;

const $reiniciar = $formulario.reiniciar;
$reiniciar.onclick = reiniciar;

function agregar() {
    crearVideo();
    mostrarBotonCalcular();
}

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
function obtenerRespuesta() {
    $formulario.querySelector('#tiempo-total').textContent = obtenerTiempoTotal();
    mostrarRespuesta();
    mostrarBotonReiniciar();
}

function obtenerTiempoTotal() {
    let totalSegundos = calcularTiempo('segundos');
    let totalMinutos = calcularTiempo('minutos');
    let totalHoras = calcularTiempo('horas');
    const LIMITE_TIEMPO = 60;

    if (LIMITE_TIEMPO <= totalSegundos) {
        const cantidadVecesPasaLimite = obtenerCantidadVecesPasaLimite(totalSegundos, LIMITE_TIEMPO);
        totalSegundos -= (LIMITE_TIEMPO * cantidadVecesPasaLimite);
        totalMinutos += cantidadVecesPasaLimite;
    }

    if (LIMITE_TIEMPO <= totalMinutos) {
        const cantidadVecesPasaLimite = obtenerCantidadVecesPasaLimite(totalMinutos, LIMITE_TIEMPO);
        totalMinutos -= (LIMITE_TIEMPO * cantidadVecesPasaLimite);
        totalHoras += cantidadVecesPasaLimite;
    }

    return devolverRespuesta(totalHoras, totalMinutos, totalSegundos);
}

function calcularTiempo(tiempo) {
    const $tiempo = $formulario.querySelectorAll(`.cantidad-${tiempo}`);
    let total = 0;

    for (let i = 0; i < $tiempo.length; i++) {
        total += Number($tiempo[i].value);
    }

    return total;
}

function obtenerCantidadVecesPasaLimite(tiempo, LIMITE_TIEMPO) {
    let cantidad = 0;

    while (LIMITE_TIEMPO <= tiempo) {
        tiempo -= LIMITE_TIEMPO;
        cantidad++;
    }

    return cantidad;
}

function devolverRespuesta(totalHoras, totalMinutos, totalSegundos) {
    let respuesta;

    respuesta = `${arreglarSemanticaRespuesta(totalHoras, 'hora')}, `;
    respuesta += `${arreglarSemanticaRespuesta(totalMinutos, 'minuto')} y `;
    respuesta += arreglarSemanticaRespuesta(totalSegundos, 'segundo');

    return respuesta;
}

function arreglarSemanticaRespuesta(valor, tiempo) {
    let parteRespuesta = `${valor}`;

    if (1 === valor) {
        parteRespuesta += ` ${tiempo}`;
    } else {
        parteRespuesta += ` ${tiempo}s`;
    }

    return parteRespuesta;
}

function reiniciar() {
    borrarVideosAnteriores();
    ocultarBotonCalcular();
    ocultarRespuesta();
    ocultarBotonReiniciar();
}

function borrarVideosAnteriores() {
    const $videos = $formulario.querySelectorAll('.video');
    const $titulosVideos = $formulario.querySelectorAll('#videos h5');

    for (let i = 0; i < $videos.length; i++) {
        $videos[i].remove();
        $titulosVideos[i].remove();
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
