const fs = require('fs');
const { text } = require('stream/consumers');

const esLetraMinuscula = (asciiCode) => (asciiCode >= 97 && asciiCode <= 122);
const esDigito = (asciiCode) => (asciiCode >= 48 && asciiCode <= 57);
const claveEsNumerica = (texto) => /^-?[0-9]+$/.test(texto + '');

validarPasswords('log.txt');

function claveNumericaEsInvalida(clave) {
    let ascii = clave.charCodeAt(0);
    let minNumeroEnAscii = ascii;

    for (let i = 1; i < clave.length; i++) {
        ascii = clave.charCodeAt(i);

        if (ascii < minNumeroEnAscii)
            return true;

        minNumeroEnAscii = ascii;
    }

    return false;
}

function claveTextoEsInvalida(clave) {
    let ascii = clave.charCodeAt(0);
    let minLetraEnAscii = ascii;

    for (let i = 1; i < clave.length; i++) {
        ascii = clave.charCodeAt(i);
        if (ascii < minLetraEnAscii)
            return true;

        minLetraEnAscii = ascii;
    }

    return false;
}

function claveEsInvalida(clave) {
    if (claveEsNumerica(clave)) return claveNumericaEsInvalida(clave);

    let ascii = clave.charCodeAt(0);
    let minNumeroEnAscii = ascii;
    let iniciaConLetra = esLetraMinuscula(ascii);

    if (iniciaConLetra) {
        return claveTextoEsInvalida(clave);
    }

    for (let i = 1; i < clave.length; i++) {
        ascii = clave.charCodeAt(i);

        if (esLetraMinuscula(ascii))
            return claveTextoEsInvalida(clave.substring(i));

        if (ascii < minNumeroEnAscii)
            return true;

        minNumeroEnAscii = ascii;
    }

    return false;
}

function validarPasswords(logfile) {
    let passwordValidas = 0;
    let passwordInvalidas = 0;

    const data = leerArchivo(logfile).split('\n');

    for (let i = 0; i < data.length; i++) {
        if (claveEsInvalida(data[i]))
            passwordInvalidas++;
        else
            passwordValidas++;
    }

    console.log(`${passwordValidas}true${passwordInvalidas}false`)
}

function leerArchivo(path) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}
