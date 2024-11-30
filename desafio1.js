let codigo = "528934712834";
let movimientos = "URDURUDRUDLLLLUUDDUDUDUDLLRRRR";
let punteroGlobal = 0;

// testSolucion();

console.log(obtenerCombinacionFinal(codigo, movimientos));

function testSolucion() {
    let testCodigos = ["000", "1111", "9999"];
    let testMovimientos = ["URURD", "UUURUUU", "LULULULD"];
    let testOutputsEsperados = ["119", "4411", "8000"];

    for (let i = 0; i < testMovimientos.length; i++) {
        let combinacionFinal = obtenerCombinacionFinal(testCodigos[i], testMovimientos[i]);

        if (combinacionFinal === testOutputsEsperados[i]) {
            console.log(`Test Completado con Exito posicion ${i}`);
        } else {
            console.log(`Test Fallido posicion ${i}, output ${combinacionFinal}`)
        }

        punteroGlobal = 0;
    }
}

function obtenerCombinacionFinal(codigo, movimientos) {
    codigo = codigo.split("");
    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i] === "R" || movimientos[i] === "L")
            punteroGlobal = actualizarPuntero(punteroGlobal, movimientos[i], codigo.length);

        if (movimientos[i] === "U" || movimientos[i] === "D")
            codigo[punteroGlobal] = actualizarValor(movimientos[i], parseInt(codigo[punteroGlobal]));
    }

    return codigo.join("");
}

function actualizarPuntero(puntero, movimiento, codigoLength) {
    if (movimiento === "L") {
        if (puntero === 0)
            return --codigoLength;
        return --puntero;
    }

    if (movimiento === "R") {
        if (puntero === codigoLength - 1)
            return 0;
        return ++puntero;
    }
}

function actualizarValor(movimiento, valor) {
    if (movimiento === "U") {
        if (valor === 9)
            return 0;
        return ++valor;
    }

    if (movimiento === "D") {
        if (valor === 0)
            return 9;
        return --valor;
    }
}

