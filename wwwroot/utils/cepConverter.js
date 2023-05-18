/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA TRANSFORMAÇÃO DO CEP EM
ENDEREÇO E INSERT NAS RESPECTIVAS TABELAS
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const cep = require('cep-promise')

const cepConverter = async (cepUsuario) => {
    cepUsuario = cepUsuario.split('-').join("")
    const endereco = await cep(cepUsuario)
    return endereco
}

module.exports = {
    cepConverter
}
