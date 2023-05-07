/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const { insertCidade, updateCidade, deleteCidade, selectAllCidades, selectCidadeById, selectCidadeByName } = require('../models/DAO/cidade.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoCidade = async (cidade) => {
    if (cidade.nome == '' || cidade.nome == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (cidade.nome.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        let messageVerify = false
        const verifyCity = await listarCidades()
        verifyCity.message.cidades.map(el => {
            if (cidade.nome == el.nome) {
                messageVerify = true
            }
        })

        if (messageVerify) {
            return { status: 401, message: MESSAGE_ERROR.CITY_EXISTS }
        } else {
            const result = await insertCidade(cidade)

            if (result) {
                return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
            } else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        }
    }
}

const atualizarCidade = async (cidade) => {
    if (cidade.nome == '' || cidade.nome == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (cidade.nome.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await updateCidade(cidade)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarCidade = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteCidade(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarCidades = async () => {
    const result = await selectAllCidades()

    if (result) {
        let jsonReturn = {}
        jsonReturn.cidades = result
        return { status: 200, message: jsonReturn }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarCidadeById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectCidadeById(id)

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

const listarCidadeByNome = async (cidade) => {
    if (cidade == '' || cidade == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await selectCidadeByName(cidade)

        if (result.length !== 0) {
            return { status: 200, message: result[0] }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoCidade,
    atualizarCidade,
    deletarCidade,
    listarCidades,
    listarCidadeById,
    listarCidadeByNome
}
