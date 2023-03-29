/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DE VAN
AUTOR: NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 29/03/2023
VERSÃO: 1.0
************************************************************************/
const { Router } = require('express')
const express = require(`express`)
const jsonParser = express.json()
const { novoTypeContract, listarTypesContracts } = require('../controllers/typeContractController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const router = express.Router()

router
    .route('/typeContract')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosTypeContract = await novoTypeContract(dadosBody)
                statusCode = dadosTypeContract.status
                message = dadosTypeContract.message
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
    .route('/typeContracts')
    .get(async(request, response) => {
        let statusCode
        let message

        const typeContractsData = await listarTypesContracts()

        if (typeContractsData) {
            statusCode = 200
            message = typeContractsData
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

module.exports = router