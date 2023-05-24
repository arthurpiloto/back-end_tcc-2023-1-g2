/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 23/05/2023
VERSÃO: 1.0
************************************************************************/
const { insertUsuarioAvaliacaoMotorista, updateUsuarioAvaliacaoMotorista, deleteUsuarioAvaliacaoMotorista, selectAllUsuariosAvaliacoesMotoristas, selectUsuarioAvaliacaoMotoristaById, selectUsuarioAvaliacaoMotoristaByIdMotorista, selectUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista } = require('../models/DAO/usuarioAvaliacaoMotorista.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoUsuarioAvaliacaoMotorista = async (usuarioAvaliacaoMotorista) => {
    if (usuarioAvaliacaoMotorista.id_usuario == '' || usuarioAvaliacaoMotorista.id_usuario == null || usuarioAvaliacaoMotorista.id_motorista == '' || usuarioAvaliacaoMotorista.id_motorista == null || usuarioAvaliacaoMotorista.id_avaliacao == '' || usuarioAvaliacaoMotorista.id_avaliacao == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await insertUsuarioAvaliacaoMotorista(usuarioAvaliacaoMotorista)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarUsuarioAvaliacaoMotorista = async (usuarioAvaliacaoMotorista) => {
    if (usuarioAvaliacaoMotorista.id_usuario == '' || usuarioAvaliacaoMotorista.id_usuario == null || usuarioAvaliacaoMotorista.id_motorista == '' || usuarioAvaliacaoMotorista.id_motorista == null || usuarioAvaliacaoMotorista.id_avaliacao == '' || usuarioAvaliacaoMotorista.id_avaliacao == null || usuarioAvaliacaoMotorista.id == '' || usuarioAvaliacaoMotorista.id == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await updateUsuarioAvaliacaoMotorista(usuarioAvaliacaoMotorista)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarUsuarioAvaliacaoMotorista = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteUsuarioAvaliacaoMotorista(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarUsuarioAvaliacaoMotoristaById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectUsuarioAvaliacaoMotoristaById(id)

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

const listarUsuariosAvaliacoesMotoristas = async () => {
    const result = await selectAllUsuariosAvaliacoesMotoristas()

    if (result) {
        let jsonReturn = {}
        jsonReturn.usuarios_avaliacoes_motoristas = result
        return { status: 200, message: jsonReturn }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarUsuarioAvaliacaoMotoristaByIdMotorista = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectUsuarioAvaliacaoMotoristaByIdMotorista(id)

        if (result.length !== 0) {
            let jsonReturn = {}
            jsonReturn.usuarios_avaliacoes_motorista = result
            return { status: 200, message: jsonReturn }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const listarUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista = async (idUser, idDriver) => {
    if (idUser == '' || idUser == undefined || idDriver == '' || idDriver == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista(idUser, idDriver)

        if (result.length !== 0) {
            return { status: 200, message: result[0] }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoUsuarioAvaliacaoMotorista,
    atualizarUsuarioAvaliacaoMotorista,
    listarUsuariosAvaliacoesMotoristas,
    deletarUsuarioAvaliacaoMotorista,
    listarUsuarioAvaliacaoMotoristaById,
    listarUsuarioAvaliacaoMotoristaByIdMotorista,
    listarUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista
}