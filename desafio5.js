const nodos = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '155', '156', '157', '158', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '195', '196'];
let nodosPrimos = [];

obtenerNodosPrimos(nodos);


function obtenerNodosPrimos(nodos) {
    for (let i = 0; i < nodos.length; i++)
        if (esPrimo(parseInt(nodos[i])) && digitosPrimos(nodos[i]))
            nodosPrimos.push(nodos[i]);

    console.log(nodosPrimos);
    console.log(`${nodosPrimos.length}-${nodosPrimos[2]}`)
}

function digitosPrimos(numStr) {
    let sum = 0;

    for (let i = 0; i < numStr.length; i++)
        sum += parseInt(numStr[i]);

    return esPrimo(sum);
}

function esPrimo(num) {
    if (num <= 1) return false;
    if (num % 2 == 0 && num > 2) return false; // ignorar los números pares

    for (let i = 3; i < num; i += 2)
        if (num % i === 0) return false;

    return true;
}