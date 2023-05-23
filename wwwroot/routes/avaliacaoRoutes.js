/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 23/05/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { novoAvaliacao, atualizarAvaliacao, deletarAvaliacao, listarAvaliacaoById, listarAvaliacoes } = require('../controllers/avaliacaoController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const router = express.Router()

router
    .route('/avaliacao')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosComment = await novoAvaliacao(dadosBody)
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
    .route('/avaliacao/:avaliacaoId')
    .get(async (request, response) => {
        let statusCode
        let message

        let id = request.params.avaliacaoId

        if (id != '' && id != undefined) {
            const data = await listarAvaliacaoById(id)

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
                let id = request.params.avaliacaoId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const updatedComment = await atualizarAvaliacao(bodyData)

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

        let id = request.params.avaliacaoId

        if (id != '' && id != undefined) {
            const deletedComment = await deletarAvaliacao(id)

            statusCode = deletedComment.status
            message = deletedComment.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/avaliacoes')
    .get(async (request, response) => {
        let statusCode
        let message

        const data = await listarAvaliacoes()

        if (data) {
            statusCode = data.status
            message = data.message
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

module.exports = router