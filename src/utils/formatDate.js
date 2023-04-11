/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELO CÁLCULO DO PERÍODO DE TRABALHO
DO MOTORISTA
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 11/04/2023
VERSÃO: 1.0
************************************************************************/
const formatDate = async (date) => {
    date = date.toISOString().split("T")[0]
    date = date.split("-").reverse().join("/");
    return date
}

module.exports = {
    formatDate
}
