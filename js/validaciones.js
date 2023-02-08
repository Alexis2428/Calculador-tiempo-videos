function validarTiempo($numerosTiempo) {
    const errores = {};

    for (let i = 0; i < $numerosTiempo.length; i++) {
        errores[i] = validarNumero($numerosTiempo[i].value);
    }

    return 0 === manejarErrores($numerosTiempo, errores)
}

function validarNumero(numero) {
    if ('' === numero) {
        return 'Ningun campo puede estar vacio';
    }

    if (!/^[0-9]+$/.test(numero)) {
        return 'Solo se acepta números enteros';
    }

    return '';
}

function manejarErrores($numerosTiempo, errores) {
    let cantidadErrores = 0;

    Object.keys(errores).forEach(function(indice) {
        const error = errores[indice];

        if (error) {
            cantidadErrores++;
            $numerosTiempo[indice].classList.add('error');

            if (!comprobarExisteError(error)) {
                crearError(error);
            }

        } else {
            $numerosTiempo[indice].classList.remove('error');
        }
    })

    return cantidadErrores;
}

function crearError(error) {
    const $error = document.createElement('li');
    $error.className = 'list-group-item';
    $error.textContent = error;

    $formulario.querySelector('#errores').appendChild($error);
}

function comprobarExisteError(error) {
    const $listaErrores = $formulario.querySelectorAll('#errores li');

    for (let i = 0; i < $listaErrores.length; i++) {
        if (error === $listaErrores[i].textContent) {
            return true;
        }
    }

    return false;
}

function borrarErroresAnteriores() {
    const $errores = $formulario.querySelectorAll('#errores li');

    for (let i = 0; i < $errores.length; i++) {
        $errores[i].remove();
    }
}
