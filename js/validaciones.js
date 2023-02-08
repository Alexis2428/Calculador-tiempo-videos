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

