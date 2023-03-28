/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 28/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertTypePayment, selectAllTypesPayments } = require('../models/DAO//typePayment.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoTypePayment = async (typePayment) => {
    if (typePayment.tipo_pagamento == '' || typePayment.tipo_pagamento == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (typePayment.tipo_pagamento.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    }else{
        const result = await insertTypePayment(typePayment)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarTypespayments = async () => {
    const result = await selectAllTypesPayments()

    if (result) {
        let typesPaymentsJson = {}
        typesPaymentsJson.typesPayment = result
        return typesPaymentsJson
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

module.exports={
    novoTypePayment, listarTypespayments
}