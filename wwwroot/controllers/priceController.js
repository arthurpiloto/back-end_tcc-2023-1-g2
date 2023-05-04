/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 04/05/2023
VERSÃO: 1.0
************************************************************************/
const { insertPrice, updatePrice, deletePrice, selectAllPrices, selectPriceById } = require('../models/DAO/price.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoPrice = async (price) => {
    if (price.faixa_preco == '' || price.faixa_preco == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (price.faixa_preco.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await insertPrice(price)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarPrice = async (price) => {
    if (price.faixa_preco == '' || price.faixa_preco == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (price.faixa_preco.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await updatePrice(price)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarPrice = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deletePrice(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarPrices = async () => {
    const result = await selectAllPrices()

    if (result) {
        let jsonReturn = {}
        jsonReturn.prices = result
        return { status: 200, message: jsonReturn }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarPriceById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectPriceById(id)

        if (result.length !== 0) {
            let jsonReturn = {}
            result.forEach(element => {
                jsonReturn = element
            })
            return { status: 200, message: jsonReturn }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoPrice,
    atualizarPrice,
    deletarPrice,
    listarPrices,
    listarPriceById
}
