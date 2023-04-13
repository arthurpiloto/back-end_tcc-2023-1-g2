/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 29/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertContract, updateContract, selectAllContracts, deleteContract, selectContractById } = require('../models/DAO/contract.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoContract = async (contract) => {
    if (contract.valor == '' || contract.valor == null || contract.nome_passageiro == '' || contract.nome_passageiro == null || contract.idade_passageiro == '' || contract.idade_passageiro == null ||
        contract.id_usuario == '' || contract.id_usuario == null || contract.id_motorista == '' || contract.id_motorista == null || contract.id_escola == '' || contract.id_escola == null || contract.id_tipo_pagamento == '' ||
        contract.id_tipo_pagamento == null || contract.id_tipo_contrato == '' || contract.id_tipo_contrato == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (contract.nome_passageiro.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await insertContract(contract)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarContract = async (contract) => {
    if (contract.valor == '' || contract.valor == null || contract.nome_passageiro == '' || contract.nome_passageiro == null || contract.idade_passageiro == '' || contract.idade_passageiro == null ||
        contract.id_usuario == '' || contract.id_usuario == null || contract.id_motorista == '' || contract.id_motorista == null || contract.id_escola == '' || contract.id_escola == null || contract.id_tipo_pagamento == '' ||
        contract.id_tipo_pagamento == null || contract.id_tipo_contrato == '' || contract.id_tipo_contrato == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (contract.nome_passageiro.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await updateContract(contract)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarContract = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteContract(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarContracts = async () => {
    const result = await selectAllContracts()

    if (result) {
        let contractsJson = {}
        contractsJson.contracts = result
        return { status: 200, message: contractsJson }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarContractById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectContractById(id)

        if (result.length !== 0) {
            let contractsJson = {}
            result.forEach(element => {
                contractsJson = element
            })
            return { status: 200, message: contractsJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoContract, atualizarContract, listarContracts, deletarContract, listarContractById
}