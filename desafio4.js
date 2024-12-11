const fs = require('fs');

const data = leerArchivo("network.txt").replaceAll("[", "").replaceAll("]", "");

obtenerNodosSalvos(data);

function obtenerNodosSalvos(data) {
    const nodos = obtenerNodos(data);
    let nodosSalvos = [];

    let redNodos = [];

    for (let i = 0; i < nodos.length; i += 2) {

        let nodosIncludos = false;

        for (let j = 0; j < redNodos.length; j++) {
            if (redNodos[j].includes(nodos[i]) || redNodos[j].includes(nodos[i + 1])) {

                redNodos[j].push(nodos[i], nodos[i + 1]);

                nodosIncludos = true;
            }
        }

        if (!nodosIncludos) {
            redNodos.push([nodos[i], nodos[i + 1]]);
        }
    }

    for (let i = 0; i < redNodos.length; i++) {
        if (redNodos[i].length < 3)
            nodosSalvos.push(redNodos[i]);
    }

    console.log(new Set(nodosSalvos.flat()))
}

function obtenerNodos(data) {
    const dataString = data.replaceAll("[", "").replaceAll("]", "");

    return dataString.split(",").map(function (item) {
        return parseInt(item, 10);
    });
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