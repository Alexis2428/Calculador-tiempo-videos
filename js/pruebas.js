function probarValidarNumero() {
    console.assert(
        validarNumero('') === 'Ningun campo puede estar vacio', 'validarNumero no validó que no se ingreso ningun número'
    );

    console.assert(
        validarNumero('12,5') === 'Solo se acepta números enteros', 'validarNumero no validó que el número sea entero'
    );

    console.assert(
        validarNumero('24') === '', 'validarNumero falló con un valor valido'
    );
}

probarValidarNumero();
