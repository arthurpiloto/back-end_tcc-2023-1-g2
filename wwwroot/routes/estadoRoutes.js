/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { novoEstado, atualizarEstado, deletarEstado, listarEstados, listarEstadoById, listarEstadoByNome } = require('../controllers/estadoController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const router = express.Router()

router
    .route('/estado')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const data = await novoEstado(dadosBody)
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
    .route('/estado/:estadoId')
    .get(async (request, response) => {
        let statusCode
        let message

        let id = request.params.estadoId

        if (id != '' && id != undefined) {
            const data = await listarEstadoById(id)

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
                let id = request.params.estadoId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const data = await atualizarEstado(bodyData)

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

        let id = request.params.estadoId

        if (id != '' && id != undefined) {
            const data = await deletarEstado(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/estados')
    .get(async (request, response) => {
        let statusCode
        let message

        const data = await listarEstados()

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
    .route('/estado/nome/:estadoNome')
    .get(async (request, response) => {
        let statusCode
        let message

        let nome = request.params.estadoNome

        if (nome != '' && nome != undefined) {
            const data = await listarEstadoByNome(nome)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_FIELDS
        }

        return response.status(statusCode).json(message)
    })

module.exports = router
