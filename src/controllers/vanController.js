/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertVan } = require('../models/DAO/van.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const newVan = async function (van) {
    if (van.placa ==  '' || van.placa == null || van.quantidade_vagas == '' || van.quantidade_vagas == null || van.id_modelo == '' || van.id_modelo == null || van.id_motorista == '' || van.id_motorista == null) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if (van.placa.length > 10 || van.foto.length > 200) {
        return {status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED}
    } else{
        const result = await insertVan(van)

        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

module.exports = {
    newVan
}
