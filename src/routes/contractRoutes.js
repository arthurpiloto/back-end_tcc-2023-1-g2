/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DE CONTRATO
AUTOR: NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 29/03/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { novoContract, atualizarContract, listarContracts, deletarContract, listarContractById } = require('../controllers/contractController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const router = express.Router()

router
    .route('/contract')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosContract = await novoContract(dadosBody)
                statusCode = dadosContract.status
                message = dadosContract.message
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
    .route('/contract/:contractId')
    .get(async(request, response) => {
        let statusCode
        let message
        
        let id = request.params.contractId

        if (id != '' && id != undefined) {
            const contractData = await listarContractById(id)

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
                let id = request.params.contractId
    
                if(id != '' && id != undefined) {
                    bodyData.id = id
    
                    const updatedContract = await atualizarContract(bodyData)
    
                    statusCode = updatedContract.status
                    message = updatedContract.message
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

        let id = request.params.contractId

        if(id != '' && id != undefined) {
            const deletedContract = await deletarContract(id)

            statusCode = deletedContract.status
            message = deletedContract.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
        response.status(statusCode).json(message)
    })

router
    .route('/contracts')
    .get(async(request, response) => {
        let statusCode
        let message

        const contractsData = await listarContracts()

        if (contractsData) {
            statusCode = contractsData.status
            message = contractsData.message
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })


module.exports = router