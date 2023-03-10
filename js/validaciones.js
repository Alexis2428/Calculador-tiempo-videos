function validarTiempo($segundos, $minutos, $horas) {
    const errores = {
        segundos: {},
        minutos: {},
        horas: {}
    };

    for (let i = 0; i < $segundos.length; i++) {
        errores.segundos[i] = validarNumero($segundos[i].value);
    }
    for (let i = 0; i < $minutos.length; i++) {
        errores.minutos[i] = validarNumero($minutos[i].value);
    }
    for (let i = 0; i < $horas.length; i++) {
        errores.horas[i] = validarNumero($horas[i].value);
    }

    return 0 === manejarErrores(errores);
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

function manejarErrores(errores) {
    let cantidadErrores = 0;

    Object.keys(errores).forEach(function(key) {
        Object.keys(errores[key]).forEach(function(indice) {
            const error = errores[key][indice];

            if (error) {
                cantidadErrores++;
                $formulario.querySelectorAll(`.cantidad-${key}`)[indice].classList.add('error');

                if (!comprobarExisteError(error)) {
                    crearError(error);
                }

            } else {
                $formulario.querySelectorAll(`.cantidad-${key}`)[indice].classList.remove('error');
            }
        })
    })

    borrarErroresCorregidos(errores);

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

function borrarErroresCorregidos(errores) {
    const $listaErrores = $formulario.querySelectorAll('#errores li');
    const keysErrores = Object.keys(errores);

    for (let i = 0; i < $listaErrores.length; i++) {
        let errorCorregido = true;

        for (let llave = 0; llave < keysErrores.length; llave++) {
            const valuesErrores = Object.values(errores[keysErrores[llave]]);

            for (let j = 0; j < valuesErrores.length; j++) {
                if ($listaErrores[i].textContent === valuesErrores[j]) {
                    errorCorregido = false;
                    break;
                }
            }
            
            if (!errorCorregido) {
                break;
            }
        }

        if (errorCorregido) {
            $listaErrores[i].remove();
        }
    }
}
