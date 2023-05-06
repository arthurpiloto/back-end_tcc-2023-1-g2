/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const { insertEndereco, updateEndereco, deleteEndereco, selectAllEnderecos, selectEnderecoById } = require('../models/DAO/endereco.js')
const { cepConverter } = require('../utils/cepConverter.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoEndereco = async (endereco) => {
    if (endereco.cep == '' || endereco.cep == null || endereco.numero == '' || endereco.numero == null || endereco.bairro == '' || endereco.bairro == null || endereco.logradouro == '' || endereco.logradouro == null || endereco.id_estado == '' || endereco.id_estado == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (endereco.cep.length > 9 || endereco.numero.length > 10 || endereco.bairro.length > 150 || endereco.logradouro.length > 200) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const resultCep = await cepConverter(endereco.cep)
        const result = await insertEndereco(resultCep, endereco)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarEndereco = async (endereco) => {
    if (endereco.cep == '' || endereco.cep == null || endereco.numero == '' || endereco.numero == null || endereco.bairro == '' || endereco.bairro == null || endereco.logradouro == '' || endereco.logradouro == null || endereco.id_estado == '' || endereco.id_estado == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (endereco.cep.length > 9 || endereco.numero.length > 10 || endereco.bairro.length > 150 || endereco.logradouro.length > 200) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const resultCep = await cepConverter(endereco.cep)
        const result = await updateEndereco(resultCep, endereco)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarEndereco = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteEndereco(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarEnderecos = async () => {
    const result = await selectAllEnderecos()

    if (result) {
        let jsonReturn = {}
        jsonReturn.enderecos = result
        return { status: 200, message: jsonReturn }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarEnderecoById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectEnderecoById(id)

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
    novoEndereco,
    atualizarEndereco,
    deletarEndereco,
    listarEnderecos,
    listarEnderecoById
}