/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const { insertEstado, updateEstado, deleteEstado, selectAllEstados, selectEstadoById, selectEstadoByName } = require('../models/DAO/estado.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoEstado = async (estado) => {
    if (estado.nome == '' || estado.nome == null || estado.id_cidade == '' || estado.id_cidade == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (estado.nome.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const verify = await listarEstadoByNome(estado.nome)

        if (verify.status == 200) {
            return { status: 401, message: verify.message }
        } else {
            const result = await insertEstado(estado)

            if (result) {
                let messageReturn = {}
                messageReturn.message = MESSAGE_SUCCESS.INSERT_ITEM
                messageReturn.id = result[0].id

                return { status: 201, message: messageReturn }
            } else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        }
    }
}

const atualizarEstado = async (estado) => {
    if (estado.nome == '' || estado.nome == null || estado.id_cidade == '' || estado.id_cidade == null || estado.status_estado == '' || estado.status_estado == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (estado.nome.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await updateEstado(estado)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarEstado = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteEstado(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarEstados = async () => {
    const result = await selectAllEstados()

    if (result) {
        let jsonReturn = {}
        jsonReturn.estados = result
        return { status: 200, message: jsonReturn }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarEstadoById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectEstadoById(id)

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

const listarEstadoByNome = async (estado) => {
    if (estado == '' || estado == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await selectEstadoByName(estado)

        if (result.length !== 0) {
            return { status: 200, message: result[0] }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoEstado,
    atualizarEstado,
    deletarEstado,
    listarEstados,
    listarEstadoById,
    listarEstadoByNome
}
