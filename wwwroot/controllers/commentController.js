/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 27/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertComment, updateComment, selectAllComments, deleteComment, selectCommentById, selectCommentsByDriverId } = require('../models/DAO/comment.js')
const { listarUserById } = require('./userController.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoComment = async (comment) => {
    if (comment.comentario == '' || comment.comentario == null || comment.id_usuario == '' || comment.id_usuario == null || comment.id_motorista == '' || comment.id_motorista == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await insertComment(comment)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarComment = async (comment) => {
    if (comment.comentario == '' || comment.comentario == null || comment.id_usuario == '' || comment.id_usuario == null || comment.id_motorista == '' || comment.id_motorista == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await updateComment(comment)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarComment = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteComment(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarCommentById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectCommentById(id)

        if (result.length !== 0) {
            let commentsJson = {}
            result.forEach(element => {
                commentsJson = element
            })
            return { status: 200, message: commentsJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const listarComments = async () => {
    const result = await selectAllComments()

    if (result) {
        let commentsJson = {}
        commentsJson.comments = result
        return { status: 200, message: commentsJson }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarCommentsByDriverId = async (idMotorista) => {
    if (idMotorista == '' || idMotorista == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectCommentsByDriverId(idMotorista)

        if (result) {
            let messageJson = {}
            await Promise.all(result.map(async el => {
                const user = await listarUserById(el.id_usuario)
                el.user = user.message
                delete el.id_usuario
            }))
            messageJson.comentarios = result
            return { status: 201, message: messageJson }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

module.exports = {
    novoComment,
    atualizarComment,
    listarComments,
    deletarComment,
    listarCommentById,
    listarCommentsByDriverId
}