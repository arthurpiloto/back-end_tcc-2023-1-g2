/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DE MODELO
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************************************************************/

const express = require(`express`)
const jsonParser = express.json()
const { newModel, atualizarModel, deletarModel, listarAllModels, selectModelId } = require('../controllers/modelController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')

const router = express.Router()

router
    .route('/model')
    .post(jsonParser, async(request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosModel = await newModel(dadosBody)
                statusCode = dadosModel.status
                message = dadosModel.message 
            } else{
                statusCode = 400
                message = MESSAGE_ERROR.EMPTY_BODY
            }
        } else{
            statusCode = 415
            message = MESSAGE_ERROR.CONTENT_TYPE
        }
        return response.status(statusCode).json(message)
    })

router
    .route('/model/:modelId')
    .put(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers['content-type']

        if (headerContentType == 'application/json') {
            let bodyData = request.body

            if (JSON.stringify(bodyData) != '{}') {
                let id = request.params.modelId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const updateModel = await atualizarModel(bodyData)

                    statusCode = updateModel.status
                    message = updateModel.message
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
        let id = request.params.modelId
        console.log(id)

        if (id != '' && id != undefined) {
            const deleteModel = await deletarModel(id)

            statusCode = deleteModel.status
            message = deleteModel.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/models')
    .get(async (request, response) => {
        let statusCode
        let message

        const driversData = await listarAllModels()

        if (driversData) {
            statusCode = driversData.status
            message = driversData.message
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

router
    .route('/model/id/:modelName')
    .get(async(request, response) => {
        let statusCode
        let message
        let name = request.params.modelName
    
        if(name != '' && name != undefined) {
            const modelData = await selectModelId(name)
    
            if (modelData) {
                statusCode = modelData.status
                message = modelData.message
            } else {
                statusCode = modelData.status
                message = modelData.message
            }
        } else {
            statusCode = modelData.status
            message = modelData.message
        }
    
        response.status(statusCode).json(message)
    })

module.exports = router
