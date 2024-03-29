/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
AUTOR: NICOLAS MENDES
DATA DE CRIAÇÃO: 27/03/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { novoComment, listarComments, atualizarComment, deletarComment, listarCommentById, listarCommentsByDriverId } = require('../controllers/commentController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const router = express.Router()

router
    .route('/comment')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosComment = await novoComment(dadosBody)
                statusCode = dadosComment.status
                message = dadosComment.message
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.EMPTY_BODY
            }
        } else {
            statusCode = 415
            message = MESSAGE_ERROR.CONTENT_TYPE
        }
        return response.status(statusCode).json(message)
    })

router
    .route('/comment/:commentId')
    .get(async (request, response) => {
        let statusCode
        let message

        let id = request.params.commentId

        if (id != '' && id != undefined) {
            const data = await listarCommentById(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        return response.status(statusCode).json(message)
    })

    .put(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers['content-type']

        if (headerContentType == 'application/json') {
            let bodyData = request.body

            if (JSON.stringify(bodyData) != '{}') {
                let id = request.params.commentId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const updatedComment = await atualizarComment(bodyData)

                    statusCode = updatedComment.status
                    message = updatedComment.message
                } else {
                    statusCode = 400
                    message = MESSAGE_ERROR.REQUIRED_ID
                }
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.EMPTY_BODY
            }
        } else {
            statusCode = 415
            message = MESSAGE_ERROR.INCORRECT_CONTENT_TYPE
        }

        return response.status(statusCode).json(message)
    })

    .delete(async (request, response) => {
        let statusCode
        let message

        let id = request.params.commentId

        if (id != '' && id != undefined) {
            const deletedComment = await deletarComment(id)

            statusCode = deletedComment.status
            message = deletedComment.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/comments')
    .get(async (request, response) => {
        let statusCode
        let message

        const data = await listarComments()

        if (data) {
            statusCode = data.status
            message = data.message
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

router
    .route('/comments/driver/:driverId')
    .get(async (request, response) => {
        let statusCode
        let message

        let id = request.params.driverId

        if (id != '' && id != undefined) {
            const data = await listarCommentsByDriverId(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        return response.status(statusCode).json(message)
    })

module.exports = router