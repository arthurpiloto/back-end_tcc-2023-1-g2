/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { novoEndereco, atualizarEndereco, deletarEndereco, listarEnderecos, listarEnderecoById } = require('../controllers/enderecoController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const { cepConverter } = require('../utils/cepConverter.js')
const router = express.Router()

router
    .route('/endereco')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                let numeroCasa = dadosBody.numero
                let idEstado = dadosBody.id_estado
                dadosBody = await cepConverter(dadosBody.cep)
                dadosBody.numero = numeroCasa
                dadosBody.id_estado = idEstado
                
                const data = await novoEndereco(dadosBody)
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
    .route('/endereco/:enderecoId')
    .get(async(request, response) => {
        let statusCode
        let message
        
        let id = request.params.enderecoId

        if (id != '' && id != undefined) {
            const data = await listarEnderecoById(id)

            statusCode = data.status
            message = data.message
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
                let id = request.params.enderecoId
    
                if(id != '' && id != undefined) {
                    bodyData.id = id
    
                    const data = await atualizarEndereco(bodyData)
    
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

    .delete(async(request, response) => {
        let statusCode
        let message

        let id = request.params.enderecoId

        if(id != '' && id != undefined) {
            const data = await deletarEndereco(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
        response.status(statusCode).json(message)
    })

router 
    .route('/enderecos')
    .get(async(request, response) => {
        let statusCode
        let message

        const data = await listarEnderecos()

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
