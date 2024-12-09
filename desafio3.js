const fs = require('fs');
const { text } = require('stream/consumers');

analizarInstrucciones("trace.txt");

function analizarInstrucciones(archivoTrace) {
    let contadorInstrucciones = 0;
    let contadorUltimaLinea = 0;
    let secuenciaActual = 0;

    const data = leerArchivo(archivoTrace).split('\n');
    //const data = ["0 1 2 3 -1", "1 -2 5"];

    for (let i = 0; i < data.length; i++) {
        secuenciaActual = data[i].split(' ');
        contadorUltimaLinea = 0;

        if (parseInt(secuenciaActual[0]) < 0) {
            contadorInstrucciones++;
            contadorUltimaLinea = 1;
            continue;
        }

        for (let j = 0; j >= 0 && j < secuenciaActual.length;) {
            let instruccion = parseInt(secuenciaActual[j]);

            secuenciaActual[j] = instruccion + 1 + ''; //aumentar valor de posicion actual

            j += instruccion; //mover puntero
            contadorUltimaLinea++; //aumentar conteo
        }

        contadorInstrucciones += contadorUltimaLinea;
    }

    console.log(`${contadorInstrucciones}-${contadorUltimaLinea}`);
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