/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DE VAN
AUTOR: NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 28/03/2023
VERSÃO: 1.0
************************************************************************/
const { Router } = require('express')
const express = require(`express`)
const jsonParser = express.json()
const { novoTypePayment, listarTypespayments } = require('../controllers/typePaymentController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const router = express.Router()

router
    .route('/typePayment')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosTypePayment = await novoTypePayment(dadosBody)
                statusCode = dadosTypePayment.status
                message = dadosTypePayment.message
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
    .route('/typePayments')
    .get(async(request, response) => {
        let statusCode
        let message

        const typePaymentsData = await listarTypespayments()

        if (typePaymentsData) {
            statusCode = 200
            message = typePaymentsData
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })


module.exports = router