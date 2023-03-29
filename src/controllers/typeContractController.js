/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 27/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertTypeContract, selectAllTypesContracts } = require('../models/DAO/typeContract.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoTypeContract = async (typeContract) => {
    if (typeContract.tipo_contrato == '' || typeContract.tipo_contrato == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (typeContract.tipo_contrato.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    }else{
        const result = await insertTypeContract(typeContract)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarTypesContracts = async () => {
    const result = await selectAllTypesContracts()

    if (result) {
        let typesPaymentsJson = {}
        typesPaymentsJson.typesPayment = result
        return typesPaymentsJson
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

module.exports={
    novoTypeContract, listarTypesContracts
}