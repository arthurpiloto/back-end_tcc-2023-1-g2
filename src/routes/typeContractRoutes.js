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
const { novoTypeContract, listarTypesContracts, atualizarTypeContract, deletarTypeContract, listarTypeContractById } = require('../controllers/typeContractController.js')
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
    .route('/typeContract/:typeContractId')
    .get(async(request, response) => {
        let statusCode
        let message
        
        let id = request.params.typeContractId

        if (id != '' && id != undefined) {
            const contractData = await listarTypeContractById(id)

            statusCode = contractData.status
            message = contractData.message
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
                let id = request.params.typeContractId
    
                if(id != '' && id != undefined) {
                    bodyData.id = id
    
                    const updatedTypeContract = await atualizarTypeContract(bodyData)
    
                    statusCode = updatedTypeContract.status
                    message = updatedTypeContract.message
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

        let id = request.params.typeContractId

        if(id != '' && id != undefined) {
            const deletedTypeContract = await deletarTypeContract(id)

            statusCode = deletedTypeContract.status
            message = deletedTypeContract.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
        response.status(statusCode).json(message)
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