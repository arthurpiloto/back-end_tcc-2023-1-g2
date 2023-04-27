/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 28/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertTypePayment, selectAllTypesPayments, updateTypePayment, deleteTypePayment, selectTypePaymentByID } = require('../models/DAO//typePayment.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoTypePayment = async (typePayment) => {
    if (typePayment.tipo_pagamento == '' || typePayment.tipo_pagamento == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (typePayment.tipo_pagamento.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await insertTypePayment(typePayment)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarTypePayment = async (typePayment) => {
    if (typePayment.tipo_pagamento == '' || typePayment.tipo_pagamento == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (typePayment.tipo_pagamento.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await updateTypePayment(typePayment)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarTypePayment = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteTypePayment(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarTypePaymentById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectTypePaymentByID(id)

        if (result.length !== 0) {
            let typePaymentJson = {}
            result.forEach(element => {
                typePaymentJson = element  
            })
            return { status: 200, message: typePaymentJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const listarTypespayments = async () => {
    const result = await selectAllTypesPayments()

    if (result) {
        let typesPaymentsJson = {}
        typesPaymentsJson.typesPayment = result
        return { status: 200, message: typesPaymentsJson }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

module.exports = {
    novoTypePayment, listarTypespayments, atualizarTypePayment, deletarTypePayment, listarTypePaymentById
}