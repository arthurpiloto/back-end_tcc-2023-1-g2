/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 07/05/2023
VERSÃO: 1.0
************************************************************************/
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')
const { userEnderecoJson } = require('../utils/userEnderecoJson.js')
const { insertEnderecoUsuario, updateEnderecoUsuario, deleteEnderecoUsuario, selectAllEnderecosUsuario, selectEnderecoByUserId } = require('../models/DAO/enderecoUsuario.js')

const novoEnderecoUsuario = async (enderecoUsuario) => {
    if (enderecoUsuario.id_endereco == '' || enderecoUsuario.id_endereco == undefined || enderecoUsuario.id_usuario == '' || enderecoUsuario.id_usuario == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const verify = await listarEnderecoByUsuarioId(enderecoUsuario.id_usuario)
        if (verify.status == 200) {
            return { status: 401, message: MESSAGE_ERROR.USER_ADDRESS }
        } else {
            const result = await insertEnderecoUsuario(enderecoUsuario)

            if (result) {
                return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
            } else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        }
    }
}

const atualizarEnderecoUsuario = async (enderecoUsuario) => {
    if (enderecoUsuario.id_endereco == '' || enderecoUsuario.id_endereco == undefined || enderecoUsuario.id_usuario == '' || enderecoUsuario.id_usuario == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await updateEnderecoUsuario(enderecoUsuario)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarEnderecoUsuario = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteEnderecoUsuario(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarEnderecosUsuario = async () => {
    const result = await selectAllEnderecosUsuario()

    if (result) {
        let schoolsJson = {}
        schoolsJson.enderecos_usuarios = result
        return { status: 200, message: schoolsJson }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarEnderecoByUsuarioId = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectEnderecoByUserId(id)

        if (result) {
            const messageJson = await userEnderecoJson(result)
            return { status: 200, message: messageJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoEnderecoUsuario,
    atualizarEnderecoUsuario,
    deletarEnderecoUsuario,
    listarEnderecosUsuario,
    listarEnderecoByUsuarioId
}
