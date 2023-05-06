/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
AUTOR: NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 28/03/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { novoTypePayment, listarTypespayments, atualizarTypePayment, deletarTypePayment, listarTypePaymentById } = require('../controllers/typePaymentController.js')
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
    .route('/typePayment/:typePaymentId')
    .get(async(request, response) => {
        let statusCode
        let message
        
        let id = request.params.typePaymentId

        if (id != '' && id != undefined) {
            const paymentData = await listarTypePaymentById(id)

            statusCode = paymentData.status
            message = paymentData.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        return response.status(statusCode).json(message)
    })

    .put(jsonParser, async(request, response) => {
        let statusCode
        let message
        let headerContentType
    
        headerContentType = request.headers['content-type']
    
        if(headerContentType == 'application/json') {
            let bodyData = request.body
    
            if(JSON.stringify(bodyData) != '{}') {
                let id = request.params.typePaymentId
    
                if(id != '' && id != undefined) {
                    bodyData.id = id
    
                    const updatedTypePayment = await atualizarTypePayment(bodyData)
    
                    statusCode = updatedTypePayment.status
                    message = updatedTypePayment.message
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

    .delete(async(request, response) => {
        let statusCode
        let message

        let id = request.params.typePaymentId

        if(id != '' && id != undefined) {
            const deletedTypePayment = await deletarTypePayment(id)

            statusCode = deletedTypePayment.status
            message = deletedTypePayment.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
        response.status(statusCode).json(message)
    })

router 
    .route('/typePayments')
    .get(async(request, response) => {
        let statusCode
        let message

        const typePaymentsData = await listarTypespayments()

        if (typePaymentsData) {
            statusCode = typePaymentsData.status
            message = typePaymentsData.message
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })


module.exports = router