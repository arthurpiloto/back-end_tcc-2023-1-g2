/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA VERIFICAÇÃO DO CPF
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 16/03/2023
VERSÃO: 1.0
************************************************************************/
const verifyCpf = async (cpf) => {
    if (cpf.length == 11) {
        // SEPARA TODOS OS CARACTERES DO CPF
        var chars = cpf.split('')

        // SALVA OS 9 PRIMEIROS DIGITOS
        let numberOne = chars[0]
        let numberTwo = chars[1]
        let numberThree = chars[2]
        let numberFour = chars[3]
        let numberFive = chars[4]
        let numberSix = chars[5]
        let numberSeven = chars[6]
        let numberEight = chars[7]
        let numberNine = chars[8]

        // SOMA TODOS OS VALORES, MULTIPLICANDO-OS POR NÚMEROS DECRESCENTES A PARTIR DO 10
        let sumNumbers = (numberOne * 10) + (numberTwo * 9) + (numberThree * 8) + (numberFour * 7) + (numberFive * 6) + (numberSix * 5) + (numberSeven * 4) + (numberEight * 3) + (numberNine * 2)

        // DIVIDIMOS A SOMA TOTAL POR 11
        let firstDigit = sumNumbers % 11
        if (firstDigit < 2) {
            firstDigit = 0
        }
        if (firstDigit > 2) {
            // SUBTRAI O RESTO DA DIVISÃO POR 11
            firstDigit = 11 - firstDigit
        }

        // SOMA TODOS OS VALORES, MULTIPLICANDO-OS POR NÚMEROS DECRESCENTES A PARTIR DO 11 POR CONTA DO PRIMEIRO DIGITO
        let sumNumbersPt2 = (numberOne * 11) + (numberTwo * 10) + (numberThree * 9) + (numberFour * 8) + (numberFive * 7) + (numberSix * 6) + (numberSeven * 5) + (numberEight * 4) + (numberNine * 3) + (firstDigit * 2)

        let secondDigit = sumNumbersPt2 % 11
        if (secondDigit < 2) {
            secondDigit = 0
        }
        if (secondDigit > 2) {
            // SUBTRAI O RESTO DA DIVISÃO POR 11
            secondDigit = 11 - secondDigit
        }

        if (chars[9] == firstDigit && chars[10] == secondDigit) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

module.exports = {
    verifyCpf
}
