/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 27/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertTypeContract, selectAllTypesContracts, updateTypeContract, deleteTypeContract, selectTypeContractById } = require('../models/DAO/typeContract.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoTypeContract = async (typeContract) => {
    if (typeContract.tipo_contrato == '' || typeContract.tipo_contrato == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (typeContract.tipo_contrato.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await insertTypeContract(typeContract)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarTypeContract = async (typeContract) => {
    if (typeContract.tipo_contrato == '' || typeContract.tipo_contrato == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (typeContract.tipo_contrato.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await updateTypeContract(typeContract)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarTypeContract = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteTypeContract(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarTypeContractById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectTypeContractById(id)

        if (result.length !== 0) {
            return { status: 200, message: result }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const listarTypesContracts = async () => {
    const result = await selectAllTypesContracts()

    if (result) {
        let typesContractJson = {}
        typesContractJson.typesContracts = result
        return typesContractJson
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

module.exports = {
    novoTypeContract, listarTypesContracts, atualizarTypeContract, deletarTypeContract, listarTypeContractById
}