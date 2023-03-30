/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DE VAN
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 07/03/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { newVan, atualizarVan, deletarVan, listarVans, listarVanById } = require('../controllers/vanController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')

const router = express.Router()

router
    .route('/van')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosVan = await newVan(dadosBody)
                statusCode = dadosVan.status
                message = dadosVan.message
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
    .route('/van/:vanId')
    .put(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers['content-type']

        if (headerContentType == 'application/json') {
            let bodyData = request.body

            if (JSON.stringify(bodyData) != '{}') {
                let id = request.params.vanId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const updatedVan = await atualizarVan(bodyData)

                    statusCode = updatedVan.status
                    message = updatedVan.message
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

        let id = request.params.vanId

        if (id != '' && id != undefined) {
            const deleteVan = await deletarVan(id)

            statusCode = deleteVan.status
            message = deleteVan.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

    .get(async (request, response) => {
        let statusCode
        let message

        let id = request.params.vanId

        if (id != '' && id != undefined) {
            const listarVan = await listarVanById(id)

            statusCode = listarVan.status
            message = listarVan.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/vans')
    .get(async (request, response) => {
        let statusCode
        let message

        const vanData = await listarVans()

        if (vanData) {
            statusCode = 200
            message = vanData
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

module.exports = router