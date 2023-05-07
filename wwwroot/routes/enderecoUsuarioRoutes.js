/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 17/04/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const router = express.Router()
const { MESSAGE_ERROR } = require('../modules/config.js')
const { novoEnderecoUsuario, atualizarEnderecoUsuario, deletarEnderecoUsuario, listarEnderecoByUsuarioId, listarEnderecosUsuario } = require('../controllers/enderecoUsuarioController.js')
const { verifyJwt } = require('../../middlewares/jwt.js')

router
    .route('/enderecoUsuario')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const data = await novoEnderecoUsuario(dadosBody)
                statusCode = data.status
                message = data.message
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
    .route('/enderecosUsuario')
    .get(async (request, response) => {
        let statusCode
        let message

        const data = await listarEnderecosUsuario()

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
    .route('/enderecoUsuario/:enderecoUsuarioId')
    .put(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers['content-type']

        if (headerContentType == 'application/json') {
            let bodyData = request.body

            if (JSON.stringify(bodyData) != '{}') {
                let id = request.params.enderecoUsuarioId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const data = await atualizarEnderecoUsuario(bodyData)

                    statusCode = data.status
                    message = data.message
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

        let id = request.params.enderecoUsuarioId

        if (id != '' && id != undefined) {
            const data = await deletarEnderecoUsuario(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/enderecoUsuario/:userId')
    .get(/*verifyJwt,*/ async (request, response) => {
        let statusCode
        let message
        let id = request.params.userId

        if (id != '' && id != undefined) {
            const data = await listarEnderecoByUsuarioId(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        return response.status(statusCode).json(message)
    })

module.exports = router