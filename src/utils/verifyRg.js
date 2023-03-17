/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA VERIFICAÇÃO DO RG
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 17/03/2023
VERSÃO: 1.0
************************************************************************/
const verifyRg = async (rg) => {
    // SEPARA TODOS OS CARACTERES DO RG
    var chars = rg.toUpperCase().split('')

    // SALVA OS 9 PRIMEIROS DIGITOS
    let numberOne = chars[0]
    let numberTwo = chars[1]
    let numberThree = chars[2]
    let numberFour = chars[3]
    let numberFive = chars[4]
    let numberSix = chars[5]
    let numberSeven = chars[6]
    let numberEight = chars[7]

    // // SOMA TODOS OS VALORES, MULTIPLICANDO-OS POR NÚMEROS DECRESCENTES A PARTIR DO 10
    let sumNumbers = (numberOne * 2) + (numberTwo * 3) + (numberThree * 4) + (numberFour * 5) + (numberFive * 6) + (numberSix * 7) + (numberSeven * 8) + (numberEight * 9)

    // // DIVIDIMOS A SOMA TOTAL POR 11
    let lastDigit = 11 - (sumNumbers % 11)
    if (lastDigit == 10) {
        lastDigit = "X"
    }
    if (lastDigit == 11) {
        lastDigit = "0"
    }


    if (chars[8] == lastDigit) {
        return true
    } else {
        return false
    }
}

module.exports = {
    verifyRg
}
